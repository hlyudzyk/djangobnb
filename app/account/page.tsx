'use client'

import {useState, useEffect, ChangeEvent} from 'react';
import Image from 'next/image';
import {getUserId} from "@/app/lib/actions";
import apiService from "@/app/services/apiServices";
import {UserType} from "@/app/inbox/page";


const AccountPage = () => {
  const [user, setUser] = useState<UserType>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar,setAvatar] = useState<File|null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      const userid = await getUserId();
      const userData:UserType = await apiService.get(`/api/auth/${userid}/`);
      setUser(userData);
      setName(userData.name);
      setDescription(userData.description);
    };
    fetchUser();
  }, []);

  const setImage = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.files&&event.target.files.length>0){
      const image = event.target.files[0];
      setAvatar(image);
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

          <div className="flex flex-row items-center align-center gap-x-12">
            <div className="w-[200px] h-[150px]">
              <Image width={200} height={200}
                     alt="Profile image"
                     src={avatar ? URL.createObjectURL(avatar) : '/no_pfp.png'}
                     className="rounded-full"/>
            </div>

            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
              <input type="file" accept="image/*" onChange={setImage}/>
            </div>
          </div>

          <div className="lg:w-[50%] pt-20">
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
      </main>
  ) : (
      <p>Loading...</p>
  );
};

export default AccountPage;
