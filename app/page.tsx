"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { serverCall } from './actions/saveData';
import Link from 'next/link';

const schoolSchema = z.object({
  name: z.string().nonempty({ message: 'School name is required' }),
  address: z.string().nonempty({ message: 'Address is required' }),
  city: z.string().nonempty({ message: 'City is required' }),
  state: z.string().nonempty({ message: 'State is required' }),
  contact: z.string()
    .nonempty({ message: 'Contact is required' })
    .regex(/^[0-9]+$/, { message: 'Contact must be a number' }),
  email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Email must be a valid email address' }),
});

export type FormData = z.infer<typeof schoolSchema>;



const SchoolForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schoolSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async(data) => {
    console.log(data);
    const ans = await serverCall(data)
    console.log(ans)
    if(!!ans)
      alert("Data Saved Successfully")
    else
      alert("Data not saved")
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto p-6 bg-white shadow-md rounded-md border border-gray-200">
      <Link href="/view" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            See School Lists
          </Link>
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">SCHOOLERP - School Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">School Name</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.name ? 'border-red-500' : ''} text-black bg-gray-50`}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              {...register('address')}
              className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.address ? 'border-red-500' : ''} text-black bg-gray-50`}
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              {...register('city')}
              className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.city ? 'border-red-500' : ''} text-black bg-gray-50`}
            />
            {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              id="state"
              {...register('state')}
              className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.state ? 'border-red-500' : ''} text-black bg-gray-50`}
            />
            {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="text"
              id="contact"
              {...register('contact')}
              className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.contact ? 'border-red-500' : ''} text-black bg-gray-50`}
            />
            {errors.contact && <span className="text-red-500 text-sm">{errors.contact.message}</span>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''} text-black bg-gray-50`}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="text-center">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolForm;
