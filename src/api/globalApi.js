import axios from 'axios';
const geopifyApi = import.meta.env.VITE_GEOPIFY_API_KEY;
const geopifyUrl = 'https://api.geoapify.com/v1/geocode/autocomplete?';

const globalApi = {
  getPlaceName: async (query) => {
    return axios
      .get(
        geopifyUrl + `text=${query}&type=city&format=json&apiKey=${geopifyApi}`,
      )
      .then((res) => res.data);
  },

  getPlaceImage: async (placeName) => {
    return axios
      .get(
        `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=pageimages|description&titles=${encodeURIComponent(
          placeName,
        )}&piprop=original`,
      )
      .then((res) => res.data);
  },
};

export default globalApi;
