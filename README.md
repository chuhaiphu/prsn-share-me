<div align="center">
  <h1 align="center">SHARE IMAGE</h1>
  <h3>The image sharing platform</h3>

<img src="frontend/public/favicon.png" alt="Papermark" style="width:80px;height:80px"></a>

</div>

Share Image is a platform for user to post, download image, view and comment on other user's image. User use Google account to login.
## Main Features

- **Shareable Image:** Upload your image to platform, view images and search images by categories.
- **Image Interaction:** Post comments on other users images, download images and save images to view later.
- **User Interaction:** View other users homepage, their uploaded images and save images.


## Demo

<img src="public/Demo 1.gif" width="840" alt="Demo GIF">
<img src="public/Demo 3.gif" width="840" alt="Demo GIF">
<img src="public/Demo 2.gif" width="840" alt="Demo GIF">
<img src="public/Demo 4.gif" width="840" alt="Demo GIF">

## Tech Stack

<table>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring-boot&logoColor=white" alt="Spring Boot" width="140" height="40"/>
    </td>
    <td>
      <b>Spring Boot:</b> Main backend framework for RESTful APIs and Database ORM.
    </td>
  </tr>
    <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL" width="140" height="40"/>
    </td>
    <td>
      <b>PostgreSQL:</b> Robust relational database for efficient data storage and management.
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" alt="React" width="140" height="40"/>
    </td>
    <td>
      <b>React:</b> Frontend library for building interactive UI components and managing the view layer.
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" width="140" height="40"/>
    </td>
    <td>
      <b>Tailwind CSS:</b> Utility-first CSS framework for styling frontend components with responsive design.
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/AWS_S3-569A31?style=flat&logo=amazon-s3&logoColor=white" alt="AWS S3" width="140" height="40"/>
    </td>
    <td>
      <b>AWS S3:</b> Cloud storage service for scalable and reliable image storage and retrieval.
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Google_Auth-4285F4?style=flat&logo=google&logoColor=white" alt="Google Auth" width="140" height="40"/>
    </td>
    <td>
      <b>Google Auth:</b> Authentication system allowing users to log in with their Google accounts.
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker" width="140" height="40"/>
    </td>
    <td>
      <b>Docker:</b> Containerization platform ensuring consistency across development.
    </td>
  </tr>
    <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white" alt="Netlify" width="140" height="40"/>
    </td>
    <td>
      <b>Netlify:</b> Platform for continuous deployment and hosting of the frontend application.
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white" alt="Render" width="140" height="40"/>
    </td>
    <td>
      <b>Render:</b> Cloud platform for deploying and hosting backend the application.
    </td>
  </tr>
</table>



## Getting Started

### Prerequisites

Here's what you need to be able to run Share Image:

- Java Development Kit (JDK) 17 or later
- Maven
- Node.js (version >= 18)
- PostgreSQL Database
- AWS account for S3 bucket access
- Docker Desktop

### 1. Clone the repository

```shell
git clone https://github.com/chuhaiphu/prsn-share-me
```

### 2. Install dependencies
In frontend directory
```shell
npm install
```

### 3. Configure environment variables
Create a .env file in frontend directory
```shell
REACT_APP_API_BASE_URL=
REACT_APP_GOOGLE_API_TOKEN=
REACT_APP_AWS_REGION=
REACT_APP_AWS_ACCESS_KEY_ID=
REACT_APP_AWS_SECRET_ACCESS_KEY=
REACT_APP_AWS_BUCKET_NAME=

```

### 4. Build and run with Docker
Run Docker Desktop
<br>
In backend directory, create dockerfile in backend folder to build images
```shell
docker build -t your-image-name:latest .
```
Create docker-compose.yaml in backend directory to run project base on application.properties file
```shell
services:
  postgres:
    image: postgres
    environment:
      POSTGRES_USER: 
      POSTGRES_PASSWORD: 
      POSTGRES_DB: ShareMe
    ports:
      - "54320:5432"
  share-me:
    image: 
    ports:
      - "8080:8080"
    environment:
      JAVA_TOOL_OPTIONS: "-Xmx512m"
      DB_URL: jdbc:postgresql://postgres:5432/ShareMe
      DB_USERNAME: 
      DB_PASSWORD: 
      DB_DRIVER: org.postgresql.Driver
```
```shell
docker-compose up
```

### 5. Run the app
In Docker Desktop, make sure Database container and Backend App Container is running
<br>
Go back to frontend folder
```shell
npm start
```
Visit [http://localhost:3000]

## Inspired by

The frontend part of the project was inspired by and references the following works:
- [Share-Me](https://github.com/adrianhajdin/project_shareme_social_media) by [Adrian Hajdin - JS Mastery](https://github.com/adrianhajdin)

