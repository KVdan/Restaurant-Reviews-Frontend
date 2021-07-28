import React, { useState } from "react";

import { Button, Grid, Container } from "@material-ui/core";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import { Avatar, Typography } from "@material-ui/core";

import { GoogleLogin } from "react-google-login";

const Login = (props) => {
  const initialUserState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const [signup, setSignup] = useState(false);
  const [user, setUser] = useState(initialUserState);

  const [showPassword, setShowPassword] = useState(false);
  const clientId =
    "36125227646-l5q19pmpceprd6skrmdqcm7e6a5ucbs9.apps.googleusercontent.com";

  /*
   const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  */

  const googleSuccess = (res) => {
    const token = res?.tokenId;
    const result = res?.profileObj;
    console.log(result);
    localStorage.setItem("profile", JSON.stringify({ ...result, token }));
    props.googleSuccess({
      googleId: result.googleId,
      firstName: result.givenName,
      lastName: result.familyName,
      email: result.email,
      imageUrl: result.imageUrl
    });
  };

  const googleFailure = (res) => {
    console.log("Google Sign In failed. Please try again.");
  };

  const switchMode = () => {
    setSignup((prevSignup) => !prevSignup);
  };

  const handleInputChange = (e) => {
    /* destructuring assignment equivalents */
    /* `const name = e.target.name` */
    /* `const value = e.target.value` */
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signup) {
      handleSignup(user);
    } else {
      handleSignin(user);
    }
  };

  const handleSignup = () => {
    /* call the parent calback login function using props */
    /* send the  user data from child component to parent component */
    props.signup(user);
  };
  const handleSignin = () => {
    /* call the parent calback login function using props */
    /* send the  user data from child component to parent component */
    props.signin(user);
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        {/* Box能封装组件，创建一个新的DOM元素,此处为form */}
        {/*  justify="center"控制login form items水平居中, alignItems="center"控制login form items垂直居中 */}

        {signup && (
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  className="form-control"
                  value={user.firstName}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  required
                  value={user.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>
          </Grid>
        )}

        <Grid item>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              onChange={handleInputChange}
              value={user.email}
              required
            />
          </div>
        </Grid>
        <Grid item>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              onChange={handleInputChange}
              value={user.password}
              required
            />
          </div>
        </Grid>

        {signup && (
          <div>
            <Grid item>
              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  onChange={handleInputChange}
                  value={user.confirmPassword}
                  required
                />
              </div>
            </Grid>
          </div>
        )}

        <Grid item>
          <div>
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google Account"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          {signup ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          )}
        </Grid>
        <Grid container justifycontent="flex-end">
          <Button onClick={switchMode}>
            {signup
              ? "Already have an account? Sign In!"
              : "Don`t have an account? Sign Up!"}
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
