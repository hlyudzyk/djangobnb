import CustomButton from "@/app/components/forms/CustomButton";
import Modal from "@/app/components/modals/Modal";
import {useRouter} from "next/navigation";
import useBookModal from "@/app/hooks/useBookModal";

const BookModal = () => {
  const router = useRouter();
  const bookModal = useBookModal();

  const content = (
      <>
        <h2 className="mb-6 text-2xl">You successfully booked this property!</h2>
        <CustomButton label="My reservations" onClick={()=>router.push("/my-reservations")}/>
      </>
  )

  return(
      <Modal label="Book property" close={bookModal.close} content={content} isOpen={bookModal.isOpen}/>
  )
}

export default BookModal;