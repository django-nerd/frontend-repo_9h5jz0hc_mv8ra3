import React from 'react'

export default function ProductCard({ p, onView }){
  return (
    <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-blue-400/40 transition">
      <div className="aspect-[4/3] bg-slate-900/40">
        <img src={p.images?.[0] || 'https://placehold.co/600x400?text=Flames.Blue'} alt={p.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <div className="text-white/90 font-medium truncate">{p.title}</div>
        <div className="text-blue-300 text-sm mt-1">₹{p.price?.toLocaleString?.() || p.price} {p.currency || 'INR'}</div>
        <button onClick={()=>onView?.(p)} className="mt-3 inline-flex items-center px-3 py-1.5 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 text-white">Quick view</button>
      </div>
    </div>
  )
}
