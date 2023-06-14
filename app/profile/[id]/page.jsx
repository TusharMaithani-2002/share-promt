"use client";

import { useEffect, useState } from "react";
import Profile from '@components/Profile';
import { useSession } from "next-auth/react";
import {useRouter} from 'next/navigation'

function UserProfile() {
  
  const [posts,setPosts] = useState([]);
  const {data:session} = useSession();
  const [userInfo,setUserInfo] = useState({
    name:"",
    email:""
  });

  const router = useRouter();
  
  useEffect(()=>{
    const id=location.pathname.split('/').pop();
    if(session?.user.id.toString() == id) router.push('/profile');
    const fetchPosts = async() => {
      const response = await fetch(`/api/users/${id}/posts`,);
      const data = await response.json();

      setPosts(data);
      if(data) {
        setUserInfo(data[0].creator)
      }

    }
    fetchPosts();
  },[]);

  

  return (
    <Profile
        name={userInfo?.username}
        desc={`welcome to ${userInfo?.username}'s personalized profile page`}
        data={posts}
    />
  )
}

export default UserProfile