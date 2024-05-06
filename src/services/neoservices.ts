import axios from 'axios';

// DEMO_KEY limits: 30 calls per hour per ip
const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

/**
 * Service that accepts and start and end date and calls the nasa near earth object web service to fetch asteroids near earth.
 * @param startDate - Start date of the query
 * @param endDate - End date of the query
 */
export const fetchNearEarthObjects = async (startDate: string, endDate: string) => {
  console.log("Fetching from api");
  const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`);
  return response.data;
};
