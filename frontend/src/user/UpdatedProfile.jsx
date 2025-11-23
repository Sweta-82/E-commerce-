import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeErrors, removeSuccess, updateProfile } from '../features/user/userSlice';

function UpdatedProfile() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [avatar,setAvatar]=useState("");
  const [avatarPreview,setAvatarPreview]=useState('./images/profile.png');
  const {user,error,success, message,loading}=useSelector(state=>state.user);
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const updateSubmit=(e)=>{
    e.preventDefault();
        const myForm=new FormData();
        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("avatar",avatar)
        dispatch(updateProfile(myForm))
  }
  useEffect(()=>{
        if(error){
          toast.error(error,{position:'top-center',autoClose:3000});
          dispatch(removeErrors())
        }
      },[dispatch,error])

      useEffect(()=>{
        if(success){
          toast.success(message,{position:'top-center',autoClose:3000});
          dispatch(removeSuccess());
          navigate("/profile")
        }
      },[dispatch,success])
    useEffect(() => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar?.url || './images/profile.png');
      }}, [user]);
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
        <form encType='multipart/form-data' onSubmit={updateSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-1 border-2 border-black rounded-lg file:mr-4 file:py-1 file:px-4 file:bg-gray-100 file:rounded-lg file:border-1 file:text-sm file:border-black transition mb-5"
            onChange={(e) => {
              const file = e.target.files[0];
              setAvatar(file);
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setAvatarPreview(reader.result);
                }
              };
              if (file) reader.readAsDataURL(file);
            }}
          />

          <div className="flex justify-center mb-6">
            <img
              src={avatarPreview}
              alt="Profile Avatar"
              className="w-20 h-20 rounded-full object-cover border border-black"
            />
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Change your user name"
              className="border border-black px-4 py-2 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="email"
              placeholder="Update your email"
              className="border border-black px-4 py-2 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
      Update
    </button>
  </div>
</form>

      </div>
      <Footer />
    </>
  )
}

export default UpdatedProfile
