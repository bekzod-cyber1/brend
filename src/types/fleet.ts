export interface CarColor {
  name: string;
  hex: string;
  finish: string;
  image?: string;
  filterStyle?: React.CSSProperties;
}

export interface CarSpecification {
  engine: string;
  horsepower: number;
  acceleration0to100: string;
  topSpeed: string;
  transmission: string;
  driveType: string;
  luggageCapacity: string;
  seating: number;
  fuelType: string;
  features: string[];
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  tagline: string;
  description: string;
  dailyRate: number;
  imageSide: string;
  thumbnail: string;
  colorName: string;
  colorHex: string;
  availableColors: CarColor[];
  specs: CarSpecification;
  category: 'Executive Sedan' | 'Sports Coupe' | 'Grand Tourer' | 'Ultra Luxury';
  availableInCities: string[];
}

export interface CityOption {
  id: string;
  name: string;
  country: string;
  activeCount: number;
  deliveryEstimate: string;
}

export interface ReservationDetails {
  carId: string;
  city: string;
  startDate: string;
  endDate: string;
  deliveryType: 'residence' | 'hotel' | 'airport';
  deliveryAddress: string;
  serviceTier: 'self-drive' | 'chauffeur';
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}
