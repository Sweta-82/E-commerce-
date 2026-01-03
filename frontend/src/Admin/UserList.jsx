import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import Loader from '../components/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaUserEdit } from 'react-icons/fa';

import GenericPagination from '../components/GenericPagination';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async (page = 1) => {
        try {
            const { data } = await axios.get(`/api/v1/admin/users?page=${page}`);
            setUsers(data.users);
            const count = data.usersCount || data.users.length;
            const perPage = data.resultPerPage || 8;
            setTotalPages(Math.ceil(count / perPage));
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch users');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/api/v1/admin/user/${id}`);
                toast.success('User Deleted Successfully');
                fetchUsers();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Delete Failed');
            }
        }
    };

    const handleRoleUpdate = async (id, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        if (window.confirm(`Are you sure you want to change role to ${newRole}?`)) {
            try {
                await axios.put(`/api/v1/admin/user/${id}`, { role: newRole });
                toast.success(`User role updated to ${newRole}`);
                fetchUsers();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Update Failed');
            }
        }
    }


    if (loading) return <Loader />;

    return (
        <>
            <Navbar />
            <PageTitle title="All Users" />
            <div className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-6 text-[#1e2939]">All Users</h1>

                    {users.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">No Users Found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 border border-[#fff001]">
                                <thead className="bg-[#fff001] text-black">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">User ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="px-4 py-4 text-sm font-mono">{user._id}</td>
                                            <td className="px-4 py-4 text-sm flex items-center gap-2">
                                                <img src={user.avatar?.url || 'https://via.placeholder.com/40'} alt="avatar" className="w-8 h-8 rounded-full border" />
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-4 text-sm">{user.email}</td>
                                            <td className="px-4 py-4 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                    onClick={() => handleRoleUpdate(user._id, user.role)}
                                                    title="Click to toggle role"
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm space-x-2 flex">
                                                <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-700">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <GenericPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserList;
