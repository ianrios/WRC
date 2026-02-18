---
id: ENG-003
milestone: MS-001
epic: EPIC-000
title: Define Ticket Markdown Schema
owner: CTO
department: engineering
status: done
priority: high
requires_approval: true
confidence: 0.95
created: 2026-02-16
updated: 2026-02-16
---

# ENG-003 – Define Ticket Markdown Schema

## Problem

Tickets require the most granular schema but currently lack formal definition.

Without this:

- Validation cannot be enforced
- Agents cannot operate safely
- UI state becomes ambiguous

---

## Objective

Define the canonical markdown schema for Tickets, including lifecycle, ownership, and agent logging fields.

---

## Acceptance Criteria

1. Define required frontmatter fields.
2. Define allowed lifecycle states.
3. Define agent log requirements.
4. Document schema in `SCHEMA.md`.
5. Ensure compatibility with validator and permission guard.

---

## Ticket Frontmatter Schema

```yaml
---
id: ENG-###
epic: EPIC-###
milestone: MS-###
title: string
owner: human role or delegated agent
department: engineering | marketing | ops
status: backlog | planned | active | blocked | review | approved | done | archived
priority: low | medium | high | critical
requires_approval: true | false
confidence: 0.0-1.0
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

---

## Required Body Sections

- Problem
- Context
- Acceptance Criteria
- Implementation Notes
- Dependencies
- Agent Log (append-only)

---

## Design Constraints

- Tickets are the only agent-ownable work item
- All ticket mutations must pass ENG-009 and ENG-010
- Agent Log must never be rewritten

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

- Updated SCHEMA.md with formal Ticket schema:
  - Frontmatter fields table with types, requirements, and constraints
  - Full 8-state status lifecycle documented
  - Body sections table with purposes
  - Agent Log format specification
  - Constraints section for agent ownership and mutation rules
- Schema includes: id, milestone, epic, title, owner, department, status, priority, requires_approval, confidence, created, updated
- Documented agent log append-only requirement with format example
- Added Field Mutability Rules section covering immutable, agent-modifiable, and human-only fields
- Confirmed compatibility with ENG-009 validator and ENG-010 permission guard
- Moved ticket to `review` status for human approval
- Confidence: 0.95
