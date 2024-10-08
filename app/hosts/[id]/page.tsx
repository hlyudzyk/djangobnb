import Image from "next/image";
import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import apiService from "@/app/services/apiServices";
import {getUserId} from "@/app/lib/actions";
import EditAccountButton from "@/app/components/EditAccountButton";

const HostDetailPage = async ({params}:{params:{id:string}}) =>{
  const host = await apiService.get(`/api/auth/${params.id}/`)
  const userid = await getUserId();


  return(
      <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <aside className="col-span-1 mb-4 ">
              <div className="flex flex-col items-center p-6 rounded-xl border-gray-300 shadow-xl">
                <Image src={host.avatar_url?host.avatar_url:'/no_pfp.png'} alt="Profile picture"
                       width={200}
                       height={200}
                       className="rounded-full"/>
                <h2 className="mt-6 font-semibold text-2xl">
                  {host.name}
                </h2>
                <p>{host.description} </p>
                {
                  userid==params.id?
                    (
                        <EditAccountButton/>
                    ):
                    (
                      <ContactButton userId={userid} hostId={params.id}/>
                    )
                }

              </div>
          </aside>

          <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
            <h2 className="text-2xl font-semibold mb-10">{host.name}'s properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
              <PropertyList host_id={params.id}/>
            </div>
          </div>
        </div>
      </main>
  )
}

export default HostDetailPage;