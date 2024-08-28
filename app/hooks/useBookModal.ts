import {create} from "zustand";

interface BookModalStore{
  isOpen:boolean;
  open: ()=>void;
  close: ()=>void;
}

const useBookModal = create<BookModalStore>((set) => ({
  isOpen:false,
  open:()=>set({isOpen:true }),
  close:()=>set({isOpen:false})
}));

export default useBookModal;