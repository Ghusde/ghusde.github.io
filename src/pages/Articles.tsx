import { ArrowUpRight, Clock } from 'lucide-react';
import { Lang, tr } from '../translations';

const articles = {
  en: [
    {
      title: 'Configuring MikroTik RouterOS for Multi-Site F&B Operations',
      summary: 'A practical guide to setting up MikroTik RouterOS for restaurant chains — covering VLAN segmentation, bandwidth management, and remote access via Winbox across multiple outlets.',
      date: 'May 15, 2026',
      readTime: '10 min read',
      tags: ['MikroTik', 'Networking', 'F&B IT'],
      href: '#',
    },
    {
      title: 'MDM for Hospitality: Managing Android & iOS Devices at Scale',
      summary: 'How to implement Mobile Device Management across a multi-outlet hospitality business — device enrollment, policy enforcement, app control, and remote wipe workflows.',
      date: 'Apr 28, 2026',
      readTime: '8 min read',
      tags: ['MDM', 'Android', 'iOS'],
      href: '#',
    },
    {
      title: 'DVR/NVR CCTV Systems: From Installation to Fault Isolation',
      summary: 'End-to-end walkthrough for deploying and maintaining DVR/NVR CCTV infrastructure in commercial environments — covering cabling, camera types, health monitoring, and common failure points.',
      date: 'Mar 10, 2026',
      readTime: '12 min read',
      tags: ['CCTV', 'DVR/NVR', 'Infrastructure'],
      href: '#',
    },
    {
      title: 'ESB FnB POS Setup & Troubleshooting Guide',
      summary: "Lessons learned from administering ESB FnB POS (Lite & OMS) across multiple sites — SSL certificate management, multi-device provisioning, and handling real-time incidents during peak hours.",
      date: 'Feb 5, 2026',
      readTime: '7 min read',
      tags: ['POS', 'ESB FnB', 'Hospitality IT'],
      href: '#',
    },
    {
      title: 'FTTH Last-Mile Deployment & ODP Mapping for B2B Networks',
      summary: "A field engineer's perspective on fiber-optic last-mile installations — ODP mapping, link quality validation, and SLA compliance for B2B ISP clients.",
      date: 'Jan 20, 2026',
      readTime: '9 min read',
      tags: ['FTTH', 'Fiber-Optic', 'NOC'],
      href: '#',
    },
  ],
  id: [
    {
      title: 'Konfigurasi MikroTik RouterOS untuk Operasional F&B Multi-Outlet',
      summary: 'Panduan praktis setup MikroTik RouterOS untuk jaringan restoran — mencakup segmentasi VLAN, manajemen bandwidth, dan akses jarak jauh via Winbox di beberapa outlet.',
      date: '15 Mei 2026',
      readTime: '10 menit baca',
      tags: ['MikroTik', 'Networking', 'F&B IT'],
      href: '#',
    },
    {
      title: 'MDM untuk Perhotelan: Kelola Perangkat Android & iOS dalam Skala Besar',
      summary: 'Cara mengimplementasikan Mobile Device Management di bisnis perhotelan multi-outlet — enrollment perangkat, penegakan kebijakan, kontrol aplikasi, dan alur remote wipe.',
      date: '28 Apr 2026',
      readTime: '8 menit baca',
      tags: ['MDM', 'Android', 'iOS'],
      href: '#',
    },
    {
      title: 'Sistem CCTV DVR/NVR: Dari Instalasi hingga Isolasi Gangguan',
      summary: 'Panduan lengkap deployment dan pemeliharaan infrastruktur CCTV DVR/NVR di lingkungan komersial — kabel, jenis kamera, pemantauan kesehatan, dan titik kegagalan umum.',
      date: '10 Mar 2026',
      readTime: '12 menit baca',
      tags: ['CCTV', 'DVR/NVR', 'Infrastruktur'],
      href: '#',
    },
    {
      title: 'Panduan Setup & Troubleshooting ESB FnB POS',
      summary: 'Pelajaran dari pengalaman mengelola ESB FnB POS (Lite & OMS) di beberapa lokasi — manajemen sertifikat SSL, provisi multi-perangkat, dan penanganan insiden saat jam sibuk.',
      date: '5 Feb 2026',
      readTime: '7 menit baca',
      tags: ['POS', 'ESB FnB', 'IT Perhotelan'],
      href: '#',
    },
    {
      title: 'Deployment FTTH Last-Mile & Pemetaan ODP untuk Jaringan B2B',
      summary: 'Perspektif teknisi lapangan tentang instalasi fiber optik last-mile — pemetaan ODP, validasi kualitas link, dan kepatuhan SLA untuk klien ISP B2B.',
      date: '20 Jan 2026',
      readTime: '9 menit baca',
      tags: ['FTTH', 'Fiber-Optik', 'NOC'],
      href: '#',
    },
  ],
};

interface Props { lang: Lang; }

export default function Articles({ lang }: Props) {
  const t = tr[lang];
  const list = articles[lang];

  return (
    <div className="py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t.articlesTitle}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">{t.articlesDesc}</p>
      </div>

      <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800">
        {list.map((article) => (
          <a
            key={article.title}
            href={article.href}
            className="group p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200 flex gap-4 justify-between"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-zinc-900 dark:text-white font-semibold text-base mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                {article.title}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-3 line-clamp-2">
                {article.summary}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 text-xs">
                  <Clock size={12} />
                  <span>{article.readTime}</span>
                </div>
                <span className="text-zinc-300 dark:text-zinc-700 text-xs">·</span>
                <span className="text-zinc-400 dark:text-zinc-500 text-xs">{article.date}</span>
                <div className="flex gap-1.5 flex-wrap">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ArrowUpRight
              size={16}
              className="text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors flex-shrink-0 mt-1"
            />
          </a>
        ))}
      </div>

      <div className="pb-16" />
    </div>
  );
}
