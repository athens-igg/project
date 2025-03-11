import React from "react";

const DestinationSearch = ({ search, setSearch }) => {
  return (
    <div className="text-center my-5">
      <h2>Find Your Next Destination</h2>
      <input
        type="text"
        placeholder="Search destinations..."
        className="form-control d-inline-block w-50 mt-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default DestinationSearch;
