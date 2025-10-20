import React from 'react'
import Image from 'next/image'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const BlogTableItem = ({id, authorImg, title, author, date, deleteBlog}) => {
  const formatDate = (dateString) => {
    if (!dateString) return '日付なし';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      // Toast is already handled in the parent component
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('ブログの削除に失敗しました');
    }
}

  return (
    <tr className='bg-white border-b hover:bg-gray-100'>
        <td className='hidden sm:flex items-center gap-3 px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
            <Image src={authorImg || assets.profile_icon} alt='profile' width={32} height={32} className='rounded-full' />
            <span>{author || '不明な著者'}</span>
        </td>
        <td className='px-6 py-4 font-medium text-gray-900'>
            {title || 'タイトルなし'}
        </td>
        <td className='px-6 py-4 text-gray-500'>
            {formatDate(date)}
        </td>
        <td className='px-6 py-4'>
            <button className='text-red-600 hover:text-red-800 font-medium' onClick={handleDelete}>
                削除
            </button>
        </td>
    </tr>
  )
}

export default BlogTableItem