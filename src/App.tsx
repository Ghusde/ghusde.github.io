import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AskMe from './pages/AskMe';  
import { Lang } from './translations';



export type Page = 'home' | 'askme';
export type { Lang };

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState<Lang>('en');

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="relative min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white font-sans transition-colors duration-200">
        {/* Marble texture — dark mode: silver veins on obsidian via screen blend */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none select-none hidden dark:block"
          style={{
            backgroundImage: 'url(/image.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.08,
            mixBlendMode: 'screen',
            zIndex: 0,
          }}
        />
        {/* Marble texture — light mode: white marble with gray veins */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none select-none block dark:hidden"
          style={{
            backgroundImage: "url('/image%20copy.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.55,
            mixBlendMode: 'multiply',
            zIndex: 0,
          }}
        />
        {/* Content sits above the texture */}
        <div className="relative" style={{ zIndex: 1 }}>
          <Navbar
            page={page}
            setPage={setPage}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            lang={lang}
            setLang={setLang}
          />
          <main className="max-w-3xl mx-auto px-4">
            {page === 'home' ? <Home lang={lang} /> : <AskMe lang={lang} />}
          </main>
        </div>
      </div>
    </div>
  );
}
