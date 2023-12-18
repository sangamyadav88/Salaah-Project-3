import React, { useEffect, useState } from 'react'
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png"
// import { loginUser } from '../../../../backend/controller/userController';
import { Link, useNavigate } from 'react-router-dom';
import Card from "../../components/card/Card"
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/index';
import { useDispatch ,useSelector } from 'react-redux';
import { RESET_AUTH, register } from '../../redux/features/auth/authSlice';
import Loader from "../../components/loader/Loader"
const initialState ={
    name:"",
    email:"",
    password:"",
    cPassword:"",
};


const Register = () => {
    const [formData , setFromData] = useState(initialState)
    const {name,email,password,cPassword} = formData;
    const {isLoading,isLoggedIn,isSuccess} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleInputChange = (e)=>{
        const {name,value} = e.target
        setFromData({...formData,[name]:value})
    };
const registerUser = async (e)=>{
    e.preventDefault();
    if(!email || !password ){
        return toast.error("All fields are required")
    }
    if(password.length <6){
        return toast.error("Password must be up to 6 characters")
    }
    if(!validateEmail(email)){
        return toast.error("Please enter a valid email")
    }
    if(password !== cPassword){
        return toast.error("Passwords do not match")
    }
    const userData = {
        name,
        email,
        password,
    }
    await dispatch(register(userData))

};
useEffect(()=>{
    if(isSuccess && isLoggedIn){
        navigate("/")
    }
    dispatch(RESET_AUTH())

},[isSuccess, isLoggedIn ,dispatch ,navigate])

  return (
    <>
    {isLoading &&<Loader/>}
    <section className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                 <h2>Register</h2>
                 <form onSubmit={registerUser}>
                    <input
                    type='text'
                    placeholder='Name'
                    required
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    />
                 <input
                   type='text'
                   placeholder='Email'
                   required
                   value={email}
                   name = "email"
                   onChange={handleInputChange}
                   />
                   <input
                   type='password'
                   placeholder='Password'
                   required
                   value={password}
                   name="password"
                   onChange={handleInputChange}
                   />
                  <input
                   type='password'
                   placeholder='Confirm Password'
                   required
                   value={cPassword}
                   name="cPassword"
                   onChange={handleInputChange}
                   />
                   <button type='submit' className='--btn --btn-primary --btn-block'>
                    Register
                   </button>
                   </form>
                   <span class={styles.register}>
                    <p>Already have an account</p>
                    <Link to="/login">Login</Link>
                   </span>
            </div>
        </Card>
        <div className={styles.img}>
       <img src={loginImg} alt="Login" width="400"/>
        </div>
        <div className={styles.form}>
            
        </div>
    </section>
    </>
  )
}

export default Register;