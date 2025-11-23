import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Profile() {
  // const user = {
  //   name: 'Chhoti Developer',
  //   email: 'chhoti@example.com',
  //   avatar: '/images/avatar.jpg', // Update path accordingly
  //   joinedOn: 'June 2024',
  // }
  const {loading,isAuthenticated,user}=useSelector(state=>state.user)
  console.log("uuser",user)


  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">My Profile</h2>
          
          <div className="flex flex-col items-center">
            <img
              src={user.avatar.url}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-blue-500"
            />
            
            <Link to="/profile/update" className="w-full">
              <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl shadow hover:bg-blue-700 transition mb-8 font-semibold">
                Edit Profile
              </button>
            </Link>

            <div className="w-full bg-gray-100 rounded-2xl p-6 space-y-4 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Username</h3>
                <p className="text-gray-900">{user.name}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Email</h3>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Joined On</h3>
                <p className="text-gray-900">{user.joinedOn}</p>
              </div>
            </div>
            <div className='flex gap-5'>
              <Link to= '/orders/user'>
            <button className="w-full bg-green-700 text-white px-4 py-3 rounded-xl shadow hover:bg-green-900 transition mb-4 font-semibold text-nowrap">
              My Orders
            </button>
            </Link>
            <Link to="/password/update" className="w-full text-wrap">
              <button className="w-full bg-red-500 text-nowrap  text-white px-4 py-3 rounded-xl shadow hover:bg-red-600 transition font-semibold">
                Change Password
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Profile
