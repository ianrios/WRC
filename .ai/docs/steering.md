Technical Advice (very important)

Do NOT:

- Let agents directly edit markdown files without validation
- Let them freely create new epics
- Let them modify status without lifecycle checks

All writes must go through:

- Schema validation
- Status transition rules
- Audit logging

This is how we prevent entropy.
