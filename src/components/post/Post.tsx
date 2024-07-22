'use client'

import React, { useState, useEffect } from 'react';
import Comments from '../comments/Comments';
import { useDeleteFavouriteMutation, useAddFavouriteMutation } from '@/store/services/favouritesApi';
import { useCreateLikeMutation, useDeleteLikeMutation } from '@/store/services/likesApi';

interface PostProps {
  userId: string;
  title: string;
  description: string;
  likes: number;
  updateDate: Date; // Changed to string for the input prop
  media: string;
  comments: number;
  favorites: number;
  postId: string;
}

const Post: React.FC<PostProps> = ({ userId, updateDate, media, likes, comments, description, favorites, postId }) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const [addFavourite, { isLoading: isLoadingAddFav, error: errorAddFav }] = useAddFavouriteMutation();
  const [deleteFavourite, { isLoading: isLoadingDelFav, error: errorDelFav }] = useDeleteFavouriteMutation();
  const [createLike, { isLoading: isLoadingAddLike, error: errorAddLike }] = useCreateLikeMutation();
  const [deleteLike, { isLoading: isLoadingDelLike, error: errorDelLike }] = useDeleteLikeMutation();

  useEffect(() => {
    setDate(new Date(updateDate)); // Convert the updateDate string to a Date object
  }, [updateDate]);

  const handleLikeClick = async () => {
    const data = {
      userId,
      postId,
      date: new Date(),
      action: isLiked ? 'unlike' : 'like'
    };
    console.log(data);

    try {
      if (isLiked) {
        await deleteLike({ userId, postId, date: new Date() });
        setIsLiked(false);
      } else {
        await createLike({ userId, postId, date: new Date() });
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error handling like action:', error);
    }
  };

  const handleFavoriteClick = async () => {
    const data = {
      userId,
      postId,
      date: new Date(),
      action: isFavorited ? 'unfavorite' : 'favorite'
    };
    console.log(data);

    try {
      if (isFavorited) {
        await deleteFavourite({ userId, postId, date: new Date() });
        setIsFavorited(false);
      } else {
        await addFavourite({ userId, postId, date: new Date() });
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error handling favorite action:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="border border-gray-700 p-4 m-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="text-black dark:text-white bg-white dark:bg-black rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-lg font-bold">
              {userId ? userId[0].toUpperCase() : '?'}
            </span>
          </div>
          <h1 className="ml-2">{userId || 'Usuario Desconocido'}</h1>
        </div>
        <div className="text-black dark:text-white bg-white dark:bg-black px-2 py-1 rounded">
          {date.toDateString()}
        </div>
      </div>

      {media && (
        <div className="text-black dark:text-white bg-white dark:bg-black rounded-lg mb-4 mx-auto flex items-center justify-center overflow-hidden w-fit self-center">
          <img src={media} alt="Media content" className="h-full object-cover" />
        </div>
      )}

      <div className="flex justify-around mb-4">
        <section className="flex items-center">
          <button
            className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleLikeClick}
            disabled={isLoadingAddLike || isLoadingDelLike}
          >
            {likes} <span className="ml-1">♥</span>
          </button>
        </section>

        <section className="flex items-center cursor-pointer" onClick={toggleComments}>
          {comments} <span className="ml-1">💬</span>
        </section>

        <section className="flex items-center">
          <button
            className={`flex items-center ${isFavorited ? 'text-yellow-500' : 'text-gray-500'}`}
            onClick={handleFavoriteClick}
            disabled={isLoadingAddFav || isLoadingDelFav}
          >
            {favorites} <span className="ml-1">⭐</span>
          </button>
        </section>
      </div>

      <div className="text-black dark:text-white bg-white dark:bg-black p-4 rounded">
        <p>{description}</p>
      </div>

      {showComments && <Comments postId={postId} />}
    </div>
  );
};

export default Post;
