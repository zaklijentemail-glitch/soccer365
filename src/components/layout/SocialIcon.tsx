import type { SocialPlatform } from "@/lib/constants";

const PATHS: Record<SocialPlatform, React.ReactNode> = {
  facebook: (
    <path d="M14 8.5V6.75c0-.69.56-1.25 1.25-1.25H16.5V3h-2.25A3.25 3.25 0 0 0 11 6.25V8.5H9V11h2v7h2.5v-7h2l.5-2.5H14z" />
  ),
  x: (
    <path d="M13.9 10.36 20.32 3h-1.52l-5.58 6.39L8.76 3H3.5l6.73 9.79L3.5 20h1.52l5.88-6.75L15.64 20h5.26l-7-10.14zm-2.08 2.38-.68-.97L5.57 4.14h2.34l4.38 6.26.68.97 5.69 8.14h-2.34l-4.65-6.66z" />
  ),
  instagram: (
    <>
      <path d="M12 7.6A4.4 4.4 0 1 0 16.4 12 4.4 4.4 0 0 0 12 7.6zm0 7.27A2.87 2.87 0 1 1 14.87 12 2.87 2.87 0 0 1 12 14.87z" />
      <circle cx="16.6" cy="7.4" r="1.05" />
      <path d="M17.5 3h-11A3.5 3.5 0 0 0 3 6.5v11A3.5 3.5 0 0 0 6.5 21h11a3.5 3.5 0 0 0 3.5-3.5v-11A3.5 3.5 0 0 0 17.5 3zm1.97 14.5a1.97 1.97 0 0 1-1.97 1.97h-11a1.97 1.97 0 0 1-1.97-1.97v-11A1.97 1.97 0 0 1 6.5 4.53h11a1.97 1.97 0 0 1 1.97 1.97z" />
    </>
  ),
  youtube: (
    <path d="M21.6 8.2a2.5 2.5 0 0 0-1.75-1.77C18.28 6 12 6 12 6s-6.28 0-7.85.43A2.5 2.5 0 0 0 2.4 8.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.75 1.77C5.72 18 12 18 12 18s6.28 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-3.8zM10 15V9l5.2 3z" />
  ),
};

export default function SocialIcon({ platform }: { platform: SocialPlatform }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden focusable="false">
      {PATHS[platform]}
    </svg>
  );
}
