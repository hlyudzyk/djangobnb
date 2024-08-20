'use client'

import Image from "next/image";
import useSearchModal, {SearchQuery} from "@/app/hooks/useSearchModal";
import {useState} from "react";


const Categories = () => {
  const searchModal = useSearchModal();
  const [category,setCategory] = useState('')

  const _setCategory = (_category:string) =>{
    setCategory(_category);
    searchModal.setQuery({...searchModal.query,category:_category});
  }

  return(
      <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">

        <div className={`pb-4 flex flex-col items-center space-y-2 border-b-2
             ${category==='beach'?'border-gray-800':'border-white'}
             opacity-60 hover:opacity-100 hover:border-gray-200`}
             onClick={()=>{_setCategory("beach")}}  >
          <Image src="/beachfront.png" alt="Beach - category"
                 width={20} height={20}/>
          <span className="text-xs">
            Beachfront
          </span>
        </div>

        <div className="pb-4 flex flex-col items-center space-y-2 border-b-2
         border-white opacity-60  hover:opacity-100 hover:border-gray-200"
             onClick={()=>{_setCategory("pools")}}>
          <Image src="/pools.png" alt="Amazing Pools - category"
                 width={20} height={20}/>
          <span className="text-xs">
            Amazing Pools
          </span>
        </div>


        <div className={`pb-4 flex flex-col items-center space-y-2 border-b-2
             ${category==='tiny_homes'?'border-gray-800':'border-white'}
             opacity-60 hover:opacity-100 hover:border-gray-200`}
             onClick={()=>{_setCategory("tiny_homes")}}>
          <Image src="/tinyhomes.png" alt="Tiny Homes - category"
                 width={20} height={20}/>
          <span className="text-xs">
            Tiny Homes
          </span>
        </div>

        <div className="pb-4 flex flex-col items-center space-y-2 border-b-2
         border-white opacity-60 hover:opacity-100 hover:border-gray-200"
             onClick={()=>{_setCategory("cabins")}}>
          <Image src="/cabins.png" alt="Cabins - category"
                 width={20} height={20}/>
          <span className="text-xs">
            Cabins
          </span>
        </div>
      </div>

  )
}

export default Categories;