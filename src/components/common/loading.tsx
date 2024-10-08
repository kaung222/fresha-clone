import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div>
      <Loader className=" animate-spin" />
      {/* Loading ... */}
    </div>
  );
};

export default Loading;
