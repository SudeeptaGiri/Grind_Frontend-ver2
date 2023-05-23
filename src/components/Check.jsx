import React, { useContext } from "react";
import { useState } from "react";
import { MdNavigateBefore } from "react-icons/md";
import Button from "./ui/Button";
import { AuthContext } from '../context/auth';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { Context } from "../pages/Roadmap";






function Check() {

  const { setIsPro } = useContext(Context);

  const [lists, setLists] = useState([
    {
      "isChecked": true,
      "taskName": "Improve reaction time by predicting baller's movement",
      "id": 1,
    },
    {
      "isChecked": true,
      "taskName": "Work on footwork and agility exercises",
      "id": 2,
    },
    {
      "isChecked": false, "taskName": "Do shadow practice for 15 minutes",
      "id": 3
    },
    {
      "isChecked": false,
      "taskName": "Read about techniques used in forward defense for 10 minutes",
      "id": 4
    },
    {
      "isChecked": false, "taskName": "Train to judge the ball speed",
      "id": 5
    },
    {
      "isChecked": false,
      "taskName": "Focus on proper timing of shot execution",
      "id": 6
    },
    {
      "isChecked": false,
      "taskName": "Work on fitness exercises for 20 minutes",
      "id": 7
    },
    {
      "isChecked": false,
      "taskName": "Analyze game footage of other batsman",
      "id": 8
    },
    {
      "isChecked": false,
      "taskName": "Practice against a bowling machine",
      "id": 9
    },
    {
      "isChecked": false,
      "taskName": "Analyze video footage of your batting",
      "id": 10
    }
  ]);

  function changeClickMark(index) {
    console.log(index);
    if (!lists[index].isChecked) {
      const updatedLists = [...lists];
      updatedLists[index].isChecked = true;
      setLists(updatedLists);
      countCheckedItems(updatedLists);
    } else {
      const updatedLists = [...lists];
      updatedLists[index].isChecked = false;
      setLists(updatedLists);
      countCheckedItems(updatedLists);
    }
  }

  function countCheckedItems() {

    var co = 7;
    if(!lists) return 0;
    lists.forEach(element => {
      element.isChecked ? co++ : co--;
    });
    console.log("Counting checked:", co);
    return 10 * co;
  }

  setIsPro(countCheckedItems());

  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(GET_USER_QUERY, {
    variables: { username: "Aparesh" }
  });

  var currUser = "null";
  if (!loading) {
    currUser = data?.getUser;
  }

  var imgSrc = "";
  if (currUser) {
    if (!currUser.iconUrl) {
      imgSrc = "https://react.semantic-ui.com/images/avatar/large/matthew.png"
    } else {
      imgSrc = currUser.iconUrl;
    }
  }

  const [index, setIndex] = useState(0);

  const prevNext = (direction) => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + direction * 3;
      if (newIndex >= 0 && newIndex < lists.length) {
        return newIndex;
      } else {
        return prevIndex;
      }
    });
  };

  return (
    <>
      <ul className="grid gap-4">
        {lists.slice(index, index + 3).map((list) => (
          <li key={list.taskName} className="px-4 h-fit py-2 rounded-lg bg-violet-200">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <img src="/chatgpt.jpg" className="w-10 h-10 rounded-full bg-slate-200" alt="gpt_logo"/>
                <div>
                  <h6 className="text-neutral-600 font-semibold">{list.taskName}</h6>
                  <small className="text-neutral-500">Suggested: {Math.floor(Math.random() * (30 - 10 + 1)) + 10} mins </small>
                </div>
              </div>
              {/* <Checkbox className="w-6 h-6" /> */}
              <input type="checkbox" checked={list.isChecked} name="" id="" className="h-6 w-6" onClick={() => changeClickMark(list.id - 1)} />
            </div>
          </li>
        ))}
      </ul>
      <div className=" h-fit justify-self-end content-end flex items-center gap-4">
        <Button onClick={() => prevNext(-1)} className="opacity-70"><MdNavigateBefore className="text-2xl" /></Button>
        <Button onClick={() => prevNext(1)} className="lg:px-6">
          Next
        </Button>
      </div>
    </>
  );
};

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

// export default Check;


export { Check };