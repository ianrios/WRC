# Summary:

- Add a feature flag system to safely test UI changes.

# Constraints:

- Frontend-only
- No real authentication
- No backend storage

# Acceptance criteria:

- Flags persist per session
- /admin route toggles flags
- Admin page is not discoverable via UI
- Password check via simple string compare

# Non-goals:

- Security hardening
- Multi-user support

# Status:

- Active
