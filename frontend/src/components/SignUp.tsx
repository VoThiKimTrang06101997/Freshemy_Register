import React, { FC, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../hooks/hooks";

import { Register } from "../types/auth";
// import { AppDispatch } from "../redux/store";
import { useAppDispatch } from "../hooks/hooks";

// import Footer from "./Footer";
import Header from "./Header";
import { register } from "../redux/slice/auth.slide";

const SignUp: FC = () => {
    const isLogin = useAppSelector((state) => state.authSlice.isLogin);

    const [isRegistered, setIsRegistered] = useState(false);

    const dispatch = useAppDispatch();

    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");

    if (isLogin) {
        return <Navigate to="/" />;
    }

    const initialValues: Register = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
    };

    const registerValidationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
    });

    const handleOnSubmit = async (values: Register) => {
        try {
            // await (dispatch as AppDispatch)(register(values));
            
            await dispatch(register(values) as any);

            setIsRegistered(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header isLogin={isLogin} />

            <div className="container">
                <div className="flex py-5">
                    <div className="w-2/3 bg-[#F7F1DD]">
                        <h1 className="text-center text-4xl text-black-500 font-bold mb-8">SIGN UP</h1>

                        {isRegistered && (
                            <div className="bg-green-200 text-green-800 p-4 mb-4">
                                Registration successful! You can now log in.
                            </div>
                        )}

                        <Formik
                            initialValues={initialValues}
                            validationSchema={registerValidationSchema}
                            onSubmit={handleOnSubmit}
                        >
                            <Form>
                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    >
                                        Email
                                    </label>
                                    <Field
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="span"
                                        className="text-red-500 text-xs italic"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="password"
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    >
                                        Password
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="span"
                                        className="text-red-500 text-xs italic"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    >
                                        Confirm Password
                                    </label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="span"
                                        className="text-red-500 text-xs italic"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="firstName"
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    >
                                        First Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                    />
                                    <ErrorMessage
                                        name="firstName"
                                        component="span"
                                        className="text-red-500 text-xs italic"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="lastName"
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    >
                                        Last Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                    />
                                    <ErrorMessage
                                        name="lastName"
                                        component="span"
                                        className="text-red-500 text-xs italic"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        // onClick={() => handleOnSubmit(values)}
                                    >
                                        Create an account
                                    </button>
                                    <p className="text-gray-500 text-xs">
                                        Already have an account?{" "}
                                        <Link to="/login" className="text-blue-500">
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </Formik>
                    </div>

                    <div className="w-1/3">
                        <h1>222</h1>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </>
    );
};

export default SignUp;

// function dispatch(
//     arg0: (dispatch: import("redux").Dispatch<import("redux").AnyAction>, getState: () => any) => Promise<void>
// ) {
//     throw new Error("Function not implemented.");
// }
