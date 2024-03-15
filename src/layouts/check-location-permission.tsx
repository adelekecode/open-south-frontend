import axios from "axios";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import useAppStore from "~/store/app";

export default function CheckLocationPermission() {
  const permissionRef = useRef(false);

  const { setUserLocation } = useAppStore();

  useEffect(() => {
    (async () => {
      if (!permissionRef.current) {
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

              if (countryFeature) {
                setUserLocation({
                  country: countryFeature.text,
                  lat: latitude,
                  lng: longitude,
                });
                permissionRef.current = true;
              }
            }
          });
        }
      }
    })();
  }, [setUserLocation]);

  return <Outlet />;
}
