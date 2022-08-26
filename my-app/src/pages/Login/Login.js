import React from 'react'
import { useForm } from "react-hook-form";
import logo from '../../assets/images/icon-librarynode.png'
import './Login.scss'

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it
    return (
        <div className='login-form'>
            <div className='login-form__logo'>
                <img src={logo} alt='' />
            </div>
            <div className='login-form__admin'>
                <span>Wellcome to Besolution</span>
            </div>
            <div className='login-form__process'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input defaultValue="" {...register("email")} />

                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}
                    {/* register your input into the hook by invoking the "register" function */}
                    <input defaultValue="" {...register("password")} />

                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}

                    <input type="submit" value='Login' />
                </form>
            </div>
        </div>
    )
}

export default Login