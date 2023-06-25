import React, { useState } from "react";
import "./signin.css";
import { logoSignin } from "../../images/index";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const Register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((err) =>
        setError(err.message.slice(err.message.indexOf("("), -1))
      );
  };
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) =>
        setError(err.message.slice(err.message.indexOf("("), -1))
      );
  };

  return (
    <section className="signin">
      <div>
        <img src={logoSignin} alt="logo-signin" />
        <form>
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

export default Signin;
