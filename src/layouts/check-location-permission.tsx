import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import useAppStore from "~/store/app";

export default function CheckLocationPermission() {
  const { setUserLocation, userLocation } = useAppStore();
  const hasFetchedLocation = useRef(false);

  useEffect(() => {
    if (!userLocation && !hasFetchedLocation.current) {
      (async () => {
        hasFetchedLocation.current = true;

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

              if (countryFeature && countryFeature.place_name) {
                setUserLocation({
                  country: countryFeature.place_name,
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
