# WRC-OS Ownership and Agent Permission Model

This document defines authority, responsibility, and write permissions within WRC-OS.

The goal is to prevent uncontrolled agent behavior and enforce deterministic system rules.

---

# 1. Ownership Model

## Definition

The `owner` of a work item is the **accountable authority** responsible for ensuring the work is completed, reviewed, and closed.

Ownership implies responsibility, not authorship or execution.

Every work item must define:

- owner (role or agent-id)
- department
- requires_approval (boolean)

## Ownership by Work Type

| Work Type | Valid Owners        | Notes                               |
| --------- | ------------------- | ----------------------------------- |
| Epic      | Human roles only    | Strategic accountability            |
| Milestone | Human roles only    | Typically department head           |
| Ticket    | Human roles, Agents | Agents only if explicitly delegated |

Agents may not own Epics or Milestones.

## Departmental Constraints

- The owner of a work item must belong to the same department as the work item.
- Cross-department ownership is not allowed.
- Cross-department collaboration must occur via linked tickets, not shared ownership.

## Reassignment Rules

Ownership may be reassigned by:

| Actor           | Scope                      |
| --------------- | -------------------------- |
| CEO             | Any work item              |
| Department head | Within own department only |
| Agent           | Not allowed                |

All reassignments must be logged in Agent Log or change history.

---

# 2. Role Hierarchy

## Human Roles

- CEO
- CTO
- CMO
- COO (future)
- CFO (future)

## Agent Roles

Agents are scoped to a department.

Examples:

- eng-agent-01
- marketing-agent-01

Agents do not outrank human roles.

---

# 3. Authority Levels

## CEO

- Full system authority
- Can override any state
- Can reassign any ownership

## Department Head (CTO, CMO)

- Full authority within department
- Cannot override other departments without CEO

## Agents

- Limited authority
- Must obey status transition rules
- Must obey field-level permissions
- Cannot self-approve if requires_approval = true

---

# 4. Agent Capabilities

## Agents MAY

- Read all work items within assigned department
- Propose status transitions
- Execute allowed status transitions (see Section 5)
- Append to Agent Log
- Update confidence scores
- Update the `updated` timestamp
- Move work into `review`
- Move work back to `active` when review fails

## Agents MAY NOT

- Approve work (`review → approved`)
- Mark work `done` if `requires_approval = true`
- Change ownership unless explicitly delegated
- Modify schema or lifecycle rules
- Invent new statuses
- Delete work items
- Access work items outside assigned department

---

# 5. Agent Status Transition Permissions (Tickets)

## Allowed Transitions

| From     | To       | Agent Allowed |
| -------- | -------- | ------------- |
| backlog  | planned  | ✓             |
| backlog  | archived | —             |
| planned  | active   | ✓             |
| planned  | backlog  | ✓             |
| active   | blocked  | ✓             |
| active   | review   | ✓             |
| blocked  | active   | ✓             |
| blocked  | planned  | ✓             |
| review   | active   | ✓             |
| review   | approved | —             |
| approved | done     | —             |
| done     | archived | —             |

## Rules

- Agents may not transition to `approved` or `done`.
- Agents may not transition to `archived` unless explicitly delegated.
- All agent transitions must be logged in Agent Log.

---

# 6. Field-Level Permissions (Ticket Level)

| Field             | Human | Agent                 |
| ----------------- | ----- | --------------------- |
| status            | yes   | yes (validated)       |
| owner             | yes   | no (unless delegated) |
| department        | no    | no                    |
| priority          | yes   | no                    |
| requires_approval | yes   | no                    |
| confidence        | yes   | yes                   |
| created           | no    | no                    |
| updated           | yes   | yes                   |
| id                | no    | no                    |
| milestone         | no    | no                    |
| epic              | no    | no                    |
| agent_log         | yes   | append-only           |

---

# 7. Approval Rules

If requires_approval = true:

- Only a human with appropriate authority may transition:
  - review → approved
  - approved → done

Agents may move work into review.
Agents may not mark work done unless approval is not required.

---

# 8. Delegation Rules

## Default State

- No agent has approval authority by default.
- No agent may mark work `done` by default.
- Permissions are deny-by-default.

## Explicit Delegation

If an agent is delegated additional authority:

- Delegation must be recorded in work item metadata or configuration.
- Scope of delegation must be limited and specific.
- Delegation must be revocable.
- Delegation does not persist across sessions unless explicitly configured.

## Delegation Examples

| Delegation Type      | Scope                          | Revocable |
| -------------------- | ------------------------------ | --------- |
| Archive permission   | Specific ticket or ticket type | Yes       |
| Ownership assignment | Within department only         | Yes       |
| Approval authority   | Not delegable to agents        | N/A       |

---

# 9. Escalation Model

## Invalid State Triggers

Escalation is required when a work item:

- Has no valid owner
- Has an owner that violates department constraints
- Is blocked without resolution
- Encounters invalid transitions
- Encounters permission violations
- Has missing dependencies

## Escalation Path

1. Log issue in Agent Log
2. Set status to `blocked`
3. Escalate to department head (CTO, CMO)
4. CEO is final escalation authority

## Agent Behavior

Agents encountering escalation triggers must:

1. Log attempt in Agent Log
2. Set status to blocked
3. Notify owner
4. Await further instruction

---

# 10. Design Principles

- Authority must be explicit.
- No agent may infer permission from context.
- All authority must be declared and validated.
- Permissions are deny-by-default.
- No implicit privilege escalation.
- All agent actions are auditable.
- Enforcement must live in a single validation layer.
