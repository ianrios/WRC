---
id: ENG-012
milestone: MS-001
epic: EPIC-000
title: Implement Schema Validation Engine
owner: CTO
department: engineering
status: backlog
priority: high
requires_approval: true
confidence: 0.0
created: 2026-02-18
updated: 2026-02-18
---

# ENG-012 – Implement Schema Validation Engine

## Problem

Artifacts are now parsed into structured in-memory objects (ENG-011), but no schema validation exists to ensure:

- Required fields are present
- Field types are correct
- Enum values are valid
- Immutable fields are not modified
- Artifact structure matches SCHEMA.md

Without schema validation:

- Invalid artifacts may enter enforcement layers
- Permission and transition validators receive malformed input
- Errors become harder to diagnose
- Agents may operate on corrupt state

---

## Objective

Implement a deterministic schema validation engine that:

- Validates parsed artifacts against SCHEMA.md
- Produces structured validation errors using ENG-008 contract
- Runs before permission or transition enforcement
- Never mutates artifacts
- Never performs side effects

---

## Scope

### In Scope

- Validation of parsed artifacts from ENG-011
- Epic, Milestone, and Ticket schema enforcement
- Required field checks
- Enum validation
- Immutable field enforcement
- Structured error output

### Out of Scope

- Status transition validation (ENG-009)
- Permission enforcement (ENG-010)
- File writes (ENG-014)
- Index construction (ENG-013)

---

## Required Input

The validator must accept:

- ParsedArtifact object from ENG-011
- Artifact type (`epic`, `milestone`, `ticket`)

---

## Required Output

Validation result must conform to ENG-008 Validation Response Contract:

- allowed
- error_code
- error_category
- message
- escalation_required
- retryable

Schema failures must use `SCHEMA_ERROR`.

---

## Validation Rules

The engine must validate:

### Common (All Artifacts)

- Presence of required frontmatter fields
- Field types (string, enum, boolean, number, date)
- ID format correctness
- Immutable fields not modified

### Epic-Specific

- Owner is a human role
- Status is one of: backlog, active, done, archived
- No ticket-only fields present

### Milestone-Specific

- Valid parent epic reference
- Owner is human role
- Status is one of: backlog, active, done, archived

### Ticket-Specific

- Valid epic and milestone references
- Status is valid for ticket lifecycle
- requires_approval is boolean
- confidence is between 0.0 and 1.0

---

## Determinism Requirements

- Same input must always produce same output
- No defaults applied
- No auto-correction
- No mutation
- No environment-dependent behavior

---

## Acceptance Criteria

1. Schema validator processes all ParsedArtifact types.
2. Returns structured validation results using ENG-008 contract.
3. Invalid artifacts are rejected deterministically.
4. No enforcement logic exists in this layer.
5. Unit tests cover:
   - Valid epic
   - Valid milestone
   - Valid ticket
   - Missing required field
   - Invalid enum value
   - Invalid ID format
   - Out-of-range confidence value

---

## Architectural Position

This layer sits between parsing and enforcement:

Filesystem
→ Parser (ENG-011)
→ Schema Validation (ENG-012)
→ Permission Guard (ENG-010)
→ Status Validator (ENG-009)

Schema validation must be boring, strict, and predictable.

---

## Dependencies

- ENG-001 – Epic Markdown Schema
- ENG-002 – Milestone Markdown Schema
- ENG-003 – Ticket Markdown Schema
- ENG-008 – Validation and Error Handling Rules
- ENG-011 – Markdown Frontmatter Parser

---

## Agent Log

(append-only)
