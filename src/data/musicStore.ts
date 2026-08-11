export type MusicCategory = 'KRUMP' | 'HIP-HOP' | 'BREAKING' | 'RYS' | 'ASANSOL KRUMP KRANTI';

export interface StoreTrack {
  id: string;
  trackNumber: string;
  title: string;
  producer: string;
  category: MusicCategory;
  price: number; // ₹49 per track
  duration: string;
  bpm?: number;
  bitrate?: string;
  audioUrl: string;
  coverImage?: string;
  description: string;
  event?: string;
  tags: string[];
}

export const MUSIC_CATEGORIES: { id: string; label: string }[] = [
  { id: 'All', label: 'ALL TRACKS' },
  { id: 'KRUMP', label: 'KRUMP' },
  { id: 'HIP-HOP', label: 'HIP-HOP' },
  { id: 'BREAKING', label: 'BREAKING' },
  { id: 'RYS', label: 'RYS' },
  { id: 'ASANSOL KRUMP KRANTI', label: 'ASANSOL KRUMP KRANTI' }
];

export const MUSIC_STORE_TRACKS: StoreTrack[] = [
  {
    id: 'track-01-whiphead-2',
    trackNumber: '01',
    title: 'WHIPHEAD 2',
    producer: '7 Demon',
    category: 'KRUMP',
    price: 49,
    duration: '02:17',
    bitrate: '1411 kbps',
    audioUrl: '/music/7 Demon - WHIPHEAD 2.wav',
    description: 'Raw high-fidelity Krump stomp beat by 7 Demon.',
    tags: ['1411 kbps', '7 Demon', 'Whiphead']
  },
  {
    id: 'track-02-get-at-you',
    trackNumber: '02',
    title: 'GET AT YOU',
    producer: 'Konkrete Kvn Dvs',
    category: 'KRUMP',
    price: 49,
    duration: '03:10',
    audioUrl: '/music/Get At You    Konkrete   Kvn Dvs.mp3',
    description: 'Heavy battle cypher track by Konkrete Kvn Dvs.',
    tags: ['Konkrete', 'Kvn Dvs', 'Battle Beat']
  },
  {
    id: 'track-03-colossal-shxt',
    trackNumber: '03',
    title: 'COLOSSAL SHXT',
    producer: 'IRONFIST',
    category: 'KRUMP',
    price: 49,
    duration: '04:46',
    bitrate: '320 kbps',
    audioUrl: '/music/IRONFIST \u0393\u00C7\u00F4 COLOSSAL SHXT.mp3',
    description: 'Massive sub-bass impact track by IRONFIST.',
    tags: ['320 kbps', 'IRONFIST', 'Colossal']
  },
  {
    id: 'track-04-calm-down-nigga',
    trackNumber: '04',
    title: 'CALM DOWN NIGGA',
    producer: 'KonKrete (J-Tight)',
    category: 'KRUMP',
    price: 49,
    duration: '03:20',
    bitrate: '192 kbps',
    audioUrl: '/music/KonKrete(J-Tight) - Calm Down Nigga.mp3',
    description: 'Classic J-Tight style Krump labbing beat.',
    tags: ['192 kbps', 'J-Tight', 'KonKrete']
  },
  {
    id: 'track-05-outsiderz',
    trackNumber: '05',
    title: 'OUTSIDERZ',
    producer: 'MORFMUZIK',
    category: 'KRUMP',
    price: 49,
    duration: '03:42',
    bitrate: '320 kbps',
    audioUrl: '/music/MORFMUZIK \u0393\u00C7\u00F4 MORFMUZIK - OUTSIDERZ.mp3',
    description: 'Heavy rhythmic Krump beat by MORFMUZIK.',
    tags: ['320 kbps', 'MORFMUZIK', 'Outsiderz']
  },
  {
    id: 'track-06-the-enemy',
    trackNumber: '06',
    title: 'THE ENEMY',
    producer: 'MOZARF',
    category: 'KRUMP',
    price: 49,
    duration: '03:41',
    bitrate: '272 kbps',
    audioUrl: '/music/MOZARF \u0393\u00C7\u00F4 THE ENEMY.mp3',
    description: 'Dark aggressive battle arena loop by MOZARF.',
    tags: ['272 kbps', 'MOZARF', 'The Enemy']
  },
  {
    id: 'track-07-imnot',
    trackNumber: '07',
    title: 'IMNOT',
    producer: 'PLAYA aka GAMEOVER',
    category: 'KRUMP',
    price: 49,
    duration: '02:44',
    bitrate: '320 kbps',
    audioUrl: '/music/PLAYA aka GAMEOVER \u0393\u00C7\u00F4 IMNOT.mp3',
    description: 'High-energy buck beat by PLAYA aka GAMEOVER.',
    tags: ['320 kbps', 'Gameover', 'Playa']
  },
  {
    id: 'track-08-thug-anthem',
    trackNumber: '08',
    title: 'THUG ANTHEM - KRUMP BOX 2',
    producer: 'Venom Beatz',
    category: 'KRUMP',
    price: 49,
    duration: '03:34',
    bitrate: '320 kbps',
    audioUrl: '/music/Venom Beatz - THUG ANTHEM -  KRUMP  - Krump Box 2.mp3',
    description: 'Relentless Krump Box 2 rhythm by Venom Beatz.',
    tags: ['320 kbps', 'Venom Beatz', 'Krump Box 2']
  },
  {
    id: 'track-09-rugged-instinct',
    trackNumber: '09',
    title: '10 RUGGED INSTINCT INSTRUMENTAL',
    producer: 'Sniper Deuce (2.S.4.U)',
    category: 'KRUMP',
    price: 49,
    duration: '04:39',
    bitrate: '320 kbps',
    audioUrl: '/music/Sniper Deuce - 2.S.4.U - 10 RUGGED INSTINCT INSTRUMENTAL.mp3',
    description: 'Rugged instrumental track by Sniper Deuce.',
    tags: ['320 kbps', 'Sniper Deuce', '2.S.4.U']
  }
];
