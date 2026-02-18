---
id: ENG-009
milestone: MS-002
epic: EPIC-000
title: Implement Status Transition Validator
owner: CTO
department: engineering
status: done
priority: critical
requires_approval: true
confidence: 0.95
created: 2026-02-16
updated: 2026-02-16
---

# ENG-009 – Implement Status Transition Validator

## Problem

WRC-OS defines deterministic lifecycle and authority rules, but they are not yet enforced in code.

Without a centralized validation layer:

- Agents may bypass lifecycle rules
- Illegal transitions may be accepted
- Permission logic may fragment across modules
- Escalation behavior may be inconsistent

A single validation engine must enforce lifecycle, ownership, and permission rules.

---

## Objective

Implement a Status Transition Validator module that:

- Validates requested status changes
- Validates actor permissions
- Enforces approval gating
- Enforces transition matrix rules
- Enforces ownership constraints
- Produces deterministic error responses

All state mutations must pass through this validator.

---

## Acceptance Criteria

1. Create a central `validate_transition()` function.
2. Accept inputs:
   - current_status
   - requested_status
   - work_type (epic | milestone | ticket)
   - actor_type (human | agent)
   - actor_role
   - requires_approval
3. Validate transition against:
   - STATUS_TRANSITIONS.md
   - AUTHORITY_MODEL.md
4. Return structured response:
   - allowed: boolean
   - reason: string
   - escalation_required: boolean
5. Reject invalid transitions deterministically.
6. Prevent agent approval or done transitions when not allowed.
7. Unit test all valid and invalid transitions.

---

## Architectural Requirements

- Validator must be stateless.
- No UI logic.
- No side effects.
- No database writes inside validator.
- Pure function with deterministic output.

---

## Example Function Signature (Language Agnostic)

```
validate_transition(context) -> ValidationResult
```

Where:

ValidationResult:

- allowed: bool
- error_code: string | null
- escalation_required: bool

---

## Out of Scope

- Persistence layer
- UI integration
- Agent runtime orchestration
- Notification systems

---

## Dependencies

- ENG-004 – Canonical Status Lifecycle
- ENG-005 – Status Transition Matrix
- ENG-006 – Ownership Model
- ENG-007 – Agent Permission Model

---

## Agent Log

(append-only)

### 2026-02-16 – Claude (agent)

- Implemented `src/utils/statusValidator.js`:
  - `validateTransition()` - Central validation function accepting context object
  - `getValidTransitions()` - Returns valid transitions for a given state/actor
  - `isTerminalStatus()` - Checks if status is terminal (archived)
  - `validateOwnership()` - Validates actor can own work type
  - Exported constants: STATUSES, WORK_TYPES, ACTOR_TYPES, ERROR_CODES
- Enforces:
  - STATUS_TRANSITIONS.md transition matrices (tickets, milestones, epics)
  - AUTHORITY_MODEL.md agent permission restrictions
  - Approval gating for requires_approval = true
  - Terminal state (archived) enforcement
- Created `src/utils/statusValidator.test.js`:
  - 57 unit tests covering all valid/invalid transitions
  - All tests passing
- Pure function, stateless, no side effects
- Moved ticket to `review` status for human approval
- Confidence: 0.95
