import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';
import { getPortalData } from './lib/store';
import Home from './pages/Home';
import ApplicationPage from './pages/ApplicationPage';
import Donations from './pages/Donations';
import Admin from './pages/Admin';
import { Settings } from './types';

function Layout({ children, settings }: { children: React.ReactNode; settings: Settings }) {
  return (
    <div 
      dir="ltr"
      className="min-h-screen relative transition-all duration-500 flex flex-col text-left overflow-x-hidden"
    >
      {settings.ownerVideoUrl ? (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50 grayscale-[0.3] sepia-[0.1] contrast-[1.1] brightness-[0.8]"
          >
            <source src={settings.ownerVideoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>
      ) : (
        <div 
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${settings.backgroundUrl})` }}
        />
      )}
      
      <nav className="p-6 flex justify-between items-center text-white max-w-7xl mx-auto w-full">
        <Link to="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
          {settings.siteName}
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/donations" className="hover:text-blue-400 transition-colors font-medium">Donations</Link>
          <Link to="/admin" className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 px-5 py-2 rounded-xl backdrop-blur-md transition-all font-bold">Admin Panel</Link>
        </div>
      </nav>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="p-8 text-center text-white/40 text-sm">
        &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
      </footer>
    </div>
  );
}

function App() {
  const [settings, setSettings] = useState<Settings>(getPortalData().settings);

  // Sync settings periodically or on mount
  useEffect(() => {
    const data = getPortalData();
    setSettings(data.settings);
  }, []);

  return (
    <Router>
      <Layout settings={settings}>
        <Routes>
          <Route path="/" element={<Home settings={settings} />} />
          <Route path="/apply/:type" element={<ApplicationPage />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
      <Toaster position="top-center" richColors />
    </Router>
  );
}

export default App;
