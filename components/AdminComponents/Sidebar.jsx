import React from 'react'
import Image from 'next/image'
import { assets } from '../../assets/assets'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100'>
        <div className='px-2 sm:pl-14 py-3 border border-black'>
            <Image src={assets.logo} alt='logo' width={120} className='' />
        </div>
        <div className='px-2 sm:pl-14 sm:w-80 h-[100vh] relative py-12 border border-black'>
            <Link href='/admin/addProduct' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000] w-full -mr-2 sm:-mr-14 mb-[7px]' style={{width: 'calc(100% + 8px)'}}>
                <Image src={assets.add_icon} alt='blog' width={28} /><p>ブログ追加</p>
            </Link>
            <Link href='/admin/blogList' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000] w-full -mr-2 sm:-mr-14 mb-[7px]' style={{width: 'calc(100% + 8px)'}}>
                <Image src={assets.blog_icon} alt='blog' width={28} /><p>ブログ一覧</p>
            </Link>
            <Link href='/admin/subscriptions' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000] w-full -mr-2 sm:-mr-14 mb-[7px]' style={{width: 'calc(100% + 8px)'}}>
                <Image src={assets.email_icon} alt='blog' width={28} /><p>購読者一覧</p>
            </Link>
        </div>
    </div>
  )
}

export default Sidebar