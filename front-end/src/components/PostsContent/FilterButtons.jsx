import React, { useState } from "react";

const FilterButtons = ({ locationFilter, opt, onFilter, offFilter }) => {
    const [clicked, setClicked] = useState(false)
  return (
    <>
      {!clicked ? (
        <p
          onClick={() => {
            setClicked(true);
            onFilter();
            locationFilter(opt.name);
          }}
          className="uppercase m-1 py-1 px-2 border-2 rounded-2xl hover:text-white cursor-pointer text-sm hover:bg-[#525252]"
          
        >
          {opt.name}
        </p>
      ) : (
        <p
          onClick={() => {
            setClicked(false)
            offFilter()
        }}
          className="uppercase m-1 py-1 px-2 border-2 rounded-2xl text-white cursor-pointer text-sm bg-[#525252]"
          
        >
          {opt._id}
        </p>
      )}
    </>
  );
};

export default FilterButtons;
