import React from 'react'
import { toast } from 'react-toastify'

const SubsTableItem = ({id, email, date, deleteEmail}) => {
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
      await deleteEmail(id);
      // Toast is already handled in the parent component
    } catch (error) {
      console.error('Error deleting email:', error);
      toast.error('メールアドレスの削除に失敗しました');
    }
  }

  return (
    <tr className='bg-white border-b text-left'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{email ? email : 'メールアドレスなし'}</th>
        <td className='px-6 py-4 hidden sm:block'>{formatDate(date)}</td>
        <td className='px-6 py-4 cursor-pointer text-red-600 hover:text-red-800' onClick={handleDelete}>削除</td>
    </tr>
  )
}

export default SubsTableItem