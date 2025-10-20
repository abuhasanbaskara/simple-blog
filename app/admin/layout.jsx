import Sidebar from '../../components/AdminComponents/Sidebar'
import Image from 'next/image'
import { assets } from '../../assets/assets'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout({ children }) {
    return (
        <>
            <div className='flex'>
                <ToastContainer theme='dark' />
                <Sidebar />
                <div className='flex flex-col w-full'>
                    <div className='flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black'>
                        <h3 className='text-2xl font-medium'>Admin Dashboard</h3>
                        <Image src={assets.profile_icon} alt='' width={40} className='' />
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}