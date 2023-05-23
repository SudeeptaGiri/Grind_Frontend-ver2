import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { Input } from "../components/ui/Input";

function Register(props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    //The below function will be triggered if the mutation is successfully executed

    update(_, result) {
      context.login(result.data.register);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <main className="min-h-screen text-neutral-400 bg-slate-950">
      <div className="flex flex-col h-screen justify-center items-center">
        <img src="/logo.png" width={250} height={100} alt="" className="mb-4" />
        <div className="w-96 grid gap-6 text-center border p-8 rounded-3xl">
          <h3 className="text-3xl font-semibold text-neutral-200">Register</h3>
          <Input type="text" placeholder="Name" name="name" />
          <Input type="email" placeholder="Email" name="email" />
          <Input type="password" placeholder="Password" name="password" />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <Button>Register</Button>
          <small>
            Already Registered?{" "}
            <Link to={"/login"} className="text-violet-500">
              Login here
            </Link>
          </small>
        </div>
      </div>
    </main>
    // <div className="form-container">
    //     <Form onSubmit = {onSubmit} noValidate className={loading ? "loading" : ''}>
    //       <h1>Register</h1>
    //       <Form.Input
    //         label="Username"
    //         placeholder="Username.."
    //         name="username"
    //         type="text"
    //         value={values.username}
    //         error={errors.username ? true : false}
    //         onChange={onChange}
    //       />

    //       <Form.Input
    //         label="Email"
    //         placeholder="Email.."
    //         name="email"
    //         type="email"
    //         value={values.email}
    //         error={errors.email ? true : false}
    //         onChange={onChange}
    //       />
    //       <Form.Input
    //         label="Password"
    //         placeholder="Password.."
    //         name="password"
    //         type="password"
    //         value={values.password}
    //         error={errors.password ? true : false}
    //         onChange={onChange}
    //       />
    //       <Form.Input
    //         label="Confirm Password"
    //         placeholder="Confirm Password.."
    //         name="confirmPassword"
    //         type="password"
    //         value={values.confirmPassword}
    //         error={errors.confirmPassword ? true : false}
    //         onChange={onChange}
    //       />
    //       <Button type = "submit" primary>
    //         Register
    //       </Button>
    //     </Form>
    //     {Object.keys(errors).length > 0 && (
    //       <div className = "ui error message">
    //       <ul className="list">
    //         {Object.values(errors).map(value => (
    //           <li key={value}>{value}</li>
    //         ))}
    //       </ul>
    //     </div>
    //     )}
    // </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
