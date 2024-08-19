import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom'

import { Feed, Navbar, PinDetail, CreatePin, Search } from '../components'
const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryName" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinDetail user={user} />} />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Pins