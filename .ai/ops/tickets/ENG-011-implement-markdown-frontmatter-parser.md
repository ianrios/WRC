---
id: ENG-011
milestone: MS-001
epic: EPIC-000
title: Implement Markdown Frontmatter Parser
owner: CTO
department: engineering
status: done
priority: high
requires_approval: true
confidence: 0.0
created: 2026-02-18
updated: 2026-02-18
---

# ENG-011 – Implement Markdown Frontmatter Parser

## Problem

All governance artifacts (Epics, Milestones, Tickets) are stored as markdown files with YAML frontmatter.

Validation, permission enforcement, indexing, and state transitions depend on structured metadata — but no canonical parser exists yet.

Without a deterministic parser:

- Schema validation cannot execute
- Index builder cannot construct graph relationships
- Status transitions cannot be evaluated
- Permission checks cannot run
- Agents cannot safely mutate artifacts

Parsing must exist before any higher-layer enforcement systems operate.

---

## Objective

Implement a deterministic Markdown + YAML frontmatter parser that:

- Reads all governance artifacts under `/ops/`
- Extracts and parses YAML frontmatter
- Preserves markdown body content
- Returns structured, typed in-memory objects
- Performs zero validation or mutation
- Produces no side effects

This layer is strictly structural.

---

## Scope

### In Scope

- Parsing YAML frontmatter
- Extracting markdown body
- Returning typed object structure
- Handling malformed YAML safely
- Deterministic output for identical input

### Out of Scope

- Schema validation (ENG-012)
- Status transition validation (ENG-009)
- Permission enforcement (ENG-010)
- File writing (ENG-014)
- Index construction (ENG-013)

This ticket only parses.

---

# Required Output Contract

The parser must return the following structure:

```ts
ParsedArtifact {
  id: string
  type: "epic" | "milestone" | "ticket"
  frontmatter: Record<string, any>
  body: string
  filepath: string
}
```

### Type Derivation Rules

Artifact type must be derived strictly from file location:

- `/ops/epics/*.md` → `epic`
- `/ops/milestones/*.md` → `milestone`
- `/ops/tickets/*.md` → `ticket`

Type must NOT be inferred from frontmatter.

---

# Determinism Requirements

The parser must:

- Produce identical output for identical file input
- Not inject timestamps
- Not mutate data
- Not auto-correct malformed fields
- Not apply defaults
- Not perform validation

If YAML is malformed:

- Return a structured error
- Do not crash the process
- Do not partially parse the artifact

---

# Error Handling Contract

If parsing fails, return:

    ParseError {
      filepath: string
      error_code: string
      message: string
    }

Allowed error codes:

- `YAML_PARSE_ERROR`
- `MISSING_FRONTMATTER`
- `EMPTY_FILE`
- `INVALID_ARTIFACT_LOCATION`

No other error codes are permitted.

Parser must never throw uncaught exceptions.

---

# File System Rules

The parser must:

- Ignore non-markdown files
- Ignore hidden files
- Ignore temporary files
- Not follow symlinks
- Operate only within `/ops/`

Traversal must be deterministic.

---

# Acceptance Criteria

1. Parser reads all epics, milestones, and tickets.
2. Returns structured ParsedArtifact objects.
3. Malformed files return ParseError objects.
4. No validation logic exists in this layer.
5. No side effects occur.
6. Unit tests cover:
   - Valid epic
   - Valid milestone
   - Valid ticket
   - Malformed YAML
   - Missing frontmatter
   - Invalid directory placement

---

# Architectural Position

This ticket establishes the lowest operational layer of WRC-OS runtime:

File System → Parser → Validation → Permission → Transition → Write

Parser must remain simple and boring.

If this layer becomes complex, the system is drifting.

---

# Dependencies

- ENG-001 – Epic Schema Definition
- ENG-002 – Milestone Schema Definition
- ENG-003 – Ticket Schema Definition

---

# Agent Log

(append-only)

### 2026-02-18 – Claude (agent)

- Implemented `src/utils/artifactParser.js` with `parseArtifact()` and `parseAllArtifacts()` exports
- Uses `js-yaml` for YAML parsing, derives artifact type strictly from filepath
- Handles all 4 error codes: `YAML_PARSE_ERROR`, `MISSING_FRONTMATTER`, `EMPTY_FILE`, `INVALID_ARTIFACT_LOCATION`
- Created `src/utils/artifactParser.test.js` with 19 passing tests covering all acceptance criteria
- Confidence: 0.95
