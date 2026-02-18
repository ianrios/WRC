# WRC-OS Work Representation Schema

All work is stored as structured Markdown with YAML frontmatter.

Files must be:

- Human readable
- Git diff friendly
- Machine parseable
- Deterministic

---

# Directory Structure

/ops
/epics
/milestones
/tickets

---

# ID Format

EPIC-###
MS-###
ENG-###
MKT-###
OPS-###

IDs are immutable once created.

---

# Status Lifecycle (Canonical)

All work items share a common status vocabulary, but not all statuses apply to all work types.

## Full Status Set

| Status   | Meaning                          |
| -------- | -------------------------------- |
| backlog  | Defined but not yet planned      |
| planned  | Approved to be worked on next    |
| active   | Currently in progress            |
| blocked  | Cannot proceed due to dependency |
| review   | Awaiting human or agent review   |
| approved | Explicitly approved to complete  |
| done     | Completed and verified           |
| archived | No longer active or relevant     |

## Status Availability by Work Type

| Status   | Epic | Milestone | Ticket |
| -------- | ---- | --------- | ------ |
| backlog  | ✓    | ✓         | ✓      |
| planned  | —    | —         | ✓      |
| active   | ✓    | ✓         | ✓      |
| blocked  | —    | —         | ✓      |
| review   | —    | —         | ✓      |
| approved | —    | —         | ✓      |
| done     | ✓    | ✓         | ✓      |
| archived | ✓    | ✓         | ✓      |

**Rationale:** Epics and Milestones are containers. They do not require granular workflow states like `planned`, `blocked`, `review`, or `approved`. Their status reflects aggregate progress, not individual execution.

Agents may not invent new statuses.

---

# Epic Schema

File: `/ops/epics/EPIC-XXX-name.md`

## Frontmatter Fields

| Field             | Type     | Required | Constraints                                   |
| ----------------- | -------- | -------- | --------------------------------------------- |
| id                | string   | yes      | Format: `EPIC-###`, immutable                 |
| title             | string   | yes      | Human-readable title                          |
| owner             | string   | yes      | Human role only (CEO, CTO, CMO)               |
| department        | enum     | yes      | `engineering` \| `marketing` \| `ops`         |
| status            | enum     | yes      | `backlog` \| `active` \| `done` \| `archived` |
| priority          | enum     | yes      | `low` \| `medium` \| `high` \| `critical`     |
| created           | date     | yes      | Format: `YYYY-MM-DD`, immutable               |
| target_completion | date/TBD | yes      | Format: `YYYY-MM-DD` or `TBD`                 |

## Body Sections (Required)

| Section            | Purpose                          |
| ------------------ | -------------------------------- |
| Objective          | Strategic goal of the epic       |
| Success Criteria   | Measurable outcomes              |
| Out of Scope       | Explicit exclusions              |
| Milestones         | List of linked MS-### references |
| Risks              | Known risks and mitigations      |
| Definition of Done | Conditions for epic completion   |

## Constraints

- Epics are human-owned only (agents cannot own epics)
- Epics do not support granular workflow states (no `planned`, `blocked`, `review`, `approved`)
- Epic completion requires all child milestones to be `done` or `archived`
- Schema is immutable once finalized

# Milestone Schema

File: `/ops/milestones/MS-XXX-name.md`

## Frontmatter Fields

| Field      | Type   | Required | Constraints                                   |
| ---------- | ------ | -------- | --------------------------------------------- |
| id         | string | yes      | Format: `MS-###`, immutable                   |
| epic       | string | yes      | Reference to parent `EPIC-###`, immutable     |
| title      | string | yes      | Human-readable title                          |
| owner      | string | yes      | Human role only (CEO, CTO, CMO)               |
| department | enum   | yes      | `engineering` \| `marketing` \| `ops`         |
| status     | enum   | yes      | `backlog` \| `active` \| `done` \| `archived` |
| created    | date   | yes      | Format: `YYYY-MM-DD`, immutable               |

## Body Sections (Required)

| Section            | Purpose                             |
| ------------------ | ----------------------------------- |
| Goal               | Milestone objective                 |
| Deliverables       | Concrete outputs                    |
| Tickets            | List of linked ticket references    |
| Definition of Done | Conditions for milestone completion |

## Constraints

- Milestones are containers for tickets
- Milestones may not be agent-owned
- Milestones reflect aggregate progress only
- Milestone completion requires all child tickets to be `done` or `archived`
- Epic linkage is immutable once created

# Ticket Schema

File: `/ops/tickets/{PREFIX}-###-name.md`

Prefix by department: `ENG-###`, `MKT-###`, `OPS-###`

## Frontmatter Fields

| Field             | Type    | Required | Constraints                               |
| ----------------- | ------- | -------- | ----------------------------------------- |
| id                | string  | yes      | Format: `{PREFIX}-###`, immutable         |
| milestone         | string  | yes      | Reference to parent `MS-###`, immutable   |
| epic              | string  | yes      | Reference to parent `EPIC-###`, immutable |
| title             | string  | yes      | Human-readable title                      |
| owner             | string  | yes      | Human role or delegated agent-id          |
| department        | enum    | yes      | `engineering` \| `marketing` \| `ops`     |
| status            | enum    | yes      | Full lifecycle (see below)                |
| priority          | enum    | yes      | `low` \| `medium` \| `high` \| `critical` |
| requires_approval | boolean | yes      | `true` \| `false`                         |
| confidence        | float   | yes      | Range: `0.0` to `1.0`                     |
| created           | date    | yes      | Format: `YYYY-MM-DD`, immutable           |
| updated           | date    | yes      | Format: `YYYY-MM-DD`                      |

## Status Values

`backlog` | `planned` | `active` | `blocked` | `review` | `approved` | `done` | `archived`

See `STATUS_TRANSITIONS.md` for valid transitions.

## Body Sections (Required)

| Section              | Purpose                                |
| -------------------- | -------------------------------------- |
| Problem              | What problem this ticket solves        |
| Context              | Background and relevant information    |
| Acceptance Criteria  | Specific conditions for completion     |
| Implementation Notes | Technical notes (optional content)     |
| Dependencies         | Other tickets or external dependencies |
| Agent Log            | Append-only log of agent actions       |

## Agent Log Format

```markdown
## Agent Log

(append-only)

### YYYY-MM-DD – Agent Name (agent)

- Action taken
- Confidence: X.X
```

## Constraints

- Tickets are the only agent-ownable work item
- All ticket mutations must pass status validator (ENG-009) and permission guard (ENG-010)
- Agent Log must never be rewritten, only appended
- Milestone and epic linkage are immutable
- `requires_approval = true` requires human for `review → approved` and `approved → done`

# Field Mutability Rules

## Immutable Fields (No Actor May Change)

| Field      | Applies To          |
| ---------- | ------------------- |
| id         | All                 |
| epic       | Milestones, Tickets |
| milestone  | Tickets             |
| created    | All                 |
| department | All                 |

## Agent-Modifiable Fields

| Field      | Permission                                |
| ---------- | ----------------------------------------- |
| status     | Yes (validated against transition matrix) |
| confidence | Yes                                       |
| updated    | Yes                                       |
| agent_log  | Append-only                               |

## Human-Only Fields

| Field             | Permission |
| ----------------- | ---------- |
| owner             | Yes        |
| priority          | Yes        |
| requires_approval | Yes        |
| title             | Yes        |

## Validation Rules

1. Frontmatter fields are authoritative.
2. All status transitions must be validated against `STATUS_TRANSITIONS.md`.
3. All field mutations must be validated against `AUTHORITY_MODEL.md`.
4. All agent actions must append to Agent Log.
5. Agent Log entries must include timestamp, actor, and confidence score.

# Validation and Error Handling (ENG-008)

## Validation Response Contract

All validation functions must return:

| Field              | Type           | Description                       |
| ------------------ | -------------- | --------------------------------- |
| allowed            | boolean        | Whether the action is permitted   |
| errorCode          | string or null | Specific error code               |
| errorCategory      | string or null | Category of the error             |
| message            | string or null | Human-readable description        |
| escalationRequired | boolean        | Whether human review is needed    |
| retryable          | boolean        | Whether the action can be retried |

## Error Categories

| Category          | Description                                      | Retryable | Escalation Required |
| ----------------- | ------------------------------------------------ | --------- | ------------------- |
| SCHEMA_ERROR      | Missing field, invalid enum, malformed ID        | No        | No                  |
| TRANSITION_ERROR  | Invalid status transition, terminal state        | No        | No                  |
| PERMISSION_ERROR  | Restricted field, agent violation, dept mismatch | No        | No                  |
| APPROVAL_REQUIRED | Requires human approval to proceed               | No        | Yes                 |
| DEPENDENCY_ERROR  | Open children block completion                   | No        | No                  |

## Deterministic Requirements

- Validation must be pure (same input = same output).
- No random or environment-based behavior.
- Error codes must be stable and documented.
- Validation must never partially mutate state.

## Escalation Semantics

If `escalationRequired` is true:

- Agent must halt mutation.
- Human review is required.
- No automatic retry is allowed.
- No silent fallback behavior is permitted.

## Retry Semantics

All current validation errors are non-retryable.

Future retryable errors must:

- Explicitly set `retryable: true`
- Define deterministic retry limits
- Never allow infinite retry loops

## Logging Requirements

When validation fails, the agent must append to Agent Log:

- Timestamp
- Attempted action
- errorCode
- escalationRequired
- confidence

Validation failures must never be suppressed.

## Cross-Module Alignment

This contract applies to:

- Status Transition Validator (`src/utils/statusValidator.js`)
- Ownership and Permission Guard (`src/utils/permissionGuard.js`)
- Validation Contract (`src/utils/validationContract.js`)
- Future: Schema Validation Engine, Work Index Builder

# Kanban Mapping

Kanban columns map directly to `status` field.

Tree View derives from:
Epic → Milestone → Ticket via ID references.
