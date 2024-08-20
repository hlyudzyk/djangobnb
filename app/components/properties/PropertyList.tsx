'use client'

import PropertyItem from "@/app/components/properties/PropertyItem";
import {useEffect, useState} from "react";
import apiService from "@/app/services/apiServices";
import useSearchModal from "@/app/hooks/useSearchModal";
import {useParams} from "next/navigation";

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
  is_favorite:boolean;

}

interface PropertyListProps{
  host_id?:string|null;
  favorites?:boolean|null;
}

const PropertyList:React.FC<PropertyListProps> = ({host_id, favorites}) => {
  const [properties,setProperties] = useState<PropertyType[]>([]);
  const searchModal = useSearchModal();
  const params = useParams();

  const markFavorite = (id:string,is_favorite:boolean)=> {
    const tmpProperties = properties.map((property:PropertyType)=>{
      if(property.id==id){
        property.is_favorite=is_favorite
        if(is_favorite){

        }
      }

      return property;
    })
    setProperties(tmpProperties);
  }

  const getProperties = async ()  =>{
    let url = '/api/properties/';

    if(host_id){
      url += `?host_id=${host_id}`;
    } else if(favorites){
      url += `?is_favorites=true`;
    } else {
      url += `?${searchModal.getQueryString()}`
    }

    const tmpProperties = await apiService.get(url)
    setProperties(tmpProperties.data.map((property:PropertyType)=>{
      property.is_favorite=tmpProperties.favorites.includes(property.id);
      console.log("property: " + property.id + " favorited: " + property.is_favorite);

      return property;
    }));

  };

  useEffect(()=>{
      getProperties();
      console.log("Fetched agaim")
  },[searchModal.query,params])

  return(<>

    {properties.length>0?
        properties.map((property)=>{
          return(
              <PropertyItem key={property.id} property={property}
                            markFavorite={(is_favorite:any)=>markFavorite(property.id,is_favorite)}/>
          )
        })
        :
        <div>
          <h1 className="font-semibold">No exact matches :(</h1>
          <h2>
            Unfortunately, we couldn't find properties by given parameters...
          </h2>
        </div>
    }
  </>)
}
export default PropertyList;