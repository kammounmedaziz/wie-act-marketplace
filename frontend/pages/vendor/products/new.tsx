// pages/vendor/products/new.tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import UserProfileDropdown from '../../../components/UserProfileDropdown'

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  profileImage?: string
  farmLocation?: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    titre: '',
    description: '',
    prix: '',
    photo: '', // filled after upload
    quantité: '',
  })
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (!token || !userData) {
      router.push('/auth/login')
      return
    }
    try {
      const parsed = JSON.parse(userData)
      if (parsed.role !== 'farmer') {
        router.push('/auth/login')
        return
      }
      setUser(parsed)
    } catch {
      router.push('/auth/login')
      return
    }
    setLoadingUser(false)
  }, [router])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    const file = e.target.files[0]
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('http://localhost:3001/api/products/upload', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Upload failed')
      setForm((f) => ({ ...f, photo: data.url }))
    } catch (err: any) {
      alert(`❌ Upload failed: ${err.message}`)
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.photo) {
      alert('Please upload a photo before creating the product.')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titre: form.titre.trim(),
          description: form.description.trim(),
          prix: Number(form.prix),
          photo: form.photo.trim(),
          quantité: Number(form.quantité),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || data?.message || `HTTP ${res.status}`)
      router.push('/vendor/products')
    } catch (err: any) {
      alert(`❌ Could not create product: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200">
        <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Loading…
        </div>
      </div>
    )
  }
  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200">
      {/* Top Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent flex items-center space-x-2"
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 grid place-items-center text-white text-sm font-bold">
                A
              </span>
              <span>AGRI-HOPE</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/vendor/products"
                className="bg-white/60 text-rose-600 border border-pink-200/50 px-4 py-2 rounded-full hover:scale-105 transition text-sm font-medium"
              >
                Back to Products
              </Link>
              <UserProfileDropdown user={user} />
            </div>
          </div>
        </div>
      </nav>

      {/* Form */}
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-pink-200/20 p-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">
              Add New Product
            </h1>

            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Title */}
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-800">Title</label>
                <input
                  required
                  value={form.titre}
                  onChange={(e) => setForm({ ...form, titre: e.target.value })}
                  className="rounded-xl border border-pink-200/40 bg-white/70 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="e.g. Organic Carrots"
                />
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-800">Description</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="rounded-xl border border-pink-200/40 bg-white/70 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  rows={4}
                  placeholder="Fresh products from local farms..."
                />
              </div>

              {/* Price + Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-800">Price</label>
                  <input
                    required type="number" step="0.01" min="0"
                    value={form.prix}
                    onChange={(e) => setForm({ ...form, prix: e.target.value })}
                    className="rounded-xl border border-pink-200/40 bg-white/70 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="3.99"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-800">Quantity</label>
                  <input
                    required type="number" min="0"
                    value={form.quantité}
                    onChange={(e) => setForm({ ...form, quantité: e.target.value })}
                    className="rounded-xl border border-pink-200/40 bg-white/70 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="50"
                  />
                </div>
              </div>

              {/* Upload Photo */}
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-800">Photo (upload from PC)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="rounded-xl border border-pink-200/40 bg-white/70 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                {uploading && <p className="text-sm text-gray-600">Uploading...</p>}
                {preview && (
                  <div className="mt-2">
                    <img src={preview} alt="preview" className="w-48 h-32 object-cover rounded-lg border border-pink-200/40" />
                  </div>
                )}
                {form.photo && !uploading && (
                  <p className="text-sm text-emerald-700">✅ Uploaded: {form.photo}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full hover:scale-105 transition font-medium disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Create Product'}
                </button>
                <Link href="/vendor/products" className="text-sm text-gray-700 underline">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
