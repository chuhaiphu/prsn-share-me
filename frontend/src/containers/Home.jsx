import React, { useState, useRef, useEffect } from 'react'
import { Link, Route, Router, Routes } from 'react-router-dom'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'

import { Sidebar, UserProfile } from '../components'
// ! client is use to query data from sanity
import api from '../utils/base'
import { fetchUser } from '../utils/fetchUser'
import logo from '../assets/logo.png'
import Pins from './Pins'

const Home = () => {
  // * component state
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  // * end of component state

  const scrollRef = useRef(null)
  const userInfo = fetchUser()
  const fetchUserData = async () => {
    try {
      const userResponse = await api.get(`/user/${userInfo.sub}`);
      const userData = userResponse.data;
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    if (userInfo && userInfo.sub) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer"
            onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          {user && (
            <Link to={`user-profile/${user.userId}`}>
              <img src={user.imageUrl} alt="logo" className="w-9 h-9 rounded-full" />
            </Link>
          )}
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer"
                onClick={() => setToggleSidebar(false)} />
            </div>
            {/* {user && user} ==> if user exists, user={user}, else user={false} */}
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home