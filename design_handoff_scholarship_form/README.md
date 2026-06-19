# Handoff: be nice. School Funding Application Form

## Overview
A 3-page scholarship application form for the **be nice.** program (Mental Health Foundation of West Michigan / MHFWM). Schools fill it out to apply for funding to implement a proactive mental-health / suicide-prevention program. The form collects school information, narrative need statements, and program-impact + readiness commitments, ending with a certification + submit step.

The goal of the implementation is a **working application form**: every field captured, the submission persisted/sent somewhere, and a confirmation shown to the applicant.

## About the Design Files
The file in this bundle (`School Funding Application.dc.html`) is a **design reference created in HTML** — a working prototype showing the intended look, copy, layout, and interaction flow. It is authored in a custom streaming "Design Component" format (`<x-dc>` template + a `class Component extends DCLogic` logic block) that runs in a proprietary runtime. **Do not ship this file directly.**

Your task is to **recreate this design in a real, deployable codebase**. There is no existing codebase yet, so choose an appropriate stack. Recommended: **React + Vite** (or **Next.js** if you want server-side form handling and easy deployment) with plain CSS or CSS modules. The design uses only inline styles and standard HTML form controls, so it ports cleanly to JSX.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and interaction states are final and on-brand. Recreate the UI pixel-accurately using the exact tokens listed below. The visual design follows the **be nice. Design System** (a documented brand system — lowercase headlines, cream background, green/pink palette, Jost font). If your codebase later gains a shared design system, prefer its primitives, but match these values.

## Making It a Working Form (the core ask)
The prototype validates and navigates but does **not** persist or transmit data. To make it usable:

1. **Bind every field to state.** In the prototype only the required fields (School Name, Funding Reason, Certify checkbox) are wired. Every input/textarea/checkbox/radio listed below needs to be controlled (or read on submit) so the full submission is captured.
2. **Choose a submission target.** Options, easiest first:
   - **Form-backend service** (no server to maintain): Formspree, Basin, Web3Forms — POST the JSON on submit.
   - **Google Sheets / Google Forms** via a service or Apps Script endpoint.
   - **Your own backend + database** (Next.js API route / serverless function → Postgres, Supabase, Airtable, etc.) if MHFWM wants to manage applications, statuses, and exports.
3. **Email notification** to the foundation on each submission (most form services do this for free; otherwise send via Resend/SendGrid).
4. **Confirmation + error handling.** Show the success panel on a 200 response; show an inline error and keep data on failure. Consider emailing the applicant a copy.
5. **Spam protection** (honeypot field or service-provided captcha) since this is a public form.
6. **Accessibility:** associate every `<label>` with its control via `htmlFor`/`id`, add `aria-invalid` + `aria-describedby` on errored fields, ensure the required-field error is announced (`role="alert"`), and keep focus management on page changes.

## Screens / Views
The form is a single page with **3 sequential steps** (client-side, no route change in the prototype — but routes per step are fine in your build) plus a **success state**. A 3-segment progress bar and "page N of 3" label reflect progress. Layout is a centered column, `max-width: 760px`, on a cream page background, with the form inside a white rounded card.

### Shared chrome (all steps)
- **Page background:** `#fbf9de` (cream). Full viewport min-height, `padding: 48px 24px`, content centered horizontally.
- **Wordmark** (top-left, above card): "be nice" in `#8dc640` + "." in `#ec068d`, weight 700, font-size 26px, letter-spacing -0.02em, lowercase, baseline-aligned, `margin-bottom: 40px`.
- **Card:** `background: #fff; border-radius: 20px; box-shadow: 0 12px 32px rgba(66,66,66,0.10); overflow: hidden`.
- **Header band** (top of card): `padding: 40px 48px 32px; border-bottom: 1.5px solid rgba(66,66,66,0.10)`.
  - Eyebrow row: "SCHOLARSHIP APPLICATION" (`#898989`) · small 4px dot · "PAGE N OF 3" (`#8dc640`). Both: font-size 11px, weight 600, letter-spacing 0.12em, uppercase. Gap 10px.
  - H1: "school funding application" — font-size 40px, weight 700, lowercase, letter-spacing -0.02em, line-height 1.05, color `#8dc640`, `margin: 0 0 12px`.
  - Intro paragraph (changes per page — see copy below): font-size 16px, line-height 1.6, color `#424242`, `max-width: 52ch`.
  - Progress bar: 3 flex segments, each `height: 6px; border-radius: 999px`, gap 8px, `margin-top: 28px`. Completed/current = `#8dc640`, upcoming = `#f4efc6`. Page 1 → seg1 green; page 2 → seg1+2 green; page 3 → all green.
- **Footer** (bottom of card): `padding: 32px 48px 40px`, flex row, `justify-content: space-between`, `align-items: center`, `gap: 16px`, wrap.
  - Page 1 left side: helper text "* required. your information is kept confidential." (font-size 13px, `#898989`; the `*` is `#ec068d` bold).
  - "back" button appears on pages 2 & 3 (left of primary). Primary button is always right-aligned.

### Step 1 — School Information
- **Purpose:** capture the school and primary contact.
- **Section header:** numbered green circle badge "1" (34×34px, `#8dc640` bg, `#fbf9de` text, weight 700, font-size 16px, border-radius 999px) + H2 "school information" (font-size 24px, weight 700, lowercase, letter-spacing -0.02em, color `#898989`). Gap 14px, `margin-bottom: 28px`.
- **Fields** (vertical stack, `gap: 22px`):
  - **School Name** — required. Label has pink `*`. Full width. Placeholder "e.g. Forest Hills Central High School". Required validation on Continue → error border + message "please enter your school's name to continue."
  - **School District** — full width. Placeholder "e.g. Forest Hills Public Schools".
  - **School Address** — full width. Placeholder "street, city, state, zip".
  - **Primary Contact Name** + **Title / Role** — 2-col grid (`1fr 1fr`, gap 22px). Placeholders "first and last name" / "e.g. school counselor".
  - **Email Address** (`type=email`, placeholder "name@school.org") + **Phone Number** (`type=tel`, placeholder "(000) 000-0000") — 2-col grid.
  - **Principal / Superintendent Name** — full width. Label has muted suffix "optional, but helpful" (font-size 11px, weight 500, `#898989`). Placeholder "first and last name".
- **Primary button:** "continue".

### Step 2 — School Need
- **Purpose:** narrative understanding of the school community and funding rationale.
- **Section header:** badge "2" + H2 "school need".
- **Fields** (stack, `gap: 26px`):
  - **"tell us about your school community."** — bold label (font-size 15px, weight 700, lowercase, `#424242`). Helper "a short paragraph is plenty. you might touch on:" (13px, `#898989`). Then 4 example chips (font-size 12px, weight 500, color `#6fa12d`, background `#f1f7e4`, border-radius 999px, padding 5px 12px, flex-wrap, gap 8px): "student population", "community characteristics", "mental health challenges being observed", "why the program is needed". Then a `<textarea rows=5>`, placeholder "share a little about the students and community you serve…".
  - **"why are you seeking funding assistance?"** — REQUIRED. Wrapped in an emphasized call-out card: `background: #fdf1f8; border: 1.5px solid rgba(236,6,141,0.18); border-radius: 12px; padding: 20px`. Bold label with pink `*`. Sub-note "this is often the most important question — take your time with it." (font-size 13px, weight 600, color `#c4047a`). `<textarea rows=6>`, placeholder "tell us, in your own words, why funding support matters for your school…". Default border `1.5px solid rgba(236,6,141,0.30)`; focus border `#ec068d` + ring `0 0 0 3px rgba(236,6,141,0.22)`. Validation on Continue → error message "please share why you're seeking funding before continuing."
  - **"what barriers would prevent implementation without financial support?"** — bold label. Helper "a short answer is fine." `<textarea rows=3>`, placeholder "e.g. limited budget for training, staffing, or materials…".
- **Buttons:** "back" + "save & continue".

### Step 3 — Impact & Commitment
- **Purpose:** program reach, readiness to execute, reporting agreement, and certification.
- **Section header:** badge "3" + H2 "impact & commitment".
- **Four sub-blocks**, each introduced by an uppercase green sub-label (font-size 12px, weight 700, letter-spacing 0.1em, uppercase, `#8dc640`). Sub-blocks 2–4 have a top divider `1.5px solid rgba(66,66,66,0.08)` with `padding-top: 8px`. Each sub-block stack uses `gap: 22px` and `margin-bottom: 36px`.
  - **PROGRAM IMPACT**
    - 2-col grid: "approx. students impacted" (`type=number min=0`, placeholder "e.g. 850") + "approx. staff participating" (`type=number min=0`, placeholder "e.g. 45").
    - **"how will your school use the program?"** (label suffix "check all that apply", weight 500, `#898989`). 2-col grid of 6 checkbox chips: each is a `<label>` with `display: flex; align-items: center; gap: 10px; font-size: 14px; background: #fff; border: 1.5px solid rgba(66,66,66,0.18); border-radius: 8px; padding: 11px 14px; cursor: pointer` containing a checkbox (`accent-color: #8dc640; 17×17px`). Options: classroom instruction, assemblies, staff training, parent engagement, student leadership, other.
  - **COMMITMENT & READINESS**
    - **"has school leadership approved participation?"** — two pill radios (same `name`), `border-radius: 999px; padding: 10px 20px`, accent-color `#8dc640`: "yes" / "no".
    - **"who will serve as the program champion / coordinator?"** — text input, placeholder "name and role".
    - **"describe your implementation plan."** — helper "a few sentences — this helps us identify schools that are ready to execute, not just seeking funding." `<textarea rows=4>`, placeholder "how and when will you roll the program out across the school year?".
  - **REPORTING COMMITMENT**
    - Lead-in (font-size 14px, weight 600): "if awarded funding, our school agrees to:". Then 4 stacked checkboxes (checkbox `accent-color: #8dc640; 17×17px; margin-top: 2px; flex: none`, label `display: flex; align-items: flex-start; gap: 11px; font-size: 14px; line-height: 1.45`):
      - implement the program during the funded school year
      - provide a brief year-end impact report
      - share participation and outcome information requested by the foundation
      - allow anonymized results to be used in donor impact reporting
  - **CERTIFICATION**
    - 3-col grid (`1.4fr 1fr 1fr`, gap 18px): "applicant name" (placeholder "first and last name") + "title" (placeholder "role") + "date" (`type=date`).
    - **Certify checkbox** — REQUIRED. A highlighted `<label>` block: `background: #f1f7e4; border: 1.5px solid rgba(141,198,64,0.45); border-radius: 12px; padding: 16px 18px`. Checkbox `accent-color: #8dc640; 19×19px`. Text: "* i certify that the information provided is accurate and complete." (pink `*`). On submit without it checked → border turns `#fb6619` + message "please confirm the certification to submit your application."
- **Buttons:** "back" + "submit application".

### Success State
Replaces the entire card on successful submit. Centered, `padding: 64px 48px`:
- Green circle (64×64px, `#8dc640` bg, `#fbf9de` "✓", font-size 32px, weight 700, border-radius 999px, `margin: 0 auto 24px`).
- H1 "thank you — your application is in." (font-size 36px, weight 700, lowercase, `#8dc640`).
- Paragraph (`max-width: 46ch`, centered, font-size 16px, line-height 1.6, `#424242`): "we've received your scholarship application. our team will review it and reach out to your primary contact within two weeks. thank you for working to build a psychologically safer community."

## Interactions & Behavior
- **Navigation:** "continue" advances step 1→2→3 (each gated by its required field); "submit application" on step 3 validates the certify checkbox then shows the success state. "back" decrements the step. On every transition, `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- **Validation (current rules — extend as needed):**
  - Step 1: School Name non-empty (trimmed).
  - Step 2: Funding Reason non-empty (trimmed).
  - Step 3: Certify checkbox checked.
  - On error: input/textarea/checkbox-card border → `#fb6619`, inline message in `#fb6619` (font-size 12px, weight 500). Error clears as soon as the field changes.
  - **Recommended additions for production:** email format, phone format, required Applicant Name + Date on certification, and at least one "use the program" option.
- **Input focus state (all text inputs/textareas):** border → `#8dc640`, `box-shadow: 0 0 0 3px rgba(141,198,64,0.35)`. (The funding-reason textarea uses the pink variant: border `#ec068d`, ring `rgba(236,6,141,0.22)`.)
- **Button states:**
  - Primary (pink): default `background: #ec068d; color: #fbf9de`. Hover `background: #f33ea4; box-shadow: 0 4px 12px rgba(236,6,141,0.25)`. (Press, per design system: `#c4047a` + `transform: scale(0.97)`.) Padding 13px 30px, border-radius 999px, weight 700, lowercase, font-size 16px, transition `all 180ms cubic-bezier(.2,0,.2,1)`.
  - Back (ghost): transparent bg, `color: #898989`, `border: 1.5px solid rgba(66,66,66,0.18)`. Hover `background: #f4efc6; color: #424242`. Padding 13px 28px.
- **Transitions:** 120–180ms, ease-out (`cubic-bezier(.2,0,.2,1)`). No bounce/spring (brand rule).

## State Management
Prototype state (expand to hold all fields):
- `page` (1 | 2 | 3)
- `submitted` (boolean → toggles success view)
- Field values: currently only `schoolName`, `fundingReason`, `certify`. **Add:** district, address, contactName, titleRole, email, phone, principalName (step 1); communityNarrative, barriers (step 2); studentsImpacted, staffParticipating, usageOptions[] (multi), leadershipApproved (yes/no), champion, implementationPlan, applicantName, applicantTitle, applicantDate (step 3).
- Error flags: `schoolNameError`, `fundingReasonError`, `certifyError` (extend per added validation).
- **Submission:** on final submit, assemble all values into one object and POST to your chosen endpoint; set `submitted = true` on success.

## Design Tokens
**Colors**
- Nice green (primary/headlines): `#8dc640` · tint `#b6db7a` · shade `#6fa12d`
- Invite pink (CTA/highlight): `#ec068d` · tint `#f33ea4` · shade `#c4047a`
- Challenge orange (errors/warning): `#fb6619`
- Empower blue: `#22a4e4`
- Background cream: `#fbf9de` · cream shade (panels/progress track): `#f4efc6`
- Light green wash (chips/cert card): `#f1f7e4`
- Pink wash (funding call-out): `#fdf1f8`
- Paragraph gray (body): `#424242` · gray (secondary): `#898989` · placeholder: `#b3b1a4`
- White: `#fff`
- Borders: `rgba(66,66,66,0.18)` (inputs) · `rgba(66,66,66,0.10)` / `rgba(66,66,66,0.08)` (dividers)

**Typography**
- Font family: **Jost** (Google Fonts, weights 400/500/600/700) — substitute for the brand's licensed Century Gothic. Import `https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap`. Fallback stack: `'Jost','Century Gothic','URW Gothic','Avant Garde', system-ui, sans-serif`.
- Headlines are **lowercase** (brand rule), weight 700, letter-spacing -0.02em.
- Scale used: 40px (H1), 36px (success H1), 24px (H2), 16px (body/buttons), 15px (inputs/strong labels), 14px (checkbox labels), 13px (field labels/helpers), 12px (chips/sub-labels/errors), 11px (eyebrow/optional suffix).
- Weights: 400 body, 500 muted, 600 field labels/eyebrows, 700 headlines/buttons/strong labels.
- Line-heights: 1.05 H1, 1.45–1.6 body/helpers.

**Spacing (8-pt scale):** 4 / 8 / 12 / 16 / 22 / 24 / 28 / 32 / 36 / 40 / 48 px as used above.

**Radius:** inputs 6px · chips/checkbox-chips 8px · cards & call-outs 12px · card shell 20px · pills/buttons/badges/progress 999px.

**Shadow:** card `0 12px 32px rgba(66,66,66,0.10)`; button hover `0 4px 12px rgba(236,6,141,0.25)`; focus ring `0 0 0 3px rgba(141,198,64,0.35)`.

**Motion:** durations 120/180ms, easing `cubic-bezier(.2,0,.2,1)`.

## Assets
- **Wordmark** is rendered as styled text (no image needed): "be nice" green + "." pink. If MHFWM provides an official logo SVG, swap it in.
- **Font:** Jost via Google Fonts CDN (see above). If you license Century Gothic, replace the family.
- **Icons:** none used. The success checkmark is a Unicode "✓". The brand system suggests Lucide if you add icons later.
- No photography or illustration in this design.

## Files
- `School Funding Application.dc.html` — the full design prototype (all 3 steps + success state), in the proprietary Design Component format. Reference for exact markup, inline styles, and the validation/navigation logic (`class Component extends DCLogic`). Open it in the originating tool to view live; it will not run standalone.

## Brand Reference
This follows the **be nice. Design System** by the Mental Health Foundation of West Michigan. Key rules to preserve: lowercase headlines & wordmark (with trailing period), cream background (not white), flat color (no gradients/textures), pink used sparingly for emphasis/CTA only, warm/inviting/non-clinical tone.
