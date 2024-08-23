import Modal from "@/app/components/modals/Modal";
import {useState} from "react";


const ConfirmBookingModal = () => {
  const [isOpen,setIsOpen] = useState(false);

  const content = (
      <div>
          <h2>
            Booking confirmation

          </h2>
      </div>
  )
  return(
      <Modal label="Booking confirmation" close={()=>setIsOpen(false)} content={content} isOpen={isOpen}/>
  )
}