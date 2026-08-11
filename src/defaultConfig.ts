import { BannerConfig, Judge, ScheduleEvent, TicketTier } from './types';

export const DEFAULT_BANNER_CONFIG: BannerConfig = {
  eventTitle: "ASANSOL KRUMP KRANTI",
  eventVol: "VOL. 1",
  bgImageUrl: "https://ibb.co/SX6VXM8F",
  bgOverlayOpacity: 0,
  bgVignette: false,
  showTextOverlays: false,
  
  leftTitleLine1: "HI,",
  leftTitleLine2: "I'M",
  leftTagline1: "RAW ENERGY.",
  leftTagline2: "REAL MOVEMENT.",
  leftTagline3: "NO LIMITS.",
  leftButtonText: "EXPLORE MORE",
  
  rightTitleLine1: "KING",
  rightTitleLine2: "RAGNAR",
  rightTagline1: "KRUMP IS MY CROWN.",
  rightTagline2: "THE STREETS ARE MY STAGE.",
  
  goldAccentColor: "#EAB308",
  leftFontFamily: "bebas",
  rightFontFamily: "bebas",
  enableDrips: true,
  enableSplatter: true,
};

export const TICKET_TIERS: TicketTier[] = [
  {
    id: "early-bird",
    name: "Audience Pass",
    price: 499,
    description: "Full day access to spectator arena, battles, and showcases.",
    features: ["Battle Arena Access", "Live DJ Sets", "Food & Merch Zone Entry"]
  },
  {
    id: "krump-pass",
    name: "Krump Fighter Pass",
    price: 999,
    description: "For active participants competing in 1v1 Open or 7 to Smoke.",
    features: ["1 Category Battle Entry", "Official Competitor Wristband", "Locker Room Access", "Certificate of Participation"],
    recommended: true
  },
  {
    id: "vip-access",
    name: "VIP Crown Pass",
    price: 1999,
    description: "Front-row stage seating, judges meet & greet, and exclusive Krump Kranti Vol. 1 Tee.",
    features: ["Front-Row VIP Seating", "Judges Workshop Access", "Official Vol. 1 Merch Tee", "Backstage Photo Op with King Ragnar"]
  }
];

export const JUDGES: Judge[] = [
  {
    id: "ragnar",
    name: "King Ragnar",
    aka: "The Krump Warlord",
    origin: "India",
    style: "Raw Power & Character Krump",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    bio: "Pioneer of the Indian Krump movement. Known for unstoppable jab energy, intense storytelling, and destructive rounds."
  },
  {
    id: "tight-eyez",
    name: "Big Mijo",
    aka: "Street Kingdom",
    origin: "USA",
    style: "Buck & Arm Control",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
    bio: "Global Krump ambassador with over 15 years of battle domination across Asia and North America."
  },
  {
    id: "princess-krump",
    name: "Lady Fury",
    aka: "Queen Stance",
    origin: "India",
    style: "Footwork & Hype",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Reigning female Krump champion with unprecedented speed, chest pops, and explosive floorwork."
  }
];

export const SCHEDULE_EVENTS: ScheduleEvent[] = [
  {
    time: "10:00 AM",
    title: "Doors Open & Registration Check-in",
    category: "General",
    stage: "Main Gates",
    description: "Competitor bib distribution, spectator entry, DJ warming up the arena."
  },
  {
    time: "11:30 AM",
    title: "Krump Workshop by King Ragnar",
    category: "Workshop",
    stage: "Studio Arena",
    description: "Exclusively for VIP pass holders & registered battlers. Fundamental jabs, chest pops & session etiquette."
  },
  {
    time: "02:00 PM",
    title: "1v1 Open Krump Preslections",
    category: "Battles",
    stage: "Battle Circle 1 & 2",
    description: "Top 64 dancers battle in 45-second rounds to qualify for Top 16."
  },
  {
    time: "05:00 PM",
    title: "7 to Smoke - Relentless Session",
    category: "Battles",
    stage: "Main Stage Circle",
    description: "7 invited battlers, 20 minutes non-stop survival of the strongest."
  },
  {
    time: "07:30 PM",
    title: "Judges Showcase & King Ragnar Main Event",
    category: "Showcase",
    stage: "Main Stage",
    description: "High-octane solo performances by international judges and headliner exhibition."
  },
  {
    time: "08:30 PM",
    title: "1v1 Open Finals & Award Ceremony",
    category: "Finals",
    stage: "Main Stage",
    description: "Championship battle for the Asansol Krump Kranti Vol. 1 Trophy & Cash Prize."
  }
];
