import Image from 'next/image';
import {PropertyType} from "@/app/components/properties/PropertyList";
import {useRouter} from "next/navigation";
import MarkFavoriteButton from "@/app/components/MarkFavoriteButton";
import {is} from "date-fns/locale";

interface PropertyProps {
  property: PropertyType;
  markFavorite?:(is_favorite:boolean)=>void;
}

const PropertyItem: React.FC<PropertyProps> = ({property,markFavorite}) => {

  const router = useRouter();

  return (
      <div className="cursor-pointer"
           onClick={()=>router.push(`/properties/${property.id}`)}>
        <div className="relative overflow-hidden aspect-square rounded-xl">
          <Image
              fill
              src={property.image_url}
              sizes="(max-width:786px) 768px, (max-width: 1200px): 786px,786px"
              className="hover:scale-110 object-cover transition h-full w-full"
              alt="House"/>
          {markFavorite&&(
              <MarkFavoriteButton id={property.id} is_favorite={property.is_favorite}
                                  markFavorite={(is_favorite)=>markFavorite(is_favorite)}
              />
          )}
        </div>

        <div className="mt-2">
          <p className="text-lg font-bold">{property.title}</p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500"><strong>${property.price_per_night} per
            night</strong></p>
        </div>
      </div>)
}
export default PropertyItem;