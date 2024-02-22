import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { usePublicMapDatasets } from "~/queries/dataset";
import AppLoader from "~/components/loader/app-loader";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = usePublicMapDatasets();

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
        properties: Dataset;
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
          properties: data[i],
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
      map.addSource("datasets", {
        type: "geojson",
        data: mapData as any,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "datasets",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#51bbd6",
          "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
        },
      });

      map.addLayer({
        id: "unclustered",
        type: "circle",
        source: "datasets",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 15,
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "datasets",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "symbol",
        source: "datasets",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "text-field": "1",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 10,
        },
      });

      // map.on("click", ["clusters", "unclustered"], (e) => {
      //   const features = map.queryRenderedFeatures(e.point, {
      //     layers: ["clusters", "unclustered"],
      //   });

      //   if (features.length > 0) {
      //     for (let i = 0; i < data.length; i++) {
      //       if (features[i]) {
      //         const { properties } = features[i];
      //         const datasets = JSON.parse(JSON.stringify(properties)) as Dataset;

      //         navigate(
      //           `/datasets?spatial-coverage=${slugify(datasets.spatial_coverage, {
      //             lower: true,
      //             strict: true,
      //             trim: true,
      //           })}`
      //         );
      //       }
      //     }
      //   }
      // });

      map.on("click", ["clusters", "unclustered"], (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters", "unclustered"],
        });

        if (features.length > 0) {
          if (features[0]) {
            const { properties } = features[0];

            const dataset = JSON.parse(JSON.stringify(properties));

            if (!dataset.title) return;
            const { spatial_coverage } = dataset;

            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(
                `
                <div class="flex flex-col gap-2">
                  <h1 class="font-semibold text-xl">${spatial_coverage}</h1>
                  <h2 class="text-xs">No. of datasets in this country: <span class="text-sm font-medium">${dataset ? "1" : "0"}</span></h2>
                  <a class="text-xs text-primary-600 underline" href="/datasets?spatial-coverage=${dataset.spatial_coverage}">View Datasets</a>
                </div>
                  `
              )
              .addTo(map);
          }
        }
      });

      map.on("mouseenter", ["clusters", "unclustered"], () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", ["clusters", "unclustered"], () => {
        map.getCanvas().style.cursor = "";
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
