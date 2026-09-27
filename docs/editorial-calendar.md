# Editorial calendar and house rules

Read by the scheduled publishing agent on every run. Not served by the site.

## How a run works

1. Take the first unchecked item in **Queue**. Publish exactly one piece per run.
2. Research it live on the web. Every fact, date, stat and quote must come from a
   source fetched during the run. If a fact cannot be sourced, leave it out.
3. Write it as `content/guides/<slug>.mdx`, copying the frontmatter shape of
   `content/guides/3-5-2-formation-explained.mdx` (author block verbatim).
   `date` is the run's current UTC time. `coverImage: "/images/default.jpg"`,
   `coverImageAlt: "Soccer 365"` (renders a typographic panel).
4. `npm ci && npm run build` must pass. If it fails, fix it or abandon the piece.
5. Tick the item here, add the commit date, and commit both files to `master` with a
   message explaining why the piece exists (the target query and its volume), then push.
   `master` deploys to production automatically.

## House rules

- British English. Answer the searched question in the first bolded sentence.
- 1,200-2,000 words. No filler, no "in conclusion", no "in the world of football".
- Every piece has at least one asset a rival page lacks: a `<Formation>` diagram,
  a comparison table, a stat table or a timeline.
- `<Formation shape="4-3-3" roles="GK,LB,CB,CB,RB,CM,DM,CM,LW,ST,RW" />`: roles are
  goalkeeper first, then each line back to front, left to right. Optional
  `lift="LWB:0.35"` pushes a role forward (negative pulls back), and `caption`.
- Link to 2+ related pages on the site and to primary or reputable sources
  (league, club, UEFA/FIFA, IFAB, ESPN, BBC, FBref, Transfermarkt).
- 5-7 FAQ entries in frontmatter, each answer self-contained.
- Never target a pure definition query ("what does X mean"): Google answers
  those itself. Frame around roles, comparisons, lists, history, data.
- Best-of lists: state the ranking criteria up front, give each player a stat
  line from the current or last completed season, and say which season.
- Never invent quotes, stats, transfer fees or dates. Never name a writer; the byline
  is the Soccer 365 team.
- Do not edit anything outside `content/guides/`, `docs/editorial-calendar.md`,
  and `src/components/article/` (only if a diagram needs a fix).

## Queue

Target query, US monthly volume / keyword difficulty, then category.

- [x] 3-5-2 formation (1,900/21) — tactics — 2026-09-27
- [x] Max Dowman profile (27,100/41) — premier-league — 2026-09-27
- [ ] 4-2-3-1 formation explained (1,900/25) — tactics. Slug `4-2-3-1-formation-explained`.
- [ ] Types of striker: target man, poacher, false 9, complete forward (striker in soccer 1,600/24) — tactics. Slug `types-of-striker-explained`.
- [ ] Best centre-backs in the world 2026 (1,300/23) — premier-league. Slug `best-centre-backs-in-the-world`.
- [ ] Arsenal's Invincibles: the 2003-04 unbeaten season (1,300/32) — premier-league. Slug `arsenal-invincibles-unbeaten-season`.
- [ ] 4-4-2 formation explained (1,300/43) — tactics. Slug `4-4-2-formation-explained`.
- [ ] Full-back vs wing-back vs inverted full-back (wingbacks 590/39, inverted fullback 320/15) — tactics. Slug `fullback-vs-wingback-vs-inverted-fullback`.
- [ ] Best right-backs in the world 2026 (1,000/24) — premier-league. Slug `best-right-backs-in-the-world`.
- [ ] Box-to-box midfielder: the role and its best players (390/19) — tactics. Slug `box-to-box-midfielder-explained`.
- [ ] 4-3-3 formation explained (1,000/37) — tactics. Slug `4-3-3-formation-explained`.
- [ ] The false 9: how it works and who played it best (590/30) — tactics. Slug `false-9-explained`.
- [ ] Best wingers in the world 2026 (480/20) — premier-league. Slug `best-wingers-in-the-world`.
- [ ] Manchester United's 1999 treble (260/35) — premier-league. Slug `manchester-united-1999-treble`.
- [ ] 3-4-3 formation explained (390/26) — tactics. Slug `3-4-3-formation-explained`.
- [ ] Centre-back: the role, the types and what makes a great one (880/40) — tactics. Slug `centre-back-role-explained`.
- [ ] Best left-backs of all time (480/22) — premier-league. Slug `best-left-backs-of-all-time`.
- [ ] Sweeper keeper: how the role changed goalkeeping (390/23) — tactics. Slug `sweeper-keeper-explained`.
- [ ] Football formations explained: every common shape compared (hub; link every formation piece) — tactics. Slug `football-formations-explained`.
- [ ] The No.10, the enganche and the trequartista (number 10 8,100/9 on variant) — tactics. Slug `number-10-enganche-trequartista`.
- [ ] Best defensive midfielders in the world 2026 (110/20) — premier-league. Slug `best-defensive-midfielders-in-the-world`.
- [ ] Manchester City's Centurions: the 100-point season (210/24) — premier-league. Slug `manchester-city-centurions-100-points`.
