
export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  bhk: string;
  area: number;
  images: string[];
  videoUrl?: string;
  featured?: boolean;
  status: 'Available' | 'Rented';
  listingType: 'Rent' | 'Sale';
  amenities: string[];
  description: string;
  ownerName: string;
  ownerPhone: string;
  adminApproved: boolean;
  createdAt: string;
  ownerId?: string;
}

// Enhanced mock data with 8 different properties - ensuring owner "1" has multiple properties
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Luxurious 2 BHK Apartment in BTM Layout",
    location: "BTM Layout, Bangalore, Karnataka",
    price: 25000,
    type: "Apartment",
    bhk: "2 BHK",
    area: 1200,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&h=600&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    status: 'Available',
    listingType: 'Rent',
    amenities: ["Parking", "Gym", "Swimming Pool", "Security", "Power Backup", "Wi-Fi"],
    description: "Beautiful 2 BHK apartment located in the heart of BTM Layout. This property offers modern amenities and excellent connectivity to major IT hubs.",
    ownerName: "Rajesh Kumar",
    ownerPhone: "+91 9876543210",
    adminApproved: true,
    createdAt: "2024-01-15T10:30:00Z",
    ownerId: "1"
  },
  {
    id: 2,
    title: "Spacious 3 BHK Villa in Whitefield",
    location: "Whitefield, Bangalore, Karnataka",
    price: 45000,
    type: "Villa",
    bhk: "3 BHK",
    area: 2200,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop"
    ],
    featured: true,
    status: 'Available',
    listingType: 'Rent',
    amenities: ["Parking", "Garden", "Security", "Power Backup"],
    description: "Elegant 3 BHK villa with modern amenities and beautiful garden. Located in the premium area of Whitefield.",
    ownerName: "Rajesh Kumar",
    ownerPhone: "+91 9876543210",
    adminApproved: true,
    createdAt: "2024-01-10T14:20:00Z",
    ownerId: "1"
  },
  {
    id: 3,
    title: "Modern 1 BHK Studio in Koramangala",
    location: "Koramangala, Bangalore, Karnataka",
    price: 18000,
    type: "Studio",
    bhk: "1 BHK",
    area: 650,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    ],
    featured: false,
    status: 'Available',
    listingType: 'Rent',
    amenities: ["Wi-Fi", "Gym", "Security"],
    description: "Compact and modern 1 BHK studio perfect for young professionals. Located in the vibrant Koramangala area.",
    ownerName: "Rajesh Kumar",
    ownerPhone: "+91 9876543210",
    adminApproved: false,
    createdAt: "2024-01-08T09:15:00Z",
    ownerId: "1"
  },
  {
    id: 4,
    title: "Elegant 4+ BHK House for Sale in Indiranagar",
    location: "Indiranagar, Bangalore, Karnataka",
    price: 8500000,
    type: "House",
    bhk: "4+ BHK",
    area: 3200,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
    ],
    featured: false,
    status: 'Available',
    listingType: 'Sale',
    amenities: ["Parking", "Garden", "Security", "Power Backup", "Swimming Pool"],
    description: "Luxurious 4+ BHK house with premium amenities and spacious rooms. Perfect for large families.",
    ownerName: "Suresh Reddy",
    ownerPhone: "+91 9876543213",
    adminApproved: true,
    createdAt: "2024-01-05T16:45:00Z",
    ownerId: "4"
  },
  {
    id: 5,
    title: "Cozy 2 BHK Apartment in Jayanagar",
    location: "Jayanagar, Bangalore, Karnataka",
    price: 22000,
    type: "Apartment",
    bhk: "2 BHK",
    area: 1100,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"
    ],
    featured: true,
    status: 'Available',
    listingType: 'Rent',
    amenities: ["Parking", "Security"],
    description: "Comfortable 2 BHK apartment in the heart of Jayanagar. Close to metro station and shopping centers.",
    ownerName: "Lakshmi Iyer",
    ownerPhone: "+91 9876543214",
    adminApproved: true,
    createdAt: "2024-01-03T11:30:00Z",
    ownerId: "5"
  },
  {
    id: 6,
    title: "Premium 3 BHK Penthouse in HSR Layout",
    location: "HSR Layout, Bangalore, Karnataka",  
    price: 55000,
    type: "Penthouse",
    bhk: "3 BHK",
    area: 2500,
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
    ],
    featured: false,
    status: 'Available',
    listingType: 'Rent',
    amenities: ["Parking", "Gym", "Swimming Pool", "Security", "Elevator", "Balcony"],
    description: "Stunning penthouse with panoramic city views. Premium location with all modern amenities.",
    ownerName: "Vikram Singh",
    ownerPhone: "+91 9876543215",
    adminApproved: true,
    createdAt: "2024-01-01T08:00:00Z",
    ownerId: "6"
  },
  {
    id: 7,
    title: "Affordable 1 BHK in Electronic City",
    location: "Electronic City, Bangalore, Karnataka",
    price: 15000,
    type: "Apartment",
    bhk: "1 BHK",
    area: 580,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
    ],
    featured: false,
    status: 'Available',
    listingType: 'Rent',
    amenities: ["Parking", "Security", "Power Backup"],
    description: "Budget-friendly 1 BHK apartment perfect for IT professionals working in Electronic City.",
    ownerName: "Ravi Kumar",
    ownerPhone: "+91 9876543216",
    adminApproved: true,
    createdAt: "2023-12-28T12:00:00Z",
    ownerId: "7"
  },
  {
    id: 8,
    title: "Luxury 2 BHK with Garden in Hebbal",
    location: "Hebbal, Bangalore, Karnataka",
    price: 35000,
    type: "Apartment",
    bhk: "2 BHK",
    area: 1400,
    images: [
      "https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=600&fit=crop"
    ],
    featured: true,
    status: 'Available',
    listingType: 'Rent',
    amenities: ["Parking", "Garden", "Swimming Pool", "Gym", "Security", "Wi-Fi"],
    description: "Beautiful 2 BHK apartment with private garden access. Premium gated community near Hebbal Lake.",
    ownerName: "Meera Nair",
    ownerPhone: "+91 9876543217",
    adminApproved: true,
    createdAt: "2023-12-25T15:30:00Z",
    ownerId: "8"
  }
];

// Store properties in localStorage
const STORAGE_KEY = 'properties';

// Initialize properties in localStorage if not exists
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProperties));
}

export const getAllProperties = (): Property[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : mockProperties;
};

export const getApprovedProperties = (): Property[] => {
  return getAllProperties().filter(property => property.adminApproved);
};

export const getPendingProperties = (): Property[] => {
  return getAllProperties().filter(property => !property.adminApproved);
};

export const getPropertyById = (id: number): Property | undefined => {
  return getAllProperties().find(property => property.id === id);
};

export const getPropertiesByOwner = (ownerId: string | number): Property[] => {
  return getAllProperties().filter(property => property.ownerId === String(ownerId));
};

export const addProperty = (property: Omit<Property, 'id' | 'createdAt'>): Property => {
  const properties = getAllProperties();
  const newProperty: Property = {
    ...property,
    id: Math.max(...properties.map(p => p.id), 0) + 1,
    createdAt: new Date().toISOString()
  };
  
  const updatedProperties = [...properties, newProperty];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProperties));
  
  return newProperty;
};

export const updateProperty = (id: number, updates: Partial<Property>): Property | null => {
  const properties = getAllProperties();
  const index = properties.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const updatedProperty = { ...properties[index], ...updates };
  properties[index] = updatedProperty;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  return updatedProperty;
};

export const deleteProperty = (id: number): boolean => {
  const properties = getAllProperties();
  const filteredProperties = properties.filter(p => p.id !== id);
  
  if (filteredProperties.length === properties.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProperties));
  return true;
};

export const approveProperty = (id: number): boolean => {
  return updateProperty(id, { adminApproved: true }) !== null;
};

export const rejectProperty = (id: number): boolean => {
  return deleteProperty(id);
};

export const getOwnerProperties = (ownerId: string): Property[] => {
  return getAllProperties().filter(property => property.ownerId === ownerId);
};
