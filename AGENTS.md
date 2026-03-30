# AGENTS

## Project Snapshot

- `data-table` is a reusable playground/prototype, not a finished product.
- Stack: Laravel 13, PHP 8.3+, Inertia.js, Vue 3, TypeScript, Vite 8, Tailwind CSS v4, TanStack Table, shadcn-vue/Reka UI.
- Primary goal: iterate on a reusable data-table experience with Notion-like filtering, sorting, visibility toggles, and table UX patterns.
- Current demo route is `/data-table`, backed by `Customer` seed data and rendered through Inertia.

## Ground Rules For Agents

- Prefer small, reversible changes; preserve the prototype nature of the repo.
- Do not treat missing product features as bugs unless the task explicitly asks for production behavior.
- Check for uncommitted user changes before editing; do not overwrite them.
- Prefer repository evidence over framework defaults when documenting or changing behavior.
- Do not run full builds unless the user explicitly asks; lightweight inspection commands are fine.

## Install And Run

### Initial setup

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
```

### Development

- Frontend dev server: `npm run dev`
- Laravel dev stack: `composer dev`
  - Runs `php artisan serve`, `php artisan queue:listen --tries=1 --timeout=0`, and `npm run dev` via `concurrently`.
- There is no dedicated SSR dev script; only `build:ssr` exists.

## Build, Lint, Format, Typecheck

- `npm run dev` - Vite dev server
- `npm run build` - production frontend build
- `npm run build:ssr` - client build plus SSR build
- `npm run format` - Prettier writes `resources/`
- `npm run format:check` - Prettier check for `resources/`
- `npm run lint` - ESLint with `--fix`
- `npm run lint:check` - ESLint without fixing
- `npm run types:check` - `vue-tsc --noEmit`
- `composer lint` - Laravel Pint in parallel
- `composer lint:check` - Laravel Pint dry run
- `composer ci:check` - frontend lint/format/types plus PHP tests

## Testing

- Main PHP test command: `composer test`
  - Runs `php artisan config:clear`, `composer lint:check`, then `php artisan test`.
- Direct Laravel test command: `php artisan test`
- Direct PHPUnit command used in CI: `vendor/bin/phpunit`
- PHPUnit uses in-memory SQLite in `phpunit.xml`; feature tests can safely use `RefreshDatabase`.

### Run a single test

- Single file: `php artisan test tests/Feature/ExampleTest.php`
- Single test name: `php artisan test --filter=test_returns_a_successful_response`
- PHPUnit equivalent: `vendor/bin/phpunit tests/Feature/ExampleTest.php --filter test_returns_a_successful_response`

### Frontend tests

- No frontend test runner is configured. There is no `vitest`, `jest`, or browser E2E script in `package.json`.
- Nearest equivalent for targeted frontend verification is:
  - `npm run lint:check`
  - `npm run types:check`
  - manual verification through `npm run dev` and the `/data-table` Inertia page

## Repo Structure

- `app/` - Laravel models and HTTP middleware
- `database/factories`, `database/seeders`, `database/migrations` - demo data pipeline for the table playground
- `resources/js/app.ts` - Inertia/Vue client bootstrap
- `resources/js/pages` - Inertia page components
- `resources/js/components` - app-specific Vue components
- `resources/js/components/ui` - shadcn-vue/Reka-inspired primitives and composed table UI
- `resources/js/types` - shared TS domain types and TanStack column definitions
- `resources/js/lib` - UI helpers like `cn()` and `formatDate()`
- `routes/web.php` - demo routes

## Backend Conventions (Laravel/PHP)

- Follow PSR-12 plus Laravel Pint defaults; use `composer lint` / `composer lint:check` as the source of truth.
- Keep business/demo data logic close to Eloquent models, factories, seeders, and routes unless a task justifies extraction.
- Use typed return signatures on methods where possible (`: void`, `: array`, `: ?string`).
- Preserve Laravel naming conventions:
  - models in singular PascalCase (`Customer`)
  - tables and DB columns in snake_case
  - route names in kebab-case or dotted Laravel style; existing route is `data-table`
- Match existing attribute casting patterns in models (`protected $casts = [...]`).
- Prefer factories and seeders for prototype data instead of hardcoded arrays in controllers/routes.
- In tests, favor `RefreshDatabase` and route helpers (`route('home')`) over hardcoded URLs.

## Frontend Conventions (Vue/Inertia/TypeScript)

- Use `<script setup lang="ts">` for Vue SFCs.
- Prefer the `@/` alias from `tsconfig.json` over long relative imports.
- Use `import type` for type-only imports; ESLint enforces consistent type imports.
- Keep imports grouped and alphabetized; `eslint-plugin-import` enforces import order.
- Prefer strict, explicit TypeScript types. `strict` mode is enabled; do not bypass it without a reason.
- Reuse shared types from `resources/js/types` before inventing local duplicates.
- Keep Inertia page props explicitly typed with `defineProps<...>()`.
- Prefer small composable UI pieces and barrel exports (`index.ts`) for reusable UI modules.
- Follow existing component naming:
  - page components in PascalCase (`DataTable.vue`)
  - UI primitives in PascalCase files under `components/ui/...`
  - barrel exports from `index.ts`
- Keep domain data shapes snake_case when mirroring Laravel payloads; do not camelCase API fields unless the whole boundary is transformed.

## TanStack Table / Data Table Guidance

- Keep column definitions close to the data type (`resources/js/types/customers.ts` currently owns `Customer` columns).
- Use `createColumnHelper<T>()` and typed `ColumnDef<TData, TValue>` patterns instead of untyped column arrays.
- Prefer TanStack state APIs (`getSortedRowModel`, `getFilteredRowModel`, pagination helpers) over ad-hoc table logic.
- For header and cell rendering, use `FlexRender` and dedicated table header/action components rather than inline template duplication.
- Prototype features should optimize for reusability: filtering, sorting, pagination, empty states, column visibility, and row actions should remain composable.

## shadcn-vue / Tailwind / Styling Guidance

- `components.json` is configured for shadcn-vue with the `new-york` style, `neutral` base color, CSS variables, and aliases rooted at `@/`.
- Reuse existing UI primitives in `resources/js/components/ui` before introducing new bespoke markup.
- Use `cn()` from `@/lib/utils` for class composition.
- Let Prettier plus `prettier-plugin-tailwindcss` sort Tailwind classes; do not hand-optimize class order.
- Keep styling inside the existing Tailwind v4/CSS variable system in `resources/css/app.css`.
- Prefer design tokens and semantic utility usage over hardcoded one-off colors, unless the prototype explicitly needs a visual spike.

## Formatting And Style Details

- `.editorconfig` enforces UTF-8, LF, spaces, and 4-space indentation; YAML uses 2 spaces.
- Prettier uses single quotes, semicolons, width 80, and Tailwind class sorting.
- ESLint enforces curly braces and blank lines around control statements.
- Vue multi-word component names are allowed to be single-word here; do not rename existing primitives just to satisfy generic Vue guidance.
- Some existing files drift from the enforced style; favor the tool-enforced rules over copying inconsistent local formatting.

## Error Handling And Data Safety

- Validate assumptions at the Laravel boundary before sending data to Inertia.
- In frontend utilities, prefer safe fallbacks over crashing on prototype data; `formatDate()` returning a fallback dash is the model to follow.
- Handle nullable fields explicitly (`email`, `phone`, `birth_date`, etc.).
- Do not introduce silent data transformations that make backend and frontend contracts diverge.

## Agent Notes

- No `.cursor/rules/**`, `.cursorrules`, or `.github/copilot-instructions.md` files were found at the time of writing.
- CI currently builds frontend assets in GitHub Actions and runs `./vendor/bin/phpunit`; local documentation should still prefer the higher-level commands above.
- If you add tooling, update this file with exact commands and single-test instructions.
