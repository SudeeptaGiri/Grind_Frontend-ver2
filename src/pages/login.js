import React, { useContext, useState } from 'react'
import { Form, Button } from 'semantic-ui-react';
import {Link, useNavigate} from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../context/auth';
import { Input } from '../components/ui/Input';

function Login(props) {

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value})
  }

  


  const [loginUser, {loading }] = useMutation(LOGIN_USER, {
    //The below function will be triggered if the mutation is successfully executed
    
    update(_, result) {
      console.log(result.data.login);
      context.login(result.data.login);
      
      navigate("/select");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  })

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser();
  }

  return (
    <main className="min-h-screen text-neutral-400 bg-slate-950">
      <div className="flex flex-col h-screen justify-center items-center">
        <img src="/logo.png" width={250} height={100} alt="" className="mb-4" />
        <form onSubmit = {onSubmit} className={`${loading ? "loading" : ''} w-96 grid gap-6 text-center border p-8 rounded-3xl`}>
          <h3 className="text-3xl font-semibold text-neutral-200">Login</h3>
          <Input type="text" placeholder="Username" name="username" value={values.username} error={errors.username ? true : false} onChange={onChange} />
          <Input type="password" placeholder="Password" name="password" value={values.password} error={errors.password ? true : false} onChange={onChange} />
          <Button type="submit" primary>Login</Button>
          <small>
            New User?{" "}
            <Link to="/register" className="text-violet-500">
              Register here
            </Link>
          </small>
        </form>
        {Object.keys(errors).length > 0 && (
          <div className = "ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
        )}
      </div>
    </main>
  );
}

const LOGIN_USER = gql `
  mutation login ( $username: String!, $password: String!) {
    login(username: $username, password: $password){
      id
      email
      username
      createdAt
      token
    }
  }
`

const GET_USER_QUERY = gql`
query($username: String!) {
  getUser(username: $username) {
    username
    createdAt
    email
    id
    description
    iconUrl
    aiScore
    progress
    taskList
      {
        taskName isChecked
      }
  }
}

`

export default Login