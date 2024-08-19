'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import {useRouter} from "next/navigation";
import apiService from "@/app/services/apiServices";

interface ContactButtonProps{
  userId:string|null;
  hostId:string;
}

const ContactButton:React.FC<ContactButtonProps> = ({userId,hostId}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const startConversation = async () => {
    if(userId){
      const conversation = await apiService.get(`/api/chat/start/${hostId}/`)

      if(conversation.conversation_id){
        router.push(`/inbox/${conversation.conversation_id}/`)
      }
    }else {
      loginModal.open();
    }
  }
    return(
        <div className="cursor-pointer mt-6 py-4 px-6 bg-airbnb text-white rounded-xl
        hover:bg-airbnb-dark transition"
              onClick={startConversation}>
            Contact
        </div>
    )
}
export default ContactButton;