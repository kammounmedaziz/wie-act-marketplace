// pages/vendor/products.tsx
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import UserProfileDropdown from '../../components/UserProfileDropdown'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  profileImage?: string
  farmLocation?: string
}

type Produit = {
  id: string
  titre: string
  description: string
  prix: number
  photo: string      // /public/... ou URL
  quantité: number
}

export default function ProductsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // ---- Auth + user (même logique que le Dashboard) --------------------------
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== 'farmer') {
        router.push('/auth/login')
        return
      }
      setUser(parsedUser)
    } catch {
      router.push('/auth/login')
      return
    }

    setIsLoading(false)
  }, [router])

  // ---- Données de démo (remplace par fetch/SSR plus tard) -------------------
  const produits: Produit[] = [
    { id: '1', titre: 'Carottes Bio', description: 'Riches en vitamines, issues de fermes locales.', prix: 3.99, photo: '/imgs/carrots.jpg', quantité: 50 },
    { id: '2', titre: 'Tomates Mûres', description: 'Tomates juteuses de serre, parfaites pour salades.', prix: 4.99, photo: '/imgs/tomatoes.jpg', quantité: 30 },
    { id: '3', titre: 'Laitue Croquante', description: 'Fraîche et croquante, idéale pour les salades.', prix: 2.99, photo: '/imgs/lettuce.jpg', quantité: 25 },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200">
        <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Loading...
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200">
      {/* ---- Top bar identique au Dashboard ---- */}
      <nav className="fixed w-full top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent flex items-center space-x-2"
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </span>
              <span>AGRI-HOPE</span>
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700 hidden lg:block">Welcome back!</span>
              <Link
                href="/vendor/products/new"
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300 font-medium text-sm"
              >
                Add Product
              </Link>
              {/* ⬇️ Ici on passe le VRAI user (comme dans le Dashboard) */}
              <UserProfileDropdown user={user} />
            </div>
          </div>
        </div>
      </nav>

      {/* ---- Contenu avec le même padding top que le Dashboard ---- */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              🛒 Product List
            </h1>
            <p className="text-gray-600 mt-2">Manage your agricultural products</p>
          </div>

          {/* Barre de recherche / actions */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-pink-200/20 p-4 mb-6">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
              id="search"
              type="search"
              placeholder="Search…"
              className="w-full rounded-xl border border-pink-200/40 bg-white/60 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>

          {/* Grille produits — styles coordonnés avec le Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {produits.map((p) => (
              <article key={p.id} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-pink-200/20 p-6 hover:bg-white/20 transition-all duration-300">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-pink-200/20">
                  <Image
                    src={p.photo}
                    alt={p.titre}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">{p.titre}</h3>
                  <p className="text-sm text-gray-700/90">{p.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                      ${p.prix.toFixed(2)}
                    </div>
                    <div className={`text-xs ${p.quantité <= 10 ? 'text-rose-700' : 'text-emerald-700'}`}>
                      Stock : {p.quantité} unités
                    </div>
                  </div>

                  <button
                    type="button"
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300 text-sm font-medium"
                    aria-label={`Ajouter ${p.titre} au panier`}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
