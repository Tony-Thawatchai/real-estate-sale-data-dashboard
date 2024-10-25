import React from "react";
import { Popup } from "react-map-gl";

const MemoizedPopup = React.memo(({ latitude, longitude, onClose, children }) => (
  <Popup
    latitude={latitude}
    longitude={longitude}
    closeButton={true}
    closeOnClick={false}
    onClose={onClose}
    anchor="top"
  >
    {children}
  </Popup>
));

export default MemoizedPopup;