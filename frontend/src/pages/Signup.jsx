import React from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'

const Signup = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-gray-200'>
        <div className='mx-4 w-full h-fit sm:mx-0 sm:w-1/2  md:w-1/4 flex flex-col items-center justify-center bg-white p-4 rounded-lg'>
            <div className='mb-6 flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold'>Sign Up</h1>
                <p className='text-center text-md text-gray-600 mt-2 mx-4'>Enter your information to create an account</p>
            </div>
            <InputField type="text" placeholder="First Name" onChange={() => {}} label="First Name"/>
            <InputField type="text" placeholder="Last Name" onChange={() => {}} label="Last Name"/>
            <InputField type="email" placeholder="Email" onChange={() => {}} label="Email"/>
            <InputField type="password" placeholder="Password" onChange={() => {}} label="Password"/>
            <Button label={"Sign Up"} onClick={()=> {}}/>
        </div>

    </div>

  )
}

export default Signup