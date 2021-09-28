import React from "react";
import "./Login.css";
import logo from "./logo.png";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import ut from "../../app/utils/utils";

import { auth, provider, signInWithRedirect } from "../../firebase";
// import {
//   getAuth,
//   getRedirectResult,
//   GoogleAuthProvider,
//   signInWithRedirect,
//   signInWithPopup
// } from "firebase/auth";

import { signInWithPopup } from "firebase/auth";

function Login(props) {
  const dispatch = useDispatch();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        const userInfo = {
          userName: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        };
        dispatch({
          type: "user/addUser",
          payload: userInfo,
        });
        ut.setCookie("username", userInfo?.userName, 10);
        ut.setCookie("email", userInfo?.email, 10);
        ut.setCookie("avatar", userInfo?.avatar, 10);
      })
      .catch((error) => {
        alert(error.message);
      });
    // const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    // signInWithRedirect(auth, provider)
    //   .then((result) => {
    //     console.log(result);
    //     // This gives you a Google Access Token. You can use it to access Google APIs.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;

    //     // The signed-in user info.
    //     const user = result.user;
    //     dispatch({ type: "addUser", payload: user });
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  };
  return (
    <div className="login">
      <div className="login-card">
        <div className="img-container">
          <img src={logo} alt="logo" />
        </div>

        <h2>Welcome to Youtube</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Divider style={{ width: "90%" }} />
        </div>

        <div className="button">
          <Button
            onClick={signIn}
            variant="contained"
            style={{ backgroundColor: "red" }}
            startIcon={<GoogleIcon />}
          >
            Login With Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
