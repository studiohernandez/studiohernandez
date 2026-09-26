import { useEffect, useState } from 'react'

const projects = [
  { number:'01', title:'Haus C', type:'Aufstockung', description:'Aufstockung eines Einfamilienhauses', location:'Wuppertal', year:'2024–2026', image:'haus-c.png', className:'project--wide' },
  { number:'02', title:'Haus H33', type:'Erweiterung', description:'Erweiterung und Neuordnung eines Wohnhauses', location:'Wuppertal', year:'In Planung', image:'haus-h33.png', className:'project--tall' },
  { number:'03', title:'Casa del Llano', type:'Wohnhaus', description:'Ein Haus zwischen Meer und Wüstenlandschaft', location:'Carboneras · Almería', year:'Studie', image:'casa-llano.png', className:'project--landscape' },
]

const services = [
  ['01','Bauen im Bestand','Sanierung, Umbau und Weiterentwicklung bestehender Gebäude.'],
  ['02','Aufstockung & Erweiterung','Neue Flächen durch Weiterbauen vorhandener Strukturen.'],
  ['03','Nutzungsänderung','Entwicklung neuer Nutzungsmöglichkeiten und Begleitung durch das Genehmigungsverfahren.'],
  ['04','Machbarkeit & Genehmigung','Baurechtliche Prüfung, Entwurf und Bauantrag.'],
]

const imageUrl=(name:string)=>`/img/${name}`

function ArrowLink({href,children}:{href:string;children:React.ReactNode}){
  return <a className="arrow-link" href={href}>{children}<span aria-hidden="true">↗</span></a>
}

function ProjectCard({project}:{project:typeof projects[number]}){
  return <article className={`project ${project.className}`}>
    <div className="project__image" aria-label={`${project.title} ansehen`}>
      <img src={imageUrl(project.image)} alt={`${project.title}, ${project.type}`} loading="lazy" />
    </div>
    <div className="project__meta">
      <span>{project.number}</span>
      <div><h3>{project.title} — {project.type}</h3><p>{project.description}</p></div>
      <div><p>{project.location}</p><p>{project.year}</p></div>
      <span aria-hidden="true">↗</span>
    </div>
  </article>
}

function ServiceItem({service}:{service:string[]}){
  return <article className="service">
    <div className="service__diagram" aria-hidden="true"><span/><span/></div>
    <p className="eyebrow">{service[0]}</p>
    <h3>{service[1]}</h3>
    <p>{service[2]}</p>
  </article>
}

export default function App(){
  const [menuOpen,setMenuOpen]=useState(false)
  const [showBackToTop,setShowBackToTop]=useState(false)
  const closeMenu=()=>setMenuOpen(false)

  useEffect(()=>{
    const handleScroll=()=>setShowBackToTop(window.scrollY > Math.max(420, window.innerHeight * .55))
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive:true })
    return ()=>window.removeEventListener('scroll', handleScroll)
  },[])

  return <>
    <header className="site-header">
      <a href="#top" className="wordmark wordmark--header" aria-label="STUDIO HERNÁNDEZ, Startseite">
        <strong className="wordmark__brand"><span className="wordmark__studio">STUDIO</span><span className="wordmark__name">HERNÁNDEZ</span></strong>
      </a>
      <p className="header-meta">ARCHITEKTUR · WUPPERTAL</p>
      <nav id="navigation" className={menuOpen?'nav nav--open':'nav'} aria-label="Hauptnavigation">
        <a href="#projekte" onClick={closeMenu}>Projekte</a>
        <a href="#studio" onClick={closeMenu}>Studio</a>
        <a href="#leistungen" onClick={closeMenu}>Leistungen</a>
        <a href="#kontakt" onClick={closeMenu}>Kontakt</a>
      </nav>
      <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="navigation">
        <span>{menuOpen?'Schließen':'Menü'}</span>
      </button>
    </header>

    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <h1 id="hero-title">Architektur<br/>für den <em>Bestand.</em></h1>
          <div className="hero__footer">
            <p>Umbau · Erweiterung · Aufstockung · Nutzungsänderung</p>
            <ArrowLink href="#projekte">Projekte ansehen</ArrowLink>
          </div>
        </div>
        <figure className="hero__image">
          <img src={imageUrl('hero-house.png')} alt="Zeitgenössische Erweiterung eines Wohnhauses" fetchPriority="high"/>
          <figcaption><span>Wuppertal, DE</span><span>51° 15′ N</span></figcaption>
        </figure>
      </section>

      <section className="projects section" id="projekte" aria-labelledby="projects-title">
        <header className="section-heading">
          <p className="eyebrow">01 / Arbeiten</p>
          <h2 id="projects-title">Ausgewählte<br/>Projekte</h2>
          <p>Eine Auswahl aktueller Arbeiten im Spannungsfeld von Bestand, Kontext und Weiterbauen.</p>
        </header>
        <div className="project-grid">{projects.map(project=><ProjectCard key={project.title} project={project}/>)}</div>
      </section>

      <section className="services section section--dark" id="leistungen" aria-labelledby="services-title">
        <header className="section-heading">
          <p className="eyebrow">02 / Leistungen</p>
          <h2 id="services-title">Weiterbauen<br/>statt neu beginnen.</h2>
        </header>
        <div className="services-grid">{services.map(service=><ServiceItem key={service[0]} service={service}/>)}</div>
      </section>

      <section className="studio section" id="studio" aria-labelledby="studio-title">
        <header className="section-heading">
          <p className="eyebrow">03 / Studio</p>
          <h2 id="studio-title">Das Studio</h2>
        </header>
        <div className="studio__grid">
          <figure>
            <img src={imageUrl('portrait.png')} alt="Danyel Hernández, Architekt" loading="lazy"/>
            <figcaption>Porträt / Danyel Hernández</figcaption>
          </figure>
          <div className="studio__content">
            <p className="eyebrow">Danyel Hernández<br/>Architekt M.Sc.</p>
            <p className="studio__intro">STUDIO HERNÁNDEZ entwickelt Architektur aus dem Bestand heraus.</p>
            <p>Bestehende Gebäude besitzen Strukturen, Materialien und Geschichten. Mein Ansatz besteht nicht darin, diese zu überdecken, sondern ihre Potenziale zu erkennen und weiterzuentwickeln.</p>
            <div className="vita">
              <div><span>Ausbildung</span><p>Bergische Universität Wuppertal<br/>Universidad de Granada<br/>TU Dortmund</p></div>
              <div><span>Praxis</span><p>Rocho Architekten<br/>ACMS Architekten<br/>STUDIO HERNÁNDEZ</p></div>
            </div>
            <p className="membership">Mitglied der Architektenkammer Nordrhein-Westfalen</p>
          </div>
        </div>
      </section>

      <section className="contact section" id="kontakt" aria-labelledby="contact-title">
        <p className="eyebrow">04 / Kontakt</p>
        <h2 id="contact-title">Lassen Sie uns über<br/>Ihr Projekt <em>sprechen.</em></h2>
        <div className="contact__footer">
          <p>Ob erste Idee, Machbarkeitsprüfung oder konkretes Vorhaben –<br/>ich freue mich auf Ihre Anfrage.</p>
          <ArrowLink href="mailto:mail@studiohernandez.eu">Kontakt aufnehmen</ArrowLink>
        </div>
      </section>
    </main>

    <a className={showBackToTop?'back-to-top back-to-top--visible':'back-to-top'} href="#top" aria-label="Nach oben scrollen">
      <span>NACH OBEN</span><span aria-hidden="true">↑</span>
    </a>

    <footer>
      <a href="#top" className="wordmark wordmark--footer" aria-label="STUDIO HERNÁNDEZ, nach oben"><strong>STUDIO HERNÁNDEZ</strong></a>
      <div><p>Architektur · Wuppertal</p><a href="mailto:mail@studiohernandez.eu">mail@studiohernandez.eu</a></div>
      <div><a href="#top">Nach oben ↑</a><p>© {new Date().getFullYear()}</p></div>
    </footer>
  </>
}
