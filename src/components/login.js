import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const Login = (props) => {
  const initialUserState = {
    name: "",
    id: ""
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (e) => {
    /* destructuring assignment equivalents */
    /* `const name = e.target.name` */
    /* `const value = e.target.value` */
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    /* call the parent calback login function using props */
    /* send the  user data from child component to parent component */
    props.login(user);
  };

  return (
    <div>
      <Container maxWidth="sm">
        {/* Box能封装组件，创建一个新的DOM元素,此处为form */}
        {/*  justyfy="center"控制login form items水平居中, alignItems="center"控制login form items垂直居中 */}
        <Grid
          containersm
          spacing={2}
          justify="center"
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <div className="form-group">
              <label htmlFor="user">Username</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={user.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
          </Grid>
          <Grid item>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                type="text"
                className="form-control"
                onChange={handleInputChange}
                name="id"
                value={user.id}
                required
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={login}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
