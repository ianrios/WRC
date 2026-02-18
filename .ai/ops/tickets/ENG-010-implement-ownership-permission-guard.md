---
id: ENG-010
milestone: MS-002
epic: EPIC-000
title: Implement Ownership and Permission Guard
owner: CTO
department: engineering
status: done
priority: critical
requires_approval: true
confidence: 0.95
created: 2026-02-16
updated: 2026-02-16
---

# ENG-010 – Implement Ownership and Permission Guard

## Problem

Ownership and agent permission rules are defined in policy but not yet enforced in code.

Without a centralized guard:

- Invalid owners may be assigned
- Agents may mutate restricted fields
- Department boundaries may be violated
- Escalation logic may be inconsistent

Ownership and permission enforcement must be centralized and deterministic.

---

## Objective

Implement a centralized guard module that validates:

- Ownership correctness by work type
- Department alignment
- Agent field-level permissions
- Delegation constraints
- Escalation triggers

All mutation attempts must pass through this guard before persistence.

---

## Acceptance Criteria

1. Implement a pure `validate_permissions()` function.
2. Accept inputs:
   - work_type (epic | milestone | ticket)
   - current_owner
   - proposed_changes
   - actor_type (human | agent)
   - actor_role
   - department
3. Enforce rules defined in:
   - AUTHORITY_MODEL.md
4. Reject invalid mutations deterministically.
5. Return structured response:
   - allowed: boolean
   - reason: string
   - escalation_required: boolean
6. Unit test all allowed and disallowed mutations.

---

## Architectural Requirements

- Stateless
- No file or database writes
- No UI logic
- Centralized enforcement
- Deterministic output

---

## Out of Scope

- Status transitions (ENG-009)
- Persistence layer
- UI integration
- Agent orchestration

---

## Dependencies

- ENG-006 – Ownership Model
- ENG-007 – Agent Permission Model

---

## Agent Log

(append-only)

### 2026-02-16 – Claude (agent)

- Implemented `src/utils/permissionGuard.js`:
  - `validateOwnership()` - Validates actor can own work type with department alignment
  - `validatePermissions()` - Validates field-level mutations by actor type
  - `validateMutation()` - Combined ownership + field permission check
  - `canReassignOwnership()` - Checks if actor can reassign ownership
  - `getModifiableFields()` - Returns list of fields actor can modify
  - Exported constants: DEPARTMENTS, PERMISSION_ERROR_CODES
- Enforces:
  - Work type ownership restrictions (agents = tickets only)
  - Department alignment (owner must match department)
  - Immutable fields (id, epic, milestone, created, department)
  - Agent field restrictions (cannot modify owner, priority, requires_approval)
  - Agent log append-only enforcement
- Created `src/utils/permissionGuard.test.js`:
  - 39 unit tests covering all permission scenarios
  - All tests passing
- Pure function, stateless, no side effects
- Moved ticket to `review` status for human approval
- Confidence: 0.95
