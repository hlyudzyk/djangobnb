'use client'

import {FaStar} from 'react-icons/fa'
import {useState} from "react";

interface StarRatingProps{
  stars:number;
}

const StarRating:React.FC<StarRatingProps> = ({stars}) => {
  const [rating,setRating] = useState(0);
  const [hover,setHover] = useState(0);

  function handleClick(index:number){
    setRating(index);
  }

  function handleMouseEnter(index:number){
    setHover(index)
  }

  function handleMouseLeave(index:number){
    setHover(rating)
  }

  return(<div className="flex flex-row">
    {
      [...Array(stars)].map((_,index)=>{
        index+=1;

        return <FaStar key={index}
                       className={index<=(hover||rating)?'text-yellow-400':'text-black'}
                       onClick={()=>handleClick(index)}
                       onMouseEnter={()=>handleMouseEnter(index)}
                       onMouseLeave={()=>handleMouseLeave(index)}
                       size={20}/>
      })
    }
  </div>)
}

export default StarRating;