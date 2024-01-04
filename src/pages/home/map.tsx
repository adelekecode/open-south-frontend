import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { usePublicDatasets } from "~/queries/dataset";
import AppLoader from "~/components/loader/app-loader";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = usePublicDatasets();

  useEffect(() => {
    if (!data) return;

    const mapData: {
      type: string;
      features: {
        type: string;
        geometry: {
          type: string;
          coordinates: number[];
        };
        properties: {
          country: string;
        };
      }[];
    } = {
      type: "FeatureCollection",
      features: [],
    };

    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].geojson) {
          continue;
        }

        const coordinateStr = data[i].geojson.coordinates;
        const arr = coordinateStr.split(",");
        const coordinates = [Number(arr[0]), Number(arr[1])];

        const obj: (typeof mapData.features)[0] = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates,
          },
          properties: {
            country: data[i].geojson.country,
          },
        };

        mapData.features.push(obj);
      }
    }

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOXGL_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current || "map",
      style: "mapbox://styles/henzyd/clpv76dnw01eq01pa4nyefjby",
      center: [15.155, -9.787],
      zoom: 1.77,
      scrollZoom: false,
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", () => {
      map.addSource("earthquakes", {
        type: "geojson",
        data: mapData as any,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });
    });

    return () => {
      map.remove();
    };
  }, [data]);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="h-screen">
          <AppLoader />
        </div>
      ) : (
        data && <div ref={mapContainerRef} id="map" className="w-full h-[100vh]" />
      )}
    </div>
  );
}
