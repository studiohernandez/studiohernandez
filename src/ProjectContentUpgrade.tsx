import { useEffect } from 'react'

const HAUS_C_HERO='/img/projects/haus-c/01-hero-baustelle-aktuell.webp'

export default function ProjectContentUpgrade(){
  useEffect(()=>{
    const path=(window.location.pathname || '/').replace(/\/+$/,'') || '/'

    if(path==='/projekte/haus-c'){
      const hero=document.querySelector<HTMLImageElement>('.project-page__hero-image img')
      if(hero){
        hero.src=HAUS_C_HERO
        hero.alt='HAUS C – aktueller Baustand der Aufstockung in Wuppertal'
      }
    }

    if(path==='/projekte/haus-h33'){
      document.querySelectorAll<HTMLElement>('.project-page__plans-section').forEach(section=>section.remove())
      const blocks=document.querySelectorAll<HTMLElement>('.project-page--h33 .project-page__block')
      blocks.forEach(block=>block.classList.remove('section--last'))
      blocks[blocks.length-1]?.classList.add('section--last')
    }
  },[])

  return null
}
