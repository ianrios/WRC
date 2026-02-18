import {
  validateTransition,
  getValidTransitions,
  isTerminalStatus,
  validateOwnership,
  STATUSES,
  WORK_TYPES,
  ACTOR_TYPES,
  ERROR_CODES,
} from './statusValidator';

describe('statusValidator', () => {
  describe('validateTransition', () => {
    describe('valid ticket transitions', () => {
      const validTicketTransitions = [
        { from: STATUSES.BACKLOG, to: STATUSES.PLANNED },
        { from: STATUSES.BACKLOG, to: STATUSES.ARCHIVED },
        { from: STATUSES.PLANNED, to: STATUSES.ACTIVE },
        { from: STATUSES.PLANNED, to: STATUSES.BACKLOG },
        { from: STATUSES.ACTIVE, to: STATUSES.BLOCKED },
        { from: STATUSES.ACTIVE, to: STATUSES.REVIEW },
        { from: STATUSES.BLOCKED, to: STATUSES.ACTIVE },
        { from: STATUSES.BLOCKED, to: STATUSES.PLANNED },
        { from: STATUSES.REVIEW, to: STATUSES.APPROVED },
        { from: STATUSES.REVIEW, to: STATUSES.ACTIVE },
        { from: STATUSES.APPROVED, to: STATUSES.DONE },
        { from: STATUSES.DONE, to: STATUSES.ARCHIVED },
      ];

      validTicketTransitions.forEach(({ from, to }) => {
        it(`allows ${from} -> ${to} for tickets (human)`, () => {
          const result = validateTransition({
            currentStatus: from,
            requestedStatus: to,
            workType: WORK_TYPES.TICKET,
            actorType: ACTOR_TYPES.HUMAN,
            actorRole: 'CTO',
            requiresApproval: false,
          });
          expect(result.allowed).toBe(true);
          expect(result.errorCode).toBeNull();
          expect(result.errorCategory).toBeNull();
          expect(result.retryable).toBe(false);
        });
      });
    });

    describe('invalid ticket transitions', () => {
      const invalidTransitions = [
        { from: STATUSES.BACKLOG, to: STATUSES.DONE },
        { from: STATUSES.BACKLOG, to: STATUSES.ACTIVE },
        { from: STATUSES.ACTIVE, to: STATUSES.DONE },
        { from: STATUSES.REVIEW, to: STATUSES.ARCHIVED },
        { from: STATUSES.BLOCKED, to: STATUSES.DONE },
        { from: STATUSES.APPROVED, to: STATUSES.BACKLOG },
        { from: STATUSES.ARCHIVED, to: STATUSES.BACKLOG },
        { from: STATUSES.ARCHIVED, to: STATUSES.ACTIVE },
      ];

      invalidTransitions.forEach(({ from, to }) => {
        it(`rejects ${from} -> ${to} for tickets`, () => {
          const result = validateTransition({
            currentStatus: from,
            requestedStatus: to,
            workType: WORK_TYPES.TICKET,
            actorType: ACTOR_TYPES.HUMAN,
            actorRole: 'CTO',
            requiresApproval: false,
          });
          expect(result.allowed).toBe(false);
          expect(result.errorCode).toBeTruthy();
          expect(result.errorCategory).toBeTruthy();
          expect(result.message).toBeTruthy();
          expect(result.retryable).toBe(false);
        });
      });
    });

    describe('container (epic/milestone) transitions', () => {
      const validContainerTransitions = [
        { from: STATUSES.BACKLOG, to: STATUSES.ACTIVE },
        { from: STATUSES.BACKLOG, to: STATUSES.ARCHIVED },
        { from: STATUSES.ACTIVE, to: STATUSES.DONE },
        { from: STATUSES.ACTIVE, to: STATUSES.BACKLOG },
        { from: STATUSES.DONE, to: STATUSES.ARCHIVED },
      ];

      [WORK_TYPES.EPIC, WORK_TYPES.MILESTONE].forEach((workType) => {
        validContainerTransitions.forEach(({ from, to }) => {
          it(`allows ${from} -> ${to} for ${workType}`, () => {
            const result = validateTransition({
              currentStatus: from,
              requestedStatus: to,
              workType,
              actorType: ACTOR_TYPES.HUMAN,
              actorRole: 'CTO',
              requiresApproval: false,
            });
            expect(result.allowed).toBe(true);
          });
        });

        it(`rejects planned status for ${workType}`, () => {
          const result = validateTransition({
            currentStatus: STATUSES.BACKLOG,
            requestedStatus: STATUSES.PLANNED,
            workType,
            actorType: ACTOR_TYPES.HUMAN,
            actorRole: 'CTO',
            requiresApproval: false,
          });
          expect(result.allowed).toBe(false);
          expect(result.errorCode).toBe(ERROR_CODES.INVALID_STATUS);
        });
      });
    });

    describe('agent permission restrictions', () => {
      it('prevents agents from transitioning to approved', () => {
        const result = validateTransition({
          currentStatus: STATUSES.REVIEW,
          requestedStatus: STATUSES.APPROVED,
          workType: WORK_TYPES.TICKET,
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
          requiresApproval: true,
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(ERROR_CODES.AGENT_NOT_ALLOWED);
        expect(result.errorCategory).toBe('PERMISSION_ERROR');
      });

      it('prevents agents from transitioning to done', () => {
        const result = validateTransition({
          currentStatus: STATUSES.APPROVED,
          requestedStatus: STATUSES.DONE,
          workType: WORK_TYPES.TICKET,
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
          requiresApproval: true,
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(ERROR_CODES.AGENT_NOT_ALLOWED);
      });

      it('prevents agents from transitioning to archived', () => {
        const result = validateTransition({
          currentStatus: STATUSES.DONE,
          requestedStatus: STATUSES.ARCHIVED,
          workType: WORK_TYPES.TICKET,
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
          requiresApproval: false,
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(ERROR_CODES.AGENT_NOT_ALLOWED);
      });

      const agentAllowedTransitions = [
        { from: STATUSES.BACKLOG, to: STATUSES.PLANNED },
        { from: STATUSES.PLANNED, to: STATUSES.ACTIVE },
        { from: STATUSES.PLANNED, to: STATUSES.BACKLOG },
        { from: STATUSES.ACTIVE, to: STATUSES.BLOCKED },
        { from: STATUSES.ACTIVE, to: STATUSES.REVIEW },
        { from: STATUSES.BLOCKED, to: STATUSES.ACTIVE },
        { from: STATUSES.BLOCKED, to: STATUSES.PLANNED },
        { from: STATUSES.REVIEW, to: STATUSES.ACTIVE },
      ];

      agentAllowedTransitions.forEach(({ from, to }) => {
        it(`allows agents to transition ${from} -> ${to}`, () => {
          const result = validateTransition({
            currentStatus: from,
            requestedStatus: to,
            workType: WORK_TYPES.TICKET,
            actorType: ACTOR_TYPES.AGENT,
            actorRole: 'eng-agent-01',
            requiresApproval: false,
          });
          expect(result.allowed).toBe(true);
        });
      });
    });

    describe('approval gating', () => {
      it('requires human for review -> approved when requires_approval is true', () => {
        const result = validateTransition({
          currentStatus: STATUSES.REVIEW,
          requestedStatus: STATUSES.APPROVED,
          workType: WORK_TYPES.TICKET,
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
          requiresApproval: true,
        });
        expect(result.allowed).toBe(false);
        // Agent restriction fires first (agents can never transition to approved)
        expect(result.errorCode).toBe(ERROR_CODES.AGENT_NOT_ALLOWED);
      });

      it('allows human for review -> approved', () => {
        const result = validateTransition({
          currentStatus: STATUSES.REVIEW,
          requestedStatus: STATUSES.APPROVED,
          workType: WORK_TYPES.TICKET,
          actorType: ACTOR_TYPES.HUMAN,
          actorRole: 'CTO',
          requiresApproval: true,
        });
        expect(result.allowed).toBe(true);
      });
    });

    describe('terminal state', () => {
      it('prevents any transition from archived', () => {
        const result = validateTransition({
          currentStatus: STATUSES.ARCHIVED,
          requestedStatus: STATUSES.BACKLOG,
          workType: WORK_TYPES.TICKET,
          actorType: ACTOR_TYPES.HUMAN,
          actorRole: 'CEO',
          requiresApproval: false,
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(ERROR_CODES.TERMINAL_STATE);
        expect(result.escalationRequired).toBe(false);
      });
    });

    describe('invalid inputs', () => {
      it('rejects invalid work type', () => {
        const result = validateTransition({
          currentStatus: STATUSES.BACKLOG,
          requestedStatus: STATUSES.PLANNED,
          workType: 'invalid',
          actorType: ACTOR_TYPES.HUMAN,
          actorRole: 'CTO',
          requiresApproval: false,
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(ERROR_CODES.INVALID_WORK_TYPE);
      });
    });
  });

  describe('getValidTransitions', () => {
    it('returns valid transitions for ticket from backlog', () => {
      const transitions = getValidTransitions(
        STATUSES.BACKLOG,
        WORK_TYPES.TICKET,
        ACTOR_TYPES.HUMAN
      );
      expect(transitions).toContain(STATUSES.PLANNED);
      expect(transitions).toContain(STATUSES.ARCHIVED);
    });

    it('filters out forbidden transitions for agents', () => {
      const transitions = getValidTransitions(
        STATUSES.DONE,
        WORK_TYPES.TICKET,
        ACTOR_TYPES.AGENT
      );
      expect(transitions).not.toContain(STATUSES.ARCHIVED);
      expect(transitions).toHaveLength(0);
    });

    it('returns empty array for invalid status', () => {
      const transitions = getValidTransitions(
        'invalid',
        WORK_TYPES.TICKET,
        ACTOR_TYPES.HUMAN
      );
      expect(transitions).toEqual([]);
    });

    it('returns empty array for archived (terminal)', () => {
      const transitions = getValidTransitions(
        STATUSES.ARCHIVED,
        WORK_TYPES.TICKET,
        ACTOR_TYPES.HUMAN
      );
      expect(transitions).toEqual([]);
    });
  });

  describe('isTerminalStatus', () => {
    it('returns true for archived', () => {
      expect(isTerminalStatus(STATUSES.ARCHIVED)).toBe(true);
    });

    it('returns false for non-terminal statuses', () => {
      expect(isTerminalStatus(STATUSES.DONE)).toBe(false);
      expect(isTerminalStatus(STATUSES.ACTIVE)).toBe(false);
      expect(isTerminalStatus(STATUSES.BACKLOG)).toBe(false);
    });
  });

  describe('validateOwnership', () => {
    it('prevents agents from owning epics', () => {
      const result = validateOwnership(WORK_TYPES.EPIC, ACTOR_TYPES.AGENT);
      expect(result.allowed).toBe(false);
    });

    it('prevents agents from owning milestones', () => {
      const result = validateOwnership(WORK_TYPES.MILESTONE, ACTOR_TYPES.AGENT);
      expect(result.allowed).toBe(false);
    });

    it('allows agents to own tickets', () => {
      const result = validateOwnership(WORK_TYPES.TICKET, ACTOR_TYPES.AGENT);
      expect(result.allowed).toBe(true);
    });

    it('allows humans to own any work type', () => {
      expect(validateOwnership(WORK_TYPES.EPIC, ACTOR_TYPES.HUMAN).allowed).toBe(true);
      expect(validateOwnership(WORK_TYPES.MILESTONE, ACTOR_TYPES.HUMAN).allowed).toBe(true);
      expect(validateOwnership(WORK_TYPES.TICKET, ACTOR_TYPES.HUMAN).allowed).toBe(true);
    });
  });

  describe('ENG-008 contract conformance', () => {
    const CONTRACT_FIELDS = ['allowed', 'errorCode', 'errorCategory', 'message', 'escalationRequired', 'retryable'];

    it('success results contain all contract fields', () => {
      const result = validateTransition({
        currentStatus: STATUSES.BACKLOG,
        requestedStatus: STATUSES.PLANNED,
        workType: WORK_TYPES.TICKET,
        actorType: ACTOR_TYPES.HUMAN,
        actorRole: 'CTO',
        requiresApproval: false,
      });
      CONTRACT_FIELDS.forEach((field) => {
        expect(result).toHaveProperty(field);
      });
    });

    it('failure results contain all contract fields', () => {
      const result = validateTransition({
        currentStatus: STATUSES.BACKLOG,
        requestedStatus: STATUSES.DONE,
        workType: WORK_TYPES.TICKET,
        actorType: ACTOR_TYPES.HUMAN,
        actorRole: 'CTO',
        requiresApproval: false,
      });
      CONTRACT_FIELDS.forEach((field) => {
        expect(result).toHaveProperty(field);
      });
    });

    it('maps TRANSITION_ERROR category for invalid transitions', () => {
      const result = validateTransition({
        currentStatus: STATUSES.BACKLOG,
        requestedStatus: STATUSES.DONE,
        workType: WORK_TYPES.TICKET,
        actorType: ACTOR_TYPES.HUMAN,
        actorRole: 'CTO',
        requiresApproval: false,
      });
      expect(result.errorCategory).toBe('TRANSITION_ERROR');
      expect(result.retryable).toBe(false);
    });

    it('maps SCHEMA_ERROR category for invalid status', () => {
      const result = validateTransition({
        currentStatus: STATUSES.BACKLOG,
        requestedStatus: STATUSES.PLANNED,
        workType: WORK_TYPES.EPIC,
        actorType: ACTOR_TYPES.HUMAN,
        actorRole: 'CTO',
        requiresApproval: false,
      });
      expect(result.errorCategory).toBe('SCHEMA_ERROR');
    });

    it('maps PERMISSION_ERROR category for agent restrictions', () => {
      const result = validateTransition({
        currentStatus: STATUSES.REVIEW,
        requestedStatus: STATUSES.APPROVED,
        workType: WORK_TYPES.TICKET,
        actorType: ACTOR_TYPES.AGENT,
        actorRole: 'eng-agent-01',
        requiresApproval: false,
      });
      expect(result.errorCategory).toBe('PERMISSION_ERROR');
    });

    it('agent restriction fires before approval gating (PERMISSION_ERROR)', () => {
      // When an agent tries review->approved with requiresApproval=true,
      // the agent forbidden check fires first (agents can never go to approved)
      const result = validateTransition({
        currentStatus: STATUSES.REVIEW,
        requestedStatus: STATUSES.APPROVED,
        workType: WORK_TYPES.TICKET,
        actorType: ACTOR_TYPES.AGENT,
        actorRole: 'eng-agent-01',
        requiresApproval: true,
      });
      expect(result.errorCode).toBe(ERROR_CODES.AGENT_NOT_ALLOWED);
      expect(result.errorCategory).toBe('PERMISSION_ERROR');
    });

    it('all failures are non-retryable', () => {
      const failures = [
        { currentStatus: STATUSES.BACKLOG, requestedStatus: STATUSES.DONE, workType: WORK_TYPES.TICKET },
        { currentStatus: STATUSES.ARCHIVED, requestedStatus: STATUSES.BACKLOG, workType: WORK_TYPES.TICKET },
      ];
      failures.forEach((ctx) => {
        const result = validateTransition({
          ...ctx,
          actorType: ACTOR_TYPES.HUMAN,
          actorRole: 'CTO',
          requiresApproval: false,
        });
        expect(result.retryable).toBe(false);
      });
    });
  });
});
