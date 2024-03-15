import { memo, useEffect, useRef } from "react";
import mapboxgl, { LngLat, LngLatLike, Map as MapBoxMap, MapboxGeoJSONFeature } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { usePublicMapDatasets } from "~/queries/dataset";
import AppLoader from "~/components/loader/app-loader";

type Source = {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: Dataset;
  }[];
};

type Cluster = {
  cluster: true;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: number;
};

type Feature = {
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: Cluster;
  type: string;
  id: number;
};

function popupHandler(map: MapBoxMap, num: number, lngLat: LngLat, country: string) {
  new mapboxgl.Popup()
    .setLngLat(lngLat)
    .setHTML(
      `
        <div class="flex flex-col gap-2 min-w-24">
          <h1 class="font-semibold text-xl">${country}</h1>
          <h2 class="text-xs">Datasets: <span class="text-sm font-medium">${num}</span></h2>
          <a class="text-xs text-primary-600 underline" href="/datasets?spatial-coverage=${country}">View Datasets</a>
        </div>
    `
    )
    .addTo(map);
}

async function zoomHandler(
  map: MapBoxMap,
  clusterId: number,
  clusterSource: any,
  feature: MapboxGeoJSONFeature
) {
  const clusterChildren = await new Promise<Promise<Source["features"]> | Feature[]>(
    (resolve, reject) => {
      clusterSource.getClusterChildren(clusterId, (err: any, feature: any) => {
        if (err) {
          reject(err);
        }

        resolve(feature);
      });
    }
  );

  const obj = {
    isZoomedOnCountry: false,
    country: "",
    count: 0,
  };

  function zoomIn() {
    clusterSource.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
      if (err) return;

      map.easeTo({
        center: (feature.geometry as { type: string; coordinates: LngLatLike }).coordinates,
        zoom,
      });
    });
  }

  obj.isZoomedOnCountry = clusterChildren.every((item) => {
    if ("id" in item || (obj.country && obj.country !== item.properties.spatial_coverage)) {
      zoomIn();

      return false;
    }

    obj.country = item.properties.spatial_coverage;
    obj.count++;

    return true;
  });

  return obj;
}

export default memo(function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = usePublicMapDatasets();

  useEffect(() => {
    if (!data) return;

    const mapData: Source = {
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

      map.on("click", ["unclustered"], (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["unclustered"],
        });

        if (features.length > 0) {
          if (features[0]) {
            const { properties } = features[0];

            const dataset = JSON.parse(JSON.stringify(properties));

            if (!dataset.title) return;
            const { spatial_coverage } = dataset;

            popupHandler(map, 1, e.lngLat, spatial_coverage);
          }
        }
      });

      map.on("click", ["clusters"], async (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });

        if (features.length > 0) {
          const feature = features[0];

          if (feature) {
            const properties = feature.properties as Cluster;

            const clusterId = properties.cluster_id;

            const clusterSource: any = map.getSource("datasets");

            const { count, isZoomedOnCountry, country } = await zoomHandler(
              map,
              clusterId,
              clusterSource,
              feature
            );

            if (isZoomedOnCountry) {
              popupHandler(map, count, e.lngLat, country as string);
            }
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
});
