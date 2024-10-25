import React from "react";

const RangeFilter = ({ displayName, filterValue, onChange , onClick}) => (
  <>
    <input
      type="number"
      placeholder={`Min ${displayName}`}
      onChange={(e) => onChange({ ...filterValue, min: e.target.value })}
      onClick={onClick}
      className="p-2 border rounded w-full text-base mb-2"
    />
    <input
      type="number"
      placeholder={`Max ${displayName}`}
      onChange={(e) => onChange({ ...filterValue, max: e.target.value })}
      onClick={onClick}
      className="p-2 border rounded w-full text-base"
    />
  </>
);

export default RangeFilter;