---
id: ENG-007
milestone: MS-001
epic: EPIC-000
title: Define Agent Permission Model
owner: CTO
department: engineering
status: done
priority: critical
requires_approval: true
confidence: 0.95
created: 2026-02-16
updated: 2026-02-16
---

# ENG-007 – Define Agent Permission Model

## Problem

Agents will be responsible for executing work within WRC-OS, but without a formally defined permission model:

- Agents may mutate unsafe fields
- Agents may bypass approval gates
- Agents may escalate privileges implicitly
- Enforcement logic becomes scattered across code

A deterministic permission model must define exactly what agents can and cannot do at the field and action level.

---

## Context

ENG-006 defined ownership and accountability semantics.

This ticket defines **agent authority**, not ownership.

Agents:

- Execute work
- Propose changes
- Operate within strict guardrails

Permissions must be:

- Explicit
- Enforceable
- Validated centrally
- Independent of UI concerns

---

## Acceptance Criteria

1. Define agent capabilities at the action level.
2. Define field-level write permissions for agents.
3. Define which status transitions agents may execute.
4. Define approval and escalation boundaries.
5. Define delegation rules (if any).
6. Document agent permissions in a canonical location (`/ops/AUTHORITY_MODEL.md`).
7. Confirm permissions integrate with lifecycle and ownership rules.

---

## Agent Capabilities (High Level)

Agents MAY:

- Read all work items within assigned department
- Propose status transitions
- Execute allowed status transitions
- Append to Agent Log
- Update confidence scores
- Move work into `review`
- Move work back to `active` when review fails

Agents MAY NOT:

- Approve work
- Mark work `done` if `requires_approval = true`
- Change ownership unless explicitly delegated
- Modify schema or lifecycle rules
- Invent new statuses
- Delete work items

---

## Field-Level Write Permissions

| Field             | Agent Permission               |
| ----------------- | ------------------------------ |
| status            | allowed (validated)            |
| owner             | not allowed (unless delegated) |
| department        | not allowed                    |
| priority          | not allowed                    |
| requires_approval | not allowed                    |
| confidence        | allowed                        |
| created           | not allowed                    |
| updated           | allowed                        |
| id                | not allowed                    |
| epic              | not allowed                    |
| milestone         | not allowed                    |
| agent_log         | append-only                    |

---

## Status Transition Permissions (Tickets)

Agents MAY execute:

- backlog → planned
- planned → active
- active → blocked
- active → review
- blocked → active
- blocked → planned
- review → active

Agents MAY NOT execute:

- review → approved
- approved → done
- any → archived (unless explicitly delegated)

---

## Delegation Rules

Delegation must be explicit.

If an agent is delegated additional authority:

- Delegation must be recorded in work item metadata
- Scope of delegation must be limited
- Delegation must be revocable

Default state:

- No agent has approval authority
- No agent may mark work `done`

---

## Escalation Behavior

Agents encountering:

- Permission violations
- Invalid transitions
- Missing approvals

Must:

1. Log attempt in Agent Log
2. Set status to `blocked`
3. Notify owner
4. Await further instruction

---

## Design Constraints

- Permissions are deny-by-default.
- No implicit privilege escalation.
- All agent actions are auditable.
- Enforcement must live in a single validation layer.

---

## Out of Scope

- Implementation logic
- UI enforcement
- Agent autonomy tuning
- Cross-department access

---

## Dependencies

- ENG-004 – Canonical Status Lifecycle
- ENG-005 – Status Transition Matrix
- ENG-006 – Ownership Model

---

## Agent Log

(append-only)

### 2026-02-16 – Claude (agent)

- Updated AUTHORITY_MODEL.md with complete agent permission model:
  - Added Section 4: Agent Capabilities (MAY/MAY NOT action-level permissions)
  - Added Section 5: Agent Status Transition Permissions with full transition table
  - Added Section 8: Delegation Rules (default state, explicit delegation, examples)
  - Added `created` and `updated` fields to field-level permissions table
  - Expanded Section 10: Design Principles with deny-by-default and auditability
  - Updated escalation behavior to include "await further instruction"
- Renumbered sections for consistency (4-10)
- Verified integration with lifecycle, ownership, and approval rules
- Moved ticket to `review` status for human approval
- Confidence: 0.95
