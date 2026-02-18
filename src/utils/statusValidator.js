/**
 * WRC-OS Status Transition Validator
 *
 * Enforces lifecycle, ownership, and permission rules defined in:
 * - /ops/STATUS_TRANSITIONS.md
 * - /ops/AUTHORITY_MODEL.md
 *
 * All state mutations must pass through this validator.
 * Conforms to ENG-008 Validation Response Contract.
 */

import {
  ERROR_CODES as CONTRACT_ERROR_CODES,
  success,
  failure,
} from './validationContract';

// Canonical statuses (ENG-004)
export const STATUSES = {
  BACKLOG: 'backlog',
  PLANNED: 'planned',
  ACTIVE: 'active',
  BLOCKED: 'blocked',
  REVIEW: 'review',
  APPROVED: 'approved',
  DONE: 'done',
  ARCHIVED: 'archived',
};

// Work types
export const WORK_TYPES = {
  EPIC: 'epic',
  MILESTONE: 'milestone',
  TICKET: 'ticket',
};

// Actor types
export const ACTOR_TYPES = {
  HUMAN: 'human',
  AGENT: 'agent',
};

// Human roles with authority levels
export const HUMAN_ROLES = {
  CEO: 'CEO',
  CTO: 'CTO',
  CMO: 'CMO',
  COO: 'COO',
  CFO: 'CFO',
};

// Re-export error codes from contract for backwards compatibility
export const ERROR_CODES = {
  INVALID_TRANSITION: CONTRACT_ERROR_CODES.INVALID_TRANSITION,
  AGENT_NOT_ALLOWED: CONTRACT_ERROR_CODES.AGENT_NOT_ALLOWED,
  APPROVAL_REQUIRED: CONTRACT_ERROR_CODES.APPROVAL_REQUIRED,
  INVALID_WORK_TYPE: CONTRACT_ERROR_CODES.INVALID_WORK_TYPE,
  INVALID_STATUS: CONTRACT_ERROR_CODES.INVALID_STATUS,
  TERMINAL_STATE: CONTRACT_ERROR_CODES.TERMINAL_STATE,
};

// Transition matrix for Tickets (ENG-005)
const TICKET_TRANSITIONS = {
  [STATUSES.BACKLOG]: [STATUSES.PLANNED, STATUSES.ARCHIVED],
  [STATUSES.PLANNED]: [STATUSES.ACTIVE, STATUSES.BACKLOG],
  [STATUSES.ACTIVE]: [STATUSES.BLOCKED, STATUSES.REVIEW],
  [STATUSES.BLOCKED]: [STATUSES.ACTIVE, STATUSES.PLANNED],
  [STATUSES.REVIEW]: [STATUSES.APPROVED, STATUSES.ACTIVE],
  [STATUSES.APPROVED]: [STATUSES.DONE],
  [STATUSES.DONE]: [STATUSES.ARCHIVED],
  [STATUSES.ARCHIVED]: [],
};

// Transition matrix for Milestones and Epics (ENG-005)
const CONTAINER_TRANSITIONS = {
  [STATUSES.BACKLOG]: [STATUSES.ACTIVE, STATUSES.ARCHIVED],
  [STATUSES.ACTIVE]: [STATUSES.DONE, STATUSES.BACKLOG],
  [STATUSES.DONE]: [STATUSES.ARCHIVED],
  [STATUSES.ARCHIVED]: [],
};

// Statuses available by work type (ENG-004)
const AVAILABLE_STATUSES = {
  [WORK_TYPES.EPIC]: [
    STATUSES.BACKLOG,
    STATUSES.ACTIVE,
    STATUSES.DONE,
    STATUSES.ARCHIVED,
  ],
  [WORK_TYPES.MILESTONE]: [
    STATUSES.BACKLOG,
    STATUSES.ACTIVE,
    STATUSES.DONE,
    STATUSES.ARCHIVED,
  ],
  [WORK_TYPES.TICKET]: [
    STATUSES.BACKLOG,
    STATUSES.PLANNED,
    STATUSES.ACTIVE,
    STATUSES.BLOCKED,
    STATUSES.REVIEW,
    STATUSES.APPROVED,
    STATUSES.DONE,
    STATUSES.ARCHIVED,
  ],
};

// Transitions agents are NOT allowed to execute (ENG-007)
const AGENT_FORBIDDEN_TRANSITIONS = [
  { to: STATUSES.APPROVED },
  { to: STATUSES.DONE },
  { to: STATUSES.ARCHIVED },
];

/**
 * Get the transition matrix for a work type
 */
const getTransitionMatrix = (workType) => {
  if (workType === WORK_TYPES.TICKET) {
    return TICKET_TRANSITIONS;
  }
  return CONTAINER_TRANSITIONS;
};

/**
 * Check if a status is valid for a work type
 */
const isValidStatusForWorkType = (status, workType) => {
  const available = AVAILABLE_STATUSES[workType];
  return available && available.includes(status);
};

/**
 * Check if an agent is allowed to execute a transition
 */
const isAgentAllowedTransition = (toStatus, requiresApproval) => {
  // Agents cannot transition to approved, done, or archived
  const forbidden = AGENT_FORBIDDEN_TRANSITIONS.some((t) => t.to === toStatus);
  if (forbidden) {
    return false;
  }
  return true;
};

/**
 * Validate a status transition
 *
 * @param {Object} context - Validation context
 * @param {string} context.currentStatus - Current status of the work item
 * @param {string} context.requestedStatus - Requested new status
 * @param {string} context.workType - Type of work item (epic | milestone | ticket)
 * @param {string} context.actorType - Type of actor (human | agent)
 * @param {string} context.actorRole - Role of the actor (CEO, CTO, agent-id, etc.)
 * @param {boolean} context.requiresApproval - Whether the work item requires approval
 *
 * @returns {Object} ValidationResult
 * @returns {boolean} ValidationResult.allowed - Whether the transition is allowed
 * @returns {string|null} ValidationResult.errorCode - Error code if not allowed
 * @returns {string} ValidationResult.reason - Human-readable reason
 * @returns {boolean} ValidationResult.escalationRequired - Whether escalation is needed
 */
export const validateTransition = (context) => {
  const {
    currentStatus,
    requestedStatus,
    workType,
    actorType,
    actorRole,
    requiresApproval = false,
  } = context;

  // Validate work type
  if (!Object.values(WORK_TYPES).includes(workType)) {
    return failure(ERROR_CODES.INVALID_WORK_TYPE, `Invalid work type: ${workType}`);
  }

  // Validate current status is valid for work type
  if (!isValidStatusForWorkType(currentStatus, workType)) {
    return failure(ERROR_CODES.INVALID_STATUS, `Status '${currentStatus}' is not valid for ${workType}`);
  }

  // Validate requested status is valid for work type
  if (!isValidStatusForWorkType(requestedStatus, workType)) {
    return failure(ERROR_CODES.INVALID_STATUS, `Status '${requestedStatus}' is not valid for ${workType}`);
  }

  // Check terminal state
  if (currentStatus === STATUSES.ARCHIVED) {
    return failure(ERROR_CODES.TERMINAL_STATE, 'Cannot transition from archived state');
  }

  // Get transition matrix and check if transition is valid
  const matrix = getTransitionMatrix(workType);
  const allowedTransitions = matrix[currentStatus] || [];

  if (!allowedTransitions.includes(requestedStatus)) {
    return failure(
      ERROR_CODES.INVALID_TRANSITION,
      `Transition from '${currentStatus}' to '${requestedStatus}' is not allowed for ${workType}`
    );
  }

  // Check agent permissions (ENG-007)
  if (actorType === ACTOR_TYPES.AGENT) {
    if (!isAgentAllowedTransition(requestedStatus, requiresApproval)) {
      return failure(ERROR_CODES.AGENT_NOT_ALLOWED, `Agents cannot transition to '${requestedStatus}'`);
    }
  }

  // Check approval gating for tickets
  if (workType === WORK_TYPES.TICKET && requiresApproval) {
    if (
      currentStatus === STATUSES.REVIEW &&
      requestedStatus === STATUSES.APPROVED &&
      actorType === ACTOR_TYPES.AGENT
    ) {
      return failure(ERROR_CODES.APPROVAL_REQUIRED, 'Approval transition requires human authority');
    }

    if (
      currentStatus === STATUSES.APPROVED &&
      requestedStatus === STATUSES.DONE &&
      actorType === ACTOR_TYPES.AGENT
    ) {
      return failure(ERROR_CODES.APPROVAL_REQUIRED, 'Done transition requires human authority when approval is required');
    }
  }

  return success(`Transition from '${currentStatus}' to '${requestedStatus}' is allowed`);
};

/**
 * Get all valid transitions from a given status
 *
 * @param {string} currentStatus - Current status
 * @param {string} workType - Type of work item
 * @param {string} actorType - Type of actor
 * @returns {string[]} Array of valid target statuses
 */
export const getValidTransitions = (currentStatus, workType, actorType = ACTOR_TYPES.HUMAN) => {
  if (!isValidStatusForWorkType(currentStatus, workType)) {
    return [];
  }

  const matrix = getTransitionMatrix(workType);
  const allTransitions = matrix[currentStatus] || [];

  if (actorType === ACTOR_TYPES.AGENT) {
    return allTransitions.filter(
      (status) => !AGENT_FORBIDDEN_TRANSITIONS.some((t) => t.to === status)
    );
  }

  return allTransitions;
};

/**
 * Check if a status is terminal (no outgoing transitions)
 *
 * @param {string} status - Status to check
 * @returns {boolean} Whether the status is terminal
 */
export const isTerminalStatus = (status) => {
  return status === STATUSES.ARCHIVED;
};

/**
 * Validate that an actor can own a work item
 *
 * @param {string} workType - Type of work item
 * @param {string} actorType - Type of actor
 * @returns {Object} ValidationResult
 */
export const validateOwnership = (workType, actorType) => {
  // Agents can only own tickets
  if (actorType === ACTOR_TYPES.AGENT) {
    if (workType !== WORK_TYPES.TICKET) {
      return failure(
        CONTRACT_ERROR_CODES.AGENT_CANNOT_OWN,
        `Agents cannot own ${workType}s. Only human roles may own epics and milestones.`
      );
    }
  }

  return success('Ownership is valid');
};
