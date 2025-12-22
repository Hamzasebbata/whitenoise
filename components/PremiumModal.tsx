'use client';

import { X, Crown, Check } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  if (!isOpen) return null;

  const features = [
    'Accès à tous les sons premium',
    'Pas de publicités',
    'Minuteur personnalisé',
    'Mode hors ligne',
    'Sons haute qualité',
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
      <div className="bg-slate-900 rounded-3xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X size={28} />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
            <Crown size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-100 mb-2">
            WhiteNoise Premium
          </h2>
          <p className="text-slate-400">
            Débloquez tous les sons pour apaiser votre bébé
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
              <span className="text-slate-300">{feature}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button className="w-full py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all">
            Essai gratuit 7 jours
          </button>
          <p className="text-center text-sm text-slate-500">
            Puis 4,99€/mois. Annulez à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
}

