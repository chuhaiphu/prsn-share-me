import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 2,
  500: 1
}

const MasonryLayout = ({ pins }) => {
  return (
    <div>
      <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
        {pins?.map((pin) => <Pin key={pin.pinId} pin={pin} className="w-max"/>)}
      </Masonry>
    </div>
  )
}

export default MasonryLayout