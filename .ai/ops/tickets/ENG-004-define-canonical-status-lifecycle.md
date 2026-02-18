---
id: ENG-004
milestone: MS-001
epic: EPIC-000
title: Define Canonical Status Lifecycle
owner: CTO
department: engineering
status: done
priority: critical
requires_approval: true
confidence: 0.9
created: 2026-02-16
updated: 2026-02-16
---

# ENG-004 – Define Canonical Status Lifecycle

## Problem

Without a single canonical status lifecycle, work items will drift into inconsistent states.

This leads to:

- Invalid transitions
- Ambiguous UI behavior
- Unsafe agent automation
- Manual exceptions creeping into code

The lifecycle must be defined once and treated as immutable infrastructure.

---

## Context

All Epics, Milestones, and Tickets share a common lifecycle.

Statuses must:

- Be finite
- Be ordered
- Encode trust boundaries
- Support human and agent workflows
- Be enforceable by code

This ticket defines _what states exist_, not _how they transition_.

---

## Acceptance Criteria

1. Define the full list of allowed statuses.
2. Define the semantic meaning of each status.
3. Confirm statuses are sufficient for:
   - Engineering work
   - Marketing work
   - Agent execution
4. Document lifecycle in `/ops/STATUS_TRANSITIONS.md` (status definitions section).
5. Confirm no additional statuses are required.

---

## Canonical Statuses

| Status   | Meaning                                   |
| -------- | ----------------------------------------- |
| backlog  | Defined but not yet planned               |
| planned  | Approved to be worked on next             |
| active   | Currently in progress                     |
| blocked  | Cannot proceed due to dependency or issue |
| review   | Work complete, awaiting review            |
| approved | Explicitly approved to complete           |
| done     | Completed and verified                    |
| archived | No longer active or relevant              |

---

## Design Constraints

- Status names are lowercase and immutable.
- No department-specific statuses.
- No dynamic or inferred statuses.
- No skipping of semantic steps.

---

## Out of Scope

- Transition rules (ENG-005)
- Permission rules (ENG-006, ENG-007)
- UI representation
- Automation logic

---

## Dependencies

None.

This ticket must be completed before ENG-005.

---

## Agent Log

(append-only)

### 2026-02-16 – Claude (agent)

- Reviewed canonical status lifecycle against acceptance criteria
- Confirmed 8 statuses sufficient for engineering, marketing, and agent workflows
- Identified that Epics/Milestones use a subset of statuses (by design)
- Updated SCHEMA.md with explicit status availability matrix by work type
- Moved ticket to `review` status for human approval
- Confidence: 0.9
