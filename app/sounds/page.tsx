'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAudio } from '@/contexts/AudioContext';
import { SOUNDS } from '@/lib/sounds-data';
import { Lock } from 'lucide-react';
import PremiumModal from '@/components/PremiumModal';

export default function SoundsPage() {
  const { playSound } = useAudio();
  const router = useRouter();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleSoundClick = (sound: typeof SOUNDS[0]) => {
    if (sound.isPremium) {
      setShowPremiumModal(true);
    } else {
      playSound(sound);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 px-6 pt-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Bibliothèque de Sons
          </h1>
          <p className="text-slate-400">
            Choisissez un son pour apaiser votre bébé
          </p>
        </div>

        {/* Sounds Grid */}
        <div className="grid grid-cols-2 gap-4">
          {SOUNDS.map((sound) => (
            <button
              key={sound.id}
              onClick={() => handleSoundClick(sound)}
              className="relative aspect-square bg-slate-900 hover:bg-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 transition-all border-2 border-slate-800 hover:border-blue-500/50 group"
            >
              {/* Premium Lock Badge */}
              {sound.isPremium && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Lock size={16} className="text-slate-900" />
                </div>
              )}

              {/* Icon */}
              <div className="text-6xl group-hover:scale-110 transition-transform">
                {sound.icon}
              </div>

              {/* Name */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-100">
                  {sound.name}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* Premium CTA */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl border border-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Lock size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Débloquez tous les sons
              </h3>
              <p className="text-slate-300 mb-4">
                Accédez à 5 sons premium pour varier les plaisirs et trouver celui qui apaise le mieux votre bébé.
              </p>
              <button
                onClick={() => setShowPremiumModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                Voir Premium
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
}

