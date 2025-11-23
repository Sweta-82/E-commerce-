import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from '../features/admin/adminSlice';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'
function ProductList() {
    const {products, loading, error}=useSelector(state=>state.admin);
    console.log("Product full data",products);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAdminProducts())
    },[dispatch])
    

    useEffect(()=>{
      
    })

    if(loading){
      return <Loader/>
    }

    if(!products || products.length===0){
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-[#1e2939]">All Products</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-[#fff001]">
              <thead className="bg-[#fff001] text-black">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Sl no.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Product Image</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Product Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Created At</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product, index) => (
                    <tr key={product._id}>
                      <td className="px-4 py-4 text-sm">{index + 1}</td>
                      <td className="px-4 py-4 text-sm">
                        <img src={product.image?.[0]?.url || 'https://via.placeholder.com/50'} alt={product.name} className="w-12 h-12 object-cover" />
                      </td>
                      <td className="px-4 py-4 text-sm">{product.name}</td>
                      <td className="px-4 py-4 text-sm">₹{product.price}</td>
                      <td className="px-4 py-4 text-sm">{product.ratings}</td>
                      <td className="px-4 py-4 text-sm">{product.category}</td>
                      <td className="px-4 py-4 text-sm">{product.stock}</td>
                      <td className="px-4 py-4 text-sm">{new Date(product.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm space-x-2">

                        <Link to={`/admin/product/${product._id}`}>
                        
                        <button className="px-3 py-1 bg-[#fff001] text-black rounded-md font-medium hover:brightness-90">Edit</button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded-md font-medium hover:bg-red-600">Delete</button>
                        </Link>
                      </td>
                    </tr>
  ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductList;
