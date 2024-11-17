import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../common/hooks/useNotification";
import { useFormik } from "formik";
import * as Yup from "yup";
import useHttp from "../common/hooks/useHttp";
import InputField from "../common/components/InputField";

const Signup = () => {
  const navigate = useNavigate();
  const notify = useNotification();
  const { sendRequest } = useHttp();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await sendRequest("api/v1/auth/register", "POST", {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          consent: true,
        });

        if (response) {
          notify("Signup successful. Please login.", "success");
          navigate("/login");
        }
      } catch (error) {
        notify(error?.message || "Error during signup.", "error");
      }
    },
  });

  const fields = [
    {
      name: "firstName",
      type: "text",
      placeholder: "First Name",
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-all duration-300">
        <h1 className="text-4xl font-semibold text-center text-purple-900 mb-6">
          Sign Up
        </h1>
        <form onSubmit={formik.handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-6">
              <InputField
                type={field.type}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={field.placeholder}
                error={formik.errors[field.name]}
                touched={formik.touched[field.name]}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-600 hover:text-purple-700 cursor-pointer"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
