import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaGVuenlkIiwiYSI6ImNscGFoMjhhbzA4YjIya3FyZ2k1dHVvY3cifQ.BXdS3AGFaYxLJGU928a_5g";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current || "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={mapContainerRef} id="map" className="w-full" />
    </div>
  );
}
