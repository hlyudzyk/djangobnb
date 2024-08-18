'use client'

import PropertyItem from "@/app/components/properties/PropertyItem";
import {useEffect, useState} from "react";
import apiService from "@/app/services/apiServices";
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

  const getProperties = async () =>{
    let url = '/api/properties/';

    if(host_id){
      url += `?host_id=${host_id}`;
    } else if(favorites){
      url += `?is_favorites=true`;
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
  },[])

  return(<>
    {properties.map((property)=>{
      return(
          <PropertyItem key={property.id} property={property}
                        markFavorite={(is_favorite:any)=>markFavorite(property.id,is_favorite)}/>
      )
    })}
  </>)
}
export default PropertyList;