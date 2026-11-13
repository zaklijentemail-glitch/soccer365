# Editorial calendar and house rules

Read by the scheduled publishing agent on every run. Not served by the site.

## How a run works

1. Take the first unchecked item in **Queue**. Publish exactly one piece per run.
2. Research it live on the web. Every fact, date, stat and quote must come from a
   source fetched during the run. If a fact cannot be sourced, leave it out.
3. Write it as `content/guides/<slug>.mdx`, copying the frontmatter shape of
   `content/guides/3-5-2-formation-explained.mdx` (author block verbatim).
   `date` is the run's current UTC time. Keep `coverImage: "/images/default.jpg"` and
   add a `cover:` block (see **Cover image** below); the site draws the cover from it.
   `coverImageAlt` must describe that cover in one sentence.
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
  is the Soccer 365 team. The site-wide editor credit (Faris Zenunović) is added by the
  layout; never mention him, first-hand experience or "we watched" claims in article text.
- **Never write or edit `editorsTake`.** It is the editor's own view, added by him after he
  reads the piece. A take written by anyone else would be a false claim about who wrote it.
- Do not edit anything outside `content/guides/`, `docs/editorial-calendar.md`,
  and `src/components/article/` (only if a diagram needs a fix).

## Cover image

Every new piece gets a `cover:` block in its frontmatter, placed just before `featured:`.
The site renders it at `/cover/<slug>` (1200x675) in the house style: title left, three
facts right, a formation diagram or a photo behind. Copy this shape:

```yaml
cover:
  title: ["The 4-3-3", "formation", "*explained"]   # 2-4 short lines; "*" = yellow line
  kicker: "Tactics"                                 # small label above the title
  fontSize: 74                                      # lower it (56-66) for long lines
  pitch:                                            # EITHER a pitch ...
    shape: "4-3-3"
    roles: "GK,LB,CB,CB,RB,CM,DM,CM,LW,ST,RW"
    highlight: ["LW", "RW"]                         # roles drawn in red
  # photo: "/images/covers/sources/<slug>.jpg"      # ... OR a photo, with:
  # photoPosition: "center 20%"
  # credit: "Photo: <Author>, <Licence>, via Wikimedia Commons"
  items:                                            # exactly three, short
    - { icon: "shield", head: "Back four", text: "Two centre-backs, two full-backs" }
    - { icon: "star", head: "Front three", text: "Two wide forwards and a striker" }
    - { icon: "target", head: "Pressing", text: "Three forwards press the back line" }
```

Icons: shield, users, target, run, trophy, clock, ruler, star, list, card, whistle,
pound, ball, calendar, arrows. Every fact on the cover must also be in the article.

- **Tactics pieces:** use `pitch`, no photo.
- **Rules and money pieces** with one key figure: use
  `bigNumber: { value: "+3", caption: "the board shows a minimum" }` (value of 1-6
  characters, no photo, no pitch). The figure must appear in the article.
- **Player, club, season and list pieces:** use a photo, and only from Wikimedia
  Commons with licence **CC0, CC BY or CC BY-SA** (check `LicenseShortName` through the
  Commons API: `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|extmetadata&format=json&titles=File:<name>`).
  Download it at 1600px wide from
  `https://commons.wikimedia.org/wiki/Special:FilePath/<name>?width=1600` into
  `public/images/covers/sources/<slug>.jpg`, set `credit` to the author and licence, and add
  a row to `public/images/guides/CREDITS.md`. Never use a photo from Google, news sites,
  agencies (Getty, Reuters, AP), club sites or social media. Skip any photo where a
  trademark or logo other than kit badges dominates the frame. If no suitable Commons
  photo exists, use a pitch or leave out both `pitch` and `photo`.

## Queue

Target query, US monthly volume / keyword difficulty, then category.

- [x] 3-5-2 formation (1,900/21) — tactics — 2026-09-27
- [x] Max Dowman profile (27,100/41) — premier-league — 2026-09-27
- [x] 4-2-3-1 formation explained (1,900/25) — tactics. Slug `4-2-3-1-formation-explained`. — 2026-09-28
- [x] Types of striker: target man, poacher, false 9, complete forward (striker in soccer 1,600/24) — tactics. Slug `types-of-striker-explained`. — 2026-09-29
- [x] Best centre-backs in the world 2026 (1,300/23) — premier-league. Slug `best-centre-backs-in-the-world`. — 2026-10-01
- [x] Arsenal's Invincibles: the 2003-04 unbeaten season (1,300/32) — premier-league. Slug `arsenal-invincibles-unbeaten-season`. — 2026-10-02
- [x] 4-4-2 formation explained (1,300/43) — tactics. Slug `4-4-2-formation-explained`. — 2026-10-03
- [x] Full-back vs wing-back vs inverted full-back (wingbacks 590/39, inverted fullback 320/15) — tactics. Slug `fullback-vs-wingback-vs-inverted-fullback`. — 2026-10-04
- [x] Best right-backs in the world 2026 (1,000/24) — premier-league. Slug `best-right-backs-in-the-world`. — 2026-10-05
- [x] Box-to-box midfielder: the role and its best players (390/19) — tactics. Slug `box-to-box-midfielder-explained`. — 2026-10-06
- [x] 4-3-3 formation explained (1,000/37) — tactics. Slug `4-3-3-formation-explained`. — 2026-10-07
- [x] Best wingers in the world 2026 (480/20) — premier-league. Slug `best-wingers-in-the-world`. — 2026-10-08
- [x] Manchester United's 1999 treble (260/35) — premier-league. Slug `manchester-united-1999-treble`. — 2026-10-09
- [x] 3-4-3 formation explained (390/26) — tactics. Slug `3-4-3-formation-explained`. — 2026-10-10
- [x] Centre-back: the role, the types and what makes a great one (880/40) — tactics. Slug `centre-back-role-explained`. — 2026-10-11
- [x] Best left-backs of all time (480/22) — premier-league. Slug `best-left-backs-of-all-time`. — 2026-10-12
- [x] Sweeper keeper: how the role changed goalkeeping (390/23) — tactics. Slug `sweeper-keeper-explained`. — 2026-10-13
- [x] Football formations explained: every common shape compared (hub; link every formation piece) — tactics. Slug `football-formations-explained`. — 2026-10-14
- [x] The No.10, the enganche and the trequartista (number 10 8,100/9 on variant) — tactics. Slug `number-10-enganche-trequartista`. — 2026-10-15
- [x] Best defensive midfielders in the world 2026 (110/20) — premier-league. Slug `best-defensive-midfielders-in-the-world`. — 2026-10-16
- [x] Manchester City's Centurions: the 100-point season (210/24) — premier-league. Slug `manchester-city-centurions-100-points`. — 2026-10-17
- [x] Sócrates: the doctor who captained Brazil (socrates soccer brazil 4,400/22) — world-cup. Slug `socrates-brazil-profile`. — 2026-10-18
- [x] Best left-backs in the world 2026 (good left backs 480/24, best left backs 390/20) — premier-league. Slug `best-left-backs-in-the-world`. Link to the all-time list. — 2026-10-19
- [x] Regista vs mezzala vs carrilero: Italy's midfield roles (mezzala 260/8, regista 90/36, carrileros) — tactics. Slug `regista-mezzala-carrilero-explained`. — 2026-10-20
- [x] Carlos Vela: career, clubs and records (carlos vela 18,100) — world-cup. Slug `carlos-vela-profile`. — 2026-10-21
- [x] Who owns Real Madrid? How the socio model works (owner of real madrid football club 880/25) — rules. Slug `who-owns-real-madrid`. — 2026-10-22
- [x] Premier League's youngest players in 2026-27 (260/38) — premier-league. Slug `premier-league-youngest-players`. Link to the Max Dowman profile. — 2026-10-23
- [x] Best right-backs of all time (480/24) — premier-league. Slug `best-right-backs-of-all-time`. Link to the 2026 list. — 2026-10-24
- [x] The 50+1 rule: why Bundesliga clubs cannot be bought (50 1 rule 140/29) — rules. Slug `50-plus-1-rule-bundesliga`. Link to who-owns-real-madrid. — 2026-10-25
- [x] Guardiola's Barcelona 2008-12: the best team of all time? (barcelona best team of all time 140/23) — champions-league. Slug `guardiola-barcelona-best-team`. — 2026-10-26
- [x] Best goalkeepers in the world 2026 (110) — premier-league. Slug `best-goalkeepers-in-the-world`. Link to sweeper-keeper. — 2026-10-28
- [x] Hamit Altıntop: career and the Bayern years (hamit altintop 320/21) — champions-league. Slug `hamit-altintop-profile`. — 2026-11-02
- [x] Best centre-backs of all time (best center back ever 70/26) — premier-league. Slug `best-centre-backs-of-all-time`. Link to the 2026 list. — 2026-11-04
- [x] Illan Meslier: career, clubs and records (illan meslier 1,300/45, meslier 590/49) — premier-league. Slug `illan-meslier-profile`. — 2026-11-06
- [x] Michael Carrick: the player and the coach (carrick footballer 590/29) — premier-league. Slug `michael-carrick-profile`. — 2026-11-09
- [x] What was a half-back? Football's old positions and what became of them (fullback vs halfback 590/25) — tactics. Slug `half-back-old-football-positions`. Link to the formations hub. — 2026-11-11
- [x] Promotion and relegation in Liga MX explained (ascenso y descenso liga mx 210/27) — rules. Slug `liga-mx-promotion-relegation-explained`. — 2026-11-13
- [ ] 2027 Women's World Cup: hosts, dates and format (2027 womens world cup 320/41) — world-cup. Slug `womens-world-cup-2027-format`.
- [ ] Andy Cole and Dwight Yorke: the 1999 strike partnership (70/22) — premier-league. Slug `andy-cole-dwight-yorke-partnership`. Link to the 1999 treble guide.
- [ ] Baresi and Maldini: how Milan's back four worked (baresi and maldini 70/21) — tactics. Slug `baresi-maldini-milan-defence`.
- [ ] Academy contracts: scholarships and first professional deals (academy contracts 70/12) — rules. Slug `academy-contracts-scholarships-explained`. Link to the Dowman and Monga profiles.
- [ ] Can football clubs swap players? Swap deals explained (can you trade players in soccer 50/22) — transfers. Slug `swap-deals-explained`.
- [ ] How the Ballon d'Or is decided (ballon d or how to win 40/27) — rules. Slug `how-the-ballon-dor-is-decided`.
- [ ] Premier League relegation rules and tiebreakers (premier league relegation rules 140/50) — rules. Slug `premier-league-relegation-rules`.
- [ ] Best strikers in the world 2026 — premier-league. Slug `best-strikers-in-the-world`. Link to types-of-striker.
