---
id: ENG-005
milestone: MS-001
epic: EPIC-000
title: Define Status Transition Matrix
owner: CTO
department: engineering
status: done
priority: critical
requires_approval: true
confidence: 0.95
created: 2026-02-16
updated: 2026-02-16
---

# ENG-005 – Define Status Transition Matrix

## Problem

Statuses exist, but without a formally defined transition matrix:

- Work items may skip lifecycle steps.
- Agents may move items directly to `done`.
- UI behavior may encode illegal transitions.
- Automation may bypass trust boundaries.

A deterministic transition matrix must define which status changes are allowed for each work type.

---

## Context

ENG-004 defined the canonical status vocabulary.

This ticket defines:

- Valid transitions per work type (Epic, Milestone, Ticket)
- Invalid transitions
- Approval gating rules
- Reversion rules (if any)

This matrix will be enforced by code in the Status Transition Validator.

---

## Acceptance Criteria

1. Define allowed transitions for Tickets.
2. Define allowed transitions for Milestones.
3. Define allowed transitions for Epics.
4. Define whether backward transitions are allowed.
5. Define approval gating requirements.
6. Document final matrix in `/ops/STATUS_TRANSITIONS.md`.
7. Confirm matrix supports both engineering and marketing workflows.

---

## Transition Matrix – Tickets

| From     | Allowed To        |
| -------- | ----------------- |
| backlog  | planned, archived |
| planned  | active, backlog   |
| active   | blocked, review   |
| blocked  | active, planned   |
| review   | approved, active  |
| approved | done              |
| done     | archived          |
| archived | (none)            |

### Rules

- No skipping intermediate states.
- No direct transition to `done` except from `approved`.
- `archived` is terminal.

---

## Transition Matrix – Milestones

| From     | Allowed To       |
| -------- | ---------------- |
| backlog  | active, archived |
| active   | done, backlog    |
| done     | archived         |
| archived | (none)           |

Milestones do not use granular workflow states.

---

## Transition Matrix – Epics

| From     | Allowed To       |
| -------- | ---------------- |
| backlog  | active, archived |
| active   | done, backlog    |
| done     | archived         |
| archived | (none)           |

Epics reflect aggregate progress and may move back to `backlog` if reopened.

---

## Approval Gating Rules

For Tickets:

If `requires_approval = true`:

- Only a human role may transition:
  - review → approved
  - approved → done

Agents may:

- Move work to `review`
- Move work back to `active` if review fails
- Never self-approve unless explicitly delegated in authority model

Milestones and Epics:

- May be marked `done` only if all child items are `done` or `archived`.
- Enforcement implemented in validator layer (future ticket).

---

## Design Constraints

- Transition rules are deterministic.
- No dynamic transitions.
- No department-specific overrides.
- No implicit transitions based on time or activity.

---

## Out of Scope

- Permission model (ENG-006, ENG-007)
- Implementation logic
- UI behavior

---

## Dependencies

- ENG-004 – Canonical Status Lifecycle

---

## Agent Log

(append-only)

### 2026-02-16 – Claude (agent)

- Updated STATUS_TRANSITIONS.md with complete transition matrices:
  - Tickets: 8-state full lifecycle
  - Milestones: 4-state container lifecycle
  - Epics: 4-state container lifecycle
- Added explicit backward transition rules table
- Expanded invalid transitions examples
- Added approval gating rules per work type
- Added child completion constraint for Milestones/Epics
- Moved ticket to `review` status for human approval
- Confidence: 0.95
