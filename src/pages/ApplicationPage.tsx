import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getPortalData, addApplication } from '../lib/store';
import { AppType, Question } from '../types';
import { ArrowLeft, Send } from 'lucide-react';

export default function ApplicationPage() {
  const { type } = useParams<{ type: AppType }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [discordId, setDiscordId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (type) {
      const data = getPortalData();
      setQuestions(data.settings.questions[type] || []);
    }
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordId) {
      toast.error('Please enter your Discord ID');
      return;
    }
    
    setIsSubmitting(true);
    try {
      addApplication({
        type: type as AppType,
        discordId,
        answers,
        videoUrl,
      });
      toast.success('Your application has been sent successfully! It will be reviewed soon.');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      toast.error('An error occurred while sending the application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const titles: Record<string, string> = {
    whitelist: 'Whitelist Application',
    staff: 'Staff Application',
    gang: 'Gang Application',
  };

  if (!type || !titles[type]) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-white/60 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-950/20 backdrop-blur-xl border border-blue-500/30 rounded-[2.5rem] p-10 shadow-2xl space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">{titles[type]}</h1>
          <p className="text-blue-300/60 font-medium">Please fill out the form below accurately</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-blue-200/80 block uppercase tracking-wider">Discord ID</label>
              <input
                required
                type="text"
                placeholder="Ex: 952506886224228402"
                className="w-full bg-blue-900/20 border border-blue-500/30 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all text-left font-mono"
                value={discordId}
                onChange={(e) => setDiscordId(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-blue-200/80 block uppercase tracking-wider">Video Link (Optional)</label>
              <input
                type="url"
                placeholder="https://youtube.com/..."
                className="w-full bg-blue-900/20 border border-blue-500/30 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all text-left"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>

            {questions.map((q) => (
              <div key={q.id} className="space-y-2">
                <label className="text-sm font-bold text-blue-200/80 block uppercase tracking-wider">{q.text}</label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-blue-900/20 border border-blue-500/30 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all resize-none"
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-500 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-blue-900/40 uppercase tracking-widest"
          >
            <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
            <Send className="w-5 h-5 ml-2" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
