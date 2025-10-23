import React from "react";

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center bg-cover"
      style={{ backgroundImage: 'url("/404_Cut.png")' }}
    >
      <div className="bg-transparent">
        <a
          href="/"
          className="inline-block px-28 py-24 mt-6 font-medium text-white text-7xl transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark"
        >
          Ra ngoài dùm
        </a>
      </div>
    </div>
  );
};

export default NotFound;
