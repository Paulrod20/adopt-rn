import { Shelter } from "../models/Shelter";
import { Animal } from "../models/Animal";

const API_KEY = process.env.EXPO_PUBLIC_RESCUE_GROUPS_API_KEY;
const BASE_URL = 'https://api.rescuegroups.org/v5/public';

export interface RGShelter { 
  id: number | string;
    attributes: {
    name?: string;
    phone?: string;
    email?: string;
    url?: string;
    website?: string;
    street?: string;
    address?: string;
    address2?: string;
    citystate?: string;
    cityState?: string;
    city?: string;
    state?: string;
    postalcode?: string;
    country?: string;
    lon?: number | null;
    lat?: number | null;
    longitude?: number | null;
    latitude?: number | null;
    };
}

export interface RGAnimal { 
    id: string;
    attributes: {
        name: string;
        sex: string;
        age: string;
        species: string;
        breedPrimary: string;
        description: string;
        pictureThumbnail: string;
        pictureFull: string;
        status: string;
    };
}

export interface FetchSheltersOptions {
  limit?: number;
  page?: number;
  distance?: number;
}

async function readErrorPayload(response: Response): Promise<string> {
  try {
    const text = await response.text();
    return text || '(empty response body)';
  } catch {
    return '(unable to read response body)';
  }
}

// Converts API shape to our app's Shelter shape
export function mapRGShelterToShelter(s: RGShelter): Shelter {
  const latitude = s.attributes.lat ?? s.attributes.latitude ?? 0;
  const longitude = s.attributes.lon ?? s.attributes.longitude ?? 0;
  const cityState = s.attributes.citystate ?? s.attributes.cityState ?? '';

  return {
    id: String(s.id),
    name: s.attributes.name ?? 'Unknown Shelter',
    city: s.attributes.city ?? cityState.split(',')[0]?.trim() ?? '',
    state: s.attributes.state ?? cityState.split(',')[1]?.trim() ?? '',
    address: s.attributes.street ?? s.attributes.address ?? '',
    phone: s.attributes.phone ?? '',
    latitude,
    longitude,
  };
}
export function mapRGAnimalToAnimal(a: RGAnimal, orgId: string): Animal {
    return {
      id: a.id,
      name: a.attributes.name ?? 'Unknown',
      species: a.attributes.species ?? '',
      breed: a.attributes.breedPrimary ?? '',
      age: a.attributes.age ?? '',
      sex: a.attributes.sex ?? '',
      description: a.attributes.description ?? '',
      thumbnailUrl: a.attributes.pictureThumbnail ?? '',
      fullImageUrl: a.attributes.pictureFull ?? '',
      status: a.attributes.status ?? '',
      orgId,
    };
  }

// Haversine formula distance in miles between two coordinate pairs.
export function getDistanceMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadiusMiles = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function fetchShelters(
  postalCode: string = '28201',
  options: FetchSheltersOptions = {}
): Promise<RGShelter[]> {
    if (!API_KEY) {
      console.error('Missing EXPO_PUBLIC_RESCUE_GROUPS_API_KEY');
      return [];
    }

    const limit = options.limit ?? 25;
    const page = options.page ?? 1;
    const distance = options.distance ?? 50;

    try {
      const url = `${BASE_URL}/orgs?limit=${limit}&page=${page}&postalcode=${postalCode}&distance=${distance}`;
      const response = await fetch(
        url,
        {
          method: 'GET',
          headers: {
            'Authorization': API_KEY!,
            'Content-Type': 'application/json',
          },
        }
      );
        
      if (!response.ok) {
        const payload = await readErrorPayload(response);
        console.error('fetchShelters API error', {
          status: response.status,
          statusText: response.statusText,
          url,
          postalCode,
          limit,
          page,
          distance,
          payload,
        });
        return [];
      }
  
      const data = await response.json();
      return data.data ?? [];
    } catch (error) {
      console.error('error fetching shelters:', error);
      return [];
    }
  }

// Fetch animals for a specific shelter
export async function fetchAnimals(orgId: string): Promise<RGAnimal[]> { 
  if (!API_KEY) {
    console.error('Missing EXPO_PUBLIC_RESCUE_GROUPS_API_KEY');
    return [];
  }

  try {
    const url = `${BASE_URL}/animals/search/available?limit=25&filter[orgId]=${encodeURIComponent(orgId)}`;
    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Authorization': API_KEY!,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const payload = await readErrorPayload(response);
      console.error('fetchAnimals API error', {
        status: response.status,
        statusText: response.statusText,
        url,
        orgId,
        payload,
      });
      return [];
    }

    const data = await response.json();
    return data.data ?? [];
  } catch (error) {
    console.error('error fetching animals:', error);
    return [];
  }
}