 'use client'

import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";
interface AddPropertyButtonProps{
  userid?:string|null;
}

const AddPropertyButton:React.FC<AddPropertyButtonProps> = ({userid}) =>{
  const loginModal = useLoginModal();
  const addPropertyModal = useAddPropertyModal();

  const lightbaseYourHome = () => {
      userid?addPropertyModal.open():loginModal.open();


  }

   return (
       <div className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
          onClick={lightbaseYourHome}>
          Add property
       </div>
   )
}

export default AddPropertyButton;