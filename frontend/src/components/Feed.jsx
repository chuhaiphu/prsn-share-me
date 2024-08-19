import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
// ! client is for query data from sanity
import api from '../utils/base'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)
  const { categoryName } = useParams()
  useEffect(() => {
    setLoading(true)
    if(categoryName){
      api.get(`/pin/category/${categoryName}`).then((data) => {
        setPins(data.data)
        setLoading(false)
      });
    }
    else{
      api.get('/pin').then((data) => {
        setPins(data.data)
        setLoading(false)
      })
    }
  }, [categoryName])

  if (loading) return <Spinner message="We are adding new ideas to your feed!"/>
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed