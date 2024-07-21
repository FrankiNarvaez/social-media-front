'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Comments from '../comments/Comments';
import AuthGuard from "@/components/Guards/AuthGuard";
import { useAuth } from '@/context/authContext';

interface PostProps {
  userid: string;
  title: string;
  description: string;
  likes: number;
  updateDate: Date;
  media: string;
  comments: number;
  favorites: number;
  postId: string;
}

const Post: React.FC<PostProps> = ({ userid, updateDate, media, likes, comments, description, favorites, postId }) => {
  const [showComments, setShowComments] = useState(false);
  
  const { getCurrentUTCDate } = useAuth();
  const date = getCurrentUTCDate();

  const handleLikeClick = () => {
    const data = {
      userid,
      postId,
      date,
      action: 'like'
    };
    console.log(data);
  };

  const handleFavoriteClick = () => {
    const data = {
      userid,
      postId,
      date,
      action: 'favorite'
    };
    console.log(data);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <AuthGuard>
      <div className="border border-gray-700 p-4 m-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-lg max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="text-black dark:text-white bg-white dark:bg-black rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-lg font-bold">{userid[0].toUpperCase()}</span>
            </div>
            <h1 className="ml-2">{userid}</h1>
          </div>
          <div className="text-black dark:text-white bg-white dark:bg-black px-2 py-1 rounded">
            {updateDate.toDateString()}
          </div>
        </div>

        <div className="text-black dark:text-white bg-white dark:bg-black rounded-lg mb-4 mx-auto flex items-center justify-center overflow-hidden w-fit self-center">
          <img src={media} alt="Media content" className="h-full object-cover" />
        </div>

        <div className="flex justify-around mb-4">
          <section className="flex items-center">
            <button className="flex items-center" onClick={handleLikeClick}>
              {likes} <span className="ml-1">♥</span>
            </button>
          </section>

          <section className="flex items-center cursor-pointer" onClick={toggleComments}>
            {comments} <span className="ml-1">💬</span>
          </section>

          <section className="flex items-center">
            <button className="flex items-center" onClick={handleFavoriteClick}>
              {favorites} <span className="ml-1">⭐</span>
            </button>
          </section>
        </div>

        <div className="text-black dark:text-white bg-white dark:bg-black p-4 rounded">
          <p>{description}</p>
        </div>

        {showComments && <Comments />}
      </div>
    </AuthGuard>
  );
};

export default Post;
