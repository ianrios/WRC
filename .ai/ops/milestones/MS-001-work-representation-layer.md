---
id: MS-001
epic: EPIC-000
title: Work Representation Layer
owner: CTO
department: engineering
status: active
created: 2026-02-16
---

# MS-001 – Work Representation Layer

## Goal

Define a deterministic, code-native representation of work that can be:

- Authored by humans
- Parsed by machines
- Updated by agents under strict rules
- Visualized in multiple UI views

This milestone establishes the canonical data model for all future work in WRC-OS.

---

## Deliverables

- Formal markdown schemas for Epics, Milestones, and Tickets
- Canonical status lifecycle and transition rules
- Ownership and department models
- Agent assignment and permission model
- Validation rules for agent write access

---

## Tickets

### Phase 0.1 – Foundational Invariants

#### ENG-004 – Define Canonical Status Lifecycle

Status: done

Define the global set of allowed statuses and document their meaning and usage across all departments.

---

#### ENG-005 – Define Status Transition Matrix

Status: done

Define valid and invalid status transitions and enforcement rules. This must be completed before any UI or agent writes are allowed.

---

#### ENG-006 – Define Department and Ownership Model

Status: done

Define supported departments, roles, and ownership semantics. Clarify human vs agent ownership.

---

#### ENG-007 – Define Agent Assignment and Permissions

Status: done

Define how agents are assigned to tickets, what fields they may update, and how permissions are enforced.

---

### Phase 0.2 – Work Representation Schema

#### ENG-001 – Define Epic Markdown Schema

Status: done

Define the required frontmatter fields and body sections for Epic files, including validation rules and constraints.

---

#### ENG-002 – Define Milestone Markdown Schema

Status: done

Define the required frontmatter fields and body sections for Milestone files, including linkage to parent Epic.

---

#### ENG-003 – Define Ticket Markdown Schema

Status: done

Define the required frontmatter fields and body sections for Ticket files, including lifecycle metadata and agent logging requirements.

---

#### ENG-008 – Define Validation and Error Handling Rules

Status: done

Define validation failures, error messaging, and fallback behavior when invalid updates are attempted.

---

### Phase 0.3 – Implementation

This phase implements enforcement and infrastructure based on the frozen governance and schema rules.

Implementation tickets must not introduce new policy or lifecycle rules.

---

#### ENG-009 – Implement Status Transition Validator

Status: done

Implement a pure, centralized validation function that enforces:

- Canonical status lifecycle
- Status transition matrix
- Approval gating rules
- Agent permission constraints

This validator must be stateless, deterministic, and unit tested.

---

#### ENG-010 – Implement Ownership and Permission Guard

Status: done

Implement a centralized guard that validates:

- Ownership constraints by work type
- Department alignment
- Agent authority and delegation rules
- Escalation triggers for invalid authority

Must integrate with ENG-009 validator.

---

#### ENG-011 – Implement Markdown Frontmatter Parser

Status: backlog

Implement a parser that:

- Reads markdown files with YAML frontmatter
- Extracts structured metadata
- Preserves raw markdown body
- Produces typed in-memory representations

Parsing must not mutate files.

---

#### ENG-012 – Implement Schema Validation Engine

Status: backlog

Implement validation logic that:

- Verifies required frontmatter fields
- Validates enum values
- Enforces schema constraints
- Produces structured validation errors

Must run before any write operation.

---

#### ENG-013 – Implement Work Index Builder (Epic → Milestone → Ticket)

Status: backlog

Implement an index builder that:

- Resolves relationships between Epics, Milestones, and Tickets
- Detects broken or circular references
- Produces a tree structure for UI consumption

---

#### ENG-014 – Implement File Write and Audit Log System

Status: backlog

Implement a controlled write system that:

- Applies validated changes to markdown files
- Appends agent and human actions to Agent Log
- Prevents partial or invalid writes
- Supports dry-run validation

---

### Implementation Constraints

- All writes must pass validation and permission guards
- Enforcement must be centralized
- UI must consume validated state only
- No implementation may bypass ENG-009 or ENG-010

## Execution Order

### Foundational Invariants

1. ENG-004 – Define Canonical Status Lifecycle
2. ENG-005 – Define Status Transition Matrix
3. ENG-006 – Define Ownership Model
4. ENG-007 – Define Agent Permission Model

### Work Representation Schema

5. ENG-001 – Define Epic Markdown Schema
6. ENG-002 – Define Milestone Markdown Schema
7. ENG-003 – Define Ticket Markdown Schema
8. ENG-008 – Define Validation and Error Handling Rules

## Definition of Done

This milestone is complete when:

1. All schemas are finalized and documented.
2. Status lifecycle and transition rules are explicitly defined.
3. Ownership and permission rules are unambiguous.
4. No UI or agent logic depends on undocumented behavior.

---

## User Log

- At this stage, governance, schema, validation, and permission enforcement are complete. Remaining tickets focus on parsing, indexing, and persistence.
