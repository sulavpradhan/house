import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fromData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = fromData;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // create user in firebase
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });

      const formDataCopy = { ...fromData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      // add to the database
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Can not sign up");
    }
  };

  const formDataHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome!</p>
        </header>

        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            className="nameInput"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => formDataHandler(e)}
          />
          <input
            type="email"
            className="emailInput"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => formDataHandler(e)}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => formDataHandler(e)}
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <OAuth />
        <div>
          <Link to="/sign-in" className="registerLink">
            Sign In Instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
