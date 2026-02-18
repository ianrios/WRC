---
id: ENG-001
milestone: MS-001
epic: EPIC-000
title: Define Epic Markdown Schema
owner: CTO
department: engineering
status: done
priority: high
requires_approval: true
confidence: 0.95
created: 2026-02-16
updated: 2026-02-16
---

# ENG-001 – Define Epic Markdown Schema

## Problem

Epics currently lack a formally defined markdown schema.

Without a strict schema:

- Parsers cannot reliably extract data
- UI behavior becomes assumption-based
- Agents cannot safely read or write epic files

---

## Objective

Define the canonical markdown schema for Epic files, including required frontmatter fields and required body sections.

---

## Acceptance Criteria

1. Define required frontmatter fields.
2. Define allowed enum values.
3. Define required body sections.
4. Document schema in `SCHEMA.md`.
5. Confirm schema aligns with lifecycle, ownership, and permission rules.

---

## Epic Frontmatter Schema

```yaml
---
id: EPIC-###
title: string
owner: human role
department: engineering | marketing | ops
status: backlog | active | done | archived
priority: low | medium | high | critical
created: YYYY-MM-DD
target_completion: YYYY-MM-DD | TBD
---
```

---

## Required Body Sections

- Objective
- Success Criteria
- Out of Scope
- Milestones
- Risks
- Definition of Done

---

## Design Constraints

- Epics are human-owned only
- Epics do not support granular workflow states
- Schema must be immutable once finalized

---

## Dependencies

- ENG-004 – Canonical Status Lifecycle
- ENG-006 – Ownership Model

---

## Agent Log

(append-only)

### 2026-02-16 – Claude (agent)

- Updated SCHEMA.md with formal Epic schema:
  - Frontmatter fields table with types, requirements, and constraints
  - Body sections table with purposes
  - Constraints section documenting ownership and lifecycle rules
- Schema includes: id, title, owner, department, status, priority, created, target_completion
- Documented that epics are human-owned only and use 4-state lifecycle
- Confirmed alignment with ENG-004 lifecycle and ENG-006 ownership model
- Moved ticket to `review` status for human approval
- Confidence: 0.95
