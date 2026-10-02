import { useEffect } from 'react'

const replacements: Record<string,string> = {
  '01-hero-baustelle.jpeg': '01-hero-baustelle.webp',
  '02-bestand.jpeg': '02-bestand.webp',
  '04-konstruktion-01.jpeg': '04-konstruktion-01.webp',
  '05-konstruktion-02.jpeg': '05-konstruktion-02.webp',
  '06-bauprozess.jpeg': '06-bauprozess.webp',
  '07-drohnenaufnahme.jpeg': '07-drohnenaufnahme.webp',
  '08-baustand-2026.jpeg': '08-baustand-2026.webp',
}

export default function HausCImageUpgrade(){
  useEffect(()=>{
    const upgrade=()=>{
      document.querySelectorAll<HTMLImageElement>('img[src*="/img/projects/haus-c/"]').forEach(img=>{
        const current=img.getAttribute('src') || ''
        const filename=current.split('/').pop() || ''
        const replacement=replacements[filename]
        if(replacement){
          img.src=`/img/projects/haus-c/${replacement}`
        }
      })
    }

    upgrade()
    const observer=new MutationObserver(upgrade)
    observer.observe(document.body,{childList:true,subtree:true})
    return()=>observer.disconnect()
  },[])

  return null
}
