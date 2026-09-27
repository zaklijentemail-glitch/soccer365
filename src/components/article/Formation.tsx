/**
 * A formation drawn on a vertical pitch, attacking upwards. Used inside MDX:
 *
 *   <Formation shape="3-5-2" roles="GK,CB,CB,CB,LWB,CM,CM,CM,RWB,ST,ST" />
 *
 * `shape` gives the outfield lines from back to front. `roles` labels every
 * player, goalkeeper first, then each line left to right. `lift` optionally
 * pushes named players forward by a fraction of a line's spacing, for the
 * wing-backs or a No.10 who does not sit flat on his line: "LWB:0.5,RWB:0.5".
 */

const W = 340;
const H = 460;
const PAD = 22;

type Props = {
  shape: string;
  roles: string;
  lift?: string;
  caption?: string;
};

function parseLift(lift?: string): Map<string, number> {
  const out = new Map<string, number>();
  if (!lift) return out;
  for (const part of lift.split(",")) {
    const [role, amount] = part.split(":");
    out.set(role.trim(), Number(amount));
  }
  return out;
}

export default function Formation({ shape, roles, lift, caption }: Props) {
  const lines = shape.split("-").map(Number);
  const labels = roles.split(",").map((r) => r.trim());
  const expected = 1 + lines.reduce((a, b) => a + b, 0);
  if (labels.length !== expected) {
    throw new Error(`Formation ${shape}: ${expected} roles expected, got ${labels.length}`);
  }

  const liftByRole = parseLift(lift);

  // Back line clear of the goalkeeper, front line just short of the
  // opposing box; the lines between are spread evenly.
  const top = 125;
  const bottom = H - PAD - 78;
  const step = lines.length > 1 ? (bottom - top) / (lines.length - 1) : 0;

  const players: { x: number; y: number; role: string }[] = [
    { x: W / 2, y: H - PAD - 24, role: labels[0] },
  ];
  let i = 1;
  lines.forEach((count, lineIndex) => {
    const baseY = bottom - lineIndex * step;
    for (let p = 0; p < count; p++) {
      const role = labels[i++];
      const x = PAD + ((p + 1) * (W - 2 * PAD)) / (count + 1);
      players.push({ x, y: baseY - (liftByRole.get(role) ?? 0) * step, role });
    }
  });

  const label = `${shape} formation: ${labels.join(", ")}`;

  return (
    <figure className="not-prose mx-auto mt-6 max-w-sm">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="h-auto w-full">
        <rect x="0" y="0" width={W} height={H} fill="#1f7a3f" />
        {Array.from({ length: 8 }, (_, s) => (
          <rect key={s} x="0" y={(s * H) / 8} width={W} height={H / 16} fill="#237f44" />
        ))}
        <g fill="none" stroke="#e8f3ea" strokeWidth="2" opacity="0.85">
          <rect x={PAD / 2} y={PAD / 2} width={W - PAD} height={H - PAD} />
          <line x1={PAD / 2} y1={H / 2} x2={W - PAD / 2} y2={H / 2} />
          <circle cx={W / 2} cy={H / 2} r="40" />
          <rect x={W / 2 - 80} y={PAD / 2} width="160" height="64" />
          <rect x={W / 2 - 80} y={H - PAD / 2 - 64} width="160" height="64" />
          <rect x={W / 2 - 34} y={PAD / 2} width="68" height="22" />
          <rect x={W / 2 - 34} y={H - PAD / 2 - 22} width="68" height="22" />
        </g>
        {players.map((p, n) => (
          <g key={n}>
            <circle cx={p.x} cy={p.y} r="15" fill={n === 0 ? "#f5c518" : "#0166ff"} stroke="#ffffff" strokeWidth="2" />
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontSize={p.role.length > 3 ? 8.5 : 10}
              fontWeight="700"
              fill={n === 0 ? "#0b0f10" : "#ffffff"}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
            >
              {p.role}
            </text>
          </g>
        ))}
        <text x={PAD + 2} y={PAD + 14} fontSize="11" fill="#e8f3ea" opacity="0.85" fontFamily="ui-sans-serif, system-ui, sans-serif">
          ▲ Attack
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-ink-faint">{caption ?? `The ${shape}`}</figcaption>
    </figure>
  );
}
