# TypeScript Migration Plan

## Current Status

Scaffolding is **complete**. The repo is ready for file-by-file conversion.

### Done
- Node 22 LTS via nvm (`.nvmrc`)
- React 16 → 18 (`createRoot`/`hydrateRoot` API)
- TypeScript 5 installed
- `@types/*` for react, react-dom, react-router-dom, styled-components, d3, lodash
- `@typescript-eslint` v5 (parser + plugin) with strict rules
- `tsconfig.json` with `strict: true`, `noUncheckedIndexedAccess`, `allowJs`
- `.eslintrc.json` with TS rules disabled for `.js` files via overrides
- `.npmrc` with `legacy-peer-deps=true` (CRA 5 peer dep workaround)
- `typecheck` and `lint` scripts in package.json

### Not Done (Deferred)
- **react-router-dom 5 → 6**: Massive API change (`Switch` → `Routes`, `useHistory` → `useNavigate`, different route nesting). Should be a separate effort after TS conversion. Typed with `@types/react-router-dom@5` for now.
- **styled-components 5 → 6**: Works fine with current types. Upgrade later if needed.
- **CRA → Vite**: CRA is deprecated but functional. Separate migration.

---

## Migration Strategy

Rename files `.js` → `.tsx` (components) or `.ts` (utils/constants) one at a time. CRA compiles both JS and TS in the same build. Every rename should compile and run before moving to the next file.

---

## Phase 1 – Shared Types and Data (do first)

Create `src/types/` directory with shared interfaces. These get imported everywhere.

### 1.1 – Create `src/types/data.ts`

Type definitions for all JSON data structures. These are the backbone of the app.

```typescript
interface Artist {
  id: number;
  name: string;
  local_path: string;
  show_on_artist_page: boolean;
  photos: string[];
  email: string;
  location: { city: string; country: string };
  quote: string;
  body_paragraphs: string[];
  roles: string[];
  social_platforms: Record<string, string>;
  music_platforms: Record<string, string>;
  epk: string;
  // ... fill remaining fields from artistData.json
}

interface Release {
  name: string;
  local_path: string;
  album_art: string;
  primary_artist_ids: number[];
  secondary_artist_ids: number[];
  remix_artist_ids: number[];
  release_date: string;
  genre: string;
  short_description: string;
  release_bio: string[];
  links: Record<string, string>;
  // ... fill remaining fields from releaseData.json
}

// Similar for: Product, Collection, Contest, Playlist, Set, Recording
```

**Gotcha**: Each JSON file may have slightly different fields per entry (optional fields). The agent must read the _full_ JSON file and account for every field, marking optional ones with `?`. Do not assume all entries are uniform.

### 1.2 – Convert utility files

- `src/utilities/maps.js` → `.ts`
- `src/utils/featureFlags.js` → `.ts`
- `src/utils/statusValidator.js` → `.ts`
- `src/utils/permissionGuard.js` → `.ts`
- `src/utils/validationContract.js` → `.ts`

### 1.3 – Convert config files

- `src/config/navLayout.js` → `.ts`
- `src/constants/d3.js` → `.ts`

**Gotcha**: `navLayout.js` uses tuples like `["Home", true]` as config values. Convert to typed objects: `{ iconName: IconName; visible: boolean }` with `IconName` as a union type.

**Gotcha**: `d3.js` constructs graph data at module load time using JSON.stringify as object keys. Use `Map<string, LinkData>` instead of `Record<string, any>`.

---

## Phase 2 – Leaf Components (simple, no children)

These are small and self-contained. Good for building confidence.

### 2.1 – Icon components (16 files)

All in `src/components/icons/`. Each takes `{ height, width, fillColor }`. Create a shared `IconProps` interface and apply to all.

### 2.2 – Simple page components

Convert in this order (simplest first):
1. `CookiePolicy.js` – static content
2. `Errors.js` – static content
3. `ThankYou.js` – static content
4. `Reload.js` – static content
5. `ComingSoon.js` – static content
6. `DiscordInvite.js` – redirect only
7. `Discord.js` – redirect only
8. `Contact.js` – simple layout
9. `Information.js` – simple layout
10. `Services.js` – simple layout
11. `Software.js` – simple layout
12. `Merchandise.js` – data display
13. `LivePage.js` – Twitch embed

### 2.3 – Shared non-page components

- `ScrollToTop.js` → `.tsx`
- `Footer.js` → `.tsx`
- `Seo.js` → `.tsx` (receives a `data` prop — type it against Release/Artist/etc union)
- `Link.js` → `.tsx` (icon switch statement — use `IconName` union type from Phase 1)
- `Q.js` → `.tsx`

---

## Phase 3 – Data-Driven Pages

These consume the typed data from Phase 1. Convert after types exist.

1. `Artists.js` / `ArtistLanding.js` – list views
2. `ArtistProfile.js` – detail view, uses artist data
3. `ArtistPage.js` – nested routing wrapper
4. `Releases.js` / `ReleaseGrid.js` – list views
5. `ReleasePage.js` – detail view
6. `CrateView.js` – new view (already in progress)
7. `Collections.js` / `CollectionPage.js` – list + detail
8. `Contests.js` / `ContestPage.js` – list + detail
9. `Products.js` / `ProductPage.js` – list + detail
10. `Landing.js` / `Home.js` – homepage

**Gotcha**: `Home.js` uses styled-components with custom props (`source` for background image). Need to type the styled component:
```typescript
const BgStyledDiv = styled.div<{ source: string }>`
  background-image: ${(props) => `url("${props.source}")`};
`;
```

**Gotcha**: Data lookup patterns like `artistData.find(i => i.local_path === name)` return `Artist | undefined`. With `strict: true`, every usage site must handle the undefined case. Do not use `!` (non-null assertion) — the eslint rule will catch this.

**Gotcha**: `useParams()` in react-router-dom v5 returns `Record<string, string | undefined>`. Type it explicitly:
```typescript
const { name } = useParams<{ name: string }>();
```

---

## Phase 4 – Complex Components (do last)

### 4.1 – ForceNav.js (569 lines)

The hardest file. D3 force simulation with animation loops.

Key typing challenges:
- D3 simulation nodes need `SimulationNodeDatum` extended with custom fields (`targetX`, `targetY`, etc.)
- `useRef` types for animation frame, simulation, and node arrays
- Force configuration objects vary between collapsed/expanded states
- Array index correlation between `linkKeys` and `nodePositions` — consider refactoring to `Record<string, Position>`

Recommended approach: convert to `.tsx` with liberal use of `@ts-expect-error` comments (with descriptions) for D3-specific edge cases, then tighten types iteratively.

### 4.2 – Nexus.js (254 lines)

Uses `react-d3-graph` which has its own type definitions. The config object is deeply nested. Check if `@types/react-d3-graph` exists — if not, create a local declaration file `src/types/react-d3-graph.d.ts`.

### 4.3 – Experiments.js (806 lines)

Largest file. Complex state management. Convert after all other pages are done so patterns are established.

### 4.4 – Admin.js

Admin panel — convert last since it's internal-facing.

---

## Phase 5 – Entry Point and Router

1. `src/index.js` → `src/index.tsx`
2. `src/components/Routes.js` → `.tsx`
3. `src/components/App.js` → `.tsx`
4. `src/serviceWorker.js` → `.ts`

Do these last because they import everything. All child components should be typed first.

---

## Phase 6 – Cleanup

1. Remove `prop-types` from dependencies (unused, confirmed by codebase analysis)
2. Remove `allowJs: true` from tsconfig once all files are converted
3. Consider enabling `@typescript-eslint/consistent-type-imports` to enforce `import type` syntax
4. Run `npm run typecheck` and `npm run lint` — zero errors required before merge

---

## Gotchas and Landmines

### Agent-specific gotchas (put in CLAUDE.md or RULES.md)

1. **Do not use `any`**. The eslint rule enforces this but agents will try. If you genuinely cannot type something, use `unknown` and narrow with type guards.

2. **Do not use `as` type assertions**. The eslint rule is set to `assertionStyle: "never"`. Use type guards, generics, or restructure the code.

3. **Do not create new types when an existing one works**. Before creating a new interface, check `src/types/` for existing definitions. The Artist, Release, etc. types are shared.

4. **Do not use `@ts-ignore`**. Use `@ts-expect-error` with a description if absolutely necessary. The eslint rule enforces this.

5. **Do not use `!` (non-null assertion)**. Handle undefined cases explicitly with early returns or nullish coalescing.

6. **JSON imports are typed as `any` by default**. After creating types in Phase 1, import JSON data with explicit typing:
   ```typescript
   import artistDataJson from '../constants/artistData.json';
   const artistData: Artist[] = artistDataJson;
   ```

7. **`useParams()` returns optional strings**. Always handle the undefined case.

8. **Styled components with custom props** need explicit generic: `styled.div<{ myProp: string }>`.

9. **D3 callback types** are complex. Reference `@types/d3` definitions rather than guessing. Use `d3.SimulationNodeDatum` as the base for force node types.

10. **`maps.js` string parsing** uses magic markers (`__BREAK__`, `__b__`, `__i__`). Type the return as `JSX.Element[]` and consider creating a union type for marker strings.

### Build and deploy gotchas

11. **CRA overwrites parts of tsconfig on start**. It forces `jsx`, `module`, `moduleResolution`, `target`, and a few others. Don't fight it — those values are fine.

12. **`tsc --noEmit` is separate from the dev server**. CRA uses Babel to strip types — it does NOT run the TypeScript compiler. Type errors won't block `npm start`. Always run `npm run typecheck` before committing.

13. **Firebase deploy is unaffected**. The build output is still static JS/CSS/HTML.

14. **react-snap is unaffected**. It pre-renders from the built output.

15. **Test files** (`.test.js`) should be converted to `.test.ts` / `.test.tsx` alongside their source files.

---

## File Count Summary

| Phase | Files | Complexity |
|-------|-------|-----------|
| Phase 1 – Types & Utils | ~8 | Low |
| Phase 2 – Leaf Components | ~20 | Low |
| Phase 3 – Data Pages | ~15 | Medium |
| Phase 4 – Complex Components | ~4 | High |
| Phase 5 – Entry & Router | ~4 | Medium |
| **Total** | **~51** | |

---

## Definition of Done

- Zero `.js` files remain in `src/`
- `npm run typecheck` passes with zero errors
- `npm run lint` passes with zero errors
- `npm start` runs without console errors
- `npm run build` succeeds
- `prop-types` removed from dependencies
- `allowJs` removed from tsconfig
