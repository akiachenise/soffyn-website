# soffyn — Messaging System & Rebrand Reference

*Locked June 2026. This is the source of truth for all soffyn copy decisions.*

-----

## 1. The canonical tagline (verbatim, never paraphrased)

> **soffyn (v.) like soften — to stop holding it all together.**

The brand strategy in one sentence: soffyn isn’t a name, it’s a verb we’re
teaching. The definition device is the spine of the brand the way breath is
the spine of Exhale’s — one metaphor, run through everything.

**Placements:**

- og:title (all pages): the canonical line
- Footer (all pages): `soffyn (v.) like soften.` / `to unclench. to let go. to just be.`
- HTML title tag stays keyword-led for SEO: `soffyn | Wellness App for Neurodivergent Black Women`

## 2. The hero

- **H1:** You hold it together all day. At work. In every room. soffyn is where you don’t have to.
- **Sub:** A wellness app built for neurodivergent Black women — affirmations, journaling, and goals that never ask you to perform. No streaks. No shame.
- **Primary CTA:** Find my space → (#waitlist). “Learn more” is secondary.
- **Meta description:** You spend all day masking, performing, and holding it together. soffyn is where you soften. Built for neurodivergent Black women. Free to start, always. No streaks, no shame.

## 3. The chorus (two beats, said identically every time)

1. **No streaks. No shame.**
1. **Still here when you come back.**

Rule: standalone/headline uses are verbatim. Inside flowing body prose,
natural phrasing wins (e.g., the About page’s “still there when you come back
from a long while away” stays as written).

## 4. Feature headlines (each phrased as a release)

- Affirmations: *Affirmations you don’t have to brace against.*
- Journaling: *However the thought comes out.* (unchanged — original copy)
- Focus timer: *A soft start, before you talk yourself out of it.*
- Mood check-in: *Noticing, not scoring.*
- Goal tracking: *Held, not graded.*

Section H2: *Finally — soften. Something that gets you.* (replaces the old
“exhale” headline — never use a competitor’s verb as our own.)

## 5. Founding Member scarcity — Option A (deadline-only, no cap)

**The rule:** Every woman who joins the waitlist before launch is a Founding
Member — full access, free forever. The door closes the day soffyn launches
and never reopens. There is NO numeric cap. The number 150 is retired
everywhere.

- **Announce bar (all pages):** The Founding Member door closes at launch. Full access — free forever. → Find my space
- **Homepage FM section:** “Every woman who joins before September is a Founding Member. The door closes the day soffyn launches, and it never reopens. I’m not changing my mind about the people who showed up early.”
- **FM page badge:** “Limited — closes at launch” (kept as-is)
- **FAQ addition:** “There’s no cap. There’s a deadline. After launch, the door is closed for good.”

**Count-up mechanic:** “{count}+ women already inside.” Built but hidden
behind SHOW_WAITLIST_COUNT flag. Flip to true once waitlist crosses ~100.
Count is a manually-bumped constant; “+” phrasing keeps it honest between
updates. Count UP (social proof), never down (fake scarcity).

## 6. Retired copy

- **“Your safe space to just be”** — off all meta/OG tags, out of tagline
  rotation. May survive inside body prose, but never carries the brand.
- **“150 women. That’s it.”** and all 150-spot references — dead.
- **“exhale”** as headline verb — dead.

## 7. Voice rules

- First-person singular, always. soffyn is “I/my/me,” never “we/our/us”
  (except “we” meaning reader + Akia together).
- Nav logo: `soffyn` (clean, no ™) with aria-label=“soffyn home”. Footer
  logo: `soffyn™`. The ™ appears exactly once per page, in the footer.
- About page body copy is locked as Akia’s original. Heading fix only
  (H2: “The app I needed didn’t exist. So I’m building it.”).

## 8. Competitive positioning notes

- **Exhale** (direct competitor, app for Black women’s wellbeing): owns the
  breath metaphor end-to-end. The lesson taken: single-metaphor coherence,
  infinite repetition. NOT taken: their political/collective register —
  soffyn’s register is personal, intimate, one-builder.
- **Noir Pages** (noirpages.com, reading app for Black women): runs uncapped
  pre-launch waitlist (same as our Option A) with a retroactive “first 100
  readers” thank-you — a recognition beat, not a gate. Parked for soffyn’s
  launch comms. Note: they run streaks with grace days — confirms no-streaks
  is still a differentiator even among well-intentioned brands in this space.
- **Black Girl Hug** (events + card deck, Black women’s wellness): category
  language saturation evidence — safe space/healing/sisterhood is table
  stakes vocabulary, which is why the soften device matters.

## 9. Deferred / future work

- **Flip the count-up** (SHOW_WAITLIST_COUNT → true) once waitlist ≥ ~100.
- **“First believers” thank-you** — launch-day email + in-app badge for
  earliest signups (Noir Pages pattern). Launch comms batch.
- **Structure batch:** homepage section order vs. the new hero. (About
  rebuild was cancelled — original copy stays.)
- **Netlify reminder:** CDN cache lies after deploys. curl the live site to
  confirm new copy before trusting the browser.

-----

## Appendix: The full Claude Code batch prompt (as run, June 2026)

```
Start in plan mode. Show me the full plan of changes before executing anything.

This is a site-wide copy and messaging update for the soffyn website — a
Vite/React SPA in this repo. Work on a new branch and open a PR when done; do
not push to main. Do not delete any code comments. Do not change layout,
styling, or component structure except where explicitly stated below. Copy
lives in React components — grep for the existing strings to locate them.

== 1. CANONICAL TAGLINE SYSTEM ==

The brand tagline is now, verbatim:
soffyn (v.) like soften — to stop holding it all together.

a) HTML <title> tag (homepage): keep keyword-led —
   "soffyn | Wellness App for Neurodivergent Black Women"
b) og:title (homepage and any page inheriting a default):
   "soffyn (v.) like soften — to stop holding it all together."
c) Meta description (homepage):
   "You spend all day masking, performing, and holding it together. soffyn is
   where you soften. Built for neurodivergent Black women. Free to start,
   always. No streaks, no shame."
d) Remove "Your safe space to just be" from all meta/OG tags site-wide. Leave
   any instance that appears inside body paragraph copy untouched.
e) Footer: replace the current footer tagline block with two lines:
   "soffyn (v.) like soften."
   "to unclench. to let go. to just be."

== 2. HOMEPAGE HERO ==

Replace the current H1 (the one beginning "Something's been missing") with:
"You hold it together all day. At work. In every room. soffyn is where you
don't have to."

Replace the hero subheadline with:
"A wellness app built for neurodivergent Black women — affirmations,
journaling, and goals that never ask you to perform. No streaks. No shame."

Add a primary CTA button in the hero linking to #waitlist with the label
"Find my space". Reuse the existing primary button component/styles. Demote
the existing "Learn more" link to secondary styling. Do not otherwise change
hero layout.

== 3. SECTION HEADLINE FIX ==

Find the H2 that reads "Finally. exhale. Something that gets you." Replace
with: "Finally — soften. Something that gets you."

== 4. FEATURE HEADLINES ==

In the features section, replace headlines as follows (body copy under each
stays exactly as-is):
- Affirmations headline → "Affirmations you don't have to brace against."
- Journaling headline → leave unchanged ("However the thought comes out.")
- Focus timer headline → "A soft start, before you talk yourself out of it."
- Mood check-in headline → "Noticing, not scoring."
- If a goal-tracking feature card exists → "Held, not graded."

== 5. CHORUS STANDARDIZATION ==

Two recurring lines must appear verbatim wherever their idea appears:
a) "No streaks. No shame." — find variants like "no streaks, no shame, no
   pressure" or reworded versions in headlines/taglines and standardize.
   Inside long body paragraphs, leave natural phrasing alone.
b) "Still here when you come back." — the return/no-punishment idea appears
   roughly 3 times across the site in different wordings. Standardize the
   short standalone versions to this exact line.

== 6. FOUNDING MEMBER SCARCITY (deadline-only, no cap) ==

a) Announce bar (all pages): replace the current text with:
   "The Founding Member door closes at launch. Full access — free forever."
   Keep the existing "Find my space →" link and its current href behavior
   (#waitlist on homepage, /waitlist elsewhere).
b) Homepage Founding Member section: remove "150 women. That's it." and any
   other reference to 150 spots. Replace that copy with:
   "Every woman who joins before September is a Founding Member. The door
   closes the day soffyn launches, and it never reopens. I'm not changing my
   mind about the people who showed up early."
c) Founding Members page: keep the "Limited — closes at launch" badge exactly
   as-is. Remove any reference to 150 or a numeric cap anywhere on the page.
d) Count-up component: create a small component that renders
   "{count}+ women already inside." Drive it from a single exported constant
   (e.g. WAITLIST_COUNT) plus a boolean flag (e.g. SHOW_WAITLIST_COUNT) in one
   config/constants file. Set the flag to false for now. Place the component
   (hidden behind the flag) where the "150" visual was on the homepage and in
   the equivalent spot on the Founding Members page. Add a code comment:
   "Flip SHOW_WAITLIST_COUNT to true once count crosses ~100."

== 7. FAQ FIXES ==

a) The question "Will soffyn be free?" — change the question to "Is soffyn
   free?" and replace the bolded "Yes." opener with "Free to start, always."
   Keep the rest of the tier explanation, but it must not describe soffyn as
   simply free.
b) Two consecutive FAQ answers (launch timing and platforms) currently repeat
   the same sentence verbatim. Merge into one Q&A covering both launch date
   and platforms; delete the redundant entry.
c) In the "What does Founding Member mean" answer, append:
   "There's no cap. There's a deadline. After launch, the door is closed for
   good."

== 8. HEADING STRUCTURE ==

a) About page: the H1 and H2 are currently the identical sentence. Keep the
   H1. Change the H2 to: "The app I needed didn't exist. So I'm building it."
b) Waitlist page: the page has no H1 — it starts at H2. Promote the existing
   "You've been looking for this. Here it is." heading to an H1. Match the
   visual size to other page H1s using existing styles only.

== 9. BLOG FIXES ==

a) Blog index: the three post cards all show "April 2026". Correct each to
   match its post's own date: ADHD burnout post → February 2026;
   goals/streaks post → March 2026; self-care guide → April 2026.
b) In the goals/streaks post, find the pull-quote attributed to "Akia,
   founder of soffyn". Keep the quote, remove the attribution line (it's a
   self-quote inside the author's own article).

== 10. VOICE SWEEP: I, not we ==

The site voice is first-person singular. On the Accessibility page and in the
FAQ privacy answer, change "we/our/us" referring to soffyn to "I/my/me" and
fix verb agreement. Do NOT change "we" when it refers to the reader and the
author together (e.g. "we both know"). List every instance in the plan so I
can review each one before you commit.

== 11. LOGO / NAV CONSISTENCY ==

The nav logo renders differently on the homepage vs all other pages:
- Homepage: <a href="/" class="nav-logo" aria-label="soffyn home">soffyn</a>
- All subpages: <a href="/" class="nav-logo">soffyn™</a>

Standardize site-wide to the homepage version: text "soffyn" (no ™), with
aria-label="soffyn home". The footer logo keeps "soffyn™" unchanged — that
remains the trademark placement on every page.

Likely cause is duplicated nav markup. If there are two nav implementations
(or hardcoded nav copies per page/layout), consolidate to a single shared Nav
component used everywhere so this can't drift again. Show this consolidation
in the plan. If it's already one component with a conditional, remove the
conditional.

== VERIFICATION ==

After changes: run the build, then grep the built output to confirm:
(1) zero remaining instances of "150" in marketing copy,
(2) zero instances of "Your safe space to just be" in meta/OG tags,
(3) the word "exhale" no longer appears in any headline,
(4) "No streaks. No shame." and "Still here when you come back." each appear
    with consistent punctuation everywhere they're used,
(5) "soffyn™" appears exactly once per page (footer only) and every nav-logo
    link has aria-label="soffyn home".
Report the grep results in your PR description, along with a page-by-page
summary of what changed.
```

## PR review checklist (for the run in progress)

- [ ] Section 5b: reject any chorus swap inside flowing prose (esp. About page’s “still there when you come back from a long while away”)
- [ ] Section 7b: confirm the FAQ merge didn’t lose information
- [ ] Section 10: review each I/we change individually
- [ ] Section 11: confirm nav consolidation didn’t break any page
- [ ] Check Netlify deploy preview: hero, announce bar, Founding Members section
- [ ] After merge: curl live site before trusting browser (CDN cache)