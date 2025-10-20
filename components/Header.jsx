import Image from 'next/image'
import React from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'

const Header = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/email', { email });
      if(response.status === 200) {
        toast.success('メールアドレスの登録が完了いたしました');
        setEmail(''); // Reset form
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('メールアドレスの登録に失敗いたしました');
    }
  }

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
            <Image src={assets.logo} alt='' width={180} className='w-[130px] sm:w-auto' />
            <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000]'>始める <Image src={assets.arrow} alt="arrow" /></button>
        </div>
        <div className='text-center my-8'>
          <h1 className='text-3xl sm:text-5xl font-medium'>最新のブログ</h1>
          <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>最新の情報とインスピレーションをお届けします。興味深い記事をお楽しみください。</p>
          <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000]' action="">
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='メールアドレスを入力' className='pl-4 pr-4 outline-none flex-1' />
            <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>購読する</button>
          </form>
        </div>
    </div>
  )
}

export default Header