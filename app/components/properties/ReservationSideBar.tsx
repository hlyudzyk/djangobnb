'use client'

import {useState,useEffect} from "react";

import apiService from "@/app/services/apiServices";
import useLoginModal from "@/app/hooks/useLoginModal";
import {Range} from "react-date-range"
import {differenceInDays, eachDayOfInterval, format} from "date-fns";
import DatePicker from "@/app/components/forms/Calendar";
import {da} from "date-fns/locale";
import {userInfo} from "node:os";
import EditPropertyButton from "@/app/components/EditPropertyButton";

const initialDateRange = {
    startDate:new Date(),
    endDate:new Date(),
    key:`selection`
}

export type Property = {
    id:string;
    guests:number;
    price_per_night:number;
}

interface ReservationSideBarProps{
    userid: string|null
    property:Property;
}

const ReservationSideBar:React.FC<ReservationSideBarProps> = ({property,userid}) =>{
    const loginModal = useLoginModal();
    const [fee,setFee] = useState<number>(0);
    const [nights,setNights] = useState<number>(1);
    const [totalPrice,setTotalPrice] = useState<number>(0);
    const [dateRange,setDateRange] = useState<Range>(initialDateRange);
    const [minDate,setMinDate] = useState<Date>(new Date());
    const [guests,setGuests] = useState('1');
    const guestsRange = Array.from({length:property.guests},(_,index)=>index+1)
    const [bookedDates,setBookedDates] = useState<Date[]>([]);

    const performBooking = async() =>{
        if(userid){
            if(dateRange.startDate&&dateRange.endDate) {
                const formData = new FormData();
                formData.append('guests', guests);
                formData.append('checkin',format(dateRange.startDate, 'yyyy-MM-dd'));
                formData.append('checkout',format(dateRange.endDate, 'yyyy-MM-dd'));
                formData.append('number_of_nights',nights.toString());
                formData.append('total_price',totalPrice.toString());

                const response = await apiService.post(`/api/properties/${property.id}/book/`,formData);

                if(response.success){
                    console.log("Booked")

                }
                else {
                    console.log("Error booking")
                }

            }
        }else {
            loginModal.open();
        }
    }


    const _setDateRange = (selection:any)=>{
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if(newEndDate<=newStartDate){
            newEndDate.setDate(newStartDate.getDate()+1)
        }

        setDateRange({...dateRange, startDate: newStartDate, endDate: newEndDate})
    }

    const getReservations = async()=>{
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)
        let dates:Date[] = [];
        reservations.forEach((reservation:any)=>{
            const range = eachDayOfInterval({
                start:new Date(reservation.checkin),
                end:new Date(reservation.checkout)
            });

            dates = [...dates,...range];
        })
        setBookedDates(dates);
    }

    useEffect(()=>{
        getReservations();
        if(dateRange.startDate&&dateRange.endDate){
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if(dayCount&&property.price_per_night){
                const _fee = ((dayCount*property.price_per_night)/100)*5;
                setFee(_fee);
                setTotalPrice((dayCount*property.price_per_night)+_fee);
                setNights(dayCount);
            }
            else {
                const _fee = (property.price_per_night/100)*5;
                setFee(_fee);
                setTotalPrice(property.price_per_night+_fee);
                setNights(1);
            }
        }
    },[dateRange])

    return(<aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            {property.host.id==userid?
                <div className="h-[40px]">
                    <EditPropertyButton/>
                </div>:
       <> <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>

        <DatePicker value={dateRange}
                    bookedDates={bookedDates}
                    onChange={(value)=>_setDateRange(value.selection)}/>


        <div className="mb-6 p-3 border border-gray-400 rounded-xl">
            <label className="mb-2 block font-bold text-xs">Guests</label>
            <select className="w-full -ml-1 text-xm" value={guests} onChange={(e)=>setGuests(e.target.value)}>
                {guestsRange.map(number=>(
                    <option key={number} value={number}>{number}</option>
                ))}
            </select>
        </div>


        <div className="w-full mb-6 py-6 text-center text-white bg-lightbase rounded-xl
        hover:bg-lightbase-hover"
        onClick={performBooking}>
            Book
        </div>


        <div className="mb-4 flex justify-between align-center">
            <p>${property.price_per_night} * {nights} nights</p>
            <p>${property.price_per_night*nights}</p>
        </div>
        <div className="mb-4 flex justify-between align-center">
            <p>Djangobnb fee</p>
            <p>${fee}</p>
        </div>
        <hr/>
        <div className="mt-4 flex justify-between align-center font-bold">
            <p>Total</p>
            <p>${totalPrice}</p>
        </div>
       </>
            }
    </aside>
);
}
export default ReservationSideBar;