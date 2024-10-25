import React, { useEffect, useState } from "react";
import { debounce } from "./lib/utils";
import "./App.css";

// import hook
import { useCsvData } from "./hooks/useCsvData";
import useFilteredData from "./hooks/useFilteredData";
import useProcessOverviewData from "./hooks/useProcessOverviewData";
import useInBoundMarkers from "./hooks/useInBoundMarkers";
import useUserLocation from "./hooks/useUserLocation";

// import components
import Header from "./Components/Header/Header";
import FilterSection from "./Components/Filter/FilterSection";
import { DataTable } from "./Components/Table/DataTable";
import { columns } from "./Components/Table/Columns";
import AtAGlaceSection from "./Components/AtAGlance/AtAGlaceSection";
import MapSection from "./Components/Map/MapSection";
import HistoricalChart from "./Components/Historical/HistoricalChart";
import Loader from "./Components/ui/Loader";
import ChatSection from "./Components/Chat/ChatSection";

function App() {
  // state
  const [filterKeys, setFilterKeys] = useState({});
  const [filterValues, setFilterValues] = useState({});
  const [activeFilterKey, setActiveFilterKey] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 49.2827,
    longitude: -123.1207,
    width: "100vw",
    height: "100vh",
    zoom: 15,
  });

  // fetch user location
  const userLocation = useUserLocation();

  // fetch csv data
  const csvData = useCsvData("/data/resale-data.csv");

  // filter data logic
  const filteredData = useFilteredData(csvData, filterKeys, filterValues);

  // generate markers based on map bounds
  const inBoundMarkers = useInBoundMarkers(bounds, filteredData);

  // at a glance section data processing
  const processOverviewData = useProcessOverviewData(csvData);

  // handle input to filter data by key
  const handleFilterKeyChange = (key, checked) => {
    setFilterKeys((prevFilterKeys) => {
      const newFilterKeys = {
        ...prevFilterKeys,
        [key]: checked,
      };

      // If the filterKey is set to false, clear the corresponding filterValue
      if (!checked) {
        setFilterValues((prevFilterValues) => {
          const newFilterValues = { ...prevFilterValues };

          delete newFilterValues[key];

          return newFilterValues;
        });

        // If the filterKey is set to false, clear the activeFilterKey
        setActiveFilterKey(null);
      } else {
        setActiveFilterKey(key);
      }

      return newFilterKeys;
    });
  };

  // handle input to filter data by value
  const handleFilterValueChange = debounce((key, value) => {
    setFilterValues((prevFilterValues) => {
      const newFilterValues = { ...prevFilterValues };

      newFilterValues[key] = {
        ...prevFilterValues[key],
        ...value,
      };

      return newFilterValues;
    });
  }, 300);

  // handle table row click to show selected unit on map
  const handleRowClick = (row) => {
    setSelectedUnit(row.original);
    // set viewport to selected unit
    setViewport({
      ...viewport,
      latitude: row.original.latitude,
      longitude: row.original.longitude,
    });
    // set bounds to selected unit
    setBounds({
      _sw: {
        lat: row.original.latitude - 0.01,
        lng: row.original.longitude - 0.01,
      },
      _ne: {
        lat: row.original.latitude + 0.01,
        lng: row.original.longitude + 0.01,
      },
    });
  };

  // Update viewport and bounds when user location changes
  useEffect(() => {
    if (userLocation) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      }));
      setBounds({
        _sw: {
          lat: userLocation.latitude - 0.01,
          lng: userLocation.longitude - 0.01,
        },
        _ne: {
          lat: userLocation.latitude + 0.01,
          lng: userLocation.longitude + 0.01,
        },
      });
    }
  }, [userLocation]);

  const handleSetUserLocation = () => {
    if (userLocation) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zoom: 15,
      }));
      setBounds({
        _sw: {
          lat: userLocation.latitude - 0.01,
          lng: userLocation.longitude - 0.01,
        },
        _ne: {
          lat: userLocation.latitude + 0.01,
          lng: userLocation.longitude + 0.01,
        },
      });
    } else {
      alert("Please allow location access to use this feature");
    }
  };

  return (
    <div
      className={`App bg-white dark:bg-base dark:text-contrast container pt-container-top min-h-screen pb-8`}
    >
      {!csvData ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div>
          {/* HEADER SECTION*/}
          <Header title="Real estate sale data dashboard" />

          {/* AT A GLANCE SECTION */}
          {!processOverviewData ? (
            <Loader />
          ) : (
            <AtAGlaceSection processOverviewData={processOverviewData} />
          )}

          {/* CHAT SECTION */}
          <ChatSection />

          {/* FILTER SECTION */}
          <FilterSection
            filterKeys={filterKeys}
            handleFilterKeyChange={handleFilterKeyChange}
            handleFilterValueChange={handleFilterValueChange}
          />

          {/* MAP SECTION */}
          {!inBoundMarkers ? (
            <Loader />
          ) : (
            <MapSection
              viewport={viewport}
              setViewport={setViewport}
              setBounds={setBounds}
              inBoundMarkers={inBoundMarkers}
              setSelectedUnit={setSelectedUnit}
              selectedUnit={selectedUnit}
              userLocation={userLocation}
              handleSetUserLocation={handleSetUserLocation}
            />
          )}

          {/* DATA TABLE SECTION */}
          <DataTable
            columns={columns}
            data={filteredData}
            sortKey={activeFilterKey}
            handleRowClick={handleRowClick}
          />

          {/* HISTORICAL CHART SECTION */}
          {!csvData ? <Loader /> : <HistoricalChart csvData={csvData} />}
        </div>
      )}
    </div>
  );
}

export default App;
