import { GetServerSideProps } from 'next'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🛒 Marketplace Platform
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Welcome to the Marketplace</h2>
            <p className="text-gray-600 mb-4">
              A modern marketplace platform built with Next.js and Nest.js
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">For Buyers</h3>
                <p className="text-sm text-blue-600">Browse products, place orders, track purchases</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">For Vendors</h3>
                <p className="text-sm text-green-600">List products, manage inventory, process orders</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">For Admins</h3>
                <p className="text-sm text-purple-600">Manage users, monitor platform, analytics</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              Get Started
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}