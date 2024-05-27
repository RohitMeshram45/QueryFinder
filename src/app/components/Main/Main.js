import React, { useContext, useState } from 'react';
import Image from 'next/image';
import GemPersonIcon from '@/app/Images/gemPerson.png';
import CompassIcon from '@/app/Images/compass.png';
import BulbIcon from '@/app/Images/bulb.png';
import MessageIcon from '@/app/Images/message.png';
import CodeIcon from '@/app/Images/code.png';
import GallaryIcon from '@/app/Images/gallary.png';
import MicIcon from '@/app/Images/mic.png';
import SendIcon from '@/app/Images/send.png';
import GeminiIcon from '@/app/Images/gemini.png';

import { Context } from '@/app/context/Context.js';
import Loading from '../Loading/Loading.js';

const Main = (Mode) => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  const [dark, setDark] = useState(false);
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  }
  return (
    <div className={`main min-h-[100vh] w-full pb-[15vh] relative ${dark ? 'bg-gray-900' : "bg-white"}`}>
      <div className="nav flex items-center justify-between p-5 text-xl text-gray-700 font-medium">
        <p className={`${dark ? 'text-gray-100' : "text-gray-100"}`}>Gemini</p>
        <div className='flex gap-5'>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onClick={() => darkModeHandler()} />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>

          <Image className='w-8 rounded-full cursor-pointer' src={GemPersonIcon} alt='Image Person / User' />
        </div>
      </div>
      <div className='main-container max-w-[900px] m-auto'>
        {(!showResult) ?
          <div>
            <div className='greet mt-[50px] mb-[50px] text-5xl text-gray-300 font-medium p-[20px]'>
              <p><span className='bg-gradient-to-r from-cyan-500 to-red-500 bg-clip-text text-transparent'>Hello, Dev</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className='cards grid grid-cols-4 gap-4 p-5'>
              <div className='card h-52 p-4 bg-slate-100 hover:bg-slate-200 rounded-xl relative cursor-pointer'>
                <p className='text-gray-400 text-lg'>Suggest beautiful places to see on the upcoming road trip</p>
                <Image className='w-9 p-1 absolute bg-white rounded-[20px] bottom-2 right-2' src={CompassIcon} alt='cardImage' />
              </div>
              <div className='card h-52 p-4 bg-slate-100 hover:bg-slate-200 rounded-xl relative cursor-pointer'>
                <p className='text-gray-400 text-lg'>Briefly summarize this concept: urban planning</p>
                <Image className='w-9 p-1 absolute bg-white rounded-[20px] bottom-2 right-2' src={BulbIcon} alt='cardImage' />
              </div>
              <div className='card h-52 p-4 bg-slate-100 hover:bg-slate-200 rounded-xl relative cursor-pointer'>
                <p className='text-gray-400 text-lg'>Brainstorm team bonding activities for our work retreat</p>
                <Image className='w-9 p-1 absolute bg-white rounded-[20px] bottom-2 right-2' src={MessageIcon} alt='cardImage' />
              </div>
              <div className='card h-52 p-4 bg-slate-100 hover:bg-slate-200 rounded-xl relative cursor-pointer'>
                <p className='text-gray-400 text-lg'>Improve the readability of the following code</p>
                <Image className='w-9 p-1 absolute bg-white rounded-[20px] bottom-2 right-2' src={CodeIcon} alt='cardImage' />
              </div>
            </div>
          </div>
          :
          <div className='result pt-[5%] pb-[5%] max-h-[70vh]  no-scrollbar overflow-y-scroll'>
            <div className='result-title mr-10 ml-10 flex items-center gap-3'>
              <Image className='rounded-full w-11 ' src={GemPersonIcon} alt='' />
              <p className={`${dark ? 'text-gray-200' : "text-gray-900" }`}>{recentPrompt}</p>
            </div>
            <div className='result-data flex items-start gap-10'>
              <Image className='' src={GeminiIcon} alt='gemini' />
              {
                loading ?
                  // Loading component
                  (<Loading />)
                  :
                  <p className={`mt-10 ${dark ? 'text-gray-100' : "text-gray-900"}`}>{resultData}</p>
              }
            </div>
          </div>
        }

        <div className='main-bottom absolute bottom-0 w-full max-w-[900px] pr-5 pl-5 m-auto'>
          <div className='search-box flex items-center justify-center gap-5 bg-slate-100 rounded-[50px] pr-2 pl-2'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input} 
              className='flex-1 bg-transparent border-none outline-none p-2 text-lg'
              type='text'
              placeholder='Enter the prompt here'
            />
            <div className='flex items-center gap-4'>
              <Image className='w-6 cursor-pointer' src={GallaryIcon} alt='gallary' />
              <Image className='w-6 cursor-pointer' src={MicIcon} alt='micIcon' />
              <Image  onClick={() => onSent()} className='sentIcon w-6 cursor-pointer' src={SendIcon} alt='sendIcon' />
            </div>
          </div>
          <p className={`bottom-info mt-5 mb-4 text-xs text-center font-light ${dark ? "text-gray-100" : "text-gray-900"} `}>
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
