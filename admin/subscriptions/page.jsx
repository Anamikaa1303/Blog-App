'use client';

import React, { useState, useEffect } from 'react';
import SubsTableItem from '@/components/AdminComponents/SubsTableItem';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email');
      setEmails(response.data.emails);
    } catch (error) {
      toast.error('Failed to fetch subscriptions');
    }
  };

  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete('/api/email', { params: { id: mongoId } });
      if (response.data.success) {
        toast.success(response.data.msg);
        fetchEmails();
      }
    } catch (error) {
      toast.error('Failed to delete email');
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-4 sm:pt-12 sm:pl-8 md:px-12 lg:px-16">
      <ToastContainer theme="dark" />
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">All Subscriptions</h1>

      {/* Table layout for medium+ screens */}
      <div className="hidden md:block overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
        <table className="min-w-full w-full text-sm sm:text-base text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs sm:text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left hidden sm:table-cell">Date</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {emails.length > 0 ? (
              emails.map((item, index) => (
                <SubsTableItem
                  key={index}
                  mongoId={item._id}
                  email={item.email}
                  date={item.date}
                  deleteEmail={deleteEmail}
                />
              ))
            ) : (
              <tr>
                <td className="px-6 py-4" colSpan={3}>
                  No Subscriptions Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="flex flex-col gap-4 md:hidden">
        {emails.length > 0 ? (
          emails.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{item.email}</span>
                <button
                  onClick={() => deleteEmail(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
              <span className="text-sm text-gray-500">{new Date(item.date).toDateString()}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No Subscriptions Found</p>
        )}
      </div>
    </div>
  );
};

export default Page;
