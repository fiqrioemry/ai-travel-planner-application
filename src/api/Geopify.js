import axios from 'axios';
const geopifyApi = import.meta.env.VITE_GEOPIFY_API_KEY;
const geopifyUrl = 'https://api.geoapify.com/v1/geocode/autocomplete?';

const geopify = {
  getPlaceName: async (query) => {
    return axios
      .get(
        geopifyUrl + `text=${query}&type=city&format=json&apiKey=${geopifyApi}`,
      )
      .then((res) => res.data);
  },
};

export default geopify;
