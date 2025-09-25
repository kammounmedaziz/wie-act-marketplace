import React, { useState } from 'react';

export default function SignupPage() {
  const [userType, setUserType] = useState<'farmer' | 'buyer'>('farmer');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-yellow-300/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-md w-full space-y-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-pink-200/20">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              🌾 Join AGRI-HOPE
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Create your agricultural marketplace account
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mt-6 flex rounded-lg bg-white/30 backdrop-blur-sm p-1">
            <button
              type="button"
              onClick={() => setUserType('farmer')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                userType === 'farmer'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              🚜 Farmer
            </button>
            <button
              type="button"
              onClick={() => setUserType('buyer')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                userType === 'buyer'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              🏪 Buyer
            </button>
          </div>
          
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First name"
                    className="appearance-none relative block w-full px-4 py-3 border border-pink-200/30 placeholder-gray-500 text-gray-900 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="appearance-none relative block w-full px-4 py-3 border border-pink-200/30 placeholder-gray-500 text-gray-900 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-4 py-3 border border-pink-200/30 placeholder-gray-500 text-gray-900 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="appearance-none relative block w-full px-4 py-3 border border-pink-200/30 placeholder-gray-500 text-gray-900 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="appearance-none relative block w-full px-4 py-3 border border-pink-200/30 placeholder-gray-500 text-gray-900 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="appearance-none relative block w-full px-4 py-3 border border-pink-200/30 placeholder-gray-500 text-gray-900 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                />
              </div>
              
              {userType === 'farmer' && (
                <div>
                  <input
                    type="text"
                    placeholder="Farm location"
                    className="appearance-none relative block w-full px-4 py-3 border border-pink-200/30 placeholder-gray-500 text-gray-900 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-pink-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-pink-600 hover:text-pink-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Create AGRI-HOPE Account
              </button>
            </div>
            
            <div className="text-center">
              <a href="/auth/login" className="text-pink-600 hover:text-pink-500 transition-colors">
                Already have an account? Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}