'use client'

import Image from "next/image";
import Modal from "@/app/components/modals/Modal";

import LoginModal from "@/app/components/modals/LoginModal";
import usePropertyModal from "@/app/hooks/useAddPropertyModal";
import CustomButton from "@/app/components/forms/CustomButton";
import {ChangeEvent, useState} from "react";
import SelectCountry, {SelectCountryValue} from "@/app/components/forms/SelectCountry";
import apiService from "@/app/services/apiServices";
import {useRouter} from "next/navigation";
import Categories, {CategoryType} from "@/app/components/categories/Categories";

const AddPropertyModal = () =>{
  const [currentStep,setCurrentStep] = useState(1);
  const [errors,setErrors] = useState<string[]>([]);
  const [dataCategory,setDataCategory] = useState('');
  const [dataTitle,setDataTitle] = useState('');
  const [dataDescription,setDataDescription] = useState('');
  const [dataPrice,setDataPrice] = useState('');
  const [dataBedrooms,setDataBedrooms] = useState('');
  const [dataBathrooms,setDataBathrooms] = useState('');
  const [dataGuests, setDataGuests] = useState('');
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [dataImage,setDataImage] = useState<File|null>(null);


  const addPropertyModal = usePropertyModal();
  const router = useRouter();

  const setCategory = (category:string) => {
    setDataCategory(category)
  }

  const handleCategorySelect = (category: CategoryType) => {
    setCategory(category.id);
  };

  const setImage = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.files&&event.target.files.length>0){
      const image = event.target.files[0];
      setDataImage(image);
    }
  }

  const submitForm = async () =>{
    if(dataCategory&&dataTitle&&dataDescription&&dataPrice&&dataCountry&&dataImage){
      const formData = new FormData();
      formData.append("category",dataCategory);
      formData.append("title",dataTitle);
      formData.append("description",dataDescription);
      formData.append("price_per_night",dataPrice);
      formData.append("bedrooms",dataBedrooms);
      formData.append("bathrooms",dataBathrooms);
      formData.append("guests",dataGuests);
      formData.append("country",dataCountry.label);
      formData.append("country_code",dataCountry.value);
      formData.append("image",dataImage);

      const response = await apiService.post('/api/properties/create/',formData)

      if(response.success){
        console.log("Success");
        router.push('/');
        addPropertyModal.close();
      }
      else{
        console.log("Error")
        const tmpErrors: string[] = Object.values(response).map((error:any)=>{
          return error;
        })
        setErrors(tmpErrors);
      }
    }
  }

  const content = currentStep === 1 ? (
      <>
        <h2 className="mb-6 text-2xl">Choose category</h2>
        <Categories
            onCategorySelect={handleCategorySelect}
        />
        <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
      </>
  ) : currentStep === 2 ? (
      <>
        <h2 className="mb-6 text-2xl">Describe your place</h2>

        <div className="pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label>Title</label>
            <input type="text" value={dataTitle}
                   onChange={(e) => setDataTitle(e.target.value)}
                   className="w-full p-4 border border-gray-600 rounded-xl"
            />
          </div>
        </div>

        <div className="pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label>Description</label>
            <textarea value={dataDescription}
                   onChange={(e) => setDataDescription(e.target.value)}
                   className="w-full p-4 h-[200px] border border-gray-600 rounded-xl "
            ></textarea>
          </div>
        </div>

        <CustomButton label="Previous" onClick={() => setCurrentStep(1)}
                      className="mb-2 bg-black hover:bg-gray-800"/>
        <CustomButton label="Next" onClick={() => setCurrentStep(3)}/>

      </>
  ) : currentStep==3? (
      <>
        <h2 className="mb-6 text-2xl">Details</h2>

        <div className="pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label>Price per night</label>
            <input type="number" value={dataPrice}
                   onChange={(e) => setDataPrice(e.target.value)}
                   className="w-full p-4 border border-gray-600 rounded-xl"
            />
          </div>
        </div>

        <div className="pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label>Bedrooms</label>
            <input type="number" value={dataBedrooms}
                   onChange={(e) => setDataBedrooms(e.target.value)}
                   className="w-full p-4 border border-gray-600 rounded-xl"
            />
          </div>
        </div>

        <div className="pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label>Bathrooms</label>
            <input type="number" value={dataBathrooms}
                   onChange={(e) => setDataBathrooms(e.target.value)}
                   className="w-full p-4 border border-gray-600 rounded-xl"
            />
          </div>
        </div>

        <div className="pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label>Max number of guests</label>
            <input type="number" value={dataGuests}
                   onChange={(e) => setDataGuests(e.target.value)}
                   className="w-full p-4 border border-gray-600 rounded-xl"
            />
          </div>
        </div>


        <CustomButton label="Previous" onClick={() => setCurrentStep(2)}
                      className="mb-2 bg-black hover:bg-gray-800"/>
        <CustomButton label="Next" onClick={() => setCurrentStep(4)}/>

      </>
  ) : currentStep==4? (
      <>
        <h2 className="mb-6 text-2xl">Location</h2>
        <div className="pt-3 pb-6 space-y-4">
          <SelectCountry value={dataCountry} onChange={(value)=>setDataCountry(value as SelectCountryValue)}/>
        </div>
        
        <CustomButton label="Previous" onClick={() => setCurrentStep(3)}
                      className="mb-2 bg-black hover:bg-gray-800"/>
        <CustomButton label="Next" onClick={() => setCurrentStep(5)}/>

      </>
  ) : (
      <>
        <h2 className="mb-6 text-2xl">Image</h2>
        <div className  ="pt-3 pb-6 space-y-4">
          <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
            <input type="file" accept="image/*" onChange={setImage}/>
          </div>
          {dataImage&&(
              <div className="w-[200px] h-[150px] relative">
                <Image fill alt="Uploaded image" src={URL.createObjectURL(dataImage)}
                  className="w-full f-full object-cover rounded-xl"/>
              </div>
          )}
        </div>
        {
          errors.map((error,index)=>{
            return (
                <div key={`error_${index}`} className="p-5 mb-4 bg-lightbase text-white rounded-xl opacity-80">
                  {error}
                </div>
            )
          })
        }
          <CustomButton label="Previous" onClick={() => setCurrentStep(4)}
                        className="mb-2 bg-black hover:bg-gray-800"/>
          <CustomButton label="Submit" onClick={submitForm}/>

        </>
  )


  return (
      <>
        <Modal label="Add property" close={addPropertyModal.close}
               isOpen={addPropertyModal.isOpen}
               content={
                 (content)
               }
        />
      </>
  )
}

export default AddPropertyModal;