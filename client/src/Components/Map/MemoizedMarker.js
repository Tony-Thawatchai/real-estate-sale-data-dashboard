import React from "react";
import { Marker } from "react-map-gl";

const MemoizedMarker = React.memo(({ latitude, longitude, children }) => (
  <Marker latitude={latitude} longitude={longitude}>
    {children}
  </Marker>
));

export default MemoizedMarker;