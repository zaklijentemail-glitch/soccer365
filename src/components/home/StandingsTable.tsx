"use client";

import { MAX_STANDINGS_GROUPS_DISPLAYED } from "@/lib/football/config";
import type { StandingGroup, StandingRow, StandingsResult } from "@/lib/football/types";

function FormDots({ form }: { form: string }) {
  const letters = form.slice(-5).split("");
  if (letters.length === 0) return null;

  return (
    <div className="flex gap-1" aria-label={`Last ${letters.length} results, most recent last: ${letters.join(", ")}`}>
      {letters.map((letter, i) => (
        <span
          key={i}
          aria-hidden
          className={`h-2 w-2 rounded-full ${
            letter === "W" ? "bg-emerald-600" : letter === "D" ? "bg-amber-500" : "bg-accent"
          }`}
        />
      ))}
    </div>
  );
}

function GroupTable({ group }: { group: StandingGroup }) {
  return (
    <table className="w-full text-sm">
      <caption className="mb-2 text-left text-xs font-bold uppercase tracking-wide text-ink-faint">
        {group.name}
      </caption>
      <thead>
        <tr className="border-b border-line text-[11px] uppercase tracking-wide text-ink-faint">
          <th scope="col" className="py-1.5 pr-2 text-left font-bold">
            Pos
          </th>
          <th scope="col" className="py-1.5 pr-2 text-left font-bold">
            Team
          </th>
          <th scope="col" className="hidden py-1.5 pr-2 text-center font-bold sm:table-cell">
            Pl
          </th>
          <th scope="col" className="py-1.5 pr-2 text-center font-bold">
            Pts
          </th>
          <th scope="col" className="py-1.5 text-left font-bold">
            Form
          </th>
        </tr>
      </thead>
      <tbody>
        {group.rows.map((row: StandingRow) => (
          <tr key={`${group.name}-${row.rank}-${row.team}`} className="border-b border-line last:border-0">
            <td className="py-1.5 pr-2 font-bold tabular-nums text-ink">{row.rank}</td>
            <td className="py-1.5 pr-2 font-medium text-ink">{row.team}</td>
            <td className="hidden py-1.5 pr-2 text-center tabular-nums text-ink-soft sm:table-cell">{row.played}</td>
            <td className="py-1.5 pr-2 text-center font-bold tabular-nums text-ink">{row.points}</td>
            <td className="py-1.5">
              <FormDots form={row.form} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function StandingsTable({ result }: { result: StandingsResult | null }) {
  if (!result) {
    return <p className="text-sm text-ink-faint">Standings aren&apos;t available right now.</p>;
  }

  const shown = result.groups.slice(0, MAX_STANDINGS_GROUPS_DISPLAYED);
  const hiddenCount = result.groups.length - shown.length;

  return (
    <div>
      <div className={`gap-x-8 gap-y-6 ${shown.length > 1 ? "grid sm:grid-cols-2" : ""}`}>
        {shown.map((group) => (
          <GroupTable key={group.name} group={group} />
        ))}
      </div>
      {hiddenCount > 0 && <p className="mt-4 text-sm text-ink-faint">+{hiddenCount} more groups not shown here.</p>}
    </div>
  );
}
