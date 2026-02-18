---
id: ENG-008
milestone: MS-001
epic: EPIC-000
title: Define Validation and Error Handling Rules
owner: CTO
department: engineering
status: done
priority: high
requires_approval: true
confidence: 0.95
created: 2026-02-16
updated: 2026-02-16
---

# ENG-008 – Define Validation and Error Handling Rules

## Problem

Validation logic exists across multiple modules:

- Schema validation
- Status transition validation (ENG-009)
- Permission enforcement (ENG-010)

However, there is no canonical definition of:

- Error codes
- Error severity
- Escalation behavior
- Failure determinism requirements
- Agent retry semantics

Without a unified model:

- Errors may be inconsistent across modules
- UI handling becomes ambiguous
- Agents may retry invalid operations indefinitely
- Escalation logic may fragment

A deterministic validation contract is required.

---

## Objective

Define the canonical validation and error handling model for WRC-OS.

This model must:

- Standardize error codes
- Define error categories
- Define escalation rules
- Define retry behavior
- Ensure deterministic validator output
- Apply to all enforcement layers

---

## Acceptance Criteria

1. Define global error categories.
2. Define required error response structure.
3. Define escalation semantics.
4. Define retry vs non-retry error types.
5. Define deterministic validation requirements.
6. Document rules in SCHEMA.md.
7. Confirm alignment with ENG-009 and ENG-010.

---

## Validation Response Contract

All validation functions must return a structured result with the following fields:

- allowed (boolean)
- error_code (string or null)
- error_category (string or null)
- message (string or null)
- escalation_required (boolean)
- retryable (boolean)

---

## Error Categories

### 1. SCHEMA_ERROR

Definition:

- Missing required field
- Invalid enum value
- Malformed ID
- Invalid date format
- Violates immutable field rule

Retryable: No
Escalation Required: No
Actor Fix Required: Yes

---

### 2. TRANSITION_ERROR

Definition:

- Invalid status transition
- Terminal state mutation attempt
- Transition violates transition matrix

Retryable: No
Escalation Required: No

---

### 3. PERMISSION_ERROR

Definition:

- Actor modifying restricted field
- Agent attempting human-only mutation
- Ownership violation
- Department mismatch

Retryable: No
Escalation Required: No

---

### 4. APPROVAL_REQUIRED

Definition:

- Attempt to transition when requires_approval = true
- Agent attempting review to approved
- Agent attempting approved to done

Retryable: No
Escalation Required: Yes

---

### 5. DEPENDENCY_ERROR

Definition:

- Attempt to complete milestone with open tickets
- Attempt to complete epic with open milestones
- Attempt to archive active children

Retryable: No
Escalation Required: No

---

## Deterministic Requirements

- Validation must be pure.
- Same input must always produce the same output.
- No random or environment-based behavior.
- Error codes must be stable and documented.
- Validation must never partially mutate state.

---

## Escalation Semantics

If escalation_required is true:

- Agent must halt mutation
- Human review is required
- No automatic retry is allowed
- No silent fallback behavior is permitted

Escalation must be explicitly returned by the validator and must never be inferred.

---

## Retry Semantics

All current validation errors are non-retryable.

Future retryable errors must:

- Explicitly set retryable = true
- Define deterministic retry limits
- Never allow infinite retry loops

---

## Logging Requirements

When validation fails:

- Agent must append an entry to Agent Log
- Log entry must include:
  - Timestamp
  - Attempted action
  - error_code
  - escalation_required
  - confidence

Validation failures must never be suppressed.

---

## Cross-Module Alignment

This error model applies to:

- Schema Validation Engine (ENG-012)
- Status Transition Validator (ENG-009)
- Ownership and Permission Guard (ENG-010)
- Work Index Builder (ENG-013)

All must conform to this contract.

---

## Out of Scope

- UI rendering of errors
- Notification delivery
- Audit storage mechanics

---

## Dependencies

- ENG-004 – Canonical Status Lifecycle
- ENG-005 – Status Transition Matrix
- ENG-006 – Ownership Model
- ENG-007 – Agent Permission Model

---

## Agent Log

(append-only)

### 2026-02-18 – Claude (agent)

- Created `src/utils/validationContract.js`:
  - Canonical ERROR_CATEGORIES (5 categories) and ERROR_CODES (18 codes)
  - Code-to-category mapping with default escalation/retry metadata
  - `success()` and `failure()` builders enforcing contract shape
  - `getCategoryForCode()` for category lookup
- Updated `src/utils/statusValidator.js` to use contract builders
- Updated `src/utils/permissionGuard.js` to use contract builders
- All validation results now include: allowed, errorCode, errorCategory, message, escalationRequired, retryable
- Created `src/utils/validationContract.test.js` (17 tests)
- Updated statusValidator tests with contract conformance suite (7 new tests)
- Updated permissionGuard tests with contract conformance suite (6 new tests)
- Total: 123 tests passing across 3 test suites
- Documented validation contract, error categories, escalation/retry semantics in SCHEMA.md
- Confirmed alignment with ENG-009 and ENG-010
- Moved ticket to `review` status
- Confidence: 0.95
