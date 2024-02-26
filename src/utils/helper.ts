import axios from "axios";
import { notifyError } from "./toast";

function formatFileSize(size: number): string {
  const i: number = Math.floor(Math.log(size) / Math.log(1024));

  return Number((size / Math.pow(1024, i)).toFixed(2)) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
}

async function getCountryCoordinates(country: string) {
  try {
    const encodeCountry = encodeURIComponent(country.toLowerCase());

    const { data } = (await axios.get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeCountry +
        ".json?access_token=" +
        import.meta.env.VITE_MAPBOXGL_ACCESS_TOKEN
    )) as any;

    for (const item of data.features) {
      if (encodeURIComponent(item.text.toLowerCase()) === encodeCountry) {
        const coordinates = item.center;

        return coordinates;
      }
    }
  } catch (error) {
    notifyError("Error occured while creating dataset, please try again");
    throw error;
  }
}

export { formatFileSize, getCountryCoordinates };
