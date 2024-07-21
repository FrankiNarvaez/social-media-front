"use client";

import { useAuth } from "../../../context/authContext";
import AuthGuard from "@/app/components/Guards/AuthGuard";
import Navbar from "../../../components/navbar/Navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema } from "@/app/validations/editProfileSchema";

type Inputs={
  fullname: string;
  description: string;
  media: File | null;
  gender: string;
  location: string;
  workPlace: string;
  personalWebSite: string;
}

const EditProfile = () => {
  const { loginToken } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>(
    { resolver: zodResolver(editProfileSchema) }
);


const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
}


 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log("Selected file:", file);
    setValue("media", file as any);
  };

  return (
    <AuthGuard>
      <div className="grid grid-cols-12">
      <div className="col-span-3">
      <Navbar></Navbar> 
      </div>
      <main className="col-span-9 dark:bg-black bg-white w-80vh p-8 h-screen overflow-auto">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl dark:text-white text-black mb-6 text-left">
            Update Information
          </h1>
          <div className="flex justify-start flex-col">
            <label className="mb-1 text-black dark:text-white">
              Profile Picture
            </label>
            <input
              className={`dark:text-white bg-lightGray dark:text-e dark:bg-slateGray p-1 rounded-lg ${errors.media ? 'border-red-500' : ''}`}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-black dark:text-white">Fullname</label>
            <input
              className= {`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.fullname ? 'border-red-500' : ''}`}
              type="text"
              placeholder="Enter a fullname"
              {...register("fullname")}
            />
            {errors.fullname && <p className="text-red-500 text-xs italic">{errors.fullname?.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 dark:text-white text-black">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center dark:text-white text-black">
                <input
                  type="radio"
                  value="Men"
                  className= {`mr-2 dark:text-white text-black ${errors.gender ? 'border-red-500' : ''}`}
                  {...register("gender")}
                />
                Men
              </label>
              <label className="flex items-center dark:text-white text-black">
                <input
                  type="radio"
                  value="Woman"
                  className="mr-2 dark:text-white text-black"
                  {...register("gender")}
                />
                Woman
              </label>
              <label className="flex items-center dark:text-white text-black">
                <input
                  type="radio"
                  value="Other"
                  className="mr-2 dark:text-white text-black"
                  {...register("gender")}
                />
                Other
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 dark:text-white text-black">
              Description
            </label>
            <input
              className={`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.description ? 'border-red-500' : ''}`}
              type="text"
              placeholder="Enter a description"
              {...register("description")}
            />
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description?.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 dark:text-white text-black">Location</label>
            <input
              className={`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.location ? 'border-red-500' : ''}`}
              type="text"
              placeholder="Enter a location"
              {...register("location")}
            />
            {errors.location && <p className="text-red-500 text-xs italic">{errors.location?.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 dark:text-white text-black">Workplace</label>
            <input
              className= {`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.workPlace ? 'border-red-500' : ''}`}
              type="text"
              placeholder="Enter a workplace"
              {...register("workPlace")}
            />
            {errors.workPlace && <p className="text-red-500 text-xs italic">{errors.workPlace?.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 dark:text-white text-black">
              Personal Website
            </label>
            <input
              className={`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.personalWebSite ? 'border-red-500' : ''}`}
              type="text"
              placeholder="Enter a link"
              {...register("personalWebSite")}
            />
            {errors.personalWebSite && <p className="text-red-500 text-xs italic">{errors.personalWebSite?.message}</p>}
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className=" bg-liquidLava hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
              Update
            </button>
          </div>
        </form>
      </main>
      </div>
    </AuthGuard>
  );
};

export default EditProfile;