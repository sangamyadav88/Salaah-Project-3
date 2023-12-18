import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log(BACKEND_URL)
export const API_URL = `${BACKEND_URL}/api/users/`


//Register User
const register = async (userData)=>{
      const response = await axios.post(API_URL+ "register" ,userData,{
        withCredentials: true,
      })
      return response.data
};
const login = async (userData)=>{
  const response = await axios.post(API_URL+ "login" ,userData);
  return response.data
};
//Logout user
const logout = async ()=>{
  const response = await axios.get(API_URL+ "logout");
  return response.data.message;
};
//get Login status
const getLoginStatus = async ()=>{
  const response = await axios.get(API_URL+ "getLoginStatus");
  return response.data;
};
// get user
const getUser = async ()=>{
  const response = await axios.get(API_URL+ "getUser");
  return response.data;
};
//Update user profile
const updateUser = async (userData)=>{
  const response = await axios.patch(API_URL+ "updateUser",userData);
  return response.data;
};
//Update user pphoto
const updatePhoto = async (userData)=>{
  const response = await axios.patch(API_URL+ "updatePhoto",userData);
  return response.data;
};
const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    updatePhoto,
}
export default authService;