import React, { useState, useEffect, useRef } from "react";
import ReactMapGL from "react-map-gl";
import { FaLocationArrow } from "react-icons/fa";
import Supercluster from "supercluster";
import Loader from "../ui/Loader";
import MemoizedMarker from "./MemoizedMarker";
import MemoizedPopup from "./MemoizedPopup";

const MapSection = ({
  viewport,
  setViewport,
  setBounds,
  inBoundMarkers,
  setSelectedUnit,
  selectedUnit,
  userLocation,
  handleSetUserLocation,
}) => {
  const mapBoxKey = process.env.REACT_APP_MAPBOX_TOKEN;
  const [isLoading, setIsLoading] = useState(true);
  const [clusters, setClusters] = useState([]);
  const [supercluster, setSupercluster] = useState(null);
  const mapRef = useRef();
  const adjustedLocationsRef = useRef({});

  // Create Supercluster instance for grouping markers that are nearby together
  useEffect(() => {
    const index = new Supercluster({
      radius: 75,
      maxZoom: 18,
    });

    index.load(
      inBoundMarkers.map((location) => ({
        type: "Feature",
        properties: { cluster: false, locationId: location.id },
        geometry: {
          type: "Point",
          coordinates: [location.longitude, location.latitude],
        },
      }))
    );

    setSupercluster(index);
  }, [inBoundMarkers]);

  // Update clusters when supercluster or viewport changes
  useEffect(() => {
    if (supercluster && viewport.zoom && !isLoading) {
      const bounds = mapRef.current?.getMap()?.getBounds()?.toArray()?.flat();
      if (bounds) {
        const clusters = supercluster.getClusters(
          bounds,
          Math.round(viewport.zoom)
        );
        setClusters(clusters);
      }
    }
  }, [supercluster, viewport, isLoading]);

  return (
    <div className="map-container h-96 mb-4">
      {isLoading && <Loader />}
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={mapBoxKey}
        mapStyle="mapbox://styles/tony39/cm22ac2j0008201omebew51cn"
        onViewportChange={(viewport) => setViewport(viewport)}
        onMove={(evt) => {
          setViewport(evt.viewState);
          setBounds(evt.target.getBounds());
        }}
        onLoad={(evt) => {
          setBounds(evt.target.getBounds());
          setIsLoading(false);
        }}
        ref={mapRef}
      >

        {/* GET USER LOCATION */}
        {userLocation ? (
          <button
            onClick={handleSetUserLocation}
            className="absolute top-4 left-4 z-10 bg-blue-500 text-white p-2 rounded"
          >
            <FaLocationArrow size={20} />
          </button>
        ) : (
          <button
            onClick={handleSetUserLocation}
            className="absolute top-4 left-4 z-10 bg-gray-500 text-white p-2 rounded"
          >
            <FaLocationArrow size={20} />
          </button>
        )}

        {/* MARKER SECTION */}
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <MemoizedMarker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker bg-sparkOrange width-10 height-10 rounded-full flex items-center justify-center text-white p-4"
                  style={{
                    width: `${
                      10 + (pointCount / inBoundMarkers.length) * 20
                    }px`,
                    height: `${
                      10 + (pointCount / inBoundMarkers.length) * 20
                    }px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    setViewport({
                      ...viewport,
                      zoom: expansionZoom,
                      latitude,
                      longitude,
                    });
                  }}
                >
                  {pointCount}
                </div>
              </MemoizedMarker>
            );
          }

          // Check if the location of non-cluster marker has already been adjusted, this is to show the duplicated marker that are at exact same location
          if (!adjustedLocationsRef.current[cluster.properties.locationId]) {
            const offset = 0.0001;
            const randomOffset = () => (Math.random() - 0.5) * offset;
            adjustedLocationsRef.current[cluster.properties.locationId] = {
              latitude: latitude + randomOffset(),
              longitude: longitude + randomOffset(),
            };
          }

          const adjustedLocation =
            adjustedLocationsRef.current[cluster.properties.locationId];

          return (
            <MemoizedMarker
              key={`marker-${cluster.properties.locationId}`}
              latitude={adjustedLocation.latitude}
              longitude={adjustedLocation.longitude}
            >
              <button
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedUnit(
                    inBoundMarkers.find(
                      (location) =>
                        location.id === cluster.properties.locationId
                    )
                  );
                }}
              >
                <img
                  src="/svg/pin.svg"
                  alt="Unit sold"
                  style={{ width: "24px" }}
                />
              </button>
            </MemoizedMarker>
          );
        })}

        {/* POPUP SECTION */}
        {selectedUnit && (
          <MemoizedPopup
            latitude={selectedUnit.latitude}
            longitude={selectedUnit.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
              setSelectedUnit(null);
            }}
            anchor="top"
          >
            <div
              style={{
                padding: "10px",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <p>Address: {selectedUnit.address}</p>
              <p>Size: {selectedUnit.area_sqft}</p>
              <p>Bedroom: {selectedUnit.bedrooms}</p>
              <p>Bathroom: {selectedUnit.bathrooms}</p>
              <p>
                Date sold:{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(selectedUnit.date))}
              </p>
              <p className="text-sparkOrange font-bold">
                Price:{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "CAD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(selectedUnit.price)}
              </p>
            </div>
          </MemoizedPopup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapSection;
