import Image from "next/image";

const Categories = () => {
  return(
      <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">

        <div className="pb-4 flex flex-col items-center space-y-2 border-b-2
         border-white opacity-60 hover:opacity-100 hover:border-gray-200">
          <Image src="/beachfront.png" alt="Beach - category"
                 width={20} height={20}/>
          <span className="text-xs">
            Beachfront
          </span>
        </div>

        <div className="pb-4 flex flex-col items-center space-y-2 border-b-2
         border-white opacity-60 hover:opacity-100 hover:border-gray-200">
          <Image src="/pools.png" alt="Amazing Pools - category"
                 width={20} height={20}/>
          <span className="text-xs">
            Amazing Pools
          </span>
        </div>


        <div className="pb-4 flex flex-col items-center space-y-2 border-b-2
         border-white opacity-60 hover:opacity-100 hover:border-gray-200">
          <Image src="/tinyhomes.png" alt="Tiny Homes - category"
                 width={20} height={20}/>
          <span className="text-xs">
            Tiny Homes
          </span>
        </div>

        <div className="pb-4 flex flex-col items-center space-y-2 border-b-2
         border-white opacity-60 hover:opacity-100 hover:border-gray-200">
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