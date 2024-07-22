"use client";

import {useEffect, useState} from "react";
import { FaPencilAlt } from "react-icons/fa";
import Navbar from "@/components/navbar/Navbar";
import Post from "@/components/post/Post";
import Link from 'next/link';

import UserList from "@/components/userlist/Userlist";
import {useUser} from "@/context/UserContext";
import { useGetUserWithPostsByUserNameQuery }  from "@/store/services/usersApi";
import postcss from "postcss";
import { set } from "date-fns";

interface PostData {
  description: string;
  isPublic: boolean;
  likes: number;
  media: string;
  postId: string;
  publicationDate: Date;
  title: string;
  updateDate: Date;
  userId: string;
  userName: string;
  comments: number;
  favorites: number;
}

interface UserData {
  age: number;
  coverImage: string;
  followers: number;
  followings: number;
  fullName: string;
  gender: string;
  posts: number;
  profileImage: string;
  userName: string;
  userPost: PostData[];
}

const Profile = ({ params: userName }: { params: { userName: string } }) => {
  console.log(userName);
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenFollowed, setIsOpenFollowed] = useState(false);

  const { user, setLoading } = useUser();


  const openFollowersList = () => {
    setIsOpenFollowers(!isOpenFollowers);
  };
  const openFollowedList = () => {
    setIsOpenFollowed(!isOpenFollowed);
  };

  const { data, currentData, isLoading, isSuccess } = useGetUserWithPostsByUserNameQuery(userName?.userName);

  let datos: UserData = data

  const postsArray: PostData[] = datos?.userPost;

  const [posts, setPosts] = useState<PostData[]>(postsArray);  

  return (
    <div className="min-h-screen bg-blancoHueso dark:bg-gray-900">
      <Navbar />
      <main className="flex md:ml-64 min-h-screen">
        <div className="w-full px-4 md:px-8 lg:px-16 mt-10 md:mt-0">
          <section
            className="relative w-full bg-cover bg-center rounded-lg shadow-lg overflow-hidden mb-8 md:mb-12"
            style={{
              backgroundImage: `url(${datos?.coverImage})`,
              height: "200px",
            }}
          >
            <div className="absolute inset-0 flex justify-center items-center dark:bg-black bg-opacity-50">
              <img
                className="rounded-full border-4 border-white w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                src={datos?.profileImage}
                alt="perfil"
              />
            </div>
          </section>

          <div className="text-center text-darkVoid dark: dark:text-blancoHueso mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              {datos?.userName}
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 mt-4 text-base sm:text-lg">
              <div className="flex flex-col items-center mb-4 sm:mb-0">
                <p className="text-xl">{datos?.posts}</p>
                <p className="text-darkVoid dark:text-gray-400">posts</p>
              </div>
              <div className="flex flex-col items-center mb-4 sm:mb-0">
                <p className="text-xl">{datos?.followers}</p>
                <button
                  onClick={openFollowedList}
                  className="text-blue-400 hover:text-blue-300"
                >
                  seguidores
                </button>
                {isOpenFollowed && <UserList title="Followers List" />}
              </div>
              <div className="flex flex-col items-center mb-4 sm:mb-0">
                <p className="text-xl">{datos?.followings}</p>
                <button
                  onClick={openFollowersList}
                  className="text-blue-400 hover:text-blue-300"
                >
                  seguidos
                </button>
                {isOpenFollowers && <UserList title="Followeds List" />}
              </div>
            </div>
            <Link href={user?.userId !== userName.userName ? `/profile/${user?.userName}/edit` : `/homepage`} className="mt-6 flex items-center justify-center px-4 py-2 text-base sm:text-lg bg-liquidLava text-white rounded-md hover:bg-purple-800 transition duration-200">
              <FaPencilAlt className="mr-2" /> {user?.userId !== userName.userName ? 'Edit profile' : 'Follow user'}
            </Link>
          </div>

          <section className="text-white mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-around text-base sm:text-lg">
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold text-darkVoid dark:text-gray-400">Nombre</p>
                <p className="text-darkVoid dark:text-white">{datos?.fullName}</p>
              </div>
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold text-darkVoid dark:text-gray-400">Edad</p>
                <p className="text-darkVoid dark:text-white">{datos?.age}</p>
              </div>
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold text-darkVoid dark:text-gray-400">Género</p>
                <p className="text-darkVoid dark:text-white">{datos?.gender}</p>
              </div>
            </div>  
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {posts?.map((post, index) => (
              <div key={index} className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <Post
                  userId={post?.userId}
                  title={post?.title}
                  description={post?.description}
                  media={post?.media}
                  likes={post?.likes}
                  updateDate={post?.updateDate}
                  comments={post?.comments}
                  favorites={post?.favorites}
                  postId={post?.postId}
                />
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
