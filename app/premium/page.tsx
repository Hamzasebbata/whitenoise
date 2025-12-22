'use client';

import { Crown, Check, Sparkles } from 'lucide-react';

export default function PremiumPage() {
  const features = [
    {
      icon: '🎵',
      title: 'Tous les sons premium',
      description: 'Accédez à 7 sons de haute qualité',
    },
    {
      icon: '🚫',
      title: 'Sans publicité',
      description: 'Expérience pure et apaisante',
    },
    {
      icon: '⏰',
      title: 'Minuteur avancé',
      description: 'Programmez jusqu\'à 8 heures',
    },
    {
      icon: '📱',
      title: 'Mode hors ligne',
      description: 'Fonctionne sans connexion',
    },
    {
      icon: '🎚️',
      title: 'Contrôle du volume',
      description: 'Ajustez finement l\'intensité',
    },
    {
      icon: '🌙',
      title: 'Mode nuit optimisé',
      description: 'Interface ultra sombre',
    },
  ];

  const plans = [
    {
      name: 'Mensuel',
      price: '4,99€',
      period: '/mois',
      savings: null,
    },
    {
      name: 'Annuel',
      price: '39,99€',
      period: '/an',
      savings: 'Économisez 33%',
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-24 px-6 pt-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 animate-pulse-slow">
            <Crown size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-100 mb-3">
            WhiteNoise Premium
          </h1>
          <p className="text-xl text-slate-400">
            L'expérience ultime pour des nuits paisibles
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-5 border border-slate-800"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="space-y-4 mb-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-6 border-2 transition-all ${
                plan.popular
                  ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center gap-1">
                  <Sparkles size={14} className="text-white" />
                  <span className="text-xs font-bold text-white">
                    PLUS POPULAIRE
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-1">
                    {plan.name}
                  </h3>
                  {plan.savings && (
                    <p className="text-green-400 text-sm font-medium">
                      {plan.savings}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-100">
                      {plan.price}
                    </span>
                    <span className="text-slate-400">{plan.period}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="w-full py-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-xl rounded-3xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-xl shadow-blue-500/30 mb-4">
          Commencer l'essai gratuit
        </button>

        <p className="text-center text-sm text-slate-500 mb-8">
          7 jours gratuits, puis 4,99€/mois. Annulez à tout moment.
        </p>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-green-400" />
            <span>Sans engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-green-400" />
            <span>Paiement sécurisé</span>
          </div>
        </div>
      </div>
    </div>
  );
}

