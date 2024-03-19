import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import useAppStore from "~/store/app";

export default function CheckLocationPermission() {
  const { setUserLocation, userLocation } = useAppStore();

  useEffect(() => {
    if (!userLocation) {
      (async () => {
        const result = await navigator.permissions.query({ name: "geolocation" });

        if (["prompt", "granted"].includes(result.state)) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const { data } = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${import.meta.env.VITE_MAPBOXGL_ACCESS_TOKEN}`
            );

            if (data.features.length > 0) {
              const countryFeature = data.features.find((feature: any) =>
                feature.place_type.includes("country")
              );

              if (countryFeature && countryFeature.text) {
                setUserLocation({
                  country: countryFeature.text,
                  lat: latitude,
                  lng: longitude,
                });
              }
            }
          });
        }
      })();
    }
  }, [setUserLocation, userLocation]);

  return <Outlet />;
}
