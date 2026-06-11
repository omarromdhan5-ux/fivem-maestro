export type AppType = 'whitelist' | 'staff';

export interface Question {
  id: string;
  text: string;
}

export interface Application {
  id: string;
  type: AppType;
  discordId: string;
  answers: Record<string, string>;
  status: 'pending' | 'accepted' | 'rejected';
  videoUrl?: string;
  createdAt: string;
}

export interface DonationItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

export interface Settings {
  siteName: string;
  backgroundUrl: string;
  ownerVideoUrl: string;
  ownerDiscordIds: string[];
  questions: Record<AppType, Question[]>;
}
