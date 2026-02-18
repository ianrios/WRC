import {
  validateOwnership,
  validatePermissions,
  validateMutation,
  canReassignOwnership,
  getModifiableFields,
  DEPARTMENTS,
  PERMISSION_ERROR_CODES,
} from './permissionGuard';
import { WORK_TYPES, ACTOR_TYPES, HUMAN_ROLES } from './statusValidator';

describe('permissionGuard', () => {
  describe('validateOwnership', () => {
    describe('work type restrictions', () => {
      it('allows humans to own epics', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.EPIC,
          proposedOwner: HUMAN_ROLES.CTO,
          proposedOwnerType: ACTOR_TYPES.HUMAN,
          department: DEPARTMENTS.ENGINEERING,
        });
        expect(result.allowed).toBe(true);
      });

      it('allows humans to own milestones', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.MILESTONE,
          proposedOwner: HUMAN_ROLES.CTO,
          proposedOwnerType: ACTOR_TYPES.HUMAN,
          department: DEPARTMENTS.ENGINEERING,
        });
        expect(result.allowed).toBe(true);
      });

      it('allows humans to own tickets', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.TICKET,
          proposedOwner: HUMAN_ROLES.CTO,
          proposedOwnerType: ACTOR_TYPES.HUMAN,
          department: DEPARTMENTS.ENGINEERING,
        });
        expect(result.allowed).toBe(true);
      });

      it('prevents agents from owning epics', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.EPIC,
          proposedOwner: 'eng-agent-01',
          proposedOwnerType: ACTOR_TYPES.AGENT,
          department: DEPARTMENTS.ENGINEERING,
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.AGENT_CANNOT_OWN);
      });

      it('prevents agents from owning milestones', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.MILESTONE,
          proposedOwner: 'eng-agent-01',
          proposedOwnerType: ACTOR_TYPES.AGENT,
          department: DEPARTMENTS.ENGINEERING,
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.AGENT_CANNOT_OWN);
      });

      it('allows agents to own tickets', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.TICKET,
          proposedOwner: 'eng-agent-01',
          proposedOwnerType: ACTOR_TYPES.AGENT,
          department: DEPARTMENTS.ENGINEERING,
        });
        expect(result.allowed).toBe(true);
      });
    });

    describe('department constraints', () => {
      it('allows CTO to own engineering work', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.TICKET,
          proposedOwner: HUMAN_ROLES.CTO,
          proposedOwnerType: ACTOR_TYPES.HUMAN,
          department: DEPARTMENTS.ENGINEERING,
        });
        expect(result.allowed).toBe(true);
      });

      it('prevents CTO from owning marketing work', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.TICKET,
          proposedOwner: HUMAN_ROLES.CTO,
          proposedOwnerType: ACTOR_TYPES.HUMAN,
          department: DEPARTMENTS.MARKETING,
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.DEPARTMENT_MISMATCH);
      });

      it('allows CEO to own any department work', () => {
        const departments = [DEPARTMENTS.ENGINEERING, DEPARTMENTS.MARKETING, DEPARTMENTS.OPS];
        departments.forEach((dept) => {
          const result = validateOwnership({
            workType: WORK_TYPES.TICKET,
            proposedOwner: HUMAN_ROLES.CEO,
            proposedOwnerType: ACTOR_TYPES.HUMAN,
            department: dept,
          });
          expect(result.allowed).toBe(true);
        });
      });

      it('validates agent department from ID prefix', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.TICKET,
          proposedOwner: 'eng-agent-01',
          proposedOwnerType: ACTOR_TYPES.AGENT,
          department: DEPARTMENTS.ENGINEERING,
        });
        expect(result.allowed).toBe(true);
      });

      it('prevents agent from wrong department', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.TICKET,
          proposedOwner: 'marketing-agent-01',
          proposedOwnerType: ACTOR_TYPES.AGENT,
          department: DEPARTMENTS.ENGINEERING,
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.DEPARTMENT_MISMATCH);
      });
    });

    describe('invalid inputs', () => {
      it('rejects invalid work type', () => {
        const result = validateOwnership({
          workType: 'invalid',
          proposedOwner: HUMAN_ROLES.CTO,
          proposedOwnerType: ACTOR_TYPES.HUMAN,
          department: DEPARTMENTS.ENGINEERING,
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.INVALID_WORK_TYPE);
      });

      it('rejects invalid department', () => {
        const result = validateOwnership({
          workType: WORK_TYPES.TICKET,
          proposedOwner: HUMAN_ROLES.CTO,
          proposedOwnerType: ACTOR_TYPES.HUMAN,
          department: 'invalid',
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.INVALID_DEPARTMENT);
      });
    });
  });

  describe('validatePermissions', () => {
    const baseContext = {
      workType: WORK_TYPES.TICKET,
      currentState: {
        id: 'ENG-001',
        status: 'active',
        owner: 'CTO',
        department: 'engineering',
        priority: 'high',
        confidence: 0.5,
        updated: '2026-02-15',
        agent_log: '## Log\n',
      },
      department: DEPARTMENTS.ENGINEERING,
    };

    describe('immutable fields', () => {
      const immutableFields = ['id', 'epic', 'milestone', 'created', 'department'];

      immutableFields.forEach((field) => {
        it(`prevents modification of immutable field: ${field}`, () => {
          const result = validatePermissions({
            ...baseContext,
            proposedChanges: { [field]: 'new-value' },
            actorType: ACTOR_TYPES.HUMAN,
            actorRole: HUMAN_ROLES.CEO,
          });
          expect(result.allowed).toBe(false);
          expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.IMMUTABLE_FIELD);
        });
      });

      it('allows no-op changes to immutable fields', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { id: 'ENG-001' }, // Same value
          actorType: ACTOR_TYPES.HUMAN,
          actorRole: HUMAN_ROLES.CEO,
        });
        expect(result.allowed).toBe(true);
      });
    });

    describe('agent field restrictions', () => {
      it('allows agents to modify status', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { status: 'review' },
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
        });
        expect(result.allowed).toBe(true);
      });

      it('allows agents to modify confidence', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { confidence: 0.8 },
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
        });
        expect(result.allowed).toBe(true);
      });

      it('allows agents to modify updated', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { updated: '2026-02-16' },
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
        });
        expect(result.allowed).toBe(true);
      });

      it('prevents agents from modifying owner', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { owner: 'eng-agent-01' },
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.FIELD_NOT_ALLOWED);
      });

      it('prevents agents from modifying priority', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { priority: 'critical' },
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.FIELD_NOT_ALLOWED);
      });

      it('prevents agents from modifying requires_approval', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { requires_approval: false },
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.FIELD_NOT_ALLOWED);
      });
    });

    describe('agent log append-only', () => {
      it('allows agents to append to agent_log', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { agent_log: '## Log\n\n### New Entry\nContent' },
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
        });
        expect(result.allowed).toBe(true);
      });

      it('prevents agents from rewriting agent_log', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { agent_log: 'Completely new content' },
          actorType: ACTOR_TYPES.AGENT,
          actorRole: 'eng-agent-01',
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.APPEND_ONLY_VIOLATION);
      });
    });

    describe('human permissions', () => {
      it('allows humans to modify owner (same department)', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { owner: 'CEO' }, // CEO can own engineering
          actorType: ACTOR_TYPES.HUMAN,
          actorRole: HUMAN_ROLES.CEO,
        });
        expect(result.allowed).toBe(true);
      });

      it('allows humans to modify priority', () => {
        const result = validatePermissions({
          ...baseContext,
          proposedChanges: { priority: 'critical' },
          actorType: ACTOR_TYPES.HUMAN,
          actorRole: HUMAN_ROLES.CTO,
        });
        expect(result.allowed).toBe(true);
      });
    });

    describe('department access', () => {
      it('prevents actors from modifying items outside their department', () => {
        const result = validatePermissions({
          ...baseContext,
          department: DEPARTMENTS.MARKETING,
          proposedChanges: { status: 'review' },
          actorType: ACTOR_TYPES.HUMAN,
          actorRole: HUMAN_ROLES.CTO, // CTO is engineering
        });
        expect(result.allowed).toBe(false);
        expect(result.errorCode).toBe(PERMISSION_ERROR_CODES.DEPARTMENT_MISMATCH);
      });

      it('allows CEO to modify any department', () => {
        const result = validatePermissions({
          ...baseContext,
          department: DEPARTMENTS.MARKETING,
          proposedChanges: { status: 'review' },
          actorType: ACTOR_TYPES.HUMAN,
          actorRole: HUMAN_ROLES.CEO,
        });
        expect(result.allowed).toBe(true);
      });
    });
  });

  describe('canReassignOwnership', () => {
    it('prevents agents from reassigning', () => {
      const result = canReassignOwnership(
        'eng-agent-01',
        ACTOR_TYPES.AGENT,
        DEPARTMENTS.ENGINEERING
      );
      expect(result.allowed).toBe(false);
    });

    it('allows CEO to reassign any work item', () => {
      const departments = [DEPARTMENTS.ENGINEERING, DEPARTMENTS.MARKETING, DEPARTMENTS.OPS];
      departments.forEach((dept) => {
        const result = canReassignOwnership(HUMAN_ROLES.CEO, ACTOR_TYPES.HUMAN, dept);
        expect(result.allowed).toBe(true);
      });
    });

    it('allows CTO to reassign within engineering', () => {
      const result = canReassignOwnership(
        HUMAN_ROLES.CTO,
        ACTOR_TYPES.HUMAN,
        DEPARTMENTS.ENGINEERING
      );
      expect(result.allowed).toBe(true);
    });

    it('prevents CTO from reassigning marketing items', () => {
      const result = canReassignOwnership(
        HUMAN_ROLES.CTO,
        ACTOR_TYPES.HUMAN,
        DEPARTMENTS.MARKETING
      );
      expect(result.allowed).toBe(false);
    });
  });

  describe('getModifiableFields', () => {
    it('returns limited fields for agents', () => {
      const fields = getModifiableFields(ACTOR_TYPES.AGENT);
      expect(fields).toContain('status');
      expect(fields).toContain('confidence');
      expect(fields).toContain('updated');
      expect(fields).toContain('agent_log');
      expect(fields).not.toContain('owner');
      expect(fields).not.toContain('priority');
    });

    it('returns more fields for humans', () => {
      const fields = getModifiableFields(ACTOR_TYPES.HUMAN);
      expect(fields).toContain('status');
      expect(fields).toContain('confidence');
      expect(fields).toContain('owner');
      expect(fields).toContain('priority');
      expect(fields).toContain('title');
    });
  });

  describe('validateMutation', () => {
    it('validates complete mutation with field and ownership checks', () => {
      const result = validateMutation({
        workType: WORK_TYPES.TICKET,
        currentState: {
          id: 'ENG-001',
          status: 'active',
          owner: 'CTO',
          confidence: 0.5,
        },
        proposedChanges: {
          status: 'review',
          confidence: 0.8,
        },
        actorType: ACTOR_TYPES.AGENT,
        actorRole: 'eng-agent-01',
        department: DEPARTMENTS.ENGINEERING,
      });
      expect(result.allowed).toBe(true);
    });

    it('rejects mutation when agent tries to reassign owner', () => {
      const result = validateMutation({
        workType: WORK_TYPES.TICKET,
        currentState: {
          id: 'ENG-001',
          status: 'active',
          owner: 'CTO',
        },
        proposedChanges: {
          owner: 'CMO',
        },
        actorType: ACTOR_TYPES.AGENT,
        actorRole: 'eng-agent-01',
        department: DEPARTMENTS.ENGINEERING,
      });
      expect(result.allowed).toBe(false);
    });
  });

  describe('ENG-008 contract conformance', () => {
    const CONTRACT_FIELDS = ['allowed', 'errorCode', 'errorCategory', 'message', 'escalationRequired', 'retryable'];

    it('validateOwnership success conforms to contract', () => {
      const result = validateOwnership({
        workType: WORK_TYPES.TICKET,
        proposedOwner: HUMAN_ROLES.CTO,
        proposedOwnerType: ACTOR_TYPES.HUMAN,
        department: DEPARTMENTS.ENGINEERING,
      });
      CONTRACT_FIELDS.forEach((field) => {
        expect(result).toHaveProperty(field);
      });
      expect(result.retryable).toBe(false);
    });

    it('validateOwnership failure conforms to contract', () => {
      const result = validateOwnership({
        workType: WORK_TYPES.EPIC,
        proposedOwner: 'eng-agent-01',
        proposedOwnerType: ACTOR_TYPES.AGENT,
        department: DEPARTMENTS.ENGINEERING,
      });
      CONTRACT_FIELDS.forEach((field) => {
        expect(result).toHaveProperty(field);
      });
      expect(result.errorCategory).toBe('PERMISSION_ERROR');
      expect(result.retryable).toBe(false);
    });

    it('validatePermissions failure includes errorCategory and message', () => {
      const result = validatePermissions({
        workType: WORK_TYPES.TICKET,
        currentState: { id: 'ENG-001', priority: 'high' },
        proposedChanges: { priority: 'critical' },
        actorType: ACTOR_TYPES.AGENT,
        actorRole: 'eng-agent-01',
        department: DEPARTMENTS.ENGINEERING,
      });
      expect(result.allowed).toBe(false);
      expect(result.errorCategory).toBe('PERMISSION_ERROR');
      expect(result.message).toBeTruthy();
      expect(result.retryable).toBe(false);
    });

    it('validatePermissions success includes contract fields', () => {
      const result = validatePermissions({
        workType: WORK_TYPES.TICKET,
        currentState: { status: 'active', confidence: 0.5 },
        proposedChanges: { confidence: 0.8 },
        actorType: ACTOR_TYPES.AGENT,
        actorRole: 'eng-agent-01',
        department: DEPARTMENTS.ENGINEERING,
      });
      CONTRACT_FIELDS.forEach((field) => {
        expect(result).toHaveProperty(field);
      });
    });

    it('immutable field errors map to PERMISSION_ERROR category', () => {
      const result = validatePermissions({
        workType: WORK_TYPES.TICKET,
        currentState: { id: 'ENG-001' },
        proposedChanges: { id: 'ENG-999' },
        actorType: ACTOR_TYPES.HUMAN,
        actorRole: HUMAN_ROLES.CEO,
        department: DEPARTMENTS.ENGINEERING,
      });
      expect(result.errorCategory).toBe('PERMISSION_ERROR');
    });

    it('all failures are non-retryable', () => {
      const result = validateOwnership({
        workType: 'invalid',
        proposedOwner: HUMAN_ROLES.CTO,
        proposedOwnerType: ACTOR_TYPES.HUMAN,
        department: DEPARTMENTS.ENGINEERING,
      });
      expect(result.retryable).toBe(false);
    });
  });
});
