import type { Request, Response } from 'express';

export interface PexelsPhoto {
  id: number | string;
  url: string;
  photographer: string;
  photographer_url: string;
  avg_color?: string;
  alt: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    landscape: string;
    tiny: string;
  };
}

export const FALLBACK_HOUSING_PHOTOS: PexelsPhoto[] = [
  {
    id: 323780,
    url: 'https://www.pexels.com/photo/low-angle-photo-of-white-high-rise-building-323780/',
    photographer: 'Expect Best',
    photographer_url: 'https://www.pexels.com/@expect-best-79873',
    avg_color: '#5C748C',
    alt: 'Modern high rise residential architecture in urban landscape',
    src: {
      original: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      large2x: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      large: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      medium: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=350',
      small: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=130',
      landscape: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      tiny: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
    },
  },
  {
    id: 1571460,
    url: 'https://www.pexels.com/photo/contemporary-living-room-interior-1571460/',
    photographer: 'Vecislavas Popa',
    photographer_url: 'https://www.pexels.com/@vecislavas-popa-819777',
    avg_color: '#B6AFA9',
    alt: 'Contemporary modern minimalist living room apartment interior',
    src: {
      original: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      large2x: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      large: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      medium: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&h=350',
      small: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&h=130',
      landscape: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      tiny: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
    },
  },
  {
    id: 1388030,
    url: 'https://www.pexels.com/photo/city-skyline-buildings-singapore-1388030/',
    photographer: 'Aleksandar Pasaric',
    photographer_url: 'https://www.pexels.com/@apasaric',
    avg_color: '#4A5B6A',
    alt: 'Modern residential skyscrapers and green city architecture in Singapore',
    src: {
      original: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
      large2x: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      large: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      medium: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&h=350',
      small: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&h=130',
      landscape: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      tiny: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
    },
  },
  {
    id: 276724,
    url: 'https://www.pexels.com/photo/apartment-architectural-design-architecture-contemporary-276724/',
    photographer: 'Pixabay',
    photographer_url: 'https://www.pexels.com/@pixabay',
    avg_color: '#8A8C8E',
    alt: 'Bright modern apartment interior with dining and living space',
    src: {
      original: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
      large2x: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      large: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      medium: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&h=350',
      small: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&h=130',
      landscape: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      tiny: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
    },
  },
  {
    id: 1643383,
    url: 'https://www.pexels.com/photo/minimalist-modern-living-room-1643383/',
    photographer: 'Vecislavas Popa',
    photographer_url: 'https://www.pexels.com/@vecislavas-popa-819777',
    avg_color: '#8E8276',
    alt: 'Minimalist Scandinavian aesthetic apartment interior with natural light',
    src: {
      original: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      large2x: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      large: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      medium: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&h=350',
      small: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&h=130',
      landscape: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      tiny: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
    },
  },
];

const HOUSING_QUERIES = [
  'modern apartment architecture',
  'modern housing building',
  'singapore residential architecture',
  'minimalist interior design apartment',
  'urban residential housing',
  'modern home interior',
];

export async function fetchPexelsHousingPhoto(customQuery?: string): Promise<{
  photo: PexelsPhoto;
  source: 'pexels_api' | 'fallback';
  query: string;
}> {
  // Support Pexel_API_Key as requested, plus common aliases
  const apiKey =
    process.env.Pexel_API_Key ||
    process.env.PEXEL_API_KEY ||
    process.env.VITE_PEXEL_API_KEY;

  const query =
    customQuery ||
    HOUSING_QUERIES[Math.floor(Math.random() * HOUSING_QUERIES.length)];

  if (!apiKey) {
    // Pick random fallback photo
    const randomIndex = Math.floor(Math.random() * FALLBACK_HOUSING_PHOTOS.length);
    return {
      photo: FALLBACK_HOUSING_PHOTOS[randomIndex],
      source: 'fallback',
      query,
    };
  }

  try {
    const randomPage = Math.floor(Math.random() * 4) + 1; // page 1-4
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=15&page=${randomPage}&orientation=landscape`;

    const response = await fetch(url, {
      headers: {
        Authorization: apiKey.trim(),
      },
    });

    if (!response.ok) {
      console.warn(`Pexels API responded with status: ${response.status}`);
      const randomIndex = Math.floor(Math.random() * FALLBACK_HOUSING_PHOTOS.length);
      return {
        photo: FALLBACK_HOUSING_PHOTOS[randomIndex],
        source: 'fallback',
        query,
      };
    }

    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.photos.length);
      const chosen = data.photos[randomIndex];
      return {
        photo: {
          id: chosen.id,
          url: chosen.url,
          photographer: chosen.photographer,
          photographer_url: chosen.photographer_url,
          avg_color: chosen.avg_color,
          alt: chosen.alt || 'Modern housing architecture photograph from Pexels',
          src: chosen.src,
        },
        source: 'pexels_api',
        query,
      };
    }

    const randomIndex = Math.floor(Math.random() * FALLBACK_HOUSING_PHOTOS.length);
    return {
      photo: FALLBACK_HOUSING_PHOTOS[randomIndex],
      source: 'fallback',
      query,
    };
  } catch (error) {
    console.error('Error querying Pexels API:', error);
    const randomIndex = Math.floor(Math.random() * FALLBACK_HOUSING_PHOTOS.length);
    return {
      photo: FALLBACK_HOUSING_PHOTOS[randomIndex],
      source: 'fallback',
      query,
    };
  }
}

// Serverless Handler for Vercel / Express
export default async function handler(req: Request, res: Response) {
  try {
    const query = typeof req.query.query === 'string' ? req.query.query : undefined;
    const result = await fetchPexelsHousingPhoto(query);

    // Set cache control for performance
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    console.error('Pexels API route error:', err);
    const randomIndex = Math.floor(Math.random() * FALLBACK_HOUSING_PHOTOS.length);
    return res.status(200).json({
      success: true,
      photo: FALLBACK_HOUSING_PHOTOS[randomIndex],
      source: 'fallback',
      query: 'housing architecture',
    });
  }
}
