import { Settings, Application, DonationItem, AppType } from '../types';

const STORAGE_KEY = 'fivem_portal_data';

const DEFAULT_QUESTIONS = {
  whitelist: [
    { id: '1', text: 'What is your character name?' },
    { id: '2', text: 'How old are you?' },
    { id: '3', text: 'Why do you want to join VinTa RolePlay?' },
    { id: '4', text: 'Define Roleplay in your own words.' },
  ],
  staff: [
    { id: '1', text: 'Have you been a staff member on other servers before?' },
    { id: '2', text: 'How many hours can you dedicate daily?' },
    { id: '3', text: 'How would you handle a conflict between players?' },
  ],
};

const DEFAULT_SETTINGS: Settings = {
  siteName: 'VinTa RolePlay',
  backgroundUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/46625d2d-7e46-4d27-ab71-c69f56d79afa/vinta-bg-53ddb7e4-1781084017664.webp',
  ownerVideoUrl: 'https://cdn.pixabay.com/video/2020/09/24/50170-460678601_large.mp4',
  ownerDiscordIds: ['952506886224228402'],
  questions: DEFAULT_QUESTIONS,
};

const DEFAULT_DONATIONS: DonationItem[] = [
  {
    id: '1',
    name: 'Luxury Supercar',
    price: '$50',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/46625d2d-7e46-4d27-ab71-c69f56d79afa/donation-car-1-545cbd61-1781080090844.webp',
  },
  {
    id: '2',
    name: 'Custom Base',
    price: '$100',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/46625d2d-7e46-4d27-ab71-c69f56d79afa/donation-clothing-1-2984f034-1781080092506.webp',
  },
];

interface PortalData {
  settings: Settings;
  applications: Application[];
  donations: DonationItem[];
}

export const getPortalData = (): PortalData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return {
      settings: DEFAULT_SETTINGS,
      applications: [],
      donations: DEFAULT_DONATIONS,
    };
  }
  return JSON.parse(data);
};

export const savePortalData = (data: PortalData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addApplication = (app: Omit<Application, 'id' | 'createdAt' | 'status'>) => {
  const data = getPortalData();
  const newApp: Application = {
    ...app,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  data.applications.push(newApp);
  savePortalData(data);
  return newApp;
};

export const updateApplicationStatus = (id: string, status: 'accepted' | 'rejected') => {
  const data = getPortalData();
  const app = data.applications.find((a) => a.id === id);
  if (app) {
    app.status = status;
    savePortalData(data);
  }
};

export const updateSettings = (settings: Settings) => {
  const data = getPortalData();
  data.settings = settings;
  savePortalData(data);
};

export const addDonation = (item: Omit<DonationItem, 'id'>) => {
  const data = getPortalData();
  const newItem: DonationItem = {
    ...item,
    id: crypto.randomUUID(),
  };
  data.donations.push(newItem);
  savePortalData(data);
};

export const deleteDonation = (id: string) => {
  const data = getPortalData();
  data.donations = data.donations.filter((d) => d.id !== id);
  savePortalData(data);
};
