import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import Swal from 'sweetalert2';

import api from '../utils/base';

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
export const s3Client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  }
});

const Pin = ({ pin }) => {
  const [userCreated, setUserCreated] = useState(null);
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const { userId, imageUrl, pinId, destination } = pin;

  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${userId}`);
        setUserCreated(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const deletePin = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this pin.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/pin/${id}`)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'The pin has been deleted.',
              'success'
            ).then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
          })
          .catch((error) => {
            console.error('Error deleting pin:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the pin.',
              'error'
            );
          });
      }
    });
  };

  const [alreadySaved, setAlreadySaved] = useState(pin?.saveDTOs?.some((save) => save?.userId === user?.sub));
  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true);
      const newSave = {
        userId: user.sub,
        pinId: id
      };
      api.post(`/save`, newSave)
        .then((response) => {
          console.log(response)
          setAlreadySaved(true);
          setSavingPost(false);
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

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => {
          console.log(pinId);
          navigate(`/pin-detail/${pinId}`)
        }}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {imageUrl && (
          <img className="rounded-lg w-full h-full" src={imageUrl} alt="user-post" />)}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(imageUrl);
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </button>
              </div>
              {alreadySaved ? (
                <button type="button" className="bg-red-500 opacity-80 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  {pin?.save?.length}  Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(pinId);
                  }}
                  type="button"
                  className="bg-red-500 opacity-80 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-80 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  <span>Source</span>
                </a>
              )}
              {userId === user.sub && (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(pinId);
                  }}
                  className="bg-white p-2 opacity-80 hover:opacity-100 text-dark font-bold text-base rounded-3xl hover:shadow-md outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`/user-profile/${userId}`} className="flex gap-2 mt-2 items-center">
        <img src={userCreated?.imageUrl} alt="user-profile" className="w-8 h-8 rounded-full object-cover" />
        <p className="font-semibold capitalize">{userCreated?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;