/**
 * WRC-OS Markdown Frontmatter Parser (ENG-011)
 *
 * Parses governance artifacts (epics, milestones, tickets) from
 * YAML frontmatter + markdown files under /ops/.
 *
 * This is a pure structural parser — no validation, no mutation,
 * no defaults, no side effects.
 */

import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export const ARTIFACT_TYPES = {
  EPIC: 'epic',
  MILESTONE: 'milestone',
  TICKET: 'ticket',
};

export const ERROR_CODES = {
  YAML_PARSE_ERROR: 'YAML_PARSE_ERROR',
  MISSING_FRONTMATTER: 'MISSING_FRONTMATTER',
  EMPTY_FILE: 'EMPTY_FILE',
  INVALID_ARTIFACT_LOCATION: 'INVALID_ARTIFACT_LOCATION',
};

const DIRECTORY_TYPE_MAP = {
  epics: ARTIFACT_TYPES.EPIC,
  milestones: ARTIFACT_TYPES.MILESTONE,
  tickets: ARTIFACT_TYPES.TICKET,
};

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---/;

/**
 * Derive artifact type from filepath based on parent directory.
 * Returns null if the file is not in a recognized directory.
 */
function deriveType(filepath) {
  const parts = filepath.split(path.sep);
  for (let i = parts.length - 2; i >= 0; i--) {
    const dir = parts[i];
    if (DIRECTORY_TYPE_MAP[dir]) {
      return DIRECTORY_TYPE_MAP[dir];
    }
  }
  return null;
}

/**
 * Parse a single artifact file's content.
 *
 * @param {string} filepath - Path to the file (used for type derivation and error reporting)
 * @param {string} content - Raw file content
 * @returns {object} ParsedArtifact or ParseError
 */
export function parseArtifact(filepath, content) {
  try {
    // Check empty file
    if (!content || content.trim().length === 0) {
      return {
        filepath,
        error_code: ERROR_CODES.EMPTY_FILE,
        message: `File is empty: ${filepath}`,
      };
    }

    // Check artifact location
    const type = deriveType(filepath);
    if (!type) {
      return {
        filepath,
        error_code: ERROR_CODES.INVALID_ARTIFACT_LOCATION,
        message: `File is not in a recognized artifact directory (epics, milestones, tickets): ${filepath}`,
      };
    }

    // Check frontmatter presence
    const match = content.match(FRONTMATTER_REGEX);
    if (!match) {
      return {
        filepath,
        error_code: ERROR_CODES.MISSING_FRONTMATTER,
        message: `No YAML frontmatter found in: ${filepath}`,
      };
    }

    // Parse YAML
    let frontmatter;
    try {
      frontmatter = yaml.load(match[1]);
    } catch (yamlError) {
      return {
        filepath,
        error_code: ERROR_CODES.YAML_PARSE_ERROR,
        message: `YAML parse error in ${filepath}: ${yamlError.message}`,
      };
    }

    // Extract body (everything after the closing ---)
    const frontmatterEnd = content.indexOf('---', content.indexOf('---') + 3) + 3;
    const body = content.slice(frontmatterEnd).replace(/^\r?\n/, '');

    return {
      id: frontmatter?.id ?? null,
      type,
      frontmatter: frontmatter ?? {},
      body,
      filepath,
    };
  } catch (error) {
    return {
      filepath,
      error_code: ERROR_CODES.YAML_PARSE_ERROR,
      message: `Unexpected error parsing ${filepath}: ${error.message}`,
    };
  }
}

/**
 * Check if a filename should be ignored.
 */
function shouldIgnore(filename) {
  if (!filename.endsWith('.md')) return true;
  if (filename.startsWith('.')) return true;
  if (filename.startsWith('~') || filename.endsWith('.tmp') || filename.endsWith('.swp')) return true;
  return false;
}

/**
 * Read and parse all artifacts under an ops directory.
 *
 * @param {string} opsDir - Path to the ops directory (e.g., .ai/ops)
 * @returns {object[]} Array of ParsedArtifact and ParseError objects
 */
export function parseAllArtifacts(opsDir) {
  const results = [];
  const subdirs = ['epics', 'milestones', 'tickets'];

  for (const subdir of subdirs) {
    const dirPath = path.join(opsDir, subdir);

    let entries;
    try {
      entries = fs.readdirSync(dirPath, { withFileTypes: true });
    } catch {
      // Directory doesn't exist — skip silently
      continue;
    }

    // Sort for deterministic order
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (entry.isSymbolicLink?.()) continue;
      if (shouldIgnore(entry.name)) continue;

      const filepath = path.join(dirPath, entry.name);

      // Skip symlinks (readdirSync withFileTypes reports symlinks as isFile on some platforms)
      try {
        const stat = fs.lstatSync(filepath);
        if (stat.isSymbolicLink()) continue;
      } catch {
        continue;
      }

      let content;
      try {
        content = fs.readFileSync(filepath, 'utf-8');
      } catch (readError) {
        results.push({
          filepath,
          error_code: ERROR_CODES.YAML_PARSE_ERROR,
          message: `Failed to read file ${filepath}: ${readError.message}`,
        });
        continue;
      }

      results.push(parseArtifact(filepath, content));
    }
  }

  return results;
}
