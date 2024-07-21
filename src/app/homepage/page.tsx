'use client';
import React, { useState } from 'react';
import Post from '@/components/post/Post';
import AuthGuard from "@/components/Guards/AuthGuard";
import Navbar from '@/components/navbar/Navbar';

interface PostData {
  userid: string;
  title: string;
  description: string;
  media: string;
  likes: number;
  updateDate: Date;
  comments: number;
  favorites: number;
}

const HomePage: React.FC = () => {

  const likeData = [{
    userid: 'Publicacion que me gusta',
    title: 'HOLALALALA MARIN MARIN SEBASTIAN Y SANTIAGO',
    description: 'Quien quiere venir a mi casa? ',
    media: 'https://1.bp.blogspot.com/-zKX8CREi3QY/T2OMZgW3s6I/AAAAAAAAWzg/5sFH754c6sw/s1600/Los-mas-Hermosos-Paisajes-Naturales_04.jpg', 
    likes: 20,
    updateDate: new Date(),
    comments: 5,
    favorites: 10,
  }]
  const favData = [{
    userid: 'Publicacion Favorita',
    title: 'Publicacion Favorita',
    description: 'Quien quiere venir a mi casa? ',
    media: 'https://1.bp.blogspot.com/-zKX8CREi3QY/T2OMZgW3s6I/AAAAAAAAWzg/5sFH754c6sw/s1600/Los-mas-Hermosos-Paisajes-Naturales_04.jpg', 
    likes: 20,
    updateDate: new Date(),
    comments: 5,
    favorites: 10,
  }]
  const privateData = [{
    userid: 'Publicacion Privada',
    title: 'El patio de mi casa',
    description: 'Quien quiere venir a mi casa? ',
    media: 'https://1.bp.blogspot.com/-zKX8CREi3QY/T2OMZgW3s6I/AAAAAAAAWzg/5sFH754c6sw/s1600/Los-mas-Hermosos-Paisajes-Naturales_04.jpg', 
    likes: 20,
    updateDate: new Date(),
    comments: 5,
    favorites: 10,
  }]
  const publicData = [{
    userid: 'Publicacion Publica',
    title: 'Publicacion Publica',
    description: 'Quien quiere venir a mi casa? ',
    media: 'https://1.bp.blogspot.com/-zKX8CREi3QY/T2OMZgW3s6I/AAAAAAAAWzg/5sFH754c6sw/s1600/Los-mas-Hermosos-Paisajes-Naturales_04.jpg', 
    likes: 20,
    updateDate: new Date(),
    comments: 5,
    favorites: 10,
  }]

  const [posts, setPosts] = useState<PostData[]>([
    {
      userid: 'MarcuSV0',
      title: 'El patio de mi casa',
      description: 'Quien quiere venir a mi casa? ',
      media: 'https://1.bp.blogspot.com/-zKX8CREi3QY/T2OMZgW3s6I/AAAAAAAAWzg/5sFH754c6sw/s1600/Los-mas-Hermosos-Paisajes-Naturales_04.jpg', 
      likes: 20,
      updateDate: new Date(),
      comments: 5,
      favorites: 10,
    },
    {
      userid: 'DANIEL-1',
      title: 'Mi viaje a Europa',
      description: 'Nest way to find my proposit',
      media: 'https://th.bing.com/th/id/OIF.0mpwGSIBRUhbxBmKJHCrpA?rs=1&pid=ImgDetMain', 
      likes: 1,
      updateDate: new Date(23/3/23),
      comments: 3,
      favorites: 8,
    },
  ]);
  const [liked , setLiked ] = useState(false)
  const [ favorite , setFavorite ] = useState(false)
  const [ publics , setPublics ] = useState(false)
  const [ privates , setPrivates ] = useState(false)

const setLikeds = () =>{
    setLiked(true)
    setFavorite(false)
    setPublics(false)
    setPrivates(false)
    }
const setFavorites = () => { 
     setFavorite(true)
     setLiked(false)
     setPublics(false)
     setPrivates(false)    
 }
const setPublices = () =>
      { setLiked(false)
       setFavorite(false)
       setPublics(true)
       setPrivates(false)
      }
const setPrivatesPost = () => 
        { setLiked(false)
         setFavorite(false)
         setPublics(false)
         setPrivates(true)
        }


 const ChooseObj:Function = () => {
  if (liked)
    return likeData
  if (favorite)
    return favData
  if (publics)
    return publicData
  if (privates)
    return privateData
  if ( liked==false)
    return publicData
 }
 const object = ChooseObj()
  return (
    <AuthGuard>
      <Navbar />
      <div className='items-center justify-center flex pt-20 md:pt-4 md:ml-64 gap-4 py-2 flex-wrap' >
       <button onClick={setLikeds} className='dark:text-blancoHueso text-darkVoid  hover:bg-gray-300 border border-gray-400 shadow-md rounded-lg px-6 py-3'> Me gusta</button>
       <button onClick={setFavorites} className='dark:text-blancoHueso text-darkVoid  hover:bg-gray-300 border border-gray-400 shadow-md rounded-lg px-6 py-3'>Favoritos</button>
       <button onClick={setPrivatesPost} className='dark:text-blancoHueso text-darkVoid  hover:bg-gray-300 border border-gray-400 shadow-md rounded-lg px-6 py-3'>Privados</button>
       <button onClick={setPublices}  className='dark:text-blancoHueso text-darkVoid  hover:bg-gray-300 border border-gray-400 shadow-md rounded-lg px-6 py-3'>Publicos</button>
        </div>
      <main className="flex  dark:bg-darkVoid">
        <div className="app flex-1 ml-0 p-2 pt-16 md:ml-64 md:pt-4 sm:p-16">
          {object.map((post:any , index:any) => (
            <Post
              key={index}
              userid={post.userid}
              title={post.title}
              description={post.description}
              media={post.media}
              likes={post.likes}
              updateDate={post.updateDate}
              comments={post.comments}
              favorites={post.favorites}
              postId={index}
            />
          ))}
        </div>
      </main>
    </AuthGuard>
  );
}

export default HomePage;
