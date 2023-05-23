import React, { useContext } from 'react'

import { AuthContext } from '../context/auth';
import Sidebar from '../components/Sidebar';
import { MdCalendarMonth, MdNotificationsNone, MdOutlineMessage, MdPeople } from 'react-icons/md';
import Title from '../components/ui/Title';
import Button from '../components/ui/Button';
import Post from '../components/Post';
import moment from 'moment';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';


export default function Community() {

    const { user } = useContext(AuthContext);
    const { loading, data} = useQuery(FETCH_POSTS_QUERY);

    // If the posts field is undefined, then the below statement will 
    // set it to "null", or set the value accordingly. Hence preventing errors.
    
    if(loading) {
        return <div>Loading profile data...</div>;
    } 

    const posts = data?.getPosts;   

    return (
        <div className={`min-h-screen text-neutral-400 bg-slate-950 flex`}>
            <Sidebar />
            <main className="w-full lg:w-4/5 grid grid-cols-[0.7fr_0.3fr] bg-slate-50 rounded-3xl overflow-hidden m-5">
                <>
                    <div className="relative px-16 py-10 flex flex-col gap-7">
                        <div className="grid place-items-center gap-4 bg-violet-200 p-4 rounded-xl">
                            <p>Looking forward to host an event? Let others know!</p>
                            <Post />
                        </div>
                        <div>
                            <hr />
                        </div>
                        <div className="grid gap-6">                            
                            {posts.map((data, i) => (
                                <Container key={i} data={data} />
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-100 py-10 px-6">
                        <Title size="xs">Popular Events</Title>

                        <div className="grid grid-cols-1 gap-y-10 mt-4">
                            <div className="bg-white rounded-md py-2 px-4 grid">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <MdCalendarMonth className="text-sm" />
                                        <small className="text-xs">Fri May 26th・9:30 PM</small>
                                    </div>
                                    {/* <Image
                src="/ap.jpeg"
                alt=""
                width={24}
                height={24}
                className="rounded-full"
              /> */}
                                    <div className="flex items-center px-1 bg-slate-200 rounded gap-0.5">
                                        <MdPeople />
                                        <span className="text-sm">5</span>
                                    </div>
                                </div>
                                <h3 className="text-neutral-700 font-medium mt-1">
                                    Weekly Sport Meet
                                </h3>
                                <p className="text-sm">
                                    All things sports chat. Let us know what questions you have, what
                                    you’re grinding on, and how we can support you!
                                </p>
                                <hr className="my-1" />
                                <Button size={"xs"} className="justify-self-end">
                                    <MdNotificationsNone className="text-lg mr-1" />
                                    Interested
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            </main>
        </div>
    );
}


function Container({data}) {
    return (
        <div className="flex gap-0.5 rounded-lg overflow-hidden">
            <div className="p-4 bg-violet-200 grid place-items-center">
                <img
                    src={data.iconUrl}
                    alt=""
                    width={60}
                    height={60}
                    className="rounded-md border"
                />
                <div className="leading-none text-neutral-500 mt-2">
                    <h3 className="text-neutral-700 font-medium mt-1 leading-none">
                        {data.username}
                    </h3>
                    <h4 className="text-sm"></h4>
                    <h5 className="text-xs">{data.email}</h5>
                </div>
            </div>

            <div className="bg-violet-200 p-4 grid text-neutral-500">
                <div className="flex items-center gap-2">
                    <MdCalendarMonth className="text-sm" />
                    <small className="text-xs">{data.eventAt}</small>
                </div>
                <h3 className="text-neutral-700 font-medium mt-1">{data.title}</h3>
                <p className="text-sm">
                    {data.body}
                </p>
                <div className="mt-4 grid grid-flow-col gap-2 items-center">
                    <small className="uppercase text-xs">Posted: {moment(data.createdAt).fromNow(true)}</small>
                    {/* <MdOutlineDone /> */}
                    <Button size={"xs"}>
                        <MdOutlineMessage className="text-lg mr-1 mt-1" /> Chat
                    </Button>
                    <Button size={"xs"}>
                        <MdNotificationsNone className="text-lg mr-1" /> Interested
                    </Button>
                </div>
            </div>
        </div>
    );
}

const FETCH_POSTS_QUERY = gql`
{
  getPosts {
    id 
    body 
    title
    eventAt
    createdAt
    email
    description
    iconUrl 
    username 
    likeCount
    likes {
      username
    }
    commentCount
    comments {
      id 
      username 
      createdAt 
      body
    }
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
  }
}

`