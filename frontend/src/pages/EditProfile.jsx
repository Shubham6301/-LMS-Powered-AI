import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function EditProfile() {
     const {userData} = useSelector(state=>state.user)
     const [name,setName] = useState(userData.name || "")
     const [description,setDescription] = useState(userData.description || "")
     const [photoUrl,setPhotoUrl] = useState(null)
     const dispatch = useDispatch()
     const[loading,setLoading] = useState(false)
     const navigate = useNavigate()

      const formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("photoUrl",photoUrl)



     const updateProfile = async () => {
      setLoading(true)
      try {
        const result = await axios.post(serverUrl + "/api/user/updateprofile" ,formData , {withCredentials:true} )
        console.log(result.data)
        dispatch(setUserData(result.data))
        navigate("/")
        setLoading(false)
      
        toast.success("Profile Update Successfully")
        

        
      } catch (error) {
        console.log(error)
        toast.error(error.responsE.data.message)
        setLoading(false)
      }
      
     }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowLeftLong
          className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>

        <form  action=" "  className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Profile Photo */}

          <div className="flex flex-col items-center text-center">
            {userData.photoUrl ? (
              <img
                src={userData?.photoUrl}
                alt=""
                className="w-24 h-24 rounded-full object-cover border-4 border-[black]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black  border-white cursor-pointer">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Select Avatar
            </label>
            <input
              id="image"
              type="file"
              name="photoUrl"
              placeholder="Photo URL"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-md text-sm "
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              accept="image/*"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[black] placeholder:text-black"
              placeholder={userData.name}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              readOnly
              className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600 placeholder:text-black"
              placeholder={userData.email}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="description"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[black]"
              rows={3}
              placeholder="Tell us about yourself"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[black] active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer"
            disabled={loading}
            onClick={updateProfile}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile
