import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/LoadingError/Error";
import signinImg from "../../img/strawberrymoon.jpg";
import signupImg from "../../img/strawberrymoon2.jpg";
import { login, register } from "../../Redux/Actions/UserActions";
import Loading from "./../../components/LoadingError/Loading";
import "./Auth.css";
const Auth = () => {
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false); // signin or signup
  const [data, setData] = useState({
    // init data
    username: "",
    password: "",
    firstname: "",
    lastname: ""
  });

  const handleOnChange = (e) => {
    // onchange input and set data
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      await dispatch(
        register(data.username, data.password, data.firstname, data.lastname)
      );
    } else {
      await dispatch(login(data.username, data.password));
    }
  };

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
    setData({
      username: "",
      password: "",
      firstname: "",
      lastname: ""
    });
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;
  const userLogin = useSelector((state) => state.userLogin);

  return (
    <div className="Auth">
      <div className={`Auth-container ${isSignUp ? "active" : null}`}>
        <div className="user signinBx">
          <div className="imgBx">
            <img src={signinImg} alt="" />
          </div>
          <div className="formBx">
            <form onSubmit={handleSubmit}>
              <h2>Sign In</h2>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleOnChange}
                value={data.username}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleOnChange}
                value={data.password}
              />
              <button
                className="button Auth-button"
                type="submit"
                disable={loading}
              >
                Sign In
              </button>
              <div className="Loading-error">
              {userLogin.error && (
                <Message variant="alert-danger">{userLogin.error}</Message>
              )}
              {userLogin.loading && <Loading />}
              </div>
              <p className="signup">
                Don't have an account ?
                <a onClick={handleToggleForm}> Sign Up.</a>
              </p>
            </form>
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <form onSubmit={handleSubmit}>
              <h2>Create an account</h2>
              <div className="Auth-form-input">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  onChange={handleOnChange}
                  value={data.firstname}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  onChange={handleOnChange}
                  value={data.lastname}
                />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleOnChange}
                value={data.username}
              />

              <input
                type="password"
                name="password"
                placeholder="Create Password"
                onChange={handleOnChange}
                value={data.password}
              />

              <button
                className="button Auth-button"
                type="submit"
                disable={loading}
              >
                Sign Up
              </button>
                <div className="Loading-error">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}
                </div>
              <p className="signup">
                Already have an account ?
                <a onClick={handleToggleForm}> Sign in.</a>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img src={signupImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
