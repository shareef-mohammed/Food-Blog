import React, { useEffect } from 'react'
import { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import FilterButtons from './FilterButtons';

const Filter = ({locationFilter, onFilter, offFilter}) => {
    const [option, setOption] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASEURL}/posts/Locations`, {
            headers: {
                "Content-Type": "application/json",
            },
          })
          .then(res => res.json())
          .then(data => {
            if(data.err) {
              
              return navigate('/PageNotFound')
            }
            setOption(data.location)
            
          })
          .catch(err => {
            navigate('/PageNotFound')
          })

    },[])

    const slideRight = () => {
      let slider = document.getElementById("slider1");
      slider.scrollLeft = slider.scrollLeft + 500;
    };
  
    const slideLeft = () => {
      let slider = document.getElementById("slider1");
      slider.scrollLeft = slider.scrollLeft - 500;
    };

  return (
    <div className='max-w-[1280px] mx-auto px-4 my-4 relative flex'>
      <MdChevronLeft
        className="opacity-50 cursor-pointer  hover:opacity-100 my-auto"
        onClick={slideLeft}
        size={20}
      />
        <div id='slider1' className='flex w-[95%] overflow-scroll scrollbar-hide scroll-smooth mx-auto'  >
            {option.map((opt, i) => {
                return(
                    <FilterButtons key={i} opt={opt} locationFilter={locationFilter} onFilter={onFilter} offFilter={offFilter} />
                )
            })}
        </div>
        <MdChevronRight
        className="cursor-pointer opacity-50 hover:opacity-100 my-auto"
        onClick={slideRight}
        size={20}
      />
    </div>
  )
}

export default Filter
