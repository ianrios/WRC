---
id: ENG-006
milestone: MS-001
epic: EPIC-000
title: Define Ownership Model
owner: CTO
department: engineering
status: done
priority: critical
requires_approval: true
confidence: 0.95
created: 2026-02-16
updated: 2026-02-16
---

# ENG-006 – Define Ownership Model

## Problem

Work items currently reference an `owner` field, but ownership semantics are not formally defined.

Without a clear ownership model:

- Accountability is ambiguous
- Agents may assume authority they do not have
- Approval logic becomes unclear
- Escalation paths are undefined

A deterministic ownership model must define what ownership means, who can own work, and how ownership interacts with departments and agents.

---

## Context

WRC-OS supports:

- Human roles (CEO, CTO, CMO, etc.)
- Departmental boundaries (engineering, marketing, ops)
- Autonomous and semi-autonomous agents

Ownership must encode **accountability**, not execution.

Execution may be delegated to agents, but ownership remains explicit and traceable.

This ticket defines ownership semantics only.
Permissions and enforcement are handled in ENG-007.

---

## Acceptance Criteria

1. Define what `owner` represents for Epics, Milestones, and Tickets.
2. Define valid owner types (human roles vs agents).
3. Define department-level ownership boundaries.
4. Define reassignment rules.
5. Define escalation behavior when ownership is invalid or absent.
6. Document ownership model in a canonical location (`/ops/AUTHORITY_MODEL.md` or equivalent).
7. Confirm ownership model integrates cleanly with status lifecycle and approval gating.

---

## Ownership Definitions

### Owner (Canonical Definition)

The `owner` of a work item is the **accountable authority** responsible for ensuring the work is completed, reviewed, and closed.

Ownership implies responsibility, not authorship or execution.

---

## Valid Owner Types

### Human Roles

- CEO
- CTO
- CMO
- COO (future)
- CFO (future)

Human roles may own Epics, Milestones, and Tickets.

---

### Agents

- Agents may own Tickets only if explicitly delegated.
- Agents may not own Epics or Milestones.
- Agent ownership implies responsibility for execution, not approval.

Agent identifiers must be explicit (e.g. `eng-agent-01`).

---

## Ownership by Work Type

### Epics

- Must be owned by a human role.
- Ownership reflects strategic accountability.
- Cannot be owned by agents.

### Milestones

- Must be owned by a human role.
- Typically owned by the department head.
- Cannot be owned by agents.

### Tickets

- May be owned by:
  - A human role, or
  - An agent (if explicitly assigned)
- Ownership may change during lifecycle.

---

## Departmental Constraints

- The owner of a work item must belong to the same department as the work item.
- Cross-department ownership is not allowed.
- Cross-department collaboration must occur via linked tickets, not shared ownership.

---

## Reassignment Rules

- Ownership may be reassigned by:
  - CEO (any work item)
  - Department head (within department)
- Agents may not reassign ownership.
- Reassignment must be logged in Agent Log or change history.

---

## Escalation Rules

If a work item:

- Has no valid owner
- Has an owner that violates department constraints
- Is blocked without resolution

Then:

1. Status must be set to `blocked`
2. Issue must be logged
3. Escalation goes to department head
4. CEO is final escalation authority

---

## Design Constraints

- Ownership is explicit and required.
- No implicit or inferred ownership.
- Ownership changes are auditable.
- Ownership does not grant approval authority by default.

---

## Out of Scope

- Field-level permissions
- Approval authority
- Agent write permissions
- Implementation logic

---

## Dependencies

- ENG-004 – Canonical Status Lifecycle
- ENG-005 – Status Transition Matrix

---

## Agent Log

(append-only)

### 2026-02-16 – Claude (agent)

- Updated AUTHORITY_MODEL.md with complete ownership model:
  - Added canonical ownership definition
  - Added ownership by work type table (Epics/Milestones = humans, Tickets = humans or agents)
  - Added departmental constraints (owner must match department)
  - Added reassignment rules table (CEO = any, dept head = within dept, agents = none)
  - Expanded escalation model with invalid state triggers and escalation path
- Verified alignment with status lifecycle and approval gating
- Moved ticket to `review` status for human approval
- Confidence: 0.95
