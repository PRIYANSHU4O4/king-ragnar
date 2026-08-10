export interface BannerConfig {
  eventTitle: string;
  eventVol: string;
  bgImageUrl: string;
  bgOverlayOpacity: number;
  bgVignette: boolean;
  showTextOverlays: boolean;
  
  // Left side configuration
  leftTitleLine1: string;
  leftTitleLine2: string;
  leftTagline1: string;
  leftTagline2: string;
  leftTagline3: string;
  leftButtonText: string;
  
  // Right side configuration
  rightTitleLine1: string;
  rightTitleLine2: string;
  rightTagline1: string;
  rightTagline2: string;
  
  // Aesthetic options
  goldAccentColor: string;
  leftFontFamily: 'bebas' | 'anton' | 'ops' | 'teko';
  rightFontFamily: 'bebas' | 'anton' | 'ops' | 'teko';
  enableDrips: boolean;
  enableSplatter: boolean;
}

export type NavTab = 
  | 'Home' 
  | 'About'
  | 'Courses' 
  | 'Music' 
  | 'Contact';

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface Judge {
  id: string;
  name: string;
  aka: string;
  origin: string;
  style: string;
  image: string;
  bio: string;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  category: string;
  stage: string;
  description: string;
}
