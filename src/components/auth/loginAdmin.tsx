import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../axios/axios";

const LoginAdmin: React.FC = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const navigate=useNavigate()
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit:async (values) => {
        try {
            const res=await api.post('/admin/login',values);
         
        
        if(res.data?.success){
            
          const {user,token}=res?.data;
          localStorage.setItem('adminId',user.id)
          localStorage.setItem('token',token)
          toast.success("welcome admin");
          

           
          
        }
       
        navigate('/home');

      } catch (error:any) {
        console.log(error)
        toast.error(`inncorrect username/password`)
      }

    },
  });
  


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
    //   style={{
    //     backgroundImage: `url(${bgimg})`,
    //   }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          
        </form>
        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Back to{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Candidate?
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default LoginAdmin;