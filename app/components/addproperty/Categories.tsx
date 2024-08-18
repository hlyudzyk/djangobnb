import Image from "next/image";

interface CategoriesProps {
  dataCategory: string;
  setCategory:(category:string) => void;
}

const Categories: React.FC<CategoriesProps> = ({dataCategory,
                                                 setCategory
  }) => {

  return(
      <>
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
          <div className={`pb-4 flex flex-col items-center space-y-2 border-b-2
            ${dataCategory==='Beach'?'border-gray-800':'border-white'}  
            opacity-60 hover:opacity-100 hover:border-gray-200`}
          onClick={()=>setCategory("Beach")}>
            <Image src="/beachfront.png" alt="Beach - category"
                   width={20} height={20}/>
            <span className="text-xs">
            Beachfront
          </span>
          </div>

          <div className={`pb-4 flex flex-col items-center space-y-2 border-b-2
            ${dataCategory==='Amazing Pools'?'border-gray-800':'border-white'}  
            opacity-60 hover:opacity-100 hover:border-gray-200`}
               onClick={()=>setCategory("Amazing Pools")}>
            <Image src="/pools.png" alt="Amazing Pools - category"
                   width={20} height={20}/>
            <span className="text-xs">
            Amazing Pools
          </span>
          </div>


          <div className={`pb-4 flex flex-col items-center space-y-2 border-b-2
            ${dataCategory==='Tiny Homes'?'border-gray-800':'border-white'}  
            opacity-60 hover:opacity-100 hover:border-gray-200`}
               onClick={()=>setCategory("Tiny Homes")}>
            <Image src="/tinyhomes.png" alt="Tiny Homes - category"
                   width={20} height={20}/>
            <span className="text-xs">
            Tiny Homes
          </span>
          </div>

          <div className={`pb-4 flex flex-col items-center space-y-2 border-b-2
            ${dataCategory==='Cabins'?'border-gray-800':'border-white'}  
            opacity-60 hover:opacity-100 hover:border-gray-200`}
               onClick={()=>setCategory("Cabins")}>
            <Image src="/cabins.png" alt="Cabins - category"
                   width={20} height={20}/>
            <span className="text-xs">
            Cabins
          </span>
          </div>
        </div>
      </>
  )
}

export default Categories;