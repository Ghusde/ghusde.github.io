import { useEffect, useState } from 'react';
import {
  GraduationCap, MapPin, Mail, Clock, BadgeCheck, Phone, ChevronDown,
} from 'lucide-react';
import SocialCard from '../components/SocialCard';
import { Lang, tr } from '../translations';

// ─── Clock ────────────────────────────────────────────────────────────────────

function useBaliClock() {
  const [time, setTime] = useState('');
  const [offset, setOffset] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', hour12: false }));
      const diff = 8 - (-now.getTimezoneOffset() / 60);
      setOffset(diff === 0 ? 'same timezone' : `${diff > 0 ? '+' : ''}${diff}h ${diff > 0 ? 'ahead' : 'behind'}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return { time, offset };
}

// ─── Social icons ─────────────────────────────────────────────────────────────

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" className="text-zinc-900 dark:text-white">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <defs>
        <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" /><stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" /><stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig)" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig)" strokeWidth="2" fill="none" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig)" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="text-zinc-900 dark:text-white">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function CodeSlashIcon({ size = 13, className = 'text-zinc-500 dark:text-zinc-400' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  );
}

// ─── Profile carousel ────────────────────────────────────────────────────────

const ROLE_PAIRS = [
  { title: 'IT Support Specialist', sub: 'Hospitality & Network Infrastructure' },
  { title: 'Content Creator',       sub: 'Tech Enthusiast' },
  // tambah/hapus bebas di sini
];

function ProfileCarousel() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<CarouselPhase>('idle');

  useEffect(() => {
    if (ROLE_PAIRS.length <= 1) return; // ← stop jika cuma 1 item
    const id = setInterval(() => {
      setPhase('out');
      setTimeout(() => {
        setIdx((i) => (i + 1) % ROLE_PAIRS.length);
        setPhase('in');
        setTimeout(() => setPhase('idle'), 20);
      }, 300);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const current = ROLE_PAIRS[idx % ROLE_PAIRS.length]; // ← safety

  const cls: Record<CarouselPhase, string> = {
    idle: 'opacity-100 translate-y-0 transition-all duration-300 ease-out',
    out:  'opacity-0 -translate-y-3 transition-all duration-300 ease-out',
    in:   'opacity-0 translate-y-3 transition-none',
  };

  return (
    <div className={cls[phase]}>
      <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm">{current?.title}</p>
      <p className="text-zinc-400 dark:text-zinc-600 font-mono text-xs mt-0.5">{current?.sub}</p>
    </div>
  );
}

// ─── Community Contributions heatmap ─────────────────────────────────────────────

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = Math.imul(s ^ (s >>> 17), 0x45d9f3b);
    s = Math.imul(s ^ (s >>> 13), 0x45d9f3b);
    return ((s ^ (s >>> 16)) >>> 0) / 0xffffffff;
  };
}

const LEVELS = ['bg-zinc-200 dark:bg-zinc-900', 'bg-[#0e4429]', 'bg-[#006d32]', 'bg-[#26a641]', 'bg-[#39d353]'];

const MONTH_LABELS = [
  { label: 'Dec', col: 0  },
  { label: 'Jan', col: 4  },
  { label: 'Feb', col: 9  },
  { label: 'Mar', col: 13 },
  { label: 'Apr', col: 17 },
  { label: 'May', col: 22 },
  { label: 'Jun', col: 26 },
  { label: 'Jul', col: 30 },
  { label: 'Aug', col: 35 },
  { label: 'Sep', col: 39 },
  { label: 'Oct', col: 43 },
  { label: 'Nov', col: 48 },
];

const CELL_SIZE = 10;  // px
const CELL_GAP  = 3;   // px
const COL_W     = CELL_SIZE + CELL_GAP; // 13px

function ContributionGraph({ t }: { t: typeof tr.en }) {
  const rand = seeded(42);
  const weeks = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => {
      const r = rand();
      if (r > 0.7) return 0;
      if (r > 0.5) return 1;
      if (r > 0.3) return 2;
      if (r > 0.15) return 3;
      return 4;
    })
  );
  const totalWidth = 52 * COL_W;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {/* Month labels */}
        <div className="relative h-5 mb-1" style={{ width: `${totalWidth}px` }}>
          {MONTH_LABELS.map(({ label, col }) => (
            <span
              key={label}
              className="absolute text-[11px] text-zinc-400 dark:text-zinc-500 font-mono select-none"
              style={{ left: `${col * COL_W}px` }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((level, di) => (
                <div key={di} className={`w-[10px] h-[10px] rounded-sm ${LEVELS[level]}`} />
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            {t.contributionsCount}{' '}
            <a 
              href="https://github.com/ghusde"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              GitHub
            </a>
            .
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-400 dark:text-zinc-600">Less</span>
            {LEVELS.map((cls, i) => <div key={i} className={`w-[10px] h-[10px] rounded-sm ${cls}`} />)}
            <span className="text-xs text-zinc-400 dark:text-zinc-600">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stack icons ──────────────────────────────────────────────────────────────

const DI = 'https://raw.githubusercontent.com/devicons/devicon/master/icons';
const SI = 'https://cdn.simpleicons.org';

const techIcons = [
  { name: 'MikroTik',      icon: `${SI}/mikrotik/e51225`,     href: 'https://mikrotik.com' },
  { name: 'Cisco',         icon: `${SI}/cisco/1ba0d7`,         href: 'https://cisco.com' },
  { name: 'Wireshark',     icon: `${SI}/wireshark/1679A7`,     href: 'https://wireshark.org' },
  { name: 'Linux',         icon: `${DI}/linux/linux-original.svg`,   href: 'https://kernel.org' },
  { name: 'Windows',       icon: `${DI}/windows8/windows8-original.svg`, href: 'https://microsoft.com/windows' },
  { name: 'Python',        icon: `${DI}/python/python-original.svg`,  href: 'https://python.org' },
  { name: 'Bash',          icon: `${DI}/bash/bash-original.svg`,      href: 'https://gnu.org/software/bash' },
  { name: 'Ansible',       icon: `${DI}/ansible/ansible-original.svg`, href: 'https://ansible.com' },
  { name: 'Docker',        icon: `${DI}/docker/docker-original.svg`,  href: 'https://docker.com' },
  { name: 'Git',           icon: `${DI}/git/git-original.svg`,        href: 'https://git-scm.com' },
  { name: 'Grafana',       icon: `${DI}/grafana/grafana-original.svg`, href: 'https://grafana.com' },
  { name: 'Prometheus',    icon: `${DI}/prometheus/prometheus-original.svg`, href: 'https://prometheus.io' },
  { name: 'Nginx',         icon: `${DI}/nginx/nginx-original.svg`,    href: 'https://nginx.org' },
  { name: 'MySQL',         icon: `${DI}/mysql/mysql-original.svg`,    href: 'https://mysql.com' },
  { name: 'AWS',           icon: 'https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', href: 'https://aws.amazon.com' },
  { name: 'Azure',         icon: 'https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/azure/azure-original.svg', href: 'https://azure.microsoft.com' },
  { name: 'Odoo',          icon: `${SI}/odoo/714B67`,           href: 'https://odoo.com' },
  { name: 'Microsoft 365', icon: `${SI}/microsoftoffice/D83B01`, href: 'https://microsoft.com/microsoft-365' },
  { name: 'Quinos',        icon: 'https://logo.clearbit.com/quinos.co.id',             href: 'https://quinos.id/index#/landing' },
];

function StackIcon({ name, icon, href }: { name: string; icon: string; href: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={name} className="group relative flex flex-col items-center">
      <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:border-zinc-400 dark:hover:border-zinc-600 hover:scale-110 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-150 overflow-hidden p-2.5">
        {failed
          ? <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 text-center leading-tight font-mono">{name.slice(0, 3).toUpperCase()}</span>
          : <img src={icon} alt={name} className="w-full h-full object-contain" onError={() => setFailed(true)} />
        }
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-800 dark:bg-zinc-700 border border-zinc-700 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 font-mono shadow-lg">
        {name}
      </div>
    </a>
  );
}

// ─── "Mostly building with" tools ────────────────────────────────────────────

const primaryTools = [
  {
    name: 'MikroTik',
    img: `${SI}/mikrotik/e51225`,
    href: 'https://mikrotik.com',
  },
  {
    name: 'Winbox',
    img: 'https://www.google.com/s2/favicons?domain=mikrotik.com&sz=32',
    href: 'https://mikrotik.com/download',
  },
  {
    name: 'SADP',
    img: 'https://www.google.com/s2/favicons?domain=hikvision.com&sz=32',
    href: 'https://www.hikvision.com', 
  },
  {
    name: 'ESB FnB POS',
    img: 'https://www.google.com/s2/favicons?domain=esb.co.id&sz=32',
    href: 'https://esb.co.id',
  },
  
];

function ToolChip({ name, img, href }: { name: string; img: string; href: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 rounded-full px-2.5 py-0.5 text-xs text-zinc-700 dark:text-zinc-300 hover:border-zinc-500 dark:hover:border-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
    >
      {failed ? (
        <span className="w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0 inline-block" />
      ) : (
        <img
          src={img}
          alt={name}
          className="w-3.5 h-3.5 object-contain flex-shrink-0"
          onError={() => setFailed(true)}
        />
      )}
      {name}
    </a>
  );
}

// ─── Company logo with fallback ───────────────────────────────────────────────

function OrgLogo({ src, badge, fallbackClass }: { src: string; badge: string; fallbackClass: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white font-mono ${fallbackClass}`}>
        {badge}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={badge}
      onError={() => setFailed(true)}
      className="w-9 h-9 rounded-lg object-contain border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 flex-shrink-0"
    />
  );
}

// ─── Timeline data ────────────────────────────────────────────────────────────

interface TimelineEntry {
  id: string;
  title: (t: typeof tr.en) => string;
  type: (t: typeof tr.en) => string;
  period: string;
  bullets: string[];
}

interface TimelineGroup {
  org: string;
  badge: string;
  logoUrl: string;
  fallbackClass: string;
  entries: TimelineEntry[];
}

const experienceData: TimelineGroup[] = [
  {
    org: 'Baked Bali',
    badge: 'BB',
    logoUrl: 'https://media.licdn.com/dms/image/v2/D560BAQGPEhNuBf3yaA/company-logo_200_200/company-logo_200_200/0/1698025492925/bricesblog_logo?e=2147483647&v=beta&t=6YcUZSY7QotJ9QW75bPuxX8ckQTga_A4PvFUhMq5uDs',
    fallbackClass: 'bg-gradient-to-br from-amber-500 to-orange-600',
    entries: [{
      id: 'bb-1',
      title: () => 'IT Operasional Support',
      type: (t) => t.fulltime,
      period: 'May 2026 – Present',
      bullets: [
        'First-level IT support across 6 F&B outlets and Head Office with structured ticketing.',
        'Configure and maintain MikroTik RouterOS, switches, and access points across all sites.',
        'Manage DVR/NVR CCTV systems end-to-end, maintaining 24/7 security coverage.',
        'Administer ESB FnB POS (Lite & OMS) with SSL management and real-time incident response.',
        'Implement MDM for company-owned Android/iOS devices across outlets and Head Office.',
        'Maintain IT documentation including troubleshooting logs, diagrams, and configuration records.',
      ],
    }],
  },
  {
    org: 'Kantanya Bali Tour',
    badge: 'KB',
    logoUrl: 'https://i.ibb.co.com/LXLs6jcf/Kantanya-Logo-Fix.png',
    fallbackClass: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    entries: [{
      id: 'kb-1',
      title: () => 'IT Support',
      type: (t) => t.fulltime,
      period: 'May 2025 – May 2026',
      bullets: [
        'Provided first-level technical assistance, resolving hardware and software faults.',
        'Configured and troubleshot booking systems for guest-facing reservation services.',
        'Collaborated with developers on system performance issues and UI/UX improvements.',
        'Managed digital asset updates and system content in coordination with management.',
      ],
    }],
  },
  {
    org: 'Locca Sea House',
    badge: 'LS',
    logoUrl: 'https://yt3.googleusercontent.com/XGZ66TuMINHHzFT2ofsMUQ_k--rS9pCKEMbrAea4GMv6midn2ea_y_HV42Ddt1zpJkQemEvM6A=s900-c-k-c0x00ffffff-no-rj',
    fallbackClass: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    entries: [{
      id: 'ls-1',
      title: () => 'IT Officer',
      type: (t) => t.fulltime,
      period: 'Jun 2024 – Apr 2025',
      bullets: [
        'Maintained LAN/switch systems, servers, and CCTV with zero unplanned downtime.',
        'Supported POS terminals, EDC payment devices, and cloud email in a guest-facing environment.',
        'Performed structured cabling, bandwidth monitoring, and infrastructure optimization.',
        'Liaised with vendors on IT procurement and asset deployment.',
      ],
    }],
  },
  {
    org: 'PT Global Lintas Solusi',
    badge: 'GL',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf9JFRlAWf10RjqnVr1E3p-h31-J9c-sl8eA&s',
    fallbackClass: 'bg-gradient-to-br from-blue-600 to-indigo-700',
    entries: [{
      id: 'gl-1',
      title: () => 'IT / Technical NOC',
      type: (t) => t.fulltime,
      period: 'Dec 2022 – Apr 2024',
      bullets: [
        'Monitored B2B network operations and service availability per NOC protocols.',
        'Designed regional network route documentation and ODP mapping for fiber-optic planning.',
        'Supported FTTH last-mile installations and validated link quality for SLA compliance.',
        'Coordinated with field technicians on network deployment and troubleshooting.',
      ],
    }],
  },
];

const educationData: TimelineGroup[] = [
  {
    org: 'ITB STIKOM Bali',
    badge: 'SB',
    logoUrl: 'https://ridergalau.id/wp-content/uploads/2025/12/Logo-ITB-STIKOM-Bali.png',
    fallbackClass: 'bg-gradient-to-br from-red-500 to-rose-600',
    entries: [{
      id: 'sb-1',
      title: (t) => t.bachelorDegree,
      type: (t) => t.cyberSecurity,
      period: '2018 – 2022',
      bullets: [],
    }],
  },
  {
    org: 'SMK Wira Harapan',
    badge: 'WH',
    logoUrl: 'https://smkwiraharapan.sch.id/wp-content/uploads/2017/06/LOGO-WIRA.png',
    fallbackClass: 'bg-gradient-to-br from-emerald-500 to-green-600',
    entries: [{
      id: 'wh-1',
      title: (t) => t.vocational,
      type: (t) => t.vocationalSub,
      period: '2015 – 2018',
      bullets: [],
    }],
  },
];

const competencies = [
  'End-User Technical Support',
  'Incident & Problem Management',
  'POS & Payment Systems Support',
  'CCTV & Surveillance Systems',
  'Network Connectivity Troubleshooting',
  'Multi-Site IT Operations',
  'Service Desk & Ticket Management',
];

// ─── Accordion timeline section ───────────────────────────────────────────────

function TimelineSection({
  groups, t, openRoles, toggleRole, isEducation,
}: {
  groups: TimelineGroup[];
  t: typeof tr.en;
  openRoles: Set<string>;
  toggleRole: (id: string) => void;
  isEducation: boolean;
}) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.org}>
          <div className="flex items-center gap-3 mb-2">
            <OrgLogo src={group.logoUrl} badge={group.badge} fallbackClass={group.fallbackClass} />
            <p className="text-zinc-900 dark:text-white font-semibold text-base">{group.org}</p>
          </div>
          <div className="flex flex-col ml-12 border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800 rounded-sm overflow-hidden">
            {group.entries.map((entry) => {
              const isOpen = openRoles.has(entry.id);
              const hasBullets = entry.bullets.length > 0;
              return (
                <div key={entry.id}>
                  <button
                    onClick={() => hasBullets && toggleRole(entry.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${hasBullets ? 'hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="w-7 h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center flex-shrink-0">
                      {isEducation
                        ? <GraduationCap size={13} className="text-zinc-500 dark:text-zinc-400" />
                        : <CodeSlashIcon size={13} />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-zinc-900 dark:text-white text-sm font-semibold leading-snug">{entry.title(t)}</p>
                      <p className="text-zinc-400 dark:text-zinc-500 text-xs font-mono mt-0.5">
                        {entry.type(t)}
                        <span className="text-zinc-200 dark:text-zinc-700 mx-1.5">·</span>
                        {entry.period}
                      </p>
                    </div>
                    {hasBullets && (
                      <ChevronDown
                        size={16}
                        className={`text-zinc-400 dark:text-zinc-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                  {hasBullets && (
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: isOpen ? `${entry.bullets.length * 60}px` : '0px' }}
                    >
                      <ul className="px-4 pb-4 pt-1 flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-950">
                        {entry.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                            <span className="text-zinc-400 dark:text-zinc-600 mt-0.5 flex-shrink-0">›</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface HomeProps { lang: Lang; }

export default function Home({ lang }: HomeProps) {
  const { time, offset } = useBaliClock();
  const t = tr[lang];
  const [openRoles, setOpenRoles] = useState<Set<string>>(new Set());
  const toggleRole = (id: string) => {
    setOpenRoles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const socials = [
    { icon: <TikTokIcon />, platform: 'TikTok', handle: '@rideoz_', followers: '1043', href: 'https://tiktok.com/@rideoz_' },
    { icon: <InstagramIcon />, platform: 'Instagram', handle: '@rideoz_', followers: '144', href: 'https://instagram.com/rideoz_' },
    { icon: <LinkedInIcon />, platform: 'LinkedIn', handle: 'Tude Arya Asmadijaya', stats: 'Open to connect', href: 'https://www.linkedin.com/in/tude-arya-asmadijaya-100138235/?isSelfProfile=true' },
    { icon: <GitHubIcon />, platform: 'GitHub', handle: 'ghusde', stats: '1 stars · Python · Shell · YAML', href: 'https://github.com/ghusde' },
  ];

  return (
    <div>
      {/* ── Profile ─────────────────────────────────────────────── */}
      <section className="py-10 flex items-center gap-8">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 ring-4 ring-zinc-50 dark:ring-zinc-900">
            <img
              src="https://i.ibb.co.com/pFXHT3k/Whats-App-Image-2026-06-18-at-09-16-32.jpg"
              alt="Ghusde"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://i.ibb.co.com/7tFpVg1b/Whats-App-Image-2026-06-14-at-16-25-55.jpg'; }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Tude Arya Asmadijaya</h1>
            <BadgeCheck size={24} className="text-blue-500 fill-blue-500 stroke-zinc-50 dark:stroke-[#0a0a0a]" />
          </div>
          <div className="overflow-hidden mt-0.5">
            <ProfileCarousel />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Overview ────────────────────────────────────────────── */}
      <Section title={t.profesionalprofile} id="Profesional Profile">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
          <InfoItem icon={<GraduationCap size={15} className="text-zinc-400 dark:text-zinc-500" />} text={lang === 'id' ? 'S1 Sistem Komputer' : 'B.Sc. Computer Systems'} />
          <InfoItem icon={<Mail size={15} className="text-zinc-400 dark:text-zinc-500" />} text="rideoz.official@gmail.com" href="mailto:ghustude182@gmail.com" />
          <InfoItem icon={<MapPin size={15} className="text-zinc-400 dark:text-zinc-500" />} text="Bali, Indonesia" href="https://www.google.com/maps/search/?api=1&query=Mengwi%2C+Bali%2C+Indonesia" />
          <InfoItem
            icon={<Clock size={15} className="text-zinc-400 dark:text-zinc-500" />}
            text={time ? <span><span className="font-mono">{time}</span><span className="text-zinc-400 dark:text-zinc-500"> (UTC +08:00)</span>{offset && <span className="text-zinc-400 dark:text-zinc-500"> // {offset}</span>}</span> : null}
          />
        </div>
      </Section>

      <Divider />

      {/* ── About ───────────────────────────────────────────────── */}
      <Section title={t.about} id="about">
        <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed font-mono mb-4 text-justify">{t.aboutP1}</p>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed font-mono mb-6 text-justify">{t.aboutP2}</p>

        {/* Mostly building with */}
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-loose font-mono flex flex-wrap items-center gap-x-2 gap-y-2">
          <span>{t.buildingWith}</span>
          {primaryTools.map((tool, i) => (
            <span key={tool.name} className="inline-flex items-center gap-1">
              <ToolChip name={tool.name} img={tool.img} href={tool.href} />
              {i < primaryTools.length - 2 && <span className="text-zinc-400 dark:text-zinc-600">,</span>}
              {i === primaryTools.length - 2 && <span className="ml-0.5">{t.and}</span>}
            </span>
          ))}
          <span>.</span>
        </p>
      </Section>

      <Divider />

      {/* ── Social Links ────────────────────────────────────────── */}
      <Section title={t.socialLinks} id="social-links">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800">
          {socials.map((s) => <SocialCard key={s.platform} {...s} />)}
        </div>
      </Section>

      <Divider />

      {/* ── Stack ───────────────────────────────────────────────── */}
      <Section title={t.stack} id="stack">
        <div className="flex flex-wrap gap-4 pb-4">
          {techIcons.map(({ name, icon, href }) => (
            <StackIcon key={name} name={name} icon={icon} href={href} />
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── Community Contributions ────────────────────────────────── */}
      <Section title={t.contributions} id="contributions">
        <ContributionGraph t={t} />
      </Section>

      <Divider />

      {/* ── Experience ──────────────────────────────────────────── */}
      <Section title={t.experience} id="experience">
        <TimelineSection groups={experienceData} t={t} openRoles={openRoles} toggleRole={toggleRole} isEducation={false} />
      </Section>

      <Divider />

      {/* ── Education ───────────────────────────────────────────── */}
      <Section title={t.education} id="education">
        <TimelineSection groups={educationData} t={t} openRoles={openRoles} toggleRole={toggleRole} isEducation={true} />
      </Section>

      <Divider />

      {/* ── Key Initiatives ─────────────────────────────────────── */}
      <Section title={t.initiatives} id="initiatives">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              name: lang === 'id' ? 'Infrastruktur CCTV Multi-Outlet' : 'Multi-Outlet CCTV Infrastructure',
              org: 'Baked Bali',
              badge: t.live,
              desc: lang === 'id'
                ? 'Pengelolaan infrastruktur CCTV berbasis DVR/NVR di 6 outlet F&B, termasuk instalasi, konfigurasi, pemantauan kesehatan sistem untuk memastikan keamanan operasional 24/7.'
                : 'End-to-end deployment and management of DVR/NVR-based CCTV infrastructure across 6 F&B outlets, including installation, configuration, health monitoring to ensure reliable 24/7 security coverage.',
              tags: ['DVR/NVR', 'IP Camera', 'CCTV', 'Surveillance'],
            },
            {
              name: lang === 'id' ? 'Implementasi MDM untuk Pengelolaan Multi-Perangkat' : 'Centralized Device Management Rollout',
              org: 'Baked Bali',
              badge: t.live,
              desc: lang === 'id'
                ? 'Mengimplementasikan dan mengelola solusi manajemen endpoint pada perangkat Android, iOS, Windows, dan macOS, termasuk penerapan kebijakan keamanan, kontrol aplikasi, registrasi perangkat, serta pengelolaan perangkat secara terpusat.'
                : 'Implemented and administered endpoint management solutions across Android, iOS, Windows, and macOS devices, enforcing security policies, application control, device enrollment, and centralized fleet management.',
              tags: ['MDM', 'Windows', 'macOS', 'Policy'],
            },
       {
              name: lang === 'id' ? 'Sistem Bisnis & Operasional TI' : 'Business Systems & IT Operations',
              org: 'Locca Sea House',
              badge: null,
              desc: lang === 'id'
                ? 'Menyediakan dukungan operasional dan infrastruktur TI secara menyeluruh, mencakup pengelolaan LAN, switch, server, CCTV, sistem POS, terminal pembayaran EDC, dan layanan berbasis cloud untuk memastikan operasional bisnis berjalan stabil.'
          : 'Delivered end-to-end IT infrastructure and operational support, maintaining LAN, switching, servers, CCTV, POS systems, EDC payment terminals, and cloud-based services to ensure reliable business operations.',   
              tags: ['POS', 'EDC', 'Google Workspace', 'SaaS'],
            },
            {
              name: lang === 'id' ? 'Pemetaan ODP Fiber Optik' : 'Fiber-Optic ODP Mapping',
              org: 'PT Global Lintas Solusi',
              badge: null,
              desc: lang === 'id'
                ? 'Merancang dan memelihara dokumentasi rute jaringan regional serta pemetaan Optical Distribution Point (ODP) untuk mendukung perencanaan implementasi FTTH, pengembangan infrastruktur, dan aktivitas operasional jaringan.'
                : 'Designed and maintained regional network route documentation and Optical Distribution Point (ODP) mapping to support FTTH deployment planning, infrastructure expansion, and network operations activities.',
              tags: ['FTTH', 'ODP Mapping', 'Fiber-Optic', 'NOC'],
            },
          ].map((p) => (
            <div key={p.name} className="p-5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-sm">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="text-zinc-900 dark:text-white font-semibold text-sm leading-snug flex-1">{p.name}</h3>
                {p.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded border border-green-600 dark:border-green-800 text-green-600 dark:text-green-500 font-mono flex-shrink-0">
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="text-zinc-400 dark:text-zinc-600 text-xs font-mono mb-2">{p.org}</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-3">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="pb-16" />
    </div>
  );
}

// ─── Layout helpers ───────────────────────────────────────────────────────────

function Divider() {
  return (
    <div
      className="h-px w-full"
      style={{ background: 'repeating-linear-gradient(90deg, var(--divider-color) 0px, var(--divider-color) 4px, transparent 4px, transparent 8px)' }}
    />
  );
}

function Section({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="py-7 scroll-mt-16">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-5">{title}</h2>
      {children}
    </section>
  );
}

function InfoItem({ icon, text, href }: { icon: React.ReactNode; text: React.ReactNode; href?: string }) {
  const inner = (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm text-zinc-600 dark:text-zinc-300">{text}</span>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
      {inner}
    </a>
  ) : inner;
}
