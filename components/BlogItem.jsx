import { assets, blog_data } from '../assets/assets'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const BlogItem = ({title, description, image, category, id}) => {
  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000]'>
        <Link href={`/blogs/${id}`}>
            <Image src={image} alt='blog-image' width={400} height={400} className='border-b border-black'/>
        </Link>
        <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
        <div className='p-5 pb-1'>
            <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
            <p className='mb-3 text-sm text-gray-700'>{description}</p>
        </div>
            <Link href={`/blogs/${id}`} className='inline-flex items-center py-1 font-semibold text-center ml-5 mb-2'>
                続きを読む <Image src={assets.arrow} className='ml-2' alt='arrow' width={12} height={12} />
            </Link>
    </div>
  )
}

export default BlogItem