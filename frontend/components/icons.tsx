import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/* ============ Icons umum ============ */

export function IconStar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.5l2.9 6.1 6.7.9-4.9 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.4 9.5l6.7-.9L12 2.5z" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function IconShieldCheck(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconTicket(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 9V7a1 1 0 011-1h16a1 1 0 011 1v2a3 3 0 000 6v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a3 3 0 000-6z" />
      <path d="M13 6v2m0 3v2m0 3v2" strokeDasharray="1 3" />
    </svg>
  );
}

export function IconScan(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" />
      <path d="M4 12h16" />
    </svg>
  );
}

export function IconWallet(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 7a2 2 0 012-2h13a1 1 0 011 1v2" />
      <path d="M3 7v10a2 2 0 002 2h15a1 1 0 001-1V9a1 1 0 00-1-1H5a2 2 0 01-2-1z" />
      <circle cx="16.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLocation(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 21s7-5.1 7-11a7 7 0 10-14 0c0 5.9 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 4h4l1.5 4.5L8 10a12 12 0 006 6l1.5-2.5L20 15v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4 0-.5.2-.7l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.2-.3z" />
    </svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 19a5.5 5.5 0 0111 0" />
      <path d="M16 5a3.5 3.5 0 010 6.4M17.5 13.6a5.5 5.5 0 013 5.4" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M18.5 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconWalk(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="13" cy="4.5" r="2" />
      <path d="M10 20l1.5-5L9 12l1-5 3.5 1 1.5 3.5L18 13" />
      <path d="M11.5 15L9 20M11 7.5L8.5 9.5 7 13" />
    </svg>
  );
}

/* ============ Icons sosial media ============ */

export function IconInstagram(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconYoutube(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12s0-3.3-.4-4.9a2.5 2.5 0 00-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.3A2.5 2.5 0 002.4 7C2 8.7 2 12 2 12s0 3.3.4 4.9c.2.9.9 1.6 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.3a2.5 2.5 0 001.8-1.8c.4-1.6.4-4.9.4-4.9zM10 9l5.2 3L10 15V9z" />
    </svg>
  );
}

export function IconTiktok(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 3c.4 2 1.7 3.4 3.9 3.6v2.8c-1.5 0-2.8-.4-3.9-1.2v5.6a5.9 5.9 0 11-5.9-5.9c.3 0 .7 0 1 .1v3a2.9 2.9 0 102 2.8V3h2.9z" />
    </svg>
  );
}

/* ============ Logo & badge ============ */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#F96B1C" />
      <circle cx="20" cy="23" r="8.5" fill="#FFB25E" />
      <circle cx="20" cy="23" r="8.5" fill="url(#lg-a)" />
      <path
        d="M20 14.5c-.4-2 .6-3.6 2.4-4.2M20 14.5c-1.8-1.2-3.6-1-4.8.2"
        stroke="#2C6F36"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M20 15v-1" stroke="#2C6F36" strokeWidth="2.4" strokeLinecap="round" />
      <defs>
        <radialGradient id="lg-a" cx="0.35" cy="0.3" r="1">
          <stop offset="0" stopColor="#FFE3BF" />
          <stop offset="1" stopColor="#FFB25E" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function GooglePlayBadge(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.3 2.6c-.4.2-.6.6-.6 1.1v16.6c0 .5.2.9.6 1.1l9.1-9.4-9.1-9.4z" />
      <path d="M16.5 8.7L6.6 3.2l7.6 7.8 2.3-2.3z" opacity=".9" />
      <path d="M16.5 15.3l-2.3-2.3-7.6 7.8 9.9-5.5z" opacity=".7" />
      <path d="M19.8 10.7l-3.3-2-2.4 3.3 2.4 3.3 3.3-2c.8-.5.8-2.1 0-2.6z" opacity=".8" />
    </svg>
  );
}

export function AppleBadge(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.4 12.9c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.5 2 1 0 1.4-.6 2.6-.6 1.2 0 1.5.6 2.6.6s1.8-1 2.4-2c.8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.1-3zM14.4 6.7c.5-.7.9-1.6.8-2.6-.8 0-1.8.6-2.3 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.4 2.3-1.1z" />
    </svg>
  );
}

/* ============ Ilustrasi ============ */

export function OrchadIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 460" className={className} role="img" aria-label="Ilustrasi kebun jeruk Selorejo dengan pohon-pohon berbuah">
      <defs>
        <linearGradient id="orch-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EAF6EC" />
          <stop offset="1" stopColor="#CFE8D2" />
        </linearGradient>
        <linearGradient id="orch-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3D8B48" />
          <stop offset="1" stopColor="#25592E" />
        </linearGradient>
        <linearGradient id="orch-orange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC07A" />
          <stop offset="1" stopColor="#F96B1C" />
        </linearGradient>
      </defs>
      <rect width="640" height="460" fill="url(#orch-sky)" />
      {/* awan */}
      <g fill="#FFFFFF" opacity="0.85">
        <ellipse cx="110" cy="66" rx="46" ry="15" />
        <ellipse cx="150" cy="52" rx="34" ry="12" />
        <ellipse cx="470" cy="46" rx="54" ry="16" />
        <ellipse cx="520" cy="60" rx="38" ry="12" />
      </g>
      {/* bukit jauh */}
      <path d="M0 236c90-52 176-72 258-50 92 24 170 12 244-26 50-26 100-32 138-18v92H0v2z" fill="#8FBF97" opacity="0.55" />
      {/* barisan pohon belakang */}
      <g>
        {[40, 130, 220, 310, 400, 490, 580].map((x) => (
          <g key={x} transform={`translate(${x} 190)`}>
            <rect x="-4" y="46" width="8" height="40" rx="3" fill="#1D4726" />
            <circle cx="0" cy="30" r="38" fill="#2C6F36" />
            <circle cx="-22" cy="44" r="24" fill="#357A40" />
            <circle cx="22" cy="44" r="24" fill="#357A40" />
            <circle cx="-14" cy="18" r="5" fill="#FFA473" />
            <circle cx="12" cy="30" r="5" fill="#FFA473" />
            <circle cx="-2" cy="48" r="5" fill="#FFA473" />
          </g>
        ))}
      </g>
      {/* rumput */}
      <rect y="278" width="640" height="182" fill="url(#orch-ground)" />
      <g stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="2" strokeLinecap="round">
        {[30, 90, 160, 240, 330, 420, 520, 600].map((x) => (
          <path key={x} d={`M${x} 320c2-9 5-14 8-18M${x + 14} 322c-1-8-3-13-6-17`} fill="none" />
        ))}
      </g>
      {/* pohon utama depan */}
      <g transform="translate(320 300)">
        <path d="M-6 0c-2-22-1-40 0-58 1-16 5-28 6-32 1 4 5 16 6 32 1 18 2 36 0 58h-12z" fill="#173920" />
        <g>
          <circle cx="0" cy="-96" r="62" fill="#2C6F36" />
          <circle cx="-46" cy="-70" r="40" fill="#357A40" />
          <circle cx="46" cy="-70" r="40" fill="#357A40" />
          <circle cx="0" cy="-48" r="34" fill="#3D8B48" />
        </g>
        <g>
          <circle cx="-40" cy="-92" r="11" fill="url(#orch-orange)" />
          <circle cx="-14" cy="-116" r="10" fill="url(#orch-orange)" />
          <circle cx="24" cy="-104" r="12" fill="url(#orch-orange)" />
          <circle cx="46" cy="-72" r="10" fill="url(#orch-orange)" />
          <circle cx="-2" cy="-64" r="12" fill="url(#orch-orange)" />
          <circle cx="-58" cy="-58" r="9" fill="url(#orch-orange)" />
          <circle cx="20" cy="-44" r="9" fill="url(#orch-orange)" />
        </g>
        {[-40, -14, 24, -2, 46].map((cx) => (
          <circle key={cx} cx={cx} cy={cx === 24 ? -104 : cx === 46 ? -72 : cx === -14 ? -116 : cx === -40 ? -92 : -64} r="3" fill="#FFDDB8" opacity="0.9" />
        ))}
      </g>
      {/* jeruk jatuh */}
      <circle cx="188" cy="336" r="12" fill="url(#orch-orange)" />
      <circle cx="452" cy="352" r="10" fill="url(#orch-orange)" />
      <ellipse cx="188" cy="350" rx="14" ry="4" fill="#092313" opacity="0.35" />
      <ellipse cx="452" cy="364" rx="12" ry="3.5" fill="#092313" opacity="0.35" />
      {/* rumput depan */}
      <g stroke="#1D4726" strokeWidth="3" strokeLinecap="round" opacity="0.5">
        <path d="M120 396c0-10 3-16 6-20M132 398c-2-9-5-15-8-19" fill="none" />
        <path d="M540 402c0-10 3-16 6-20M552 404c-2-9-5-15-8-19" fill="none" />
      </g>
    </svg>
  );
}

export function MapIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 400" className={className} role="img" aria-label="Peta lokasi Agro Jeruk Selorejo, Dusun Krajan, Dau, Malang">
      <defs>
        <linearGradient id="map-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BFE0F5" />
          <stop offset="1" stopColor="#DFF1E2" />
        </linearGradient>
        <linearGradient id="map-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6FAE6F" />
          <stop offset="1" stopColor="#3D8B48" />
        </linearGradient>
        <linearGradient id="map-orange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC07A" />
          <stop offset="1" stopColor="#F96B1C" />
        </linearGradient>
      </defs>
      <rect width="560" height="400" fill="url(#map-sky)" />
      {/* matahari */}
      <circle cx="508" cy="44" r="20" fill="#FFD98A" />
      {/* gunung */}
      <path d="M-10 190l95-92 78 74 70-58 96 84 88-64 96 78 37-30v212H-10z" fill="url(#map-hill)" opacity="0.9" />
      <path d="M60 118l25-24 26 24-25 18zM330 150l27-25 27 24-27 20z" fill="#FFFFFF" opacity="0.85" />
      {/* jalan */}
      <path d="M-10 320c80-8 120-40 190-46 78-8 130 22 210 10 68-10 110-30 180-26" stroke="#F3E2B8" strokeWidth="30" fill="none" strokeLinecap="round" />
      <path d="M-10 320c80-8 120-40 190-46 78-8 130 22 210 10 68-10 110-30 180-26" stroke="#E8D19A" strokeWidth="3" strokeDasharray="14 12" fill="none" strokeLinecap="round" />
      <path d="M96 258c40 6 70 30 82 66" stroke="#F3E2B8" strokeWidth="18" fill="none" strokeLinecap="round" />
      {/* area kebun */}
      <g>
        {[110, 150, 190, 230].map((x) => (
          <g key={x}>
            <circle cx={x} cy={210} r="13" fill="#25592E" />
            <circle cx={x} cy={210} r="9" fill="#2C6F36" />
            <circle cx={x - 3} cy={207} r="2.6" fill="#FFA473" />
            <circle cx={x + 4} cy={213} r="2.6" fill="#FFA473" />
          </g>
        ))}
        {[280, 320, 360].map((x) => (
          <g key={x}>
            <circle cx={x} cy={240} r="13" fill="#25592E" />
            <circle cx={x} cy={240} r="9" fill="#2C6F36" />
            <circle cx={x - 3} cy={237} r="2.6" fill="#FFA473" />
            <circle cx={x + 4} cy={243} r="2.6" fill="#FFA473" />
          </g>
        ))}
      </g>
      {/* sungai */}
      <path d="M20 400c30-40 20-70 50-96" stroke="#9CCBE8" strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* pinpoint lokasi */}
      <g transform="translate(300 130)">
        <circle cx="0" cy="0" r="26" fill="#F96B1C" opacity="0.22">
          <animate attributeName="r" values="20;32;20" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <path d="M0-30a26 26 0 0126 26c0 15-13 27-26 44C-13 23-26 11-26-4A26 26 0 010-30z" fill="#F96B1C" transform="translate(0 8)" />
        <circle cx="0" cy="4" r="9" fill="#FFFFFF" />
        <circle cx="0" cy="4" r="4.5" fill="#E0520D" />
      </g>
      {/* kompas */}
      <g transform="translate(60 60)">
        <circle r="24" fill="#FFFFFF" stroke="#D7E6D8" />
        <path d="M0-14L5 6 0 2-5 6z" fill="#E0520D" />
        <path d="M0 14L-5 -6 0 -2 5 -6z" fill="#173920" opacity="0.7" />
      </g>
      {/* label kebun */}
      <g transform="translate(368 66)">
        <rect x="0" y="0" width="168" height="64" rx="12" fill="#173920" opacity="0.92" />
        <circle cx="26" cy="22" r="9" fill="#F96B1C" />
        <circle cx="26" cy="22" r="4" fill="#FFDDB8" />
        <text x="44" y="27" fill="#FFFFFF" fontSize="15" fontWeight="800" fontFamily="inherit">
          AGRO JERUK
        </text>
        <text x="44" y="46" fill="#93C796" fontSize="11" fontWeight="600" fontFamily="inherit">
          SELOREJO · DAU · MALANG
        </text>
      </g>
    </svg>
  );
}
