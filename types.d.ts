interface AuthContextProps {
  user: User | null;
}

interface HyggloPrice {
  days: number;
  label: string;
}

interface HyggloListing {
  slug: string;
  product: {
    name: string;
    description: string;
    category: { name: string };
    prices: HyggloPrice[];
    images: { fullSizeUrl: string }[];
  };
  location: {
    street?: string;
    label: string;
  };
}
interface ListingPrices {
  day?: number;
  week?: number;
}

interface Listing {
  title: string;
  description: string;
  category: string;
  location: string;
  prices: ListingPrices;
  pictures: string[];
}

interface SearchResults {
  id: string;
  title: string;
  category: string;
  price_day: number;
}
