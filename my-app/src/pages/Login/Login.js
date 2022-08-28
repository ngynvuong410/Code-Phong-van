import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/icon-librarynode.png'
import './Login.scss'

const Login = () => {
    const [email, setEmail] = useState('')
    const [messEmail, setMessEmail] = useState('')
    const navigate = useNavigate()

 
    const handelOnsubmit = (e) => {
        e.preventDefault()
        const isBool = email.toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
         //EMAIL   
         
        if (email === '') {
            setMessEmail('This filed is required!')
            
        } else if(email!==''&& isBool==null) {
            setMessEmail('Email is invalid!')
            
        }else{
            setMessEmail('')
            const token =Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('token',token)
            const isToken = localStorage.getItem('token')
            console.log(isToken);
            if(isToken !==null){
                navigate('/User')
            }
        }
  
    }
    
    return (
        <div className='login-form'>
            <div className='login-form__logo'>
                <img src={logo} alt='' />
            </div>
            <div className='login-form__admin'>
                <span>Wellcome to Besolution</span>
            </div>
            <div className='login-form__process'>
                <form onSubmit={handelOnsubmit} >

                    <input name="email"
                        onChange={e =>setEmail(e.target.value)}
                        value={email}
                    />
                    <p className='mess'>{messEmail}</p>
                 
                    <input type='submit'   value='GO' />
                </form>
            </div>
        </div>
    )
}

export default Login