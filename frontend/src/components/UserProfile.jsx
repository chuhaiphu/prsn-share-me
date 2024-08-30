import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import api from '../utils/base';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { s3Client } from './Pin';
import { PutObjectCommand } from "@aws-sdk/client-s3";

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const [backgroundImage, setBackgroundImage] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams();
  const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [isLoading]);

  useEffect(() => {
    api.get(`/user/${userId}`).then((data) => {
      setUser(data.data);
      setBackgroundImage(data.data.backgroundImageUrl || '');
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      api.get(`/pin/user?userId=${userId}`).then((pin) => {
        setPins(pin.data);
      });
    } else {
      api.get(`/save/user?userId=${userId}`).then((saveResponses) => {
        const pinIds = saveResponses.data.map((save) => save.pinId);
        const pins = Promise.all(
          pinIds.map(async (pinId) => {
            const response = await api.get(`/pin/${pinId}`);
            return response.data;
          })
        );
        pins.then((data) => {
          setPins(data);
        });
      })
    }
  }, [text, userId]);

  const uploadImage = async (e) => {
    setIsLoading(true);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileName = `${Date.now()}-${selectedFile.name}`;
      const command = new PutObjectCommand({
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
        Key: `backgrounds/${fileName}`,
        Body: selectedFile,
      });

      try {
        await s3Client.send(command);
        const imageUrl = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/backgrounds/${fileName}`;
        await updateBackgroundImage(imageUrl);
      } catch (err) {
        console.error("Error uploading file:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const updateBackgroundImage = async (newImageUrl) => {
    return api.post('/user/update-background', { userId: user.userId, backgroundImageUrl: newImageUrl })
      .then((response) => {
        setBackgroundImage(response.data.backgroundImageUrl);
      })
      .catch((error) => console.error('Error updating background image:', error));
  };

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    console.log(pins)
  }, [pins]);

  if (!user) return <Spinner message="Loading profile" />;
  return (
    <div className={`relative pb-2 h-full justify-center items-center ${isLoading ? 'blur-sm opacity-50' : ''}`}>
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            {backgroundImage ? (
              <img
                className="w-full h-370 2xl:h-510 shadow-lg object-cover"
                src={backgroundImage}
                alt="user-background"
              />
            ) : (
              <div className="w-full h-370 2xl:h-510 shadow-lg flex items-center justify-center bg-gray-200">
                <p className="text-xl text-gray-600">You do not have a background image. Upload now!</p>
              </div>
            )}
            {userId === User.sub && (
              <>
                <label className="absolute top-2 left-2 bg-white p-2 rounded-full cursor-pointer outline-none shadow-md">
                  <input
                    type="file"
                    onChange={uploadImage}
                    className="hidden"
                  />
                  {backgroundImage ? 'Update Background' : 'Upload Background'}
                </label>
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={logout}
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              </>
            )}
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.imageUrl}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === User.sub && (
              <button
                type="button"
                className="flex bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={logout}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>

    </div>
  );
};

export default UserProfile