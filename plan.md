# FiveM Server Portal - VinTa RolePlay

Update the existing portal to match the new server name "VinTa RolePlay", set the owner Discord ID, and apply a specific blue-themed gaming aesthetic with customized application cards.

## Scope Summary
- **Identity Update:** Rename site to "VinTa RolePlay".
- **Access Control:** Set Owner ID to `952506886224228402`.
- **UI/UX Transformation:**
    - High-quality FiveM-themed background (blue focus).
    - Landing cards: Whitelist App, Staff App, Donation.
    - Custom colors for each card (as requested).
    - Entire application in English (remove/prevent Arabic).
- **Admin Control:** Ensure the owner can modify application questions and settings.

## Auth & RLS model
**Auth in scope:** no (using Discord ID check in local state/admin panel)
**Model:** no_auth_controlled_write (client-side validation for admin access)
**RLS strategy:** N/A (local storage persistence)
**Frontend implication:** Admin panel restricted by ID check; show error if unauthorized.

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** not_applicable

## Affected Areas
- `src/lib/store.ts`: Update default settings (site name, owner ID, background).
- `src/pages/Home.tsx`: Update card labels and colors.
- `src/App.tsx` & `src/index.css`: Refine blue theme and global styles.
- `src/pages/Admin.tsx`: Ensure full control over questions and content.

## Phases

### Phase 1: Core Configuration
- Update `src/lib/store.ts` with:
    - `siteName`: "VinTa RolePlay"
    - `ownerId`: "952506886224228402"
    - `backgroundUrl`: A high-quality FiveM/GTA V blue-tinted landscape.
- **Owner:** quick_fix_engineer

### Phase 2: Visual Styling & Localization
- Ensure all text is in English.
- Update `src/pages/Home.tsx` cards:
    - "Whitelist App"
    - "Staff App"
    - "Donation"
- Apply unique colors to each card container/border.
- Update `src/index.css` to use a consistent blue palette (OKLCH or Hex).
- **Owner:** frontend_engineer

### Phase 3: Admin Functionality Refinement
- Ensure the Admin panel allows editing of "Whitelist" and "Staff" questions.
- Verify the "Donation" management works with the new theme.
- **Owner:** frontend_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. quick_fix_engineer — Update core strings and owner ID.
2. frontend_engineer — Implement the blue gaming theme, card colors, and English-only content.

**Per-agent instructions:**

### 1. quick_fix_engineer
- **Phases:** 1
- **Scope:** Update the initial state in `src/lib/store.ts`. Set `siteName` to "VinTa RolePlay" and `ownerId` to "952506886224228402". Find a suitable FiveM blue background URL or use a high-quality placeholder.
- **Files:** `src/lib/store.ts`
- **Depends on:** none
- **Acceptance criteria:** App loads with the correct title and owner ID registered.

### 2. frontend_engineer
- **Phases:** 2, 3
- **Scope:** 
    - Rewrite any Arabic text to English.
    - Style the landing page cards with distinct colors (e.g., Whitelist: Blue, Staff: Cyan, Donation: Gold/Purple or as per best visual fit for "each card its own color").
    - Enhance the "blue style" using shadows, glassmorphism, and blue accents in `src/index.css`.
    - Ensure `src/pages/Admin.tsx` allows the owner to edit all application fields.
- **Files:** `src/pages/Home.tsx`, `src/pages/Admin.tsx`, `src/index.css`, `src/App.tsx`
- **Depends on:** Phase 1
- **Acceptance criteria:** Professional blue gaming UI; 3 cards with distinct colors; all English text; Admin works for the specified ID.

**Do not dispatch:** supabase_engineer
