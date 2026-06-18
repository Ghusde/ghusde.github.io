import { useState, useEffect, useRef } from 'react';
import { Search, Moon, Sun, Languages, X } from 'lucide-react';
import { Page, Lang } from '../App';
import { tr, searchSections } from '../translations';

interface Props {
  page: Page;
  setPage: (p: Page) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Navbar({ page, setPage, darkMode, setDarkMode, lang, setLang }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = tr[lang];

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  // Click-outside to close dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery('');
      }
    };
    if (searchOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);

  const filteredSections = searchSections.filter((s) => {
    const label = lang === 'id' ? s.idn : s.en;
    return label.toLowerCase().includes(query.toLowerCase());
  });

  const scrollTo = (sectionId: string) => {
    setSearchOpen(false);
    setQuery('');
    if (page !== 'home') {
      setPage('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="w-8" />

        <nav className="flex items-center gap-1">
          {(['home', 'articles'] as Page[]).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                page === p
                  ? 'text-zinc-900 dark:text-white'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              {p === 'home' ? t.home : t.articles}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {/* Search */}
          <div className="relative" ref={dropdownRef}>
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-1.5">
                <Search size={14} className="text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none w-36"
                />
                <button onClick={() => { setSearchOpen(false); setQuery(''); }}>
                  <X size={14} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all"
              >
                <Search size={13} />
                <span className="hidden sm:inline">{t.search}</span>
                <kbd className="hidden sm:inline text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
              </button>
            )}

            {/* Search dropdown */}
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl overflow-hidden z-50">
                {page !== 'home' ? (
                  <div className="px-4 py-3 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                    {t.searchOnHome}
                  </div>
                ) : filteredSections.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                    {t.noResults}
                  </div>
                ) : (
                  filteredSections.map((s) => {
                    const label = lang === 'id' ? s.idn : s.en;
                    const highlight = query.trim();
                    const idx = label.toLowerCase().indexOf(highlight.toLowerCase());
                    return (
                      <button
                        key={s.sectionId}
                        onClick={() => scrollTo(s.sectionId)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      >
                        <Search size={12} className="text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          {highlight && idx !== -1 ? (
                            <>
                              {label.slice(0, idx)}
                              <span className="text-blue-500 dark:text-blue-400 font-medium">
                                {label.slice(idx, idx + highlight.length)}
                              </span>
                              {label.slice(idx + highlight.length)}
                            </>
                          ) : (
                            label
                          )}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
            title={t.translate}
            className="flex items-center gap-1 p-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <Languages size={16} />
            <span className="text-[10px] font-mono font-bold leading-none">
              {lang === 'en' ? 'ID' : 'EN'}
            </span>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={t.toggle}
            className="p-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
