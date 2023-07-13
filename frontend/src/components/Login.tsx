import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
    // Set the value of isLogin based on your logic
    const isLogin = true;

    return (
        <>
            <Header isLogin={isLogin} />
            <h1>Login Page</h1>
            <Footer />
        </>
    );
}
