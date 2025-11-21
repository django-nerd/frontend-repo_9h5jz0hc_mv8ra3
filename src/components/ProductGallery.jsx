import React from 'react'

export default function ProductGallery({ images = [], title }){
  if(!images || images.length === 0){
    images = ['https://placehold.co/1200x800?text=Flames.Blue']
  }
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {images.map((src, i)=> (
        <img key={i} src={src} alt={`${title} ${i+1}`} className="w-full object-cover rounded-xl border border-white/10" />
      ))}
    </div>
  )
}
