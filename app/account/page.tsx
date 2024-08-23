'use client'

import {useState, useEffect, ChangeEvent, Suspense} from 'react';
import Image from 'next/image';
import {getUserId} from "@/app/lib/actions";
import apiService from "@/app/services/apiServices";
import {UserType} from "@/app/inbox/page";
import PropertyList from "@/app/components/properties/PropertyList";
import {AccountPageSkeleton, PropertyListSkeleton} from "@/app/components/skeletons";


const AccountPage = () => {
  const [user, setUser] = useState<UserType>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar,setAvatar] = useState<File|null>(null);
  const [avatarUrl,setAvatarUrl] = useState<string>('/no_pfp.png');

  useEffect(() => {
    const fetchUser = async () => {
      const userid = await getUserId();
      const userData:UserType = await apiService.get(`/api/auth/${userid}/`);
      setUser(userData);
      setName(userData.name);
      setAvatarUrl(userData.avatar_url?userData.avatar_url:"/no_pfp.png");
      setDescription(userData.description);
    };
    fetchUser();
  }, []);

  const setImage = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.files&&event.target.files.length>0){
      const image = event.target.files[0];
      setAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  }

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if(avatar) formData.append('avatar', avatar);
    await apiService.post(`/api/auth/edit/`, formData);
  };


  return user ? (
      <main className="max-w-[1500px] mx-auto px-6 pb-6">

        <div className="flex flex-col items-center p-6 rounded-xl border-gray-300 shadow-xl">
          <div className="lg:w-[50%] sm:w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]">
                <Image
                    width={200}
                    height={200}
                    alt="Profile image"
                    src={avatarUrl}
                    className="rounded-full object-cover w-full h-full"
                />
              </div>
            </div>

            <div
                className="py-4 px-6 bg-gray-600 text-white rounded-xl flex justify-center md:justify-start">
              <label className="cursor-pointer">
                <span className="text-sm md:text-base">Change Profile Image</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={setImage}
                    className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="w-full pt-20">
            <h2 className="mb-6 text-2xl">Describe yourself</h2>

            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <label>Name</label>
                <input type="text" value={name}
                       onChange={(e) => setName(e.target.value)}
                       className="w-full p-4 border border-gray-600 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <label>Description</label>
                <textarea value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full p-4 h-[200px] border border-gray-600 rounded-xl "
                ></textarea>
              </div>
            </div>
          </div>

          <button
              onClick={handleSave}
              className="cursor-pointer bg-airbnb hover:bg-airbnb-dark p-5 text-white rounded-xl mt-4"
          >
            Save Changes
          </button>
        </div>
        </div>
        <div className="p-6 rounded-xl border-gray-300 shadow-xl mt-20">
          <h1 className="my-6 text-2xl">
            My properties
          </h1>

          <div className="mt-4 grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Suspense fallback={<PropertyListSkeleton/>}>
              <PropertyList host_id={user.id}/>
            </Suspense>
          </div>
        </div>
      </main>
  ) : (
      <AccountPageSkeleton/>
  );
};

export default AccountPage;
