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

/* ============ Icons admin dashboard ============ */

export function IconHome(props: IconProps) {
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
      <path d="M3.5 10.5L12 4l8.5 6.5V19a1.5 1.5 0 01-1.5 1.5h-4v-6h-6v6H5A1.5 1.5 0 013.5 19v-8.5z" />
    </svg>
  );
}

export function IconCreditCard(props: IconProps) {
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
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6.5 15h3" />
    </svg>
  );
}

export function IconDocument(props: IconProps) {
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
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

export function IconReceipt(props: IconProps) {
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
      <path d="M5.5 3.5h13v17l-2.2-1.5-2.2 1.5-2.1-1.5-2.2 1.5-2.3-1.5V3.5z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}

export function IconDollar(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3.5v17" />
      <path d="M16 7.5H10a3 3 0 000 6h4a3 3 0 010 6H7.5" />
    </svg>
  );
}

export function IconBell(props: IconProps) {
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
      <path d="M18 8.5a6 6 0 10-12 0c0 5-2 6.5-2 6.5h16s-2-1.5-2-6.5z" />
      <path d="M10.3 19a2 2 0 003.4 0" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
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
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
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
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
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
      <path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3" />
      <path d="M10 8l-4 4 4 4" />
      <path d="M6 12h9" />
    </svg>
  );
}

export function IconArrowUp(props: IconProps) {
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
      <path d="M12 19V5" />
      <path d="M6 11l6-6 6 6" />
    </svg>
  );
}

export function IconDots(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
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
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
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
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconPencil(props: IconProps) {
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
      <path d="M4 20h4l10.5-10.5a2.1 2.1 0 00-3-3L5 17v3z" />
      <path d="M13.5 6.5l3 3" />
    </svg>
  );
}

export function IconDownload(props: IconProps) {
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
      <path d="M12 4v10" />
      <path d="M8 10.5l4 4 4-4" />
      <path d="M4.5 19h15" />
    </svg>
  );
}

export function IconChevronLeft(props: IconProps) {
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
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function IconRefresh(props: IconProps) {
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
      <path d="M20 11.5A8 8 0 106.5 6.2" />
      <path d="M20 4.5v5h-5" />
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
export function IconLeaf(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" />
      <path d="M5 19c3-5 7-8 11-9" />
    </svg>
  );
}

export function IconGraduationCap(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M2 9l10-4 10 4-10 4L2 9z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
      <path d="M22 9v5" />
    </svg>
  );
}

export function IconCup(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8z" />
      <path d="M17 9h2a2.5 2.5 0 010 5h-2" />
      <path d="M7 4v2M11 4v2M15 4v2" />
    </svg>
  );
}

export function IconAccessibility(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M4 8.5l6 1v4l-3 7M20 8.5l-6 1" />
      <path d="M13.5 13.5l3.5 7" />
    </svg>
  );
}

export function IconMountain(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 19h18L14 6l-4 7-2.5-3.5L3 19z" />
    </svg>
  );
}

export function IconTree(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 22v-5" />
      <path d="M12 17a6 6 0 01-4-10.5A6 6 0 0118 8a4.5 4.5 0 01-6 9z" />
    </svg>
  );
}

export function IconFruit(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="14" r="7" />
      <path d="M12 7c0-2 1-4 3-5M12 7c-.4-1.6-1.6-2.6-3.2-2.8" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

export function IconFacebook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 8.5V7a1 1 0 011-1h2V3h-3a4 4 0 00-4 4v1.5H8V12h2v9h4v-9h2.3l.7-3.5H14z" />
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
      </defs>
      <rect width="560" height="400" fill="url(#map-sky)" />
      <circle cx="508" cy="44" r="20" fill="#FFD98A" />
      {/* gunung */}
      <path d="M-10 190l95-92 78 74 70-58 96 84 88-64 96 78 37-30v212H-10z" fill="url(#map-hill)" opacity="0.9" />
      {/* jalan */}
      <path d="M-10 320c80-8 120-40 190-46 78-8 130 22 210 10 68-10 110-30 180-26" stroke="#F3E2B8" strokeWidth="26" fill="none" strokeLinecap="round" />
      <path d="M-10 320c80-8 120-40 190-46 78-8 130 22 210 10 68-10 110-30 180-26" stroke="#E8D19A" strokeWidth="3" fill="none" strokeDasharray="14 12" />
      {/* area kebun */}
      {[110, 150, 190, 230].map((x) => (
        <g key={x}>
          <circle cx={x} cy={210} r="13" fill="#25592E" />
          <circle cx={x - 3} cy={207} r="2.6" fill="#FFA473" />
          <circle cx={x + 4} cy={213} r="2.6" fill="#FFA473" />
        </g>
      ))}
      {[280, 320, 360].map((x) => (
        <g key={x}>
          <circle cx={x} cy={240} r="13" fill="#25592E" />
          <circle cx={x - 3} cy={237} r="2.6" fill="#FFA473" />
          <circle cx={x + 4} cy={243} r="2.6" fill="#FFA473" />
        </g>
      ))}
      {/* sungai */}
      <path d="M20 400c30-40 20-70 50-96" stroke="#9CCBE8" strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* pinpoint lokasi beranimasi */}
      <g transform="translate(300 130)">
        <circle cx="0" cy="0" r="26" fill="#F96B1C" opacity="0.22">
          <animate attributeName="r" values="20;32;20" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <path d="M0-30a26 26 0 0126 26c0 15-13 27-26 44C-13 23-26 11-26-4A26 26 0 010-30z" fill="#F96B1C" transform="translate(0 8)" />
        <circle cx="0" cy="4" r="9" fill="#FFFFFF" />
      </g>
      {/* kompas */}
      <g transform="translate(60 60)">
        <circle r="24" fill="#FFFFFF" stroke="#D7E6D8" />
        <path d="M0-14L5 6 0 2-5 6z" fill="#E0520D" />
        <path d="M0 14L-5 -6 0 -2 5 -6z" fill="#173920" opacity="0.7" />
      </g>
      {/* label kebun */}
      <g transform="translate(368 66)">
        <rect width="168" height="64" rx="12" fill="#173920" opacity="0.92" />
        <circle cx="26" cy="22" r="9" fill="#F96B1C" />
        <text x="44" y="27" fill="#FFFFFF" fontSize="15" fontWeight="800" fontFamily="inherit">AGRO JERUK</text>
        <text x="44" y="46" fill="#93C796" fontSize="11" fontWeight="600" fontFamily="inherit">SELOREJO · DAU · MALANG</text>
      </g>
    </svg>
  );
}
