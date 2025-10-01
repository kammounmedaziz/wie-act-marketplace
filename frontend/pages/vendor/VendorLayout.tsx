// components/VendorLayout.tsx
import * as React from 'react'
import Link from 'next/link'
import UserProfileDropdown from 'components/UserProfileDropdown'

type VendorLayoutProps = {
  user?: { firstName?: string; lastName?: string }
  rightCta?: React.ReactNode      // ex: bouton "Add Product"
  children: React.ReactNode
}

export default function VendorLayout({ user, rightCta, children }: VendorLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200">
      {/* Header fixe - même que Dashboard */}
      <nav className="fixed w-full top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent flex items-center space-x-2"
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 grid place-items-center text-white text-sm font-bold">A</span>
              <span>AGRI-HOPE</span>
            </Link>
            <div className="flex items-center gap-3">
              {rightCta}
              <UserProfileDropdown user={{
                id: 'id',
                email: 'user@mail.com',
                firstName: user?.firstName ?? 'User',
                lastName: user?.lastName ?? '',
                role: 'farmer'
              }} />
            </div>
          </div>
        </div>
      </nav>

      {/* même top padding pour compenser le header fixe */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  )
}
