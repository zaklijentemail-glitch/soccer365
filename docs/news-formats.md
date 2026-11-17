# Recurring news formats

Read by the scheduled news routine. One piece per run, chosen by the UTC weekday.
Search demand from Semrush (US), see seo-audit/semrush/ROUND5.

| Run day | Format | Slug pattern | Target query |
| --- | --- | --- | --- |
| Monday | Premier League power rankings after the weekend's games | `premier-league-power-rankings-matchday-<N>` | premier league power rankings (480/38), table predictions (170/17), relegation predictions (140/20) |
| Thursday, first of the month | Ballon d'Or power rankings, top 10 | `ballon-dor-power-rankings-<month>-<year>` | ballon d'or favorites (590/48), ballon d'or power rankings (390/44) |
| Thursday, otherwise | Premier League Golden Boot race | `premier-league-golden-boot-race-matchday-<N>` | golden boot race (33,100/54) |

If the format's data does not exist yet (no new matchday since the last edition,
international break), stop and report; do not publish a filler piece.

## Rules

- Write to `content/news/<slug>.mdx`, category `premier-league`, tags include
  `power-rankings` (never `rankings`, which is reserved for the evergreen lists).
- Every number (points, goals, positions, results) comes from a page fetched on
  this run: premierleague.com, BBC Sport or ESPN tables and stats. If two disagree,
  use the league's own figure.
- At least two thirds of the piece is our own analysis: why each team or player is
  where they are, form, fixtures ahead, what changed since last week. Never retell
  another outlet's story, never quote anyone unless the quote is on a fetched page.
- No betting odds, bookmaker names or tips. Rank on performance only.
- Link the previous edition of the same format if it exists (list `content/news/`),
  and two relevant guides or lists from `content/guides/`.
- 800-1,300 words. A ranked table near the top, then a short paragraph per entry.
- Cover: `cover:` block with `bigNumber` (for example value "MD13", caption
  "Premier League power rankings") and three `items` that are facts from the piece.
  No photo needed. `coverImage: "/images/default.jpg"`.
- Frontmatter shape: copy `content/news/enzo-fernandez-squad-number-manchester-city.mdx`
  (author block verbatim, 4-6 FAQ entries). Never write `editorsTake`.
