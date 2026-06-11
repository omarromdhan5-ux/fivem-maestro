import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPortalData } from '../lib/store';
import { DonationItem } from '../types';
import { ShoppingCart, Tag } from 'lucide-react';

export default function Donations() {
  const [donations, setDonations] = useState<DonationItem[]>([]);

  useEffect(() => {
    const data = getPortalData();
    setDonations(data.donations);
  }, []);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] uppercase">Donation Store</h1>
        <p className="text-xl text-blue-300/60 font-medium uppercase tracking-widest">Support the server and get unique rewards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {donations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-blue-950/20 backdrop-blur-xl border border-blue-500/30 rounded-[2rem] overflow-hidden hover:border-blue-400/50 transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] shadow-xl"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-black text-white">{item.name}</h3>
                <div className="flex items-center text-blue-400 font-black text-2xl">
                  <Tag className="w-5 h-5 mr-1" />
                  {item.price}
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 transition-all active:scale-[0.98] uppercase tracking-widest">
                <span>Buy Now</span>
                <ShoppingCart className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {donations.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-white/40 text-xl">No products available at the moment</p>
        </div>
      )}
    </div>
  );
}
