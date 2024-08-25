'use client'

import {useRouter} from "next/navigation";

const EditPropertyButton = () => {
  const router = useRouter();
  return (
      <div className="cursor-pointer mt-6 py-4 px-6 bg-lightbase text-white rounded-xl
        hover:bg-lightbase-hover transition"
           onClick={()=>{
             router.push('/account')
           }}>
        Edit property
      </div>
  )
}

export default EditPropertyButton;