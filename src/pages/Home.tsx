import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardList, Users, Shield, Heart } from 'lucide-react';
import { Settings } from '../types';

interface HomeProps {
  settings: Settings;
}

export default function Home({ settings }: HomeProps) {
  const navigate = useNavigate();

  const cards = [
    {
      id: 'whitelist',
      title: 'Whitelist',
      titleEn: 'Whitelist App',
      description: 'Apply to join our exclusive whitelist server',
      icon: Shield,
      path: '/apply/whitelist',
      color: 'from-blue-600/20 to-blue-800/40',
      border: 'border-blue-400/50',
      accent: 'text-blue-400'
    },
    {
      id: 'staff',
      title: 'Staff',
      titleEn: 'Staff App',
      description: 'Apply to join our dedicated management team',
      icon: ClipboardList,
      path: '/apply/staff',
      color: 'from-cyan-600/20 to-cyan-800/40',
      border: 'border-cyan-400/50',
      accent: 'text-cyan-400'
    },
    {
      id: 'donation',
      title: 'Store',
      titleEn: 'Donation',
      description: 'Support the server and get exclusive perks',
      icon: Heart,
      path: '/donations',
      color: 'from-amber-600/20 to-amber-800/40',
      border: 'border-amber-400/50',
      accent: 'text-amber-400'
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
          {settings.siteName}
        </h1>
        <p className="text-xl text-blue-200/60 font-medium uppercase tracking-widest">Select a department to continue</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {cards.map((card, index) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(card.path)}
            className={`group relative overflow-hidden rounded-3xl border ${card.border} bg-gradient-to-br ${card.color} p-8 backdrop-blur-2xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] active:scale-95 shadow-2xl`}
          >
            <div className={`absolute top-6 left-6 p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-all border border-white/10 shadow-inner`}>
              <card.icon className={`w-8 h-8 ${card.accent}`} />
            </div>
            <div className="mt-12 space-y-2 text-left">
              <h3 className={`text-xs font-bold uppercase tracking-[0.2em] ${card.accent}`}>{card.title}</h3>
              <h2 className="text-3xl font-black text-white">{card.titleEn}</h2>
              <p className="text-blue-100/40 text-sm leading-relaxed font-medium">{card.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
