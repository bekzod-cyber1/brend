import { Car, CityOption } from '../types/fleet';

import heroChauffeurImg from '../assets/images/hero_chauffeur_sclass_1790706343245.jpg';
import heroBentleyImg from '../assets/images/hero_bentley_gt_1790706787876.jpg';
import taillightDetailImg from '../assets/images/car_taillight_detail_1790706360625.jpg';
import mercedesSideImg from '../assets/images/side_mercedes_sclass_1790706373129.jpg';
import mercedesSilverImg from '../assets/images/side_mercedes_silver_1790707050040.jpg';
import porscheSideImg from '../assets/images/side_porsche_red_1790706384053.jpg';
import porscheChalkImg from '../assets/images/side_porsche_chalk_1790707037117.jpg';
import bmwSideImg from '../assets/images/side_bmw_blue_1790706397072.jpg';
import bentleySideImg from '../assets/images/side_bentley_green_1790706742953.jpg';
import rollsGhostSideImg from '../assets/images/side_rolls_ghost_1790706757139.jpg';
import rollsBlackSideImg from '../assets/images/side_rolls_black_1790707078063.jpg';
import ferrariSideImg from '../assets/images/side_ferrari_roma_1790706771529.jpg';
import ferrariRedImg from '../assets/images/side_ferrari_red_1790707061792.jpg';

export const ASSETS = {
  heroChauffeur: heroChauffeurImg,
  heroBentley: heroBentleyImg,
  taillightDetail: taillightDetailImg,
  mercedesSide: mercedesSideImg,
  mercedesSilver: mercedesSilverImg,
  porscheSide: porscheSideImg,
  porscheChalk: porscheChalkImg,
  bmwSide: bmwSideImg,
  bentleySide: bentleySideImg,
  rollsGhostSide: rollsGhostSideImg,
  rollsBlackSide: rollsBlackSideImg,
  ferrariSide: ferrariSideImg,
  ferrariRed: ferrariRedImg,
};

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  brandTag: string;
  model: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'mercedes-s580',
    image: heroChauffeurImg,
    title: 'Mercedes S-Class',
    subtitle: 'Presidential discretion. The city goes quiet behind its acoustic doors.',
    brandTag: 'Mercedes-Benz Executive',
    model: 'S 580 4MATIC Long Wheelbase',
  },
  {
    id: 'bentley-continental',
    image: heroBentleyImg,
    title: 'Bentley Continental GT',
    subtitle: 'Grand Touring nobility. Handcrafted British engineering at your threshold.',
    brandTag: 'Bentley Crewe Heritage',
    model: 'Continental GT V8 Azure',
  },
];

export const CITIES: CityOption[] = [
  { id: 'nyc', name: 'New York', country: 'United States', activeCount: 18, deliveryEstimate: '35-45 mins' },
  { id: 'lon', name: 'London', country: 'United Kingdom', activeCount: 16, deliveryEstimate: '40-50 mins' },
  { id: 'par', name: 'Paris', country: 'France', activeCount: 12, deliveryEstimate: '30-40 mins' },
  { id: 'dxb', name: 'Dubai', country: 'United Arab Emirates', activeCount: 22, deliveryEstimate: '25-35 mins' },
  { id: 'mia', name: 'Miami', country: 'United States', activeCount: 14, deliveryEstimate: '30-45 mins' },
  { id: 'zrh', name: 'Zurich', country: 'Switzerland', activeCount: 10, deliveryEstimate: '40-50 mins' },
];

export const FLEET_CARS: Car[] = [
  {
    id: 'mercedes-s-class',
    name: 'Mercedes S-Class',
    brand: 'Mercedes-Benz',
    model: 'S 580 4MATIC Long Wheelbase',
    tagline: 'Long-wheelbase calm. The city goes quiet behind its doors.',
    description: 'The definitive benchmark of presidential comfort. Featuring acoustic double-glazed glass, reclining rear executive lounge seating with hot-stone massage, and predictive AIRMATIC air suspension that scans the asphalt ahead.',
    dailyRate: 300,
    imageSide: mercedesSideImg,
    thumbnail: mercedesSideImg,
    colorName: 'Obsidian Black',
    colorHex: '#121212',
    availableColors: [
      {
        name: 'Obsidian Black',
        hex: '#111111',
        finish: 'Deep Metallic',
        image: mercedesSideImg,
      },
      {
        name: 'High-Tech Silver',
        hex: '#D6D8DC',
        finish: 'Liquid Chrome',
        image: mercedesSilverImg,
      },
      {
        name: 'Selenite Grey',
        hex: '#4A4C50',
        finish: 'Magno Matte',
        image: mercedesSideImg,
        filterStyle: { filter: 'brightness(1.25) contrast(0.95) saturate(0.2)' },
      },
    ],
    category: 'Executive Sedan',
    availableInCities: ['New York', 'London', 'Paris', 'Dubai', 'Miami', 'Zurich'],
    specs: {
      engine: '4.0L V8 Biturbo + 48V Mild Hybrid',
      horsepower: 496,
      acceleration0to100: '4.4s',
      topSpeed: '250 km/h (155 mph)',
      transmission: '9G-TRONIC 9-Speed Automatic',
      driveType: '4MATIC All-Wheel Drive',
      luggageCapacity: '550 Liters (3 Suitcases)',
      seating: 4,
      fuelType: 'Premium Gasoline',
      features: [
        'Burmester® 4D High-End Surround Sound System (31 speakers)',
        'Executive Rear Seat Package with Calf Rest & Hot-Stone Massage',
        'Active Ambient Lighting with 64-color progression',
        'Acoustic Comfort Package with Infrared-Reflective Double Glass',
        'Chauffeur Package with foldable front passenger seat',
        'Rear-Axle Steering for effortless metropolitan maneuverability',
      ],
    },
  },
  {
    id: 'porsche-911',
    name: 'Porsche 911 Carrera',
    brand: 'Porsche',
    model: '911 Carrera 4S (992)',
    tagline: 'Rear-engine precision. Manhattan to Montauk in pure analog focus.',
    description: 'Timeless silhouette sculpted in Guards Red or Chalk. Twin-turbo flat-six delivering telepathic throttle response and uncompromising grip in any weather condition.',
    dailyRate: 420,
    imageSide: porscheSideImg,
    thumbnail: porscheSideImg,
    colorName: 'Guards Red',
    colorHex: '#CF1020',
    availableColors: [
      {
        name: 'Guards Red',
        hex: '#CF1020',
        finish: 'Sport Gloss',
        image: porscheSideImg,
      },
      {
        name: 'Chalk White',
        hex: '#E1DFD8',
        finish: 'Heritage Pearl',
        image: porscheChalkImg,
      },
      {
        name: 'Racing Yellow',
        hex: '#F9D002',
        finish: 'Motorsport High-Gloss',
        image: porscheSideImg,
        filterStyle: { filter: 'hue-rotate(50deg) saturate(1.8) brightness(1.1)' },
      },
    ],
    category: 'Sports Coupe',
    availableInCities: ['New York', 'Miami', 'London', 'Dubai', 'Paris'],
    specs: {
      engine: '3.0L Twin-Turbo Boxer 6-Cylinder',
      horsepower: 443,
      acceleration0to100: '3.4s',
      topSpeed: '306 km/h (190 mph)',
      transmission: '8-Speed Porsche Doppelkupplung (PDK)',
      driveType: 'Porsche Traction Management (PTM) AWD',
      luggageCapacity: '132 Liters (Front trunk) + Rear bench',
      seating: 2,
      fuelType: '98 Octane Gasoline',
      features: [
        'Sport Chrono Package with Mode Switch on steering wheel',
        'PASM Sport Suspension (-10mm lower ride height)',
        'Porsche Dynamic Light System Plus (PDLS+ Matrix LED)',
        '18-Way Adaptive Sports Seats Plus with Memory',
        'Bose® Surround Sound with active road noise compensation',
        'Sport Exhaust System with dual black twin tailpipes',
      ],
    },
  },
  {
    id: 'ferrari-roma',
    name: 'Ferrari Roma',
    brand: 'Ferrari',
    model: 'Ferrari Roma V8 Coupe',
    tagline: 'La Nuova Dolce Vita. 612 Italian thoroughbreds wrapped in minimalist grace.',
    description: 'Clean, elegant lines inspired by 1960s Rome combined with modern Maranello performance. Twin-turbo V8, 5-position Manettino dial, and dual cockpit architecture.',
    dailyRate: 650,
    imageSide: ferrariSideImg,
    thumbnail: ferrariSideImg,
    colorName: 'Grigio Silverstone',
    colorHex: '#4E5357',
    availableColors: [
      {
        name: 'Grigio Silverstone',
        hex: '#4E5357',
        finish: 'Formula Metallic',
        image: ferrariSideImg,
      },
      {
        name: 'Rosso Corsa',
        hex: '#D40000',
        finish: 'Scuderia Red',
        image: ferrariRedImg,
      },
      {
        name: 'Nero Daytona',
        hex: '#161616',
        finish: 'Mineral Pearl',
        image: ferrariSideImg,
        filterStyle: { filter: 'brightness(0.65) contrast(1.15) saturate(0)' },
      },
    ],
    category: 'Sports Coupe',
    availableInCities: ['New York', 'Miami', 'Dubai', 'London', 'Paris'],
    specs: {
      engine: '3.9L Twin-Turbo 90° V8',
      horsepower: 612,
      acceleration0to100: '3.4s',
      topSpeed: '320 km/h (199 mph)',
      transmission: '8-Speed Dual-Clutch F1 Transmission',
      driveType: 'Rear-Wheel Drive with E-Diff 3',
      luggageCapacity: '272 Liters',
      seating: 2,
      fuelType: 'Super 98 Gasoline',
      features: [
        'Ferrari Side Slip Control 6.0 (SSC 6.0) with Ferrari Dynamic Enhancer',
        '5-Position Manettino on steering wheel (Wet, Comfort, Sport, Race, ESC Off)',
        '16-inch curved digital instrument cluster & passenger display',
        'Matrix LED headlamps with automated beam carving',
        'Active mobile rear spoiler integrated into the rear screen',
        'Carbon-ceramic Brembo braking system (390mm front / 360mm rear)',
      ],
    },
  },
  {
    id: 'rolls-royce-ghost',
    name: 'Rolls-Royce Ghost',
    brand: 'Rolls-Royce',
    model: 'Ghost Extended Series II',
    tagline: 'Post-Opulent sanctuary. Planar suspension glides above urban reality.',
    description: 'Pure automotive serenity. Architecture of Luxury aluminum spaceframe, illuminated Pantheon grille, Shooting Star starlight headliner, and hand-stitched Connolly leather upholstery.',
    dailyRate: 850,
    imageSide: rollsGhostSideImg,
    thumbnail: rollsGhostSideImg,
    colorName: 'Arctic White',
    colorHex: '#F2F2F2',
    availableColors: [
      {
        name: 'Arctic White',
        hex: '#F5F5F5',
        finish: 'Pure Porcelain',
        image: rollsGhostSideImg,
      },
      {
        name: 'Diamond Black',
        hex: '#0D0D0D',
        finish: 'Deep Crystal',
        image: rollsBlackSideImg,
      },
      {
        name: 'Tempest Grey',
        hex: '#585C62',
        finish: 'Satin Finish',
        image: rollsGhostSideImg,
        filterStyle: { filter: 'brightness(0.7) contrast(1.1) saturate(0.1)' },
      },
    ],
    category: 'Ultra Luxury',
    availableInCities: ['New York', 'London', 'Dubai', 'Paris'],
    specs: {
      engine: '6.75L Twin-Turbo V12',
      horsepower: 563,
      acceleration0to100: '4.6s',
      topSpeed: '250 km/h (155 mph)',
      transmission: '8-Speed Satellite-Aided Automatic',
      driveType: 'All-Wheel Drive & All-Wheel Steering',
      luggageCapacity: '500 Liters',
      seating: 4,
      fuelType: 'Premium Gasoline',
      features: [
        'Bespoke Starlight Headliner with random shooting star effect',
        'Planar Suspension System with Upper Wishbone Damper',
        'Electrically assisted self-closing and opening coach doors',
        'Bespoke Audio system with 18-channel amplifier & 1300W',
        'Rear champagne cooler with integrated crystal flutes',
        'Acoustic insulation exceeding 100 kg for whisper-quiet travel',
      ],
    },
  },
  {
    id: 'bentley-continental-gt',
    name: 'Bentley Continental GT',
    brand: 'Bentley',
    model: 'Continental GT V8 Azure',
    tagline: 'Grand Touring prestige. Effortless twin-turbo V8 torque cloaked in bespoke leather.',
    description: 'Breathtaking grand tourer hand-assembled in Crewe, England. Features diamond-in-diamond quilting, rotating dashboard display with analog gauges, and active 48V roll control.',
    dailyRate: 580,
    imageSide: bentleySideImg,
    thumbnail: bentleySideImg,
    colorName: 'British Racing Green',
    colorHex: '#143823',
    availableColors: [
      {
        name: 'British Racing Green',
        hex: '#143823',
        finish: 'Mulliner Gloss',
        image: bentleySideImg,
      },
      {
        name: 'Beluga Black',
        hex: '#0B0B0B',
        finish: 'Deep Pearl',
        image: bentleySideImg,
        filterStyle: { filter: 'brightness(0.4) contrast(1.2) saturate(0)' },
      },
      {
        name: 'Moonbeam Silver',
        hex: '#C2C4C6',
        finish: 'Liquid Metallic',
        image: bentleySideImg,
        filterStyle: { filter: 'brightness(1.5) contrast(0.9) saturate(0.1)' },
      },
    ],
    category: 'Grand Tourer',
    availableInCities: ['New York', 'London', 'Paris', 'Dubai', 'Miami', 'Zurich'],
    specs: {
      engine: '4.0L Twin-Turbocharged V8',
      horsepower: 542,
      acceleration0to100: '3.9s',
      topSpeed: '318 km/h (198 mph)',
      transmission: '8-Speed Dual-Clutch Automatic',
      driveType: 'Active All-Wheel Drive',
      luggageCapacity: '358 Liters',
      seating: 4,
      fuelType: 'Super Plus Gasoline',
      features: [
        'Naim for Bentley 2,200W Premium Audio System with 18 speakers',
        'Bentley Rotating Display (12.3-inch touchscreen to analog chronometers)',
        'Bentley Dynamic Ride 48V Active Electronic Anti-Roll system',
        'Front Seat Comfort Specification with ventilation & 6 massage modes',
        'City & Touring Specification with night vision thermal camera',
        'Mood Lighting Specification with custom threshold illumination',
      ],
    },
  },
  {
    id: 'bmw-7-series',
    name: 'BMW 760i xDrive',
    brand: 'BMW',
    model: '760i xDrive M Sport',
    tagline: 'Modern brutalism on wheels. Private cinema lounge in motion.',
    description: 'Finished in Tanzanite Blue Metallic with Merino leather and carbon fiber inlays. Equipped with the groundbreaking 31.3-inch 8K BMW Theatre Screen and Bowers & Wilkins Diamond Surround audio.',
    dailyRate: 350,
    imageSide: bmwSideImg,
    thumbnail: bmwSideImg,
    colorName: 'Tanzanite Blue',
    colorHex: '#1B2A4A',
    availableColors: [
      {
        name: 'Tanzanite Blue',
        hex: '#1B2A4A',
        finish: 'Deep Metallic',
        image: bmwSideImg,
      },
      {
        name: 'Mineral White',
        hex: '#EBEBEB',
        finish: 'Metallic Pearl',
        image: bmwSideImg,
        filterStyle: { filter: 'brightness(1.6) contrast(0.85) saturate(0.1)' },
      },
      {
        name: 'Black Sapphire',
        hex: '#111214',
        finish: 'Gloss Mirror',
        image: bmwSideImg,
        filterStyle: { filter: 'brightness(0.45) contrast(1.1) saturate(0.05)' },
      },
    ],
    category: 'Executive Sedan',
    availableInCities: ['New York', 'London', 'Dubai', 'Paris', 'Zurich'],
    specs: {
      engine: '4.4L BMW M TwinPower Turbo V8',
      horsepower: 536,
      acceleration0to100: '4.1s',
      topSpeed: '250 km/h (155 mph)',
      transmission: '8-Speed Steptronic Sport with Launch Control',
      driveType: 'Intelligent xDrive All-Wheel Drive',
      luggageCapacity: '540 Liters (3 Suitcases)',
      seating: 4,
      fuelType: 'Premium Gasoline',
      features: [
        '31.3-inch 8K BMW Theatre Screen with built-in Amazon Fire TV',
        'Bowers & Wilkins Diamond Surround Sound System (36 speakers, 1965W)',
        'Automatic Comfort Doors (Touchless open/close)',
        'Sky Lounge Panoramic Glass Sunroof with integrated LED threads',
        'Integral Active Steering with 4-wheel steering',
        'Ventilated and heated massage armrests and seats',
      ],
    },
  },
];
