'use client';

import { useUser } from "@/context/UserContext";
import React, { useState, FormEvent } from 'react';
import { useSearchPostsQuery, useSearchUsersQuery } from '@/store/services/search';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 6;

const SearchBar = () => {
    const [searchParameter, setSearchParameter] = useState('');
    const [filter, setFilter] = useState('people');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const router = useRouter();

    const { data: usersData, error: usersError } = useSearchUsersQuery(searchParameter, {
        skip: filter !== 'people',
    });

    const { data: postsData, error: postsError } = useSearchPostsQuery(searchParameter, {
        skip: filter !== 'posts',
    });

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchAndCacheResults();
    };

    const searchAndCacheResults = () => {
        const cacheKey = `${filter}-${searchParameter}`;
        const cachedResults = localStorage.getItem(cacheKey);

        if (cachedResults) {
            console.log('Resultados desde el caché:', JSON.parse(cachedResults));
            setResults(JSON.parse(cachedResults));
            return;
        }

        if (filter === 'people' && usersData) {
            console.log('Datos de usuarios obtenidos:', usersData);
            const filteredUsers = usersData.map((user) => ({
                age: user.age,
                fullName: user.fullName,
                profileImage: user.profileImage,
                userName: user.userName,
                location: user.location,
            }));
            localStorage.setItem(cacheKey, JSON.stringify(filteredUsers));
            setResults(filteredUsers);
        } else if (filter === 'posts' && postsData) {
            console.log('Datos de publicaciones obtenidos:', postsData);
            const filteredPosts = postsData.map((post) => ({
                postId: post.postId,
                title: post.title,
                description: post.description,
                media: post.media,
                isPublic: post.isPublic,
                publicationDate: post.publicationDate,
                updateDate: post.updateDate,
                likes: post.likes,
            }));
            localStorage.setItem(cacheKey, JSON.stringify(filteredPosts));
            setResults(filteredPosts);
        }

        if (usersError) {
            console.error('Error fetching users:', usersError);
        }

        if (postsError) {
            console.error('Error fetching posts:', postsError);
        }

        setCurrentPage(1);
    };

    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

    const currentResults = results.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="w-full p-4">
            <div className="flex justify-center w-full">
                <div className="flex items-center w-full max-w-screen-lg bg-white border border-gray-300 rounded-full p-2 shadow-md">
                    <form onSubmit={handleSearch} className="flex items-center w-full">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="ml-2 bg-transparent outline-none text-lg text-black"
                        >
                            <option value="people">Personas</option>
                            <option value="posts">Publicaciones</option>
                        </select>
                        <input
                            type="text"
                            value={searchParameter}
                            onChange={(e) => setSearchParameter(e.target.value)}
                            placeholder="Buscar En Nexo"
                            className="ml-2 w-full bg-transparent outline-none text-lg text-center text-black"
                        />
                        <button type="submit" className="ml-2 p-2 bg-purple-500 text-white rounded-full">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.9 4.9a1 1 0 01-1.414 1.414l-4.9-4.9zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
            <SearchResults results={currentResults} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} filter={filter} />
        </div>
    );
};

const SearchResults = ({ results, totalPages, currentPage, setCurrentPage, filter }) => {
    const router = useRouter();

    const handleUserClick = (userName) => {
        console.log(`Redirecting to /profile/${userName}/edit`);
        router.push(`/profile/${userName}/edit`);
    };

    const handlePostClick = (postId) => {
        console.log(`Redirecting to /post/${postId}`);
        router.push(`/post/${postId}`);
    };

    const defaultProfileImage = 'https://th.bing.com/th/id/OIP.m5kS1irkbp6YT0EvLKhBzwAAAA?rs=1&pid=ImgDetMain';

    return (
        <div className="mt-4 flex flex-col justify-between max-h-96 overflow-y-auto">
            <div>
                {results && results.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
                        {results.map((result, index) => (
                            filter === 'people' ? (
                                <li
                                    key={index}
                                    className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-center text-center cursor-pointer"
                                    onClick={() => handleUserClick(result.userName)}
                                >
                                    <img
                                        src={result.profileImage || defaultProfileImage}
                                        alt={result.userName}
                                        className="w-24 h-24 rounded-full object-cover mb-4"
                                    />
                                    <div>
                                        <p className="font-bold text-lg">{result.fullName}</p>
                                        <p className="text-gray-500">@{result.userName}</p>
                                        <p className="text-gray-500">Age: {result.age}</p>
                                        <p className="text-gray-500">Location: {result.location || 'Unknown'}</p>
                                    </div>
                                </li>
                            ) : (
                                <li
                                    key={index}
                                    className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-center text-center cursor-pointer"
                                    onClick={() => handlePostClick(result.postId)}
                                >
                                    <div>
                                        <p className="font-bold text-lg">{result.title}</p>
                                        <p className="text-gray-500">{result.description}</p>
                                        <p className="text-gray-500">Likes: {result.likes}</p>
                                        <p className="text-gray-500">Published: {new Date(result.publicationDate).toLocaleString()}</p>
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>
                ) : (
                    <p>No hay resultados</p>
                )}
            </div>
            <div className="flex justify-center mt-4 items-center text-black space-x-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-purple-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Anterior
                </button>
                <span className="text-sm">{currentPage} de {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-purple-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default SearchBar;