'use client'
import React, { useState, useEffect } from 'react'
import { blog_data, assets } from '../../../assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../../components/Footer'
import axios from 'axios'

const BlogDetail = ({params}) => {
  const unwrappedParams = React.use(params);

  const [blog, setBlog] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get(`/api/blog?id=${unwrappedParams.id}`);
    if(response.status === 200) {
      setBlog(response.data.blog);
    }
  }
  
  useEffect(() => {
    fetchBlogData();
  }, []);

  return (blog?<>
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <Image src={assets.logo} alt='blog-image' width={180} className='w-[130px] sm:w-auto' />
          </Link>
          <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000]'>始める <Image src={assets.arrow} alt="arrow" /></button>
        </div>
        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{blog.title}</h1>
          <Image className='mx-auto mt-6 border-white rounded-full' src={blog.authorImg} alt='' width={60} height={60}/>
          <p className='mt-1 pb-2 text-lg max-w-[740px] m-auto text-gray-700'>{blog.author}</p>
        </div>
    </div>
    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
      <Image className='border-4 border-white shadow-[-7px_7px_0px_#000]' src={blog.image} alt='' width={1280} height={720} />
      <p className='text-gray-700 text-lg mt-5'>{blog.description}</p>
      <div className='my-24'>
        <p className='text-black font font-semibold my-4'>この記事をソーシャルメディアでシェア</p>
        <div className='flex my-4'>
          <Image src={assets.facebook_icon} alt='facebook' width={50} />
          <Image src={assets.googleplus_icon} alt='googleplus' width={50} />
          <Image src={assets.twitter_icon} alt='twitter' width={50} />
        </div>
      </div>
    </div>
    <Footer />
    </>:<></>  
    )
}

export default BlogDetail