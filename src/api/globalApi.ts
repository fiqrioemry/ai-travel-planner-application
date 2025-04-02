import axios from "axios";

const geopifyApi: string = import.meta.env.VITE_GEOPIFY_API_KEY;
const geopifyUrl = "https://api.geoapify.com/v1/geocode/autocomplete?";

export interface GeoapifyResponse {
  results: {
    city: string;
    country: string;
    lat: number;
    lon: number;
    [key: string]: any;
  }[];
}

interface WikipediaImageResponse {
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        title: string;
        original?: {
          source: string;
          width: number;
          height: number;
        };
        description?: string;
      };
    };
  };
}

const globalApi = {
  getPlaceName: async (query: string): Promise<GeoapifyResponse> => {
    const url = `${geopifyUrl}text=${query}&type=city&format=json&apiKey=${geopifyApi}`;
    const res = await axios.get<GeoapifyResponse>(url);
    return res.data;
  },

  getPlaceImage: async (placeName: string): Promise<WikipediaImageResponse> => {
    const encoded = encodeURIComponent(placeName);
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=pageimages|description&titles=${encoded}&piprop=original`;
    const res = await axios.get<WikipediaImageResponse>(url);
    return res.data;
  },
};

export default globalApi;
