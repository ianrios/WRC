# WRC-OS Status Transition Matrix

This document defines the canonical lifecycle states for all work items and the valid transitions between them.

No UI or agent may bypass these rules.

---

## Canonical Statuses

| Status   | Meaning                          |
| -------- | -------------------------------- |
| backlog  | Defined but not yet planned      |
| planned  | Approved to be worked on next    |
| active   | Currently in progress            |
| blocked  | Cannot proceed due to dependency |
| review   | Awaiting human or agent review   |
| approved | Approved to move forward         |
| done     | Completed and verified           |
| archived | No longer active or relevant     |

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

Milestones do not use granular workflow states (`planned`, `blocked`, `review`, `approved`).

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

## Backward Transitions

Backward transitions are allowed in specific cases:

| Transition          | Allowed | Reason                                |
| ------------------- | ------- | ------------------------------------- |
| planned → backlog   | ✓       | Deprioritization                      |
| active → backlog    | —       | Must go through planned first         |
| blocked → planned   | ✓       | Dependency resolved, reprioritized    |
| blocked → active    | ✓       | Dependency resolved, resume work      |
| review → active     | ✓       | Rework required                       |
| done → active       | —       | Not allowed; create new ticket        |
| archived → any      | —       | Terminal state                        |

For Epics and Milestones:
- `active → backlog` is allowed (project deprioritized/paused).

---

## Invalid Transitions (Examples)

- backlog → done
- backlog → active (must go through planned)
- active → done (must go through review → approved)
- review → archived
- blocked → done
- approved → backlog
- archived → any

Invalid transitions must be rejected with an explicit error.

---

## Approval Gating Rules

### Tickets

If `requires_approval = true`:

- Only a human role may transition:
  - review → approved
  - approved → done

Agents may:

- Move work to `review`
- Move work back to `active` if review fails
- Never self-approve unless explicitly delegated in authority model

### Milestones and Epics

- May be marked `done` only if all child items are `done` or `archived`.
- Enforcement implemented in validator layer.

---

## Agent Permissions

Agents may:

- Propose status transitions
- Execute allowed transitions within permissions
- Log attempted transitions

Agents may not:

- Skip lifecycle steps
- Force invalid transitions
- Modify lifecycle rules

---

## Audit Requirements

All status transitions must:

- Be logged with timestamp
- Include actor (human or agent)
- Include confidence score if agent-initiated

---

## Design Principle

Status transitions encode trust.

If a transition feels unsafe to automate, it should not exist.
