# Changelog

All notable changes to the project are documented here.

## 2026-08-08

### Architecture

- **Split application into separate frontends** — Split the original monolithic application into two independent Nx applications:
  - `frontend-admin`
  - `frontend-portal`

### Migration

- Updated application structure and component configuration to support the split frontend architecture.
- Migrated shared UI components and assets to the new structure.
- Added changelog

### Other Notes
- Updates github to default to squash merges

## 2026-08-02

### Migration

- **Upgrade to Angular** — Upgraded the application from the original Angular 10 codebase to the current Angular version.
- **Upgrade to Nx** — Migrated the project to Nx and established the Nx workspace structure.