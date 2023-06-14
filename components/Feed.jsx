'use client';

import {useState,useEffect} from 'react';
import PromtCard from './PromtCard';


const Feed = () => {
  const [searchText, setsearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [allPosts,setAllPosts] = useState([]);

  function handleSearchChange(e) {
    setsearchText(e.target.value);
    console.log(searchText);
  }

  useEffect(()=>{
    if(searchText.length) {
      const filtered = posts.filter(item=>{
        return item.tag.toLowerCase().includes(searchText.toLowerCase()) 
        || item.prompt.toLowerCase().includes(searchText.toLowerCase()) 
        || item.creator.username.toLowerCase().includes(searchText.toLowerCase())
      })

      console.log(filtered)

      setPosts(filtered);
    } else setPosts(allPosts)
  },[searchText])

  useEffect(()=> {
    const fetchPost = async() => {
      try{
        const response = await fetch('/api/prompt');
        const data =  await response.json();
        setPosts(data);
        setAllPosts(data);
      } catch (error) {
        console.log(error)
      }

    }
    fetchPost();
  },[]);
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='search a tag or username'
        onChange={handleSearchChange}
        required
        className='search_input'
        value={searchText}
        />
      </form>

      <div className='mt-16 prompt_layout'>
    {
      posts.map((post) => (
        <PromtCard 
        key={post._id}
        post={post}
        handleTagClick={()=>setsearchText(post.tag)}
        />
      ))
    }
    </div>
    </section>
  )
}

export default Feed