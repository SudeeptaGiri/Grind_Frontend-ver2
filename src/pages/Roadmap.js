import React, { useContext } from 'react'
import { Progress } from 'semantic-ui-react'

import { AuthContext } from '../context/auth';
import Sidebar from '../components/Sidebar';
import Title from '../components/ui/Title'
import {Check} from '../components/Check';

import { createContext } from 'react';
import { useState } from 'react';

function formatDate(date) {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  
  const formattedDate = `${day} ${months[monthIndex]} ${year}`;
  return formattedDate;
}

const currentDate = new Date();

export const Context = createContext();

function Roadmap() {

  const [isPro, setIsPro] = useState(0);

    const { user } = useContext(AuthContext);
      let progress = isPro

    return (
      <Context.Provider value={{isPro, setIsPro}}>
      <div className={`min-h-screen text-neutral-400 bg-slate-950 flex`}>
        <Sidebar />
        <main className="w-full lg:w-4/5 grid grid-cols-[0.7fr_0.3fr] bg-slate-50 rounded-3xl overflow-hidden m-5">
          <div className="px-16 py-10 flex flex-col gap-7">
            <div className="">
              <Title size="sm" className="text-slate-800">
                Roadmap
              </Title>
              <h5 className="text-sm">01 - {formatDate(currentDate)}</h5>
            </div>

            <div className="">
              <h5 className="font-bold text-neutral-600 mb-2">
                Learning Forward Defence
              </h5>
              <Progress percent={progress} progress color='black' />
            </div>

            <div className="grid gap-4 relative">
              <div className="space-y-1">
                <h5 className="text-lg font-bold text-neutral-700">Scheduled Tasks</h5>
                <hr />
              </div>
              <Check />
            </div>
          </div>

          <div className="bg-slate-100 py-10 px-6">
            <Title size="xs">Grind Coaches</Title>
            <div className="grid grid-cols-1 gap-y-10 mt-4">
              <div className="bg-white rounded-lg py-2 px-4 grid">
                <div className="flex items-center gap-4">
                  <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png" className="w-14 h-14 rounded-full bg-slate-200" alt="profile_coach"></img>
                  <div className="flex flex-col">
                    <h5 className="font-bold text-neutral-700">Sameer Kumar Patra</h5>
                    <span className="text-sm text-neutral-600">Mentor</span>
                    <small className="">Member since 2 yrs</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </Context.Provider>
    );
  }
  
  export default Roadmap