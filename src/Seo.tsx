import { useEffect } from 'react'

const BASE_URL = 'https://studiohernandez.eu'
const DEFAULT_IMAGE = `${BASE_URL}/img/01-hero-studiohernandez.webp`

type SeoConfig = {
  title: string
  description: string
  canonicalPath: string
  robots: string
  image?: string
}

const SEO_PAGES: Record<string, SeoConfig> = {
  '/': {
    title: 'Architekt in Wuppertal | STUDIO HERNÁNDEZ',
    description: 'STUDIO HERNÁNDEZ ist ein Architekturbüro in Wuppertal für Umbau, Aufstockung, Erweiterung und Nutzungsänderung im Bestand.',
    canonicalPath: '/',
    robots: 'index,follow,max-image-preview:large',
    image: DEFAULT_IMAGE,
  },
  '/projekte/haus-c': {
    title: 'HAUS C – Aufstockung in Wuppertal | STUDIO HERNÁNDEZ',
    description: 'Aufstockung eines Wohnhauses in Wuppertal in Holzrahmenbauweise – ein Projekt von STUDIO HERNÁNDEZ zum Weiterbauen im Bestand.',
    canonicalPath: '/projekte/haus-c/',
    robots: 'index,follow,max-image-preview:large',
    image: `${BASE_URL}/img/projects/haus-c/01-hero-baustelle-aktuell.webp`,
  },
  '/projekte/haus-h33': {
    title: 'HAUS H33 – Erweiterung in Wuppertal | STUDIO HERNÁNDEZ',
    description: 'Erweiterung und Neuordnung eines bestehenden Wohnhauses in Wuppertal. Ein Projekt von STUDIO HERNÁNDEZ, derzeit in Planung.',
    canonicalPath: '/projekte/haus-h33/',
    robots: 'index,follow,max-image-preview:large',
    image: `${BASE_URL}/img/projects/haus-h33/photos/01-strasse.png`,
  },
  '/impressum': {
    title: 'Impressum | STUDIO HERNÁNDEZ',
    description: 'Impressum und berufsrechtliche Angaben von STUDIO HERNÁNDEZ in Wuppertal.',
    canonicalPath: '/impressum/',
    robots: 'noindex,follow',
    image: DEFAULT_IMAGE,
  },
  '/datenschutz': {
    title: 'Datenschutz | STUDIO HERNÁNDEZ',
    description: 'Datenschutzhinweise von STUDIO HERNÁNDEZ in Wuppertal.',
    canonicalPath: '/datenschutz/',
    robots: 'noindex,follow',
    image: DEFAULT_IMAGE,
  },
}

function normalizedPathname(){
  const current = window.location.pathname || '/'
  if(current === '/') return '/'
  return current.replace(/\/+$/, '')
}

function setMeta(attribute: 'name' | 'property', key: string, content: string){
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if(!element){
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function setCanonical(href: string){
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if(!element){
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = href
}

export default function Seo(){
  useEffect(()=>{
    const path = normalizedPathname()
    const config = SEO_PAGES[path] ?? {
      title: 'STUDIO HERNÁNDEZ',
      description: 'STUDIO HERNÁNDEZ – Architektur in Wuppertal.',
      canonicalPath: path.endsWith('/') ? path : `${path}/`,
      robots: 'noindex,nofollow',
      image: DEFAULT_IMAGE,
    }

    const canonical = `${BASE_URL}${config.canonicalPath}`
    const image = config.image || DEFAULT_IMAGE

    document.title = config.title
    setCanonical(canonical)

    setMeta('name', 'description', config.description)
    setMeta('name', 'robots', config.robots)
    setMeta('name', 'author', 'STUDIO HERNÁNDEZ')

    setMeta('property', 'og:site_name', 'STUDIO HERNÁNDEZ')
    setMeta('property', 'og:locale', 'de_DE')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:title', config.title)
    setMeta('property', 'og:description', config.description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:image:alt', config.title)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', config.title)
    setMeta('name', 'twitter:description', config.description)
    setMeta('name', 'twitter:image', image)
  },[])

  return null
}
