import Image from 'next/image'
import ReservationSideBar from "@/app/components/properties/ReservationSideBar";
import apiService from "@/app/services/apiServices";
import {resolveAppleWebApp} from "next/dist/lib/metadata/resolvers/resolve-basics";
import {getUserId} from "@/app/lib/actions";
import Link from "next/link";
import StarRating from "@/app/components/forms/StarRating";


const PropertyDetailPage = async ({params}:{params:{id:string}}) =>{

  const property = await apiService.get(`/api/properties/${params.id}/`);
  const userid = await getUserId();

  return(
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
          <Image
            fill
             src={property.image_url}
            className="object-cover w-full h-full"
            alt="House"/>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">{property.title}</h1>
          <div className="mb-5">
            <StarRating stars={5}/>
          </div>
          <span className="mb-6 block text-lg text-gray-600">
            {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
          </span>

          <hr/>

          <Link className="py-6 flex items-center space-x-4"
                href={`/hosts/${property.host.id}`}>
            <Image src={property.host.avatar_url ? property.host.avatar_url : '/no_pfp.png'}
                   alt="Landlords photo"
                   width={50}
                   height={50}
                   className="rounded-full"/>

            {property.host.id==userid?(
              <p><strong>You</strong> are the host</p>):
                (<p>
                  <strong>{property.host.name}</strong> is your host</p>)
            }
          </Link>

          <hr/>
          <p className="mt-6 text-lg">
            {property.description}
          </p>
        </div>
            <ReservationSideBar property={property} userid={userid}/>
      </div>
    </main>
  )
 }

 export default PropertyDetailPage;