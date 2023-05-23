import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../context/auth';

export default function Sidebar() {

    const { user } = useContext(AuthContext);

    const {loading, data} = useQuery(GET_USER_QUERY, {
        variables: { username: (user ? user.username : "Aparesh") }
    });

    if (loading || !data.getUser) {
        return <div>Loading profile data...</div>;
      }
     
    var imgSrc = data.getUser.iconUrl || 'https://react.semantic-ui.com/images/avatar/large/matthew.png';



    return (
        <div className="p-6 z-10 lg:p-8 lg:w-1/5 bg-slate-950 h-full max-lg:absolute">
            <div className="fixed">
                <div className="">
                    <img
                        src={data.getUser.iconUrl}
                        alt="proile_img"
                        className="border rounded-2xl"
                        width={100}
                        height={100}
                    />
                    <h3 className="text-2xl text-neutral-200 font-semibold mt-2">
                        {data.getUser.username}
                    </h3>
                    <h6>{data.getUser.email}</h6>
                </div>
                <Nav />

            </div>
            <Link to="/" className="mt-8 fixed bottom-4 mx-4">
                <img src="/logo.png" alt="" className="w-32" />
            </Link>
        </div>
    );
}

const GET_USER_QUERY = gql`
query($username: String!) {
  getUser(username: $username) {
    username
    createdAt
    email
    id
    description
    iconUrl
  }
}

`