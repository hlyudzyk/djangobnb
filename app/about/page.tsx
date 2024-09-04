
const AboutPage = () =>{
    return(
        <div className="flex flex-col justify-center lg:mx-20 mx-5">
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 w-full space-y-5">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl text-lightbase-hover font-semibold">Djangobnb</h1>
                    <h1 className="mb-4 text-3xl text-gray-800 font-semibold">Let your property earn you money!</h1>
                    <h1 className="mb-6 text-6xl text-gray-900 font-semibold">$1379</h1>
                    <p className=" mb-10 text-xm">13 nights for approximately $106/night</p>

                    <div
                        className="flex items-center justify-start border-2 border-gray-300 shadow-xl
                         bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-full w-[60%] h-[60px] p-4">
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                            aria-label="Search icon">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>

                        <span className="flex flex-col items-start ml-5">
                            <p className="font-medium">London</p>
                            <p className="text-sm text-gray-600">Apartment - 2 bedrooms</p>
                        </span>
                    </div>

                </div>
                <div className="bg-green-200 rounded-2xl min-h-[200px]">

                </div>
            </div>
            <h1 className="mt-20 text-5xl font-semibold text-gray-900 text-center">Join us today and start earning</h1>

        </div>

    )

}
export default AboutPage;