'use client'
import React, { useState, useEffect } from 'react'
import BlogTableItem from '../../../components/AdminComponents/BlogTableItem'
import axios from 'axios'
import { toast } from 'react-toastify'

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      if(response.status === 200) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(`/api/blog?id=${id}`);
      if(response.status === 200) {
        toast.success('ブログが正常に削除されました');
        setBlogs(blogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
        <h1 className='text-2xl font-medium'>すべてのブログ</h1>
        <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
            <table className='w-full text-sm text-gray-500'>
                <thead className='text-sm text-gray-700 bg-gray-50 text-left uppercase'>
                    <tr>
                        <th scope='col' className='hidden sm:block px-6 py-3'>
                            著者名
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            ブログタイトル
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            日付
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {blogs.length > 0 ? (
                      blogs.map((blog) => (
                        <BlogTableItem 
                          key={blog._id}
                          id={blog._id}
                          authorImg={blog.authorImg}
                          title={blog.title}
                          author={blog.author}
                          date={blog.date}
                          deleteBlog={deleteBlog}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan='4' className='px-6 py-4 text-center text-gray-500'>
                          ブログが見つかりません
                        </td>
                      </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default page