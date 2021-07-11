import React, { useState } from "react";

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
    <div className="submit-form">
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
      <button onClick={login} className="btn btn-success">
        Login
      </button>
    </div>
  );
};

export default Login;
