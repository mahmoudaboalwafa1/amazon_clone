import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase Auth
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import "./signin.css";
import { logoSignin } from "../../images/index";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // create User Method
  const Register = (e) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((err) =>
        setError(err.message.slice(err.message.indexOf("("), -1))
      );
  };
  // Sigin User Method
  const signIn = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) =>
        setError(err.message.slice(err.message.indexOf("("), -1))
      );
  };

  // Start SignIn Page
  return (
    <section className="signin">
      <div>
        <img src={logoSignin} alt="logo-signin" />
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="container">
            <h2>Sign In</h2>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              autoComplete="false"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign in</button>
            <p>
              By continuing, you agree to Amazon's Fake Clone Conditions of Use
              and Privacy Notice.
            </p>
            <button onClick={Register}>Create your Amazon Account</button>
            <p>{error}</p>
          </div>
        </form>
      </div>
    </section>
  );
};
// End SignIn Page

export default Signin;
