import axios from "axios";
import { notifyError } from "./toast";

export function formatFileSize(size: number): string {
  const i: number = Math.floor(Math.log(size) / Math.log(1024));

  return Number((size / Math.pow(1024, i)).toFixed(2)) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
}

export async function getCountryCoordinates(country: string) {
  try {
    const encodeCountry = encodeURIComponent(country.toLowerCase());

    const { data } = (await axios.get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeCountry +
        ".json?access_token=" +
        import.meta.env.VITE_MAPBOXGL_ACCESS_TOKEN
    )) as any;

    for (const item of data.features) {
      const featuresText = encodeURIComponent(item.text.toLowerCase());

      if (featuresText === encodeCountry) {
        const coordinates = item.center;

        return coordinates;
      }
    }

    for (const item of data.features) {
      const featuresText = encodeURIComponent(item.text.toLowerCase());

      if (encodeCountry.includes(featuresText)) {
        const coordinates = item.center;

        return coordinates;
      }
    }
  } catch (error) {
    notifyError("Error occured while creating dataset, please try again");
    throw error;
  }
}

export function calculatePercentage(num: number, totalCount: number) {
  const val = (num / totalCount) * 100;

  return Math.round(val) + "%";
}

export function mostAccessedDatasetsTransformHandler(data: Dataset[] | undefined) {
  if (data) {
    const colors = ["#00a4ffcf", "#ffa500cf", "#008000cf", "#ab2fabcf", "#d64794cf"];

    return data.map((dataset, index) => ({
      id: dataset.id,
      value: dataset.views,
      label: dataset.title,
      color: colors[index],
    }));
  }

  return data;
}

export function downloadFileHandler(file: Dataset["files"][number], blob: Blob, format: string) {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `${file?.file_name || "example"}${format}`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
