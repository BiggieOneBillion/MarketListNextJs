import React from "react";

const Loader = () => {
  return (
    <section className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
      <p className="flex items-center gap-3 bg-zinc-900 rounded-md px-3 py-1 font-medium">
        {/* <div className="loader">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
          <div className="bar6"></div>
          <div className="bar7"></div>
          <div className="bar8"></div>
          <div className="bar9"></div>
          <div className="bar10"></div>
          <div className="bar11"></div>
          <div className="bar12"></div>
        </div> */}
        <span className="text-white">Loading...</span>
      </p>
    </section>
  );
};

export default Loader;
