"use client";

import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from '@components/Profile';

const MyProfile = () => {

    const {data:session} = useSession();
    const [posts,setPosts] = useState([]);
    const router = useRouter();

    useEffect(()=>{
      const fetchPost = async() => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
      if(session?.user.id) fetchPost()
    },[session?.user.id]);

    const handleDelete = async(post) =>{
       console.log('start delete')
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

        if(hasConfirmed){
          try{
            const response = await fetch(`/api/prompt/${post._id}`,{
              method:"DELETE",
            });
            console.log(response.ok)
              const filteredPosts = posts.filter((item)=>item._id !== post._id);

              setPosts(filteredPosts);
          } catch(error) {
            console.log(error);
          }
        }
    }

    const handleEdit = async (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }

  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile