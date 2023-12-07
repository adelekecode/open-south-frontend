import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // (async () => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOXGL_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current || "map",
      style: "mapbox://styles/henzyd/clpv76dnw01eq01pa4nyefjby",
      center: [15.155, -9.787],
      zoom: 1.77,
      scrollZoom: false,
    });

    map.addControl(new mapboxgl.NavigationControl());

    // map.on("load", () => {
    //   map.addSource("earthquakes", {
    //     type: "geojson",
    //     // data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
    //     data: "",
    //     cluster: true,
    //     clusterMaxZoom: 14,
    //     clusterRadius: 50,
    //   });

    //   map.addLayer({
    //     id: "clusters",
    //     type: "circle",
    //     source: "earthquakes",
    //     filter: ["has", "point_count"],
    //     paint: {
    //       "circle-color": [
    //         "step",
    //         ["get", "point_count"],
    //         "#51bbd6",
    //         100,
    //         "#f1f075",
    //         750,
    //         "#f28cb1",
    //       ],
    //       "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    //     },
    //   });

    //   map.addLayer({
    //     id: "cluster-count",
    //     type: "symbol",
    //     source: "earthquakes",
    //     filter: ["has", "point_count"],
    //     layout: {
    //       "text-field": ["get", "point_count_abbreviated"],
    //       "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    //       "text-size": 12,
    //     },
    //   });

    //   // map.addLayer({
    //   //   id: "unclustered-point",
    //   //   type: "circle",
    //   //   source: "earthquakes",
    //   //   filter: ["!", ["has", "point_count"]],
    //   //   paint: {
    //   //     "circle-color": "#11b4da",
    //   //     "circle-radius": 4,
    //   //     "circle-stroke-width": 1,
    //   //     "circle-stroke-color": "#fff",
    //   //   },
    //   // });
    // });

    // })();

    // const mapData: {
    //   type: string;
    //   features: {
    //     type: string;
    //     geometry: {
    //       type: string;
    //       coordinates: number[];
    //     };
    //     properties: {
    //       country: string;
    //     };
    //   }[];
    // } = {
    //   type: "FeatureCollection",
    //   features: [],
    // };

    // for (let i = 0; i < [0, 0, 0, 4].length; i++) {
    //   const response = await fetch(
    //     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    //       encodeURIComponent("Nigeria") +
    //       ".json?access_token=" +
    //       "pk.eyJ1IjoiaGVuenlkIiwiYSI6ImNscGFoMjhhbzA4YjIya3FyZ2k1dHVvY3cifQ.BXdS3AGFaYxLJGU928a_5g"
    //   );
    //   const data = await response.json();

    //   if (data.features.length > 0) {
    //     const coordinates = data.features[0].center;

    //     const _mapData = {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates,
    //       },
    //       properties: {
    //         country: "Nigeria",
    //       },
    //     };

    //     mapData.features.push(_mapData);
    //   }
    // }

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={mapContainerRef} id="map" className="w-full h-[100vh]" />
    </div>
  );
}
