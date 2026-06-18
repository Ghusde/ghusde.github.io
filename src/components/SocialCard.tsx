import { ArrowUpRight } from 'lucide-react';

interface Props {
  icon: React.ReactNode;
  platform: string;
  handle: string;
  followers?: string;
  stats?: string;
  href: string;
}

export default function SocialCard({ icon, platform, handle, followers, stats, href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-5 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all duration-200"
    >
      <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-zinc-900 dark:text-white font-semibold text-sm">{platform}</p>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-mono truncate">{handle}</p>
        {followers && <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-0.5">{followers} followers</p>}
        {stats && <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-0.5">{stats}</p>}
      </div>
      <ArrowUpRight
        size={16}
        className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors flex-shrink-0"
      />
    </a>
  );
}
