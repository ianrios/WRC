import { parseArtifact, parseAllArtifacts, ARTIFACT_TYPES, ERROR_CODES } from './artifactParser';
import path from 'path';

describe('artifactParser', () => {
  describe('parseArtifact', () => {
    describe('valid artifacts', () => {
      it('parses a valid epic', () => {
        const filepath = '/ops/epics/EPIC-000-test.md';
        const content = [
          '---',
          'id: EPIC-000',
          'title: Test Epic',
          'owner: CEO',
          'department: engineering',
          'status: active',
          'priority: high',
          'created: 2026-01-01',
          '---',
          '',
          '# EPIC-000 – Test Epic',
          '',
          '## Objective',
          '',
          'Build something great.',
        ].join('\n');

        const result = parseArtifact(filepath, content);

        expect(result.error_code).toBeUndefined();
        expect(result.id).toBe('EPIC-000');
        expect(result.type).toBe(ARTIFACT_TYPES.EPIC);
        expect(result.frontmatter.title).toBe('Test Epic');
        expect(result.frontmatter.owner).toBe('CEO');
        expect(result.frontmatter.status).toBe('active');
        expect(result.body).toContain('# EPIC-000 – Test Epic');
        expect(result.body).toContain('Build something great.');
        expect(result.filepath).toBe(filepath);
      });

      it('parses a valid milestone', () => {
        const filepath = '/ops/milestones/MS-001-test.md';
        const content = [
          '---',
          'id: MS-001',
          'epic: EPIC-000',
          'title: Test Milestone',
          'owner: CTO',
          'department: engineering',
          'status: planned',
          'priority: high',
          'created: 2026-01-15',
          '---',
          '',
          '# MS-001 – Test Milestone',
          '',
          '## Goal',
          '',
          'Deliver the foundation.',
        ].join('\n');

        const result = parseArtifact(filepath, content);

        expect(result.error_code).toBeUndefined();
        expect(result.id).toBe('MS-001');
        expect(result.type).toBe(ARTIFACT_TYPES.MILESTONE);
        expect(result.frontmatter.epic).toBe('EPIC-000');
        expect(result.body).toContain('Deliver the foundation.');
      });

      it('parses a valid ticket', () => {
        const filepath = '/ops/tickets/ENG-001-test.md';
        const content = [
          '---',
          'id: ENG-001',
          'milestone: MS-001',
          'epic: EPIC-000',
          'title: Test Ticket',
          'owner: CTO',
          'department: engineering',
          'status: done',
          'priority: medium',
          'requires_approval: true',
          'confidence: 0.9',
          'created: 2026-02-01',
          'updated: 2026-02-10',
          '---',
          '',
          '# ENG-001 – Test Ticket',
          '',
          '## Acceptance Criteria',
          '',
          '1. Tests pass.',
        ].join('\n');

        const result = parseArtifact(filepath, content);

        expect(result.error_code).toBeUndefined();
        expect(result.id).toBe('ENG-001');
        expect(result.type).toBe(ARTIFACT_TYPES.TICKET);
        expect(result.frontmatter.requires_approval).toBe(true);
        expect(result.frontmatter.confidence).toBe(0.9);
        expect(result.body).toContain('Tests pass.');
      });
    });

    describe('type derivation', () => {
      it('derives type from directory, not frontmatter', () => {
        const content = '---\nid: X-001\ntype: wrong\n---\nBody';
        const result = parseArtifact('/ops/tickets/X-001.md', content);
        expect(result.type).toBe(ARTIFACT_TYPES.TICKET);
      });

      it('works with nested paths', () => {
        const content = '---\nid: EPIC-001\n---\nBody';
        const result = parseArtifact('/some/deep/path/ops/epics/EPIC-001.md', content);
        expect(result.type).toBe(ARTIFACT_TYPES.EPIC);
      });
    });

    describe('determinism', () => {
      it('produces identical output for identical input', () => {
        const filepath = '/ops/tickets/ENG-099.md';
        const content = '---\nid: ENG-099\ntitle: Determinism\n---\nBody content';

        const result1 = parseArtifact(filepath, content);
        const result2 = parseArtifact(filepath, content);

        expect(result1).toEqual(result2);
      });

      it('does not inject timestamps or defaults', () => {
        const content = '---\nid: ENG-050\n---\nBody';
        const result = parseArtifact('/ops/tickets/ENG-050.md', content);

        expect(result.frontmatter).toEqual({ id: 'ENG-050' });
        expect(Object.keys(result.frontmatter)).toEqual(['id']);
      });
    });

    describe('error handling', () => {
      it('returns EMPTY_FILE for empty content', () => {
        const result = parseArtifact('/ops/tickets/empty.md', '');
        expect(result.error_code).toBe(ERROR_CODES.EMPTY_FILE);
        expect(result.filepath).toBe('/ops/tickets/empty.md');
      });

      it('returns EMPTY_FILE for whitespace-only content', () => {
        const result = parseArtifact('/ops/tickets/blank.md', '   \n  \n  ');
        expect(result.error_code).toBe(ERROR_CODES.EMPTY_FILE);
      });

      it('returns INVALID_ARTIFACT_LOCATION for unrecognized directory', () => {
        const content = '---\nid: X-001\n---\nBody';
        const result = parseArtifact('/ops/random/X-001.md', content);
        expect(result.error_code).toBe(ERROR_CODES.INVALID_ARTIFACT_LOCATION);
      });

      it('returns INVALID_ARTIFACT_LOCATION for root ops file', () => {
        const content = '---\nid: SCHEMA\n---\nBody';
        const result = parseArtifact('/ops/SCHEMA.md', content);
        expect(result.error_code).toBe(ERROR_CODES.INVALID_ARTIFACT_LOCATION);
      });

      it('returns MISSING_FRONTMATTER when no --- delimiters', () => {
        const content = '# Just a markdown file\n\nNo frontmatter here.';
        const result = parseArtifact('/ops/tickets/no-fm.md', content);
        expect(result.error_code).toBe(ERROR_CODES.MISSING_FRONTMATTER);
      });

      it('returns YAML_PARSE_ERROR for malformed YAML', () => {
        const content = '---\nid: ENG-BAD\ntitle: [unclosed bracket\n---\nBody';
        const result = parseArtifact('/ops/tickets/bad.md', content);
        expect(result.error_code).toBe(ERROR_CODES.YAML_PARSE_ERROR);
      });

      it('never throws an exception', () => {
        expect(() => parseArtifact(null, null)).not.toThrow();
        expect(() => parseArtifact(undefined, undefined)).not.toThrow();
        expect(() => parseArtifact(123, 456)).not.toThrow();
      });
    });

    describe('body extraction', () => {
      it('preserves full markdown body after frontmatter', () => {
        const content = '---\nid: T-1\n---\n\n## Section 1\n\nParagraph.\n\n## Section 2\n\n- Item\n';
        const result = parseArtifact('/ops/tickets/T-1.md', content);

        expect(result.body).toContain('## Section 1');
        expect(result.body).toContain('Paragraph.');
        expect(result.body).toContain('## Section 2');
        expect(result.body).toContain('- Item');
      });

      it('handles files with no body after frontmatter', () => {
        const content = '---\nid: T-2\n---';
        const result = parseArtifact('/ops/tickets/T-2.md', content);

        expect(result.body).toBe('');
        expect(result.id).toBe('T-2');
      });
    });
  });

  describe('parseAllArtifacts', () => {
    it('reads real .ai/ops directory and returns structured results', () => {
      const opsDir = path.resolve(__dirname, '../../.ai/ops');
      const results = parseAllArtifacts(opsDir);

      expect(results.length).toBeGreaterThan(0);

      // All results should have filepath
      results.forEach((r) => {
        expect(r.filepath).toBeDefined();
      });

      // Check we got at least one of each type
      const types = results.filter((r) => r.type).map((r) => r.type);
      expect(types).toContain(ARTIFACT_TYPES.EPIC);
      expect(types).toContain(ARTIFACT_TYPES.MILESTONE);
      expect(types).toContain(ARTIFACT_TYPES.TICKET);

      // No errors on well-formed files
      const errors = results.filter((r) => r.error_code);
      expect(errors).toHaveLength(0);
    });

    it('returns empty array for non-existent directory', () => {
      const results = parseAllArtifacts('/nonexistent/path');
      expect(results).toEqual([]);
    });

    it('returns results in deterministic order', () => {
      const opsDir = path.resolve(__dirname, '../../.ai/ops');
      const results1 = parseAllArtifacts(opsDir);
      const results2 = parseAllArtifacts(opsDir);

      expect(results1.map((r) => r.filepath)).toEqual(results2.map((r) => r.filepath));
    });
  });
});
