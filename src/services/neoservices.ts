import axios from 'axios';

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

export const fetchNearEarthObjects = async (startDate: string, endDate: string) => {
  console.log("Fetching from api");
  const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`);
  return response.data;
};
