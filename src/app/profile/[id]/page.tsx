"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { FaPencilAlt } from "react-icons/fa";
import Navbar from "@/components/navbar/Navbar";
import Post from "@/components/post/Post";

import UserList from "@/components/userlist/Userlist";

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

const Profile = () => {
  const { loginToken, register } = useAuth();
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenFollowed, setIsOpenFollowed] = useState(false);

  const openFollowersList = () => {
    setIsOpenFollowers(!isOpenFollowers);
  };
  const openFollowedList = () => {
    setIsOpenFollowed(!isOpenFollowed);
  };

  useEffect(() => {
    console.log(loginToken);
  }, [loginToken]);

  let id = 0;
  let datos = [
    {
      imagePerfil: "https://www.clarin.com/2021/07/28/BqTG5Eqhd_360x240__1.jpg",
      imagenPortada:
        "https://yesofcorsa.com/wp-content/uploads/2020/05/4K-Landscape-Best-Wallpaper-1024x576.jpg",
      username: "birulboy",
      post: 5,
      followers: 355,
      followed: 30,
      name: "brayan andres pinchao",
      age: 20,
      genre: "male",
    
    },
  ];

  const postsArray: PostData[] = [
    {
      userid: "MarcuSV0",
      title: "El patio de mi casa",
      description: "Quien quiere venir a mi casa?",
      media:
        "https://1.bp.blogspot.com/-zKX8CREi3QY/T2OMZgW3s6I/AAAAAAAAWzg/5sFH754c6sw/s1600/Los-mas-Hermosos-Paisajes-Naturales_04.jpg",
      likes: 20,
      updateDate: new Date(),
      comments: 5,
      favorites: 10,
    },
    {
      userid: "DANIEL-1",
      title: "Mi viaje a Europa",
      description: "Nest way to find my proposit",
      media:
        "https://th.bing.com/th/id/OIF.0mpwGSIBRUhbxBmKJHCrpA?rs=1&pid=ImgDetMain",
      likes: 1,
      updateDate: new Date("2023-03-23"),
      comments: 3,
      favorites: 8,
    },
    {
      userid: "AnnaB",
      title: "Amanecer en la montaña",
      description: "Un amanecer increíble en las montañas de los Andes.",
      media:
        "https://media.es.wired.com/photos/6519015ce1045b93e30d62e9/16:9/w_2560%2Cc_limit/51071209",
      likes: 45,
      updateDate: new Date(),
      comments: 12,
      favorites: 22,
    },
    {
      userid: "TravelGuru",
      title: "Visita a las Pirámides de Egipto",
      description:
        "Una experiencia inolvidable explorando las maravillas antiguas de Egipto.",
      media:
        "https://yesofcorsa.com/wp-content/uploads/2020/05/4K-Landscape-Best-Wallpaper-1024x576.jpg",
      likes: 100,
      updateDate: new Date(),
      comments: 30,
      favorites: 50,
    },
    {
      userid: "NatureLover",
      title: "Cascada oculta en el bosque",
      description: "Descubrí una hermosa cascada en medio del bosque.",
      media:
        "https://i.pinimg.com/originals/70/4a/f1/704af178a4bce3fc60b1f8f709f149b4.jpg",
      likes: 75,
      updateDate: new Date(),
      comments: 20,
      favorites: 35,
    },
    {
      userid: "FoodieFan",
      title: "Delicias de la cocina italiana",
      description:
        "Probé las mejores pizzas y pastas en mi último viaje a Italia.",
      media:
        "https://yesofcorsa.com/wp-content/uploads/2020/05/4K-Landscape-Best-Wallpaper-1024x576.jpg",
      likes: 60,
      updateDate: new Date(),
      comments: 25,
      favorites: 40,
    },
    {
      userid: "TechGuy",
      title: "Nueva tecnología en 2023",
      description:
        "Explorando las últimas innovaciones tecnológicas de este año.",
      media:
        "https://th.bing.com/th/id/OIP.NINu7mYB-OAem0pvcGfP5QHaEK?pid=ImgDet&rs=1",
      likes: 85,
      updateDate: new Date(),
      comments: 15,
      favorites: 45,
    },
    {
      userid: "ArtFanatic",
      title: "Exposición de arte moderno",
      description:
        "Visité una increíble exposición de arte moderno en Nueva York.",
      media:
        "https://th.bing.com/th/id/OIP.Xk3QdOzMjNLd9n3LKlMUKgHaE7?pid=ImgDet&rs=1",
      likes: 50,
      updateDate: new Date(),
      comments: 18,
      favorites: 30,
    },
    {
      userid: "SportsEnthusiast",
      title: "Final del campeonato de fútbol",
      description: "El partido más emocionante de la temporada.",
      media:
        "https://th.bing.com/th/id/OIP.LI8MZkTS3H7ph5UKnso29gHaEK?pid=ImgDet&rs=1",
      likes: 95,
      updateDate: new Date(),
      comments: 40,
      favorites: 60,
    },
    {
      userid: "FitnessFreak",
      title: "Rutina de ejercicios en casa",
      description:
        "Compartiendo mi rutina de ejercicios para mantenerse en forma en casa.",
      media:
        "https://th.bing.com/th/id/OIP.4ZsW0B0ZHa6f8eBt32B5VAHaE7?pid=ImgDet&rs=1",
      likes: 70,
      updateDate: new Date(),
      comments: 22,
      favorites: 33,
    },
    {
      userid: "PhotographerJoe",
      title: "Capturando la belleza del otoño",
      description: "Fotos de paisajes otoñales en el parque local.",
      media:
        "https://th.bing.com/th/id/OIP.w5s1YNo3Dpeokq4hgZkrtgHaE8?pid=ImgDet&rs=1",
      likes: 40,
      updateDate: new Date(),
      comments: 10,
      favorites: 20,
    },
  ];

  const [posts, setPosts] = useState<PostData[]>(postsArray);

  return (
    <div>
      <Navbar />
      <main className="bg-darkVoid  flex md:ml-64 min-h-screen ">
        <div className="w-[100vw] px-4  left-10 mt-10 md:mt-0 md:px-1  md:w-[100vh] lg:w-[100vw]">
          <section
            className="relative w-full bg-cover bg-center mb-8 md:mb-12"
            style={{
              backgroundImage: `url(${datos[id].imagenPortada})`,
              height: "200px",
            }}
          >
            <div className="absolute inset-0 flex justify-center items-center">
              <img
                className="rounded-full border-4 border-white w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                src={datos[id].imagePerfil}
                alt="perfil"
              />
            </div>
          </section>

          <div className="text-center text-white mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              {datos[id].username}
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 mt-4 text-base sm:text-lg">
              <div className="flex flex-col items-center mb-4 sm:mb-0">
                <p className="text-xl">{datos[id].post}</p>
                <p>posts</p>
              </div>
              <div className="flex flex-col items-center mb-4 sm:mb-0">
                <p className="text-xl">{datos[id].followers}</p>
                <button onClick={openFollowedList}>followers</button>
                {isOpenFollowed && <UserList title="Followers List" />}
              </div>
              <div className="flex flex-col items-center mb-4 sm:mb-0">
                <p className="text-xl">{datos[id].followed}</p>
                <button onClick={openFollowersList}>followed</button>
                {isOpenFollowers && <UserList title="Followeds List" />}
              </div>
            </div>
            <button className="mt-6 flex items-center justify-center px-4 py-2 text-base sm:text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600">
              <FaPencilAlt className="mr-2" /> Edit profile
            </button>
          </div>

          <section className="text-white mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-around text-base sm:text-lg">
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold">Name</p>
                <p>{datos[id].name}</p>
              </div>
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold">Age</p>
                <p>{datos[id].age}</p>
              </div>
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold">Genre</p>
                <p>{datos[id].genre}</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {posts.map((post: any, index: any) => (
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
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
