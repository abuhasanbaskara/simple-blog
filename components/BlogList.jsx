'use client'

import React, { useState } from 'react'
import { blog_data } from '../assets/assets'
import BlogItem from './BlogItem'
import axios from 'axios'
import { useEffect } from 'react'

const BlogList = () => {
    const [menu, setMenu] = useState('すべて');
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        if(response.status === 200) {
            setBlogs(response.data.blogs);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

  return (
    <div>
        <div className='flex justify-center gap-6 my-10'>
            <button onClick={()=> setMenu('すべて')} className={menu === 'すべて' ? 'bg-black text-white px-4 py-1 rounded-sm' : ''}>すべて</button>
            <button onClick={()=> setMenu('Technology')} className={menu === 'Technology' ? 'bg-black text-white px-4 py-1 rounded-sm' : ''}>テクノロジー</button>
            <button onClick={()=> setMenu('Startup')} className={menu === 'Startup' ? 'bg-black text-white px-4 py-1 rounded-sm' : ''}>スタートアップ</button>
            <button onClick={()=> setMenu('Lifestyle')} className={menu === 'Lifestyle' ? 'bg-black text-white px-4 py-1 rounded-sm' : ''}>ライフスタイル</button>
        </div>
        <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
            {blogs.filter((item) => menu === 'すべて' ? true : item.category === menu).map((item) => (
                <BlogItem key={item._id} {...item} id={item._id} />
            ))}
        </div>
    </div>
  )
}

export default BlogList