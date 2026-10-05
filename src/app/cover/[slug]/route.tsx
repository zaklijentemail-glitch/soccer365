import fs from "node:fs/promises";
import path from "node:path";
import type { ReactElement } from "react";
import { ImageResponse } from "next/og";
import { getAllEntries } from "@/lib/content/reader";
import type { CoverSpec } from "@/lib/content/frontmatter";
import { SITE } from "@/lib/constants";

/**
 * Draws a 1200x675 article cover from the `cover` block in an article's
 * frontmatter, in the same style as the hand-made guide covers: title on the
 * left, three facts on the right, a formation diagram or a licensed photo
 * behind. Every cover is built once at deploy time; nothing renders on request.
 */

export const dynamicParams = false;

const W = 1200;
const H = 675;
const ACCENTS = ["#f5c518", "#3ddc84", "#ff5a5f"];
const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");

export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries.filter((e) => e.frontmatter.cover).map((e) => ({ slug: e.frontmatter.slug }));
}

const ICONS: Record<string, (c: string) => ReactElement[]> = {
  shield: (c) => [<path key="a" d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" stroke={c} />],
  users: (c) => [
    <circle key="a" cx="9" cy="8" r="3.5" stroke={c} />,
    <circle key="b" cx="17" cy="9" r="2.5" stroke={c} />,
    <path key="c" d="M2 20c0-4 3-6 7-6s7 2 7 6M15 14c3 0 6 1.5 6 5" stroke={c} />,
  ],
  target: (c) => [
    <circle key="a" cx="12" cy="12" r="9" stroke={c} />,
    <circle key="b" cx="12" cy="12" r="5" stroke={c} />,
    <circle key="c" cx="12" cy="12" r="1.5" stroke={c} />,
  ],
  run: (c) => [
    <circle key="a" cx="15" cy="4" r="2" stroke={c} />,
    <path key="b" d="M9 21l3-6 3 2v5M6 12l3-4 4 1 3 4 3 1M12 15l-2-4" stroke={c} />,
  ],
  trophy: (c) => [<path key="a" d="M7 4h10v4a5 5 0 01-10 0zM7 6H3a4 4 0 004 4M17 6h4a4 4 0 01-4 4M12 13v4M8 21h8M9 17h6" stroke={c} />],
  clock: (c) => [<circle key="a" cx="12" cy="13" r="8" stroke={c} />, <path key="b" d="M12 9v4l3 2M9 2h6" stroke={c} />],
  ruler: (c) => [<path key="a" d="M4 20L20 4M7 17l2 2M10 14l2 2M13 11l2 2M16 8l2 2" stroke={c} />],
  star: (c) => [<path key="a" d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" stroke={c} />],
  list: (c) => [
    <path key="a" d="M9 6h11M9 12h11M9 18h11" stroke={c} />,
    <circle key="b" cx="4.5" cy="6" r="1.2" stroke={c} />,
    <circle key="c" cx="4.5" cy="12" r="1.2" stroke={c} />,
    <circle key="d" cx="4.5" cy="18" r="1.2" stroke={c} />,
  ],
  card: (c) => [<rect key="a" x="7" y="3" width="10" height="15" rx="1.5" stroke={c} />, <path key="b" d="M12 21v-3" stroke={c} />],
  whistle: (c) => [<circle key="a" cx="9" cy="14" r="5" stroke={c} />, <path key="b" d="M13 11l8-4v4l-6 2" stroke={c} />],
  pound: (c) => [<path key="a" d="M16 6a4 4 0 00-7 2v11M6 13h8M6 19h12" stroke={c} />],
  ball: (c) => [<circle key="a" cx="12" cy="12" r="9" stroke={c} />, <path key="b" d="M12 7l4 3-1.5 4.5h-5L8 10z" stroke={c} />],
  calendar: (c) => [<rect key="a" x="3" y="5" width="18" height="16" rx="2" stroke={c} />, <path key="b" d="M3 10h18M8 3v4M16 3v4" stroke={c} />],
  arrows: (c) => [<path key="a" d="M4 12h16M14 6l6 6-6 6" stroke={c} />],
};

function Icon({ name, color }: { name: string; color: string }) {
  const draw = ICONS[name] ?? ICONS.star;
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {draw(color)}
    </svg>
  );
}

/** Formation diagram drawn with plain boxes, same geometry as <Formation>. */
function Pitch({ pitch }: { pitch: NonNullable<CoverSpec["pitch"]> }) {
  const PW = 430;
  const PH = 582;
  const PAD = 28;
  const lines = pitch.shape.split("-").map(Number);
  const roles = pitch.roles.split(",").map((r) => r.trim());
  const lift = pitch.lift ?? {};
  const highlight = new Set(pitch.highlight ?? []);
  const top = 158;
  const bottom = PH - PAD - 99;
  const step = lines.length > 1 ? (bottom - top) / (lines.length - 1) : 0;
  const dots: { x: number; y: number; role: string; gk: boolean }[] = [
    { x: PW / 2, y: PH - PAD - 30, role: roles[0], gk: true },
  ];
  let i = 1;
  lines.forEach((count, li) => {
    for (let p = 0; p < count; p++) {
      const role = roles[i++] ?? "";
      dots.push({
        x: PAD + ((p + 1) * (PW - 2 * PAD)) / (count + 1),
        y: bottom - li * step - (lift[role] ?? 0) * step,
        role,
        gk: false,
      });
    }
  });
  const line = "2px solid rgba(232,243,234,0.8)";
  return (
    <div style={{ position: "absolute", left: 470, top: 46, width: PW, height: PH, display: "flex", background: "#1a6634", borderRadius: 6 }}>
      {Array.from({ length: 8 }, (_, s) => (
        <div key={s} style={{ position: "absolute", left: 0, top: (s * PH) / 8, width: PW, height: PH / 16, background: "#1d6f3a" }} />
      ))}
      <div style={{ position: "absolute", left: 14, top: 14, width: PW - 28, height: PH - 28, border: line }} />
      <div style={{ position: "absolute", left: 14, top: PH / 2, width: PW - 28, height: 0, borderTop: line }} />
      <div style={{ position: "absolute", left: PW / 2 - 50, top: PH / 2 - 50, width: 100, height: 100, borderRadius: 50, border: line }} />
      <div style={{ position: "absolute", left: PW / 2 - 100, top: 14, width: 200, height: 80, border: line }} />
      <div style={{ position: "absolute", left: PW / 2 - 100, top: PH - 94, width: 200, height: 80, border: line }} />
      {dots.map((d, n) => (
        <div
          key={n}
          style={{
            position: "absolute",
            left: d.x - 19,
            top: d.y - 19,
            width: 38,
            height: 38,
            borderRadius: 19,
            border: "2px solid #fff",
            background: d.gk ? "#f5c518" : highlight.has(d.role) ? "#ff5a5f" : "#0166ff",
            color: d.gk ? "#0b0f10" : "#fff",
            fontFamily: "Inter",
            fontSize: d.role.length > 3 ? 10 : 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {d.role}
        </div>
      ))}
    </div>
  );
}

async function photoDataUri(publicPath: string): Promise<string> {
  const file = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  const buf = await fs.readFile(file);
  const ext = path.extname(file).toLowerCase();
  const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = (await getAllEntries()).find((e) => e.frontmatter.slug === slug);
  const cover = entry?.frontmatter.cover;
  if (!entry || !cover) return new Response("Not found", { status: 404 });

  const [o7, o7x, o6, o6x, i4, i4x] = await Promise.all(
    ["Oswald-700", "Oswald-700-ext", "Oswald-600", "Oswald-600-ext", "Inter-400", "Inter-400-ext"].map((f) =>
      fs.readFile(path.join(FONT_DIR, `${f}.ttf`))
    )
  );
  const photo = cover.photo ? await photoDataUri(cover.photo) : null;
  const kicker = (cover.kicker ?? entry.frontmatter.category.replace(/-/g, " ")).toUpperCase();
  const fs1 = cover.fontSize ?? 74;

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: "flex", position: "relative", background: "#0b0f10" }}>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            width={820}
            height={H}
            style={{ position: "absolute", right: 0, top: 0, width: 820, height: H, objectFit: "cover", objectPosition: cover.photoPosition ?? "center" }}
          />
        )}
        {!photo && cover.pitch && <Pitch pitch={cover.pitch} />}
        {photo && (
          <div style={{ position: "absolute", left: 380, top: 0, width: 460, height: H, display: "flex", backgroundImage: "linear-gradient(90deg, #0b0f10 0%, rgba(11,15,16,0.85) 35%, rgba(11,15,16,0) 100%)" }} />
        )}
        <div style={{ position: "absolute", right: 0, top: 0, width: 330, height: H, display: "flex", backgroundImage: "linear-gradient(270deg, rgba(11,15,16,0.92) 0%, rgba(11,15,16,0.75) 70%, rgba(11,15,16,0) 100%)" }} />

        <div style={{ position: "absolute", left: 58, top: 0, height: H, width: 520, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "Oswald", fontWeight: 600, color: "#f5c518", letterSpacing: 3, fontSize: 20, marginBottom: 18 }}>{kicker}</div>
          {cover.title.map((t, n) => (
            <div key={n} style={{ fontFamily: "Oswald", fontWeight: 700, fontSize: fs1, lineHeight: 1.02, color: t.startsWith("*") ? "#f5c518" : "#fff" }}>
              {(t.startsWith("*") ? t.slice(1) : t).toUpperCase()}
            </div>
          ))}
          <div style={{ width: 110, height: 5, background: "#f5c518", marginTop: 28 }} />
        </div>

        <div style={{ position: "absolute", right: 28, top: 0, height: H, width: 250, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {cover.items.map((it, n) => (
            <div key={n} style={{ display: "flex", padding: "18px 0", borderBottom: n < 2 ? "1px solid rgba(255,255,255,0.25)" : "none" }}>
              <Icon name={it.icon} color={ACCENTS[n]} />
              <div style={{ display: "flex", flexDirection: "column", marginLeft: 14, width: 190 }}>
                <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 22, color: ACCENTS[n], lineHeight: 1.1 }}>{it.head.toUpperCase()}</div>
                <div style={{ fontFamily: "Inter", fontSize: 15, color: "#e9eeeb", lineHeight: 1.35, marginTop: 4 }}>{it.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", left: 58, bottom: 34, display: "flex", fontFamily: "Oswald", fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: 1 }}>
          {SITE.name.split(" ")[0].toUpperCase()}
          <span style={{ color: "#0166ff", marginLeft: 6 }}>{SITE.name.split(" ")[1] ?? ""}</span>
        </div>
        {cover.credit && (
          <div style={{ position: "absolute", right: 12, bottom: 8, display: "flex", fontFamily: "Inter", fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{cover.credit}</div>
        )}
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: "Oswald", data: o7, weight: 700, style: "normal" },
        { name: "Oswald", data: o7x, weight: 700, style: "normal" },
        { name: "Oswald", data: o6, weight: 600, style: "normal" },
        { name: "Oswald", data: o6x, weight: 600, style: "normal" },
        { name: "Inter", data: i4, weight: 400, style: "normal" },
        { name: "Inter", data: i4x, weight: 400, style: "normal" },
      ],
    }
  );
}
