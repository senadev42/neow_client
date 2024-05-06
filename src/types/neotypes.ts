export interface CloseApproachData {
  close_approach_date_full: string;
  relative_velocity: {
    kilometers_per_hour: string;
  };
  miss_distance: {
    kilometers: string;
  };
}

export interface NearEarthObject {
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    meters: {
      estimated_diameter_max: number;
    };
  };
  close_approach_data: CloseApproachData[];
}

export interface NearEarthObjectsData {
  [date: string]: NearEarthObject[];
}
