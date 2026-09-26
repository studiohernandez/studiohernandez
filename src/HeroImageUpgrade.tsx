import { useEffect } from 'react'

const HERO_SRC='/img/hero-studiohernandez.webp'

export default function HeroImageUpgrade(){
  useEffect(()=>{
    const media=window.matchMedia('(max-width: 800px)')

    const applyHero=()=>{
      const image=document.querySelector<HTMLImageElement>('.hero__image img')
      if(!image) return
      image.src=HERO_SRC
      image.alt='HAUS C – Aufstockung eines Wohnhauses im Bau'
      image.style.objectPosition=media.matches ? '56% center' : '50% center'
    }

    applyHero()
    media.addEventListener('change',applyHero)
    return()=>media.removeEventListener('change',applyHero)
  },[])

  return null
}
