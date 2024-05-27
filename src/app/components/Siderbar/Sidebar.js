'use client'
import Image from 'next/image'
import React, { useState , useContext} from 'react'
import MenuIcon from "@/app/Images/menu.png"
import PlusIcon from "@/app/Images/plus.png"
import MessageIcon from "@/app/Images/message.png"
import HelpIcon from "@/app/Images/help.png"
import HistoryIcon from "@/app/Images/history.png"
import SettingIcon from "@/app/Images/setting.png"
import { Context } from '@/app/context/Context'

const Sidebar = () => {

  const [extended, setExtended] = useState(false)
  const {onSent , prevPrompt , setRecentPrompt , newChat} = useContext(Context)

  const  loadPrompt = async (prompt)=>{
    setRecentPrompt(prompt)
   await onSent(prompt)
  }

  return (
    <div className='sidebar inline-flex flex-col justify-between min-h-[100vh] p-[25px 15px] pl-6 pr-6 pt-4 pb-4 bg-slate-100 font-[outfit]'>
      <div className='top'>
        <Image className='menu w-5 block ml-2 cursor-pointer' src={MenuIcon} alt='Image' onClick={() => setExtended(prev => !prev)} />
        <div onClick={()=> newChat()} className='new-chat mt-12  inline-flex items-center p-[4px] bg-slate-200 rounded-[50px] text-sm text-gray-600 cursor-pointer'>
          <Image className='w-5 mr-2 ml-2' src={PlusIcon}  alt='newChatIcon'/>
          {extended ? <p>new chat</p> : null}
        </div>
        {
          extended ? <div className='recent flex flex-col '>
            <p className='recent-title m-5 mb-5'>Recent</p>
            {
              prevPrompt.map((item , index)=>{
                 return (
                   <div onClick={()=> loadPrompt(item)} className='recent-entry flex items-start p-2 pr-10 rounded-[50px] text-gray-700 cursor-pointer hover:bg-slate-100'>
                     <Image className='w-5' src={MessageIcon} alt='MessageIcon'/>
                     <p>{item.slice(0,8)}... </p>
                   </div>
                 )
              })
            }
          </div>
            : null
        }

      </div>
      <div className='bottom flex flex-col'>
        <div className='bottom-item flex pr-10 recent-entry mt-2'>
          <Image className='w-5 mr-3' src={HelpIcon}  alt='Helpicon'/>
          {extended ? <p>Help</p> : null}
        </div>
        <div className='bottom-item flex  pr-10 recent-entry mt-2'>
          <Image className='w-5 mr-3' src={HistoryIcon} alt='HistoryIcon'/>
          {extended ? <p>history</p> : null}
        </div>
        <div className='bottom-item flex pr-10 recent-entry mt-2'>
          <Image className='w-5 mr-3' src={SettingIcon} alt='Setting icon' />
          {extended ? <p>setting</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
