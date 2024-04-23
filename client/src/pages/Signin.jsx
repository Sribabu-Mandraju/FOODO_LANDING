import React, { useState, useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
} from "../redux/user/userSlice.js";

const Signin = () => {
  const apiUrl = import.meta.env.VITE_APP_BACKEND_URL;
  console.log("text",apiUrl)
  console.log("error")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);
  // State variables for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handler function to update state when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log("login called");
    // console.log(formData, "form data");
    try {
      console.log(apiUrl,"error")
      dispatch(signInStart());
      const response = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data && !data.success) {
        dispatch(signInFailure(data.message));

        toast.error(data.message);

        return;
      }

      if (data && data.success) {
        dispatch(signInSuccess(data.user));
        toast.success("login successful");
        // console.log(currentUser, "current user");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      //   console.log(error, "error");

      toast.error(error.message);
    }
    // console.log("Form Data:", formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    console.log(currentUser, "currentUser");
    if (currentUser) {
      navigate("/dashboard");
    }
    // console.log(currentUser, "user");
    // console.log(currentUser?.role, "role");
  }, [currentUser, error]);

  return (
    <div className="flex justify-center items-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            {/* {loading ? "Loading..." : "Login"} */}
            Signin
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Signin;
