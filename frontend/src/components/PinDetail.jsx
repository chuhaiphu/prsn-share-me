import React, { useEffect, useRef, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import api from '../utils/base';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from './Pin';

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState();
  const [userCreated, setUserCreated] = useState(null);
  const [comment, setComment] = useState('');
  const [pinComments, setPinComments] = useState([]);
  const [userCommented, setUserCommented] = useState([]);
  const [addingComment, setAddingComment] = useState(false);

  const commentContainerRef = useRef(null);

  const fetchPinDetails = async () => {
    try {
      const pinResponse = await api.get(`/pin/${pinId}`);
      const pinData = pinResponse.data;
      setPinDetail(pinData);

      const morePinsResponse = await api.get(`/pin/category/${pinData.category}`);
      setPins(morePinsResponse.data.filter(pin => pin.pinId !== pinId));

      const userResponse = await api.get(`/user/${pinData.userId}`);
      setUserCreated(userResponse.data);

      const commentsResponse = await api.get(`/comment/pin?pinId=${pinId}`);
      const commentsData = commentsResponse.data;
      setPinComments(commentsData);

      const userResponseList = await Promise.all(
        commentsData.map(async (comment) => {
          const response = await api.get(`/user/${comment.userId}`);
          return response.data;
        })
      );

      setUserCommented(userResponseList);
    } catch (error) {
      console.error('Error fetching pin details:', error);
    }
  };


  useEffect(() => {
    fetchPinDetails();
  }, [pinId])

  useEffect(() => {
    if (commentContainerRef.current) {
      commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight;
    }
  }, [pinComments])

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      const commentObject = {
        comment: comment,
        userId: user.userId,
        pinId: pinId,
      }
      console.log(commentObject)
      api.post(`/comment`, commentObject)
        .then((response) => {
          console.log(response)
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  const downloadImage = async (imageUrl) => {
    const imageUrlParts = imageUrl.split('/');
    const bucketName = imageUrlParts[2].split('.')[0]; // Extract bucket name
    const objectKey = decodeURIComponent(imageUrlParts.slice(3).join('/')); // Extract object key
        
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
    });

    try {
      const response = await s3Client.send(command);
      const blob = await response.Body.transformToByteArray();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", objectKey.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };


  if (!pinDetail) {
    return (
      <Spinner message="Showing pin" />
    );
  }

  return (
    <>
      {pinDetail && (
        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={pinDetail?.imageUrl}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(pinDetail.imageUrl);
                  }}
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </button>
              </div>
              <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                {pinDetail.destination?.slice(0)}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.about}</p>
            </div>
            <Link to={`/user-profile/${pinDetail?.userId}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={userCreated?.imageUrl} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{userCreated?.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto" ref={commentContainerRef}>
              {pinComments.map((comment, index) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={comment.commentId}>
                  <img
                    src={userCommented[index]?.imageUrl}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{userCommented[index]?.userName}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user?.userId}`}>
                <img src={user?.imageUrl} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Doing...' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;