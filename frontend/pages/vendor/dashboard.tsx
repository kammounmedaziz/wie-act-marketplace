import React from 'react';

export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200">
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              🌾 AGRI-HOPE Vendor Dashboard
            </h1>
            <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 font-medium">
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-pink-200/20 p-6 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
            <p className="text-3xl font-bold text-pink-600">12</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-pink-200/20 p-6 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-800">Active Orders</h3>
            <p className="text-3xl font-bold text-rose-600">8</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-pink-200/20 p-6 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-800">Revenue</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">$2,450</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-pink-200/20">
          <div className="px-6 py-4 border-b border-pink-200/20">
            <h3 className="text-lg font-semibold text-gray-800">Recent Products</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-700">Your agricultural products will appear here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}