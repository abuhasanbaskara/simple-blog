'use client'
import React from 'react'
import SubsTableItem from '../../../components/AdminComponents/SubsTableItem'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email');
      if(response.status === 200) {
        setEmails(response.data.emails);
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  }

  const deleteEmail = async (id) => {
    try {
      const response = await axios.delete(`/api/email?id=${id}`);
      if(response.status === 200) {
        toast.success('メールアドレスが正常に削除されました');
        setEmails(emails.filter((email) => email._id !== id));
      }
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  }

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
        <h1 className='text-2xl font-medium'>すべての購読者</h1>
        <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
            <table className='w-full text-sm text-gray-500'>
                <thead className='text-xs text-gray-700 bg-gray-50 text-left uppercase'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>メールアドレス</th>
                        <th scope='col' className='px-6 py-3'>日付</th> 
                        <th scope='col' className='px-6 py-3'>操作</th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {emails.length > 0 ? (
                      emails.map((email) => (
                        <SubsTableItem 
                          key={email._id} 
                          id={email._id}
                          email={email.email} 
                          date={email.date}
                          deleteEmail={deleteEmail}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan='3' className='px-6 py-4 text-center text-gray-500'>
                          購読者が見つかりません
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