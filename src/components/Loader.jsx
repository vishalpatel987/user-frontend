

import React from "react";
// const Loader = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//     </div>
//   );
// };

// export default Loader;

// src/components/Loader.jsx
const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);
export default Loader;
