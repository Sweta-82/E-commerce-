import React, { useEffect } from 'react';
import Button from '../components/Button';
import { FaPlus } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from '../features/admin/adminSlice';
import { Link } from 'react-router-dom';
import GenericPagination from '../components/GenericPagination';
import Loader from '../components/Loader';

function ProductList() {
  const { products, loading, error, productCount, resultPerPage } = useSelector(state => state.admin);
  const [currentPage, setCurrentPage] = React.useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts(currentPage))
  }, [dispatch, currentPage])

  const totalPages = Math.ceil(productCount / resultPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  if (loading) {
    return <Loader />
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Products</h1>
        <p className="text-gray-500 text-lg">No Products Found</p>
      </div>

    )
  }

  return (
    <>
      <Navbar />
      <PageTitle title={'All Products'} />

      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
              <Link to="/admin/products/create">
                <Button
                  text="Create Product"
                  Icon={FaPlus}
                  className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg border-none !mt-0"
                />
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Sl No.</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {products.map((product, index) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.image?.[0]?.url || 'https://via.placeholder.com/50'}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-md border border-gray-200 shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{product.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">₹{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500 font-medium">★ {product.ratings}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">{product.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock > 0 ? product.stock : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <Link to={`/admin/product/${product._id}`}>
                            <button className="text-black hover:text-gray-700 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors" title="Edit">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                            </button>
                          </Link>
                          <button className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition-colors" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-gray-50 border-t border-gray-200 p-4">
              <GenericPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductList;
