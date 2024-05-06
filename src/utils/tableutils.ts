import { NearEarthObject, NearEarthObjectsData } from "../types/neotypes";

/**
 * Flattens the daily data from NEO API into one object so it can be passed into the tanstack table
 * @param data - daily data from NEO API
 * @returns all objects from daily data as one object
 */
export const prepareData = (data: NearEarthObjectsData): NearEarthObject[] => {
  const allObjects: NearEarthObject[] = [];

  Object.values(data).forEach((objects) => {
    objects.forEach((object) => {
      allObjects.push(object);
    });
  });

  return allObjects.sort((a, b) => {
    const dateA = new Date(a.close_approach_data[0].close_approach_date_full);
    const dateB = new Date(b.close_approach_data[0].close_approach_date_full);
    return dateB.getTime() - dateA.getTime();
  });
};
