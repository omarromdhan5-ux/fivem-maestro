import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  getPortalData, 
  updateApplicationStatus, 
  updateSettings, 
  addDonation, 
  deleteDonation,
} from '../lib/store';
import { Application, Settings, DonationItem, AppType, Question } from '../types';
import { 
  FileText, 
  ShoppingBag, 
  Settings as SettingsIcon, 
  Check, 
  X, 
  ExternalLink, 
  Trash2, 
  Plus, 
  LogOut,
  HelpCircle,
  Video
} from 'lucide-react';

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [discordIdInput, setDiscordIdInput] = useState('');
  const [activeTab, setActiveTab] = useState<'apps' | 'donations' | 'settings' | 'questions'>('apps');
  const [data, setData] = useState(getPortalData());

  const refreshData = () => setData(getPortalData());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.settings.ownerDiscordIds.includes(discordIdInput)) {
      setIsAdmin(true);
      toast.success('Welcome to the Admin Panel');
    } else {
      toast.error('You do not have access permissions');
    }
  };

  const handleStatusUpdate = (id: string, status: 'accepted' | 'rejected') => {
    updateApplicationStatus(id, status);
    toast.success(`Application ${status === 'accepted' ? 'accepted' : 'rejected'} successfully`);
    refreshData();
  };

  const handleUpdateSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedSettings: Settings = {
      ...data.settings,
      siteName: formData.get('siteName') as string,
      backgroundUrl: formData.get('backgroundUrl') as string,
      ownerVideoUrl: formData.get('ownerVideoUrl') as string,
      ownerDiscordIds: (formData.get('ownerIds') as string).split(',').map(s => s.trim()),
    };
    updateSettings(updatedSettings);
    toast.success('Settings updated successfully');
    refreshData();
  };

  const handleAddDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addDonation({
      name: formData.get('name') as string,
      price: formData.get('price') as string,
      imageUrl: formData.get('imageUrl') as string,
    });
    toast.success('Product added successfully');
    e.currentTarget.reset();
    refreshData();
  };

  const handleDeleteDonation = (id: string) => {
    deleteDonation(id);
    toast.success('Product deleted');
    refreshData();
  };

  const handleAddQuestion = (type: AppType) => {
    const text = prompt('Enter question text:');
    if (!text) return;

    const updatedSettings = { ...data.settings };
    updatedSettings.questions[type].push({
      id: crypto.randomUUID(),
      text,
    });
    updateSettings(updatedSettings);
    refreshData();
  };

  const handleDeleteQuestion = (type: AppType, id: string) => {
    const updatedSettings = { ...data.settings };
    updatedSettings.questions[type] = updatedSettings.questions[type].filter(q => q.id !== id);
    updateSettings(updatedSettings);
    refreshData();
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-blue-950/20 backdrop-blur-xl border border-blue-500/30 p-10 rounded-[2.5rem] shadow-2xl space-y-8 w-full max-w-md"
        >
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tight uppercase">Login</h2>
            <p className="text-blue-300/60 font-medium">Owner Admin Panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              className="w-full bg-blue-900/20 border border-blue-500/30 rounded-2xl px-5 py-4 text-white text-center focus:ring-4 focus:ring-blue-500/20 outline-none transition-all placeholder:text-blue-200/20 font-bold"
              placeholder="Enter Discord ID"
              value={discordIdInput}
              onChange={(e) => setDiscordIdInput(e.target.value)}
            />
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-900/40 transition-all active:scale-[0.98] uppercase tracking-widest">
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full lg:w-64 space-y-4">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col space-y-2">
          <button
            onClick={() => setActiveTab('apps')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'apps' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-white hover:bg-white/10'}`}
          >
            <FileText className="w-5 h-5" />
            <span>Applications</span>
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'donations' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-white hover:bg-white/10'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Donations</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'questions' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-white hover:bg-white/10'}`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Questions</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-white hover:bg-white/10'}`}
          >
            <SettingsIcon className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <div className="border-t border-white/10 my-2 pt-2">
            <button
              onClick={() => setIsAdmin(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 w-full transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 overflow-x-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'apps' && (
            <motion.div
              key="apps"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">Submitted Applications</h2>
              <div className="space-y-4">
                {data.applications.slice().reverse().map((app) => (
                  <div key={app.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          app.type === 'whitelist' ? 'bg-blue-500/20 text-blue-400' :
                          app.type === 'staff' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {app.type}
                        </span>
                        <h3 className="text-xl font-bold text-white">Discord ID: {app.discordId}</h3>
                        <p className="text-white/40 text-sm">{new Date(app.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        {app.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusUpdate(app.id, 'accepted')}
                              className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(app.id, 'rejected')}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <span className={`px-4 py-1 rounded-lg font-bold ${
                            app.status === 'accepted' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {app.status === 'accepted' ? 'Accepted' : 'Rejected'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 bg-black/20 p-4 rounded-xl">
                      {Object.entries(app.answers).map(([qId, answer]) => {
                        const question = data.settings.questions[app.type].find(q => q.id === qId);
                        return (
                          <div key={qId} className="space-y-1">
                            <p className="text-white/60 text-sm font-medium">{question?.text || 'Deleted Question'}:</p>
                            <p className="text-white">{answer}</p>
                          </div>
                        );
                      })}
                      {app.videoUrl && (
                        <div className="pt-2 border-t border-white/5">
                          <a 
                            href={app.videoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 flex items-center hover:underline"
                          >
                            Watch Video <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {data.applications.length === 0 && (
                  <p className="text-center py-12 text-white/40">No applications submitted yet</p>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'donations' && (
            <motion.div
              key="donations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-white">Manage Donations</h2>
              
              <form onSubmit={handleAddDonation} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                <h3 className="text-xl font-bold text-white">Add New Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input name="name" required placeholder="Product Name" className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-white/20" />
                  <input name="price" required placeholder="Price" className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-white/20" />
                  <input name="imageUrl" required placeholder="Image URL" className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-white/20" />
                </div>
                <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 mr-2" /> Add Product
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.donations.map((item) => (
                  <div key={item.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={item.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="ml-4">
                        <h4 className="text-white font-bold">{item.name}</h4>
                        <p className="text-white/40">{item.price}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteDonation(item.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-white">Manage Application Questions</h2>
              
              {(['whitelist', 'staff'] as AppType[]).map((type) => (
                <div key={type} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white uppercase">{type} Questions</h3>
                    <button 
                      onClick={() => handleAddQuestion(type)}
                      className="text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center transition-all"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Question
                    </button>
                  </div>
                  <div className="space-y-2">
                    {data.settings.questions[type].map((q) => (
                      <div key={q.id} className="flex justify-between items-center bg-black/20 p-3 rounded-xl">
                        <span className="text-white">{q.text}</span>
                        <button onClick={() => handleDeleteQuestion(type, q.id)} className="text-red-400 p-1 hover:bg-red-400/10 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-white">Site Settings</h2>
                {data.settings.ownerVideoUrl && (
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-bold bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                    <Video className="w-4 h-4" />
                    Video Background Active
                  </div>
                )}
              </div>

              <form onSubmit={handleUpdateSettings} className="bg-blue-950/20 backdrop-blur-xl border border-blue-500/30 p-8 rounded-[2rem] space-y-6">
                <div className="space-y-2">
                  <label className="text-blue-200/60 font-bold uppercase tracking-wider">Site Name</label>
                  <input name="siteName" defaultValue={data.settings.siteName} className="w-full bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl text-white outline-none focus:ring-4 focus:ring-blue-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-blue-200/60 font-bold uppercase tracking-wider">Background Image URL</label>
                  <input name="backgroundUrl" defaultValue={data.settings.backgroundUrl} className="w-full bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl text-white outline-none focus:ring-4 focus:ring-blue-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-blue-200/60 font-bold uppercase tracking-wider">Background Video URL (Direct Link)</label>
                  <input name="ownerVideoUrl" defaultValue={data.settings.ownerVideoUrl} className="w-full bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl text-white outline-none focus:ring-4 focus:ring-blue-500/20 transition-all font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-blue-200/60 font-bold uppercase tracking-wider">Owner Discord IDs (Comma separated)</label>
                  <input name="ownerIds" defaultValue={data.settings.ownerDiscordIds.join(', ')} className="w-full bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl text-white outline-none focus:ring-4 focus:ring-blue-500/20 transition-all" />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-900/40 transition-all active:scale-[0.98] uppercase tracking-widest">
                  Save Changes
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
