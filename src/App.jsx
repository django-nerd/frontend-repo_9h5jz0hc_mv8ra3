import React, { useEffect, useState } from 'react'
import ProductCard from './components/ProductCard'
import ProductGallery from './components/ProductGallery'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function App(){
  const [items, setItems] = useState([])
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    async function load(){
      try{
        setLoading(true)
        const res = await fetch(`${API_BASE}/api/products`)
        const data = await res.json()
        setItems(Array.isArray(data) ? data : [])
      }catch(e){
        setError('Could not load products')
      }finally{
        setLoading(false)
      }
    }
    load()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Flames.Blue" className="w-8 h-8" />
            <div className="font-serif text-xl">Flames.Blue</div>
          </div>
          <div className="text-blue-300 text-sm">Handcrafted goods from India</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="mb-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <img src="https://placehold.co/900x600?text=Flames.Blue+Hero" alt="Flames.Blue" className="rounded-2xl border border-white/10" />
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-3">Warm craft, deep blue.</h1>
              <p className="text-blue-200/80">Ethically-made handcrafted bags, temple boxes and wall art. Support artisans — sustainably sourced and lovingly made.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Products</h2>
            <span className="text-sm text-blue-300/80">{items.length} items</span>
          </div>

          {loading && <div className="text-blue-300">Loading products…</div>}
          {error && <div className="text-red-300">{error}</div>}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(p => (
              <ProductCard key={p.id || p._id} p={p} onView={setActive} />
            ))}
          </div>
        </section>
      </main>

      {active && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setActive(null)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-3xl w-full overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="text-lg font-medium">{active.title}</div>
              <button className="text-blue-300 hover:text-white" onClick={()=>setActive(null)}>Close</button>
            </div>
            <div className="p-4 grid md:grid-cols-2 gap-4">
              <ProductGallery images={active.images} title={active.title} />
              <div>
                <div className="text-blue-300">{active.category}</div>
                <div className="text-2xl font-semibold mt-2">₹{active.price}</div>
                <p className="text-blue-200/80 mt-4">{active.description || 'Handcrafted item from Flames.Blue collection.'}</p>
                <button className="mt-6 inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-blue-300/80">© {new Date().getFullYear()} Flames.Blue</div>
      </footer>
    </div>
  )
}
