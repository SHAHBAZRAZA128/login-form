import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../common/hooks/useNotification";
import { useFormik } from "formik";
import * as Yup from "yup";
import useHttp from "../common/hooks/useHttp";
import InputField from "../common/components/InputField";

const Login = () => {
  const navigate = useNavigate();
  const notify = useNotification();
  const { sendRequest } = useHttp();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await sendRequest("api/v1/auth/login", "POST", {
          email: values.email,
          password: values.password,
          deviceId: "random-device-id",
          deviceType: "web",
        });

        const { accessToken } = response.data.token;

        localStorage.setItem("accessToken", accessToken);
        notify("Login successful", "success");
        navigate("/dashboard");
      } catch (error) {
        notify(
          error?.response?.data?.message || "Invalid credentials.",
          "error"
        );
      }
    },
  });

  const fields = [
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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md text-center transform hover:scale-105 transition-all duration-300">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Login</h1>
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
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
