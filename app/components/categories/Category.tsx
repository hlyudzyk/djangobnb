import Image from "next/image";


interface CategoryProps{
  isSelected:boolean;
  imageUrl:string;
  title:string;
  onClick:()=>void;
}

const Category:React.FC<CategoryProps> = ({isSelected,imageUrl,title,onClick}) => {
  return (
      <div className={`cursor-pointer pb-4 flex flex-col items-center space-y-2 border-b-2
             ${isSelected? 'border-gray-800' : 'border-white'}
             opacity-60 hover:opacity-100 hover:border-gray-200`}
           onClick={onClick}>
        <Image src={imageUrl} alt={`${title} - category`}
               width={20} height={20}/>
        <span className="text-xs">
            {title}
          </span>
      </div>
  )
}

export default Category