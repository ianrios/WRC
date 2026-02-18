/**
 * WRC-OS Ownership and Permission Guard
 *
 * Enforces ownership and field-level permission rules defined in:
 * - /ops/AUTHORITY_MODEL.md
 *
 * All field mutations must pass through this guard before persistence.
 * Conforms to ENG-008 Validation Response Contract.
 */

import {
  WORK_TYPES,
  ACTOR_TYPES,
  HUMAN_ROLES,
} from './statusValidator';

import {
  ERROR_CODES,
  success,
  failure,
} from './validationContract';

// Departments
export const DEPARTMENTS = {
  ENGINEERING: 'engineering',
  MARKETING: 'marketing',
  OPS: 'ops',
};

// Re-export permission error codes from contract for backwards compatibility
export const PERMISSION_ERROR_CODES = {
  INVALID_OWNER_TYPE: ERROR_CODES.INVALID_OWNER_TYPE,
  AGENT_CANNOT_OWN: ERROR_CODES.AGENT_CANNOT_OWN,
  DEPARTMENT_MISMATCH: ERROR_CODES.DEPARTMENT_MISMATCH,
  FIELD_NOT_ALLOWED: ERROR_CODES.FIELD_NOT_ALLOWED,
  IMMUTABLE_FIELD: ERROR_CODES.IMMUTABLE_FIELD,
  INVALID_DEPARTMENT: ERROR_CODES.INVALID_DEPARTMENT,
  INVALID_WORK_TYPE: ERROR_CODES.INVALID_WORK_TYPE,
  APPEND_ONLY_VIOLATION: ERROR_CODES.APPEND_ONLY_VIOLATION,
};

// Fields that are immutable (no one can change)
const IMMUTABLE_FIELDS = ['id', 'epic', 'milestone', 'created', 'department'];

// Fields that only humans can modify
const HUMAN_ONLY_FIELDS = ['owner', 'priority', 'requires_approval'];

// Fields that agents can modify
const AGENT_ALLOWED_FIELDS = ['status', 'confidence', 'updated', 'agent_log'];

// Role to department mapping
const ROLE_DEPARTMENTS = {
  [HUMAN_ROLES.CEO]: null, // CEO can access all departments
  [HUMAN_ROLES.CTO]: DEPARTMENTS.ENGINEERING,
  [HUMAN_ROLES.CMO]: DEPARTMENTS.MARKETING,
  [HUMAN_ROLES.COO]: DEPARTMENTS.OPS,
  [HUMAN_ROLES.CFO]: null, // Future role
};

/**
 * Check if a role belongs to a department (or has cross-department access)
 */
const roleMatchesDepartment = (role, department) => {
  // CEO has access to all departments
  if (role === HUMAN_ROLES.CEO) {
    return true;
  }

  const roleDepartment = ROLE_DEPARTMENTS[role];

  // If role has no department mapping, check if it's an agent
  if (roleDepartment === undefined) {
    // Agent IDs should contain department prefix
    if (role && role.includes('-')) {
      const prefix = role.split('-')[0];
      return prefix === 'eng' && department === DEPARTMENTS.ENGINEERING ||
             prefix === 'marketing' && department === DEPARTMENTS.MARKETING ||
             prefix === 'ops' && department === DEPARTMENTS.OPS;
    }
    return false;
  }

  // Null means cross-department access
  if (roleDepartment === null) {
    return true;
  }

  return roleDepartment === department;
};

/**
 * Check if an actor can own a work item of a given type
 */
const canOwnWorkType = (workType, actorType) => {
  // Agents can only own tickets
  if (actorType === ACTOR_TYPES.AGENT) {
    return workType === WORK_TYPES.TICKET;
  }
  // Humans can own any work type
  return true;
};

/**
 * Check if an actor can modify a specific field
 */
const canModifyField = (field, actorType, currentValue, newValue) => {
  // Immutable fields cannot be changed by anyone
  if (IMMUTABLE_FIELDS.includes(field)) {
    if (currentValue === newValue) {
      return { allowed: true };
    }
    return failure(PERMISSION_ERROR_CODES.IMMUTABLE_FIELD, `Field '${field}' is immutable and cannot be modified`);
  }

  // Agent-specific restrictions
  if (actorType === ACTOR_TYPES.AGENT) {
    // Human-only fields
    if (HUMAN_ONLY_FIELDS.includes(field)) {
      if (currentValue === newValue) {
        return { allowed: true };
      }
      return failure(PERMISSION_ERROR_CODES.FIELD_NOT_ALLOWED, `Agents cannot modify field '${field}'`);
    }

    // Agent log is append-only
    if (field === 'agent_log') {
      if (typeof currentValue === 'string' && typeof newValue === 'string') {
        if (!newValue.startsWith(currentValue)) {
          return failure(PERMISSION_ERROR_CODES.APPEND_ONLY_VIOLATION, 'Agent log is append-only. New content must extend existing content.');
        }
      }
    }

    // Check if field is in allowed list
    if (!AGENT_ALLOWED_FIELDS.includes(field)) {
      if (currentValue === newValue) {
        return { allowed: true };
      }
      return failure(PERMISSION_ERROR_CODES.FIELD_NOT_ALLOWED, `Agents cannot modify field '${field}'`);
    }
  }

  return { allowed: true };
};

/**
 * Validate ownership assignment
 *
 * @param {Object} context - Validation context
 * @param {string} context.workType - Type of work item
 * @param {string} context.proposedOwner - Proposed owner role/id
 * @param {string} context.proposedOwnerType - Type of proposed owner (human | agent)
 * @param {string} context.department - Department of the work item
 *
 * @returns {Object} ValidationResult
 */
export const validateOwnership = (context) => {
  const { workType, proposedOwner, proposedOwnerType, department } = context;

  // Validate work type
  if (!Object.values(WORK_TYPES).includes(workType)) {
    return failure(PERMISSION_ERROR_CODES.INVALID_WORK_TYPE, `Invalid work type: ${workType}`);
  }

  // Validate department
  if (!Object.values(DEPARTMENTS).includes(department)) {
    return failure(PERMISSION_ERROR_CODES.INVALID_DEPARTMENT, `Invalid department: ${department}`);
  }

  // Check if actor type can own this work type
  if (!canOwnWorkType(workType, proposedOwnerType)) {
    return failure(PERMISSION_ERROR_CODES.AGENT_CANNOT_OWN, `Agents cannot own ${workType}s. Only human roles may own epics and milestones.`);
  }

  // Check department alignment
  if (!roleMatchesDepartment(proposedOwner, department)) {
    return failure(PERMISSION_ERROR_CODES.DEPARTMENT_MISMATCH, `Owner '${proposedOwner}' does not belong to department '${department}'`);
  }

  return success('Ownership assignment is valid');
};

/**
 * Validate field-level permissions for a mutation
 *
 * @param {Object} context - Validation context
 * @param {string} context.workType - Type of work item
 * @param {Object} context.currentState - Current state of the work item
 * @param {Object} context.proposedChanges - Proposed changes (field: newValue)
 * @param {string} context.actorType - Type of actor (human | agent)
 * @param {string} context.actorRole - Role of the actor
 * @param {string} context.department - Department of the work item
 *
 * @returns {Object} ValidationResult
 */
export const validatePermissions = (context) => {
  const {
    workType,
    currentState,
    proposedChanges,
    actorType,
    actorRole,
    department,
  } = context;

  // Validate work type
  if (!Object.values(WORK_TYPES).includes(workType)) {
    return {
      ...failure(PERMISSION_ERROR_CODES.INVALID_WORK_TYPE, `Invalid work type: ${workType}`),
      fieldErrors: {},
    };
  }

  // Check department access
  if (!roleMatchesDepartment(actorRole, department)) {
    return {
      ...failure(PERMISSION_ERROR_CODES.DEPARTMENT_MISMATCH, `Actor '${actorRole}' cannot modify items in department '${department}'`),
      fieldErrors: {},
    };
  }

  // Validate each proposed change
  const fieldErrors = {};
  let hasError = false;

  for (const [field, newValue] of Object.entries(proposedChanges)) {
    const currentValue = currentState[field];
    const result = canModifyField(field, actorType, currentValue, newValue);

    if (!result.allowed) {
      fieldErrors[field] = result;
      hasError = true;
    }
  }

  // Check ownership change specifically
  if (proposedChanges.owner && proposedChanges.owner !== currentState.owner) {
    const ownershipResult = validateOwnership({
      workType,
      proposedOwner: proposedChanges.owner,
      proposedOwnerType: proposedChanges.owner_type || ACTOR_TYPES.HUMAN,
      department,
    });

    if (!ownershipResult.allowed) {
      fieldErrors.owner = ownershipResult;
      hasError = true;
    }
  }

  if (hasError) {
    const firstError = Object.values(fieldErrors)[0];
    return {
      ...failure(firstError.errorCode, firstError.message),
      fieldErrors,
    };
  }

  return {
    ...success('All field mutations are allowed'),
    fieldErrors: {},
  };
};

/**
 * Check if an actor can reassign ownership
 *
 * @param {string} actorRole - Role attempting reassignment
 * @param {string} actorType - Type of actor
 * @param {string} targetDepartment - Department of the work item
 * @returns {Object} ValidationResult
 */
export const canReassignOwnership = (actorRole, actorType, targetDepartment) => {
  // Agents cannot reassign ownership
  if (actorType === ACTOR_TYPES.AGENT) {
    return {
      allowed: false,
      reason: 'Agents cannot reassign ownership',
    };
  }

  // CEO can reassign any work item
  if (actorRole === HUMAN_ROLES.CEO) {
    return {
      allowed: true,
      reason: 'CEO has full reassignment authority',
    };
  }

  // Department heads can reassign within their department
  if (roleMatchesDepartment(actorRole, targetDepartment)) {
    return {
      allowed: true,
      reason: `${actorRole} can reassign within ${targetDepartment}`,
    };
  }

  return {
    allowed: false,
    reason: `${actorRole} cannot reassign work items in ${targetDepartment}`,
  };
};

/**
 * Get list of fields an actor can modify
 *
 * @param {string} actorType - Type of actor
 * @returns {string[]} List of modifiable field names
 */
export const getModifiableFields = (actorType) => {
  if (actorType === ACTOR_TYPES.AGENT) {
    return [...AGENT_ALLOWED_FIELDS];
  }

  // Humans can modify all non-immutable fields
  return [
    ...AGENT_ALLOWED_FIELDS,
    ...HUMAN_ONLY_FIELDS,
    'title', // Humans can modify title
  ];
};

/**
 * Validate a complete work item mutation request
 * Combines ownership and field permission checks
 *
 * @param {Object} context - Full mutation context
 * @returns {Object} Combined validation result
 */
export const validateMutation = (context) => {
  const {
    workType,
    currentState,
    proposedChanges,
    actorType,
    actorRole,
    department,
  } = context;

  // First validate field permissions
  const permissionResult = validatePermissions(context);
  if (!permissionResult.allowed) {
    return permissionResult;
  }

  // If owner is being changed, validate the new ownership
  if (proposedChanges.owner && proposedChanges.owner !== currentState.owner) {
    const reassignResult = canReassignOwnership(actorRole, actorType, department);
    if (!reassignResult.allowed) {
      return {
        ...failure(PERMISSION_ERROR_CODES.FIELD_NOT_ALLOWED, reassignResult.reason),
        fieldErrors: { owner: reassignResult },
      };
    }
  }

  return {
    ...success('Mutation is allowed'),
    fieldErrors: {},
  };
};
