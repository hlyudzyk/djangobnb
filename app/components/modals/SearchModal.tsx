'use client'

import Modal from "@/app/components/modals/Modal";
import useSearchModal, {SearchQuery} from "@/app/hooks/useSearchModal";
import SelectCountry, {SelectCountryValue} from "@/app/components/forms/SelectCountry";
import {useState} from "react";
import CustomButton from "@/app/components/forms/CustomButton";
import {Range} from 'react-date-range'
import DatePicker from "@/app/components/forms/Calendar";
const initialDateRange = {
  startDate:new Date(),
  endDate:new Date(),
  key:`selection`
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const [country,setCountry] = useState<SelectCountryValue>();
  const [dateRange,setDateRange] = useState<Range>(initialDateRange)
  const [guests,setGuests] = useState<string>('1');
  const [bedrooms,setBedrooms] = useState<string>('1');
  const [bathrooms,setBathrooms] = useState<string>('1');


  const _setDateRange = (selection:Range) => {
    if(searchModal.step==='checkin'){
      searchModal.open('checkout')
    } else if(searchModal.step=='checkout'){
       searchModal.open('details')
    }
    setDateRange(selection)

  }

  const closeAndSearch = () => {
    const searchQuery:SearchQuery = {
      country:country?.label,
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guests: parseInt(guests),
      bathrooms: parseInt(bathrooms),
      bedrooms: parseInt(bedrooms),
      category: searchModal.query.category
    }

    searchModal.setQuery(searchQuery)
    searchModal.close()
  }

  const contentLocation = (
    <>
      <h2 className="mb-6 text-2xl">Where to?</h2>
      <SelectCountry onChange={(value)=>setCountry(value as SelectCountryValue)}
                     value={country}/>

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton label={"Check in date"}
                      onClick={()=>searchModal.open('checkin')}
        />
      </div>
    </>
  )

  const contentCheckin = (
      <>
        <h2 className="mb-6 text-2xl">Select check-in date</h2>
        <DatePicker value={dateRange}
                  onChange={(value)=>_setDateRange(value.selection )}
        />
        <div className="mt-6 flex flex-row gap-4">
          <CustomButton label={"Location"}
                        onClick={()=>searchModal.open('location')}
          />
          <CustomButton label={"Check out date"}
                        onClick={() => searchModal.open('checkout')}
          />
        </div>
      </>
  )

  const contentCheckout = (
      <>
        <h2 className="mb-6 text-2xl">Select check-out date</h2>
        <DatePicker value={dateRange}
                    onChange={(value)=>_setDateRange(value.selection )}
        />
        <div className="mt-6 flex flex-row gap-4">
          <CustomButton label={"Check in"}
                        onClick={()=>searchModal.open('checkin')}
          />
          <CustomButton label={"Details"}
                        onClick={() => searchModal.open('details')}
          />
        </div>
      </>
  )


  const contentDetails = (
      <>
        <h2 className="mb-6 text-2xl">Details</h2>

        <div className="space-y-4">
          <div className="space-y-4">
            <label>Number of guests:</label>
            <input type="number" min="1" value={guests}
                   onChange={(e) => setGuests(e.target.value)}
                   className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                   placeholder="Number of guests..."/>
          </div>

          <div className="space-y-4">
            <label>Number of bedrooms:</label>
            <input type="number" min="1" value={bedrooms}
                   onChange={(e) => setBedrooms(e.target.value)}
                   className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                   placeholder="Number of bedrooms..."/>
          </div>

          <div className="space-y-4">
            <label>Number of bathrooms:</label>
            <input type="number" min="1" value={bathrooms}
                   onChange={(e) => setBathrooms(e.target.value)}
                   className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                   placeholder="Number of bathrooms..."/>
          </div>
        </div>
        <div className="mt-6 flex flex-row gap-4">
          <CustomButton label={"Check out"}
                        onClick={() => searchModal.open('checkout')}
          />
          <CustomButton label={"Search"}
                        onClick={closeAndSearch}
          />
        </div>
      </>
  )

  let content = (<>
  </>)

  switch (searchModal.step) {
    case 'location':{
      content = contentLocation;
      break;
    }
    case 'checkin':{
      content = contentCheckin;
      break;
    }
    case 'checkout':{
      content = contentCheckout;
      break;
    }
    case 'details':{
      content = contentDetails;
      break;
    }



  }


  return (
      <Modal label="Search"
             content={content}
             close={searchModal.close}
             isOpen={searchModal.isOpen}/>
  )
}

export default SearchModal;