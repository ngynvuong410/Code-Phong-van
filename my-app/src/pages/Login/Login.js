import React, { useState } from 'react'

import logo from '../../assets/images/icon-librarynode.png'
import './Login.scss'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [messEmail, setMessEmail] = useState('')
    const [messPassword, setMessPassword] = useState('')
   

    const handleOnChange = (e) => {

        const { name, value } = e?.target
        if (name == 'email') {
            setEmail(value)
        } else {
            setPassword(value)
        }
    }
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
        }
        //PASSWORD
        if(password ===''){
            setMessPassword('This filed is required!')
       
        }else{
            setMessPassword('')
        }
       if(messEmail==''&&messPassword==''&&email!==''&&password!==''){
     
        localStorage.setItem('user', JSON.stringify({email,password}));
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
                        onChange={e => handleOnChange(e)}
                        value={email}
                    />
                    <p className='mess'>{messEmail}</p>
                    <input name="password"
                        onChange={e => handleOnChange(e)}
                        value={password}
                    />
                    <p className='mess'>{messPassword}</p>
                    <input type='submit' defaultValue='Login' />
                </form>
            </div>
        </div>
    )
}

export default Login