import { useEffect, useState } from 'react'

const projectImage=(name:string)=>`/img/projects/haus-c/${name}`
const fallback=(event:React.SyntheticEvent<HTMLImageElement>)=>{
  const image=event.currentTarget
  if(!image.dataset.fallback){
    image.dataset.fallback='true'
    image.src='/img/haus-c.png'
  }
}

export default function HausC(){
  const [menuOpen,setMenuOpen]=useState(false)
  const [showBackToTop,setShowBackToTop]=useState(false)

  useEffect(()=>{
    const handleScroll=()=>setShowBackToTop(window.scrollY > Math.max(420, window.innerHeight * .55))
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive:true })
    return ()=>window.removeEventListener('scroll', handleScroll)
  },[])

  return <>
    <header className="site-header">
      <a href="/" className="wordmark wordmark--header" aria-label="STUDIOHERNÁNDEZ, Startseite">
        <strong className="wordmark__brand"><span className="wordmark__studio">STUDIO</span><span className="wordmark__name">HERNÁNDEZ</span></strong>
      </a>
      <p className="header-meta">ARCHITEKTUR · WUPPERTAL</p>
      <nav id="navigation" className={menuOpen?'nav nav--open':'nav'} aria-label="Hauptnavigation">
        <a href="/#projekte" onClick={()=>setMenuOpen(false)}>Projekte</a>
        <a href="/#studio" onClick={()=>setMenuOpen(false)}>Studio</a>
        <a href="/#leistungen" onClick={()=>setMenuOpen(false)}>Leistungen</a>
        <a href="/#kontakt" onClick={()=>setMenuOpen(false)}>Kontakt</a>
      </nav>
      <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="navigation">
        <span>{menuOpen?'Schließen':'Menü'}</span>
      </button>
    </header>

    <main id="top" className="project-detail">
      <section className="project-detail__title section">
        <p className="eyebrow">01 / Projekt</p>
        <h1>HAUS C</h1>
        <div className="project-detail__meta">
          <p>Aufstockung eines Wohnhauses</p>
          <p>Wuppertal · 2024–2026</p>
        </div>
      </section>

      <figure className="project-detail__hero">
        <img src={projectImage('IMG_6793.jpeg')} onError={fallback} alt="HAUS C im Bauzustand mit sichtbarer Holzrahmenkonstruktion" />
        <figcaption>BAUPROZESS / HOLZRAHMENBAU</figcaption>
      </figure>

      <section className="project-detail__summary section">
        <p className="eyebrow">AUFSTOCKUNG · HOLZRAHMENBAU</p>
        <p className="project-detail__lead">Die Aufstockung erweitert das bestehende Wohnhaus um ein zusätzliches Geschoss in Holzrahmenbauweise. Der Entwurf entwickelt den Bestand weiter und schafft neue Wohnflächen mit großzügigen Außenbezügen.</p>
      </section>

      <section className="project-detail__block section">
        <div className="project-detail__label"><p className="eyebrow">BESTAND</p><p>Vor dem Umbau</p></div>
        <figure className="project-detail__image project-detail__image--landscape">
          <img src={projectImage('IMG_5085.jpeg')} onError={fallback} alt="Bestandsgebäude vor der Aufstockung" loading="lazy" />
        </figure>
      </section>

      <section className="project-detail__block section">
        <div className="project-detail__label"><p className="eyebrow">ENTWURF</p><p>Aufstockung und Erweiterung</p></div>
        <figure className="project-detail__image project-detail__image--landscape">
          <img src={projectImage('20B47421-B030-490D-8B5C-4FA1D7C37054.jpeg')} onError={fallback} alt="Visualisierung des Entwurfs" loading="lazy" />
        </figure>
      </section>

      <section className="project-detail__block section">
        <div className="project-detail__label"><p className="eyebrow">KONSTRUKTION</p><p>Leichte Aufstockung auf bestehender Tragstruktur.</p></div>
        <div className="project-detail__pair">
          <figure className="project-detail__image project-detail__image--portrait">
            <img src={projectImage('IMG_6800.jpeg')} onError={fallback} alt="Holzrahmenkonstruktion im Bau" loading="lazy" />
          </figure>
          <figure className="project-detail__image project-detail__image--portrait">
            <img src={projectImage('IMG_6775.jpeg')} onError={fallback} alt="Baufortschritt der Holzrahmenkonstruktion" loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="project-detail__block section">
        <div className="project-detail__label"><p className="eyebrow">BAUPROZESS</p><p>Abstimmung auf der Baustelle</p></div>
        <figure className="project-detail__image project-detail__image--portrait project-detail__image--narrow">
          <img src={projectImage('d946a785-ce0c-431d-a7b3-0f6c930453e9.jpeg')} onError={fallback} alt="Abstimmung auf der Baustelle während der Holzbauarbeiten" loading="lazy" />
        </figure>
      </section>

      <section className="project-detail__block section">
        <div className="project-detail__label"><p className="eyebrow">BAUPROZESS</p><p>Draufsicht</p></div>
        <figure className="project-detail__image project-detail__image--wide">
          <img src={projectImage('31f2bc34-e8f4-4cdb-afcb-9f4a8ec03dc2.jpeg')} onError={fallback} alt="Drohnenaufnahme der Aufstockung" loading="lazy" />
        </figure>
      </section>

      <section className="project-detail__block section">
        <div className="project-detail__label"><p className="eyebrow">BAUSTAND 2026</p><p>Fassade und Ausbau</p></div>
        <figure className="project-detail__image project-detail__image--portrait project-detail__image--narrow-right">
          <img src={projectImage('IMG_7315.jpeg')} onError={fallback} alt="Aktueller Bauzustand von HAUS C" loading="lazy" />
        </figure>
      </section>

      <a className="project-detail__next section" href="/#projekte">
        <span className="eyebrow">NÄCHSTES PROJEKT</span>
        <strong>HAUS H33 <span aria-hidden="true">→</span></strong>
      </a>
    </main>

    <a className={showBackToTop?'back-to-top back-to-top--visible':'back-to-top'} href="#top" aria-label="Nach oben scrollen">
      <span>NACH OBEN</span><span aria-hidden="true">↑</span>
    </a>

    <footer>
      <a href="/" className="wordmark wordmark--footer" aria-label="STUDIO HERNÁNDEZ, Startseite"><strong>STUDIO HERNÁNDEZ</strong></a>
      <div><p>Architektur · Wuppertal</p><a href="mailto:mail@studiohernandez.eu">mail@studiohernandez.eu</a></div>
      <div><a href="#top">Nach oben ↑</a><p>© {new Date().getFullYear()}</p></div>
    </footer>
  </>
}
