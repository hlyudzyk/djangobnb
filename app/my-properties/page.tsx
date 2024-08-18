import Image from "next/image";
import PropertyList from "@/app/components/properties/PropertyList";
import {getUserId} from "@/app/lib/actions";

const MyPropertiesPage = async () =>{

  const userid = await getUserId();

  return(
      <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <h1 className="my-6 text-2xl">
          My properties
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PropertyList host_id={userid}/>
        </div>
      </main>
  )
}

export default MyPropertiesPage;
