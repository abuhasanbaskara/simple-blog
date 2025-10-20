'use client'
import React, { useState } from 'react'
import { assets } from '../../../assets/assets'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'スタートアップ',
    authorImg: '/uploads/author_img.png',
    author: 'Baskun',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newData = { ...data, [name]: value };
    setData(newData);
    console.log(newData);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (!image) {
      toast.error('画像を選択してください');
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('author', data.author);
      formData.append('authorImg', data.authorImg);

      const response = await axios.post('/api/blog', formData);
      if(response.status === 200) {
        toast.success('ブログが正常に追加されました');
        // Reset form
        setData({
          title: '',
          description: '',
          category: 'スタートアップ',
          authorImg: '/uploads/author_img.png',
          author: 'Baskun',
        });
        setImage(false);
      } else {
        toast.error('ブログの追加に失敗しました');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
      toast.error('ブログの追加に失敗しました: ' + (error.response?.data?.error || error.message));
    }
  }

  return (
    <>
        <form className='pt-5 px-5 sm:pt-12 sm:pl-16' onSubmit={onSubmitHandler}>
            <p className='text-xl'>サムネイルをアップロード</p>
            <label htmlFor='image' className='cursor-pointer'>
                <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='' width={140} height={70} />
            </label>
            <input type='file' id='image' hidden required onChange={(e) => setImage(e.target.files[0])} />
            <p className='text-xl mt-4'>ブログタイトル</p>
            <input name='title' onChange={onChangeHandler} value={data.title} type='text' placeholder='ブログタイトルを入力' className='w-full sm:w-[500px] mt-4 py-3 border border-gray-300 p-2' required />
            <p className='text-xl mt-4'>ブログの説明</p>
            <textarea name='description' onChange={onChangeHandler} value={data.description} type='text' placeholder='ブログの説明をここに記入してください' className='w-full sm:w-[500px] mt-4 py-3 border border-gray-300 p-2' rows={6} required />
            <p className='text-xl mt-4'>ブログカテゴリ</p>
            <select name='category' onChange={onChangeHandler} value={data.category} className='w-full sm:w-[200px] mt-4 py-3 border border-gray-300 p-2' required>
                <option value=''>カテゴリを選択</option>
                <option value='テクノロジー'>テクノロジー</option>
                <option value='スタートアップ'>スタートアップ</option>
                <option value='ライフスタイル'>ライフスタイル</option>
            </select>
            <br />
            <button type='submit' className='bg-black text-white mt-8 w-40 h-12 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'>追加</button>
        </form>
    </>
  )
}

export default page