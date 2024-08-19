import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { jwtDecode } from 'jwt-decode';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { useNavigate } from 'react-router-dom';

import api from '../utils/base'

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [isLoading]);

  const responseGoogle = (response) => {
    const userJwtCredential = response.credential;
    console.log(response)
    const userInfo = jwtDecode(userJwtCredential);
    localStorage.setItem('user', JSON.stringify(userInfo));
    const user = {
      userId: userInfo.sub,
      userName: userInfo.name,
      imageUrl: userInfo.picture,
    };  

    setIsLoading(true);

    api.post('/user/login', user)
      .then((response) => {
        console.log(response)
        setIsLoading(false)
        navigate('/', { replace: true })
      })
      .catch((error) => {
        console.error('Error:', error)
        setIsLoading(false)
      });
  };

  return (
    <div className={`flex justify-start items-center flex-col h-screen ${isLoading ? 'blur-sm opacity-50' : ''}`}>
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onError={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState, useEffect } from 'react';
// import { useGoogleLogin } from '@react-oauth/google';
// import { FcGoogle } from 'react-icons/fc';
// import shareVideo from '../assets/share.mp4';
// import logo from '../assets/logowhite.png';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import api from '../utils/base';

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (isLoading) {
//       document.body.style.cursor = 'wait';
//     } else {
//       document.body.style.cursor = 'default';
//     }
//   }, [isLoading]);

//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       console.log(tokenResponse);
//       const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//         headers: {
//           Authorization: `Bearer ${tokenResponse.access_token}`,
//         },
//       });
//       console.log(userInfo);

//       localStorage.setItem('user', JSON.stringify(userInfo.data));

//       const user = {
//         userId: userInfo.data.sub,
//         userName: userInfo.data.name,
//         imageUrl: userInfo.data.picture,
//       };

//       setIsLoading(true);

//       api
//         .post('/user/login', user)
//         .then((response) => {
//           console.log(response);
//           setIsLoading(false);
//           navigate('/', { replace: true });
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           setIsLoading(false);
//         });
//     },
//     onError: (errorResponse) => console.log(errorResponse),
//   });

//   return (
//     <div className={`flex justify-start items-center flex-col h-screen ${isLoading ? 'blur-sm opacity-50' : ''}`}>
//       <div className="relative w-full h-full">
//         <video src={shareVideo} type="video/mp4" controls={false} muted autoPlay className="w-full h-full object-cover"></video>
//         <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
//           <div className="p-5">
//             <img src={logo} width="130px" alt="logo" />
//           </div>
//           <div className="shadow-2xl">
//             <button
//               type="button"
//               className="bg-mainColor"
//               onClick={() => googleLogin()}
//             >
//               <FcGoogle className="mr-4" /> Sign in with Google
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;