'use client';

import { PlayCircle, Music, Crown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { id: 'player', label: 'Player', icon: PlayCircle, path: '/' },
    { id: 'sounds', label: 'Sons', icon: Music, path: '/sounds' },
    { id: 'premium', label: 'Premium', icon: Crown, path: '/premium' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 pb-safe">
      <div className="flex justify-around items-center h-20 max-w-2xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.path;

          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.path)}
              className={`flex flex-col items-center justify-center gap-1 px-6 py-2 transition-colors ${
                isActive ? 'text-blue-400' : 'text-slate-400'
              }`}
            >
              <Icon size={28} strokeWidth={2} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

