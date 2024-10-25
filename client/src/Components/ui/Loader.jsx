import React from "react";
import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex items-center justify-center ">
      <ClipLoader color="#f46b44" loading={true} size={50} />
    </div>
  );
}

export default Loader;
