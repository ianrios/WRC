---
id: ENG-002
milestone: MS-001
epic: EPIC-000
title: Define Milestone Markdown Schema
owner: CTO
department: engineering
status: done
priority: high
requires_approval: true
confidence: 0.95
created: 2026-02-16
updated: 2026-02-16
---

# ENG-002 – Define Milestone Markdown Schema

## Problem

Milestones lack a canonical schema, making it unclear how they relate to epics and tickets.

---

## Objective

Define the markdown schema for Milestone files, including epic linkage and lifecycle constraints.

---

## Acceptance Criteria

1. Define required frontmatter fields.
2. Define allowed status values.
3. Define required body sections.
4. Document schema in `SCHEMA.md`.
5. Confirm milestone lifecycle aligns with container semantics.

---

## Milestone Frontmatter Schema

```yaml
---
id: MS-###
epic: EPIC-###
title: string
owner: human role
department: engineering | marketing | ops
status: backlog | active | done | archived
created: YYYY-MM-DD
---
```

---

## Required Body Sections

- Goal
- Deliverables
- Tickets
- Definition of Done

---

## Design Constraints

- Milestones are containers
- Milestones may not be agent-owned
- Milestones reflect aggregate progress only

---

## Dependencies

- ENG-001 – Epic Markdown Schema
- ENG-004 – Canonical Status Lifecycle

---

## Agent Log

(append-only)

### 2026-02-16 – Claude (agent)

- Updated SCHEMA.md with formal Milestone schema:
  - Frontmatter fields table with types, requirements, and constraints
  - Body sections table with purposes
  - Constraints section documenting container semantics
- Schema includes: id, epic, title, owner, department, status, created
- Documented that milestones are human-owned only and use 4-state lifecycle
- Documented epic linkage immutability and child completion requirements
- Confirmed alignment with ENG-004 lifecycle and container semantics
- Moved ticket to `review` status for human approval
- Confidence: 0.95
