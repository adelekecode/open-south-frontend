import axios from "axios";
import { notifyError } from "./toast";

function formatFileSize(size: number): string {
  const i: number = Math.floor(Math.log(size) / Math.log(1024));

  return Number((size / Math.pow(1024, i)).toFixed(2)) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
}

async function getCountryCoordinates(country: string) {
  try {
    const { data } = (await axios.get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(country.toLowerCase()) +
        ".json?access_token=" +
        import.meta.env.VITE_MAPBOXGL_ACCESS_TOKEN
    )) as any;

    if (data.features.length > 0) {
      const coordinates = data.features[0].center;

      return coordinates;
    }
  } catch (error) {
    notifyError("Error occured while creating dataset, please try again");
    throw error;
  }
}

export { formatFileSize, getCountryCoordinates };
