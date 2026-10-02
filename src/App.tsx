import { useEffect, useMemo, useState } from 'react'

const projects = [
  {
    number: '01',
    title: 'Haus C',
    type: 'Aufstockung',
    description: 'Aufstockung eines Einfamilienhauses',
    location: 'Wuppertal',
    year: 'In Ausführung',
    image: 'projects/haus-c/01-hero-baustelle.jpeg',
    className: 'project--wide',
    href: '/projekte/haus-c/',
  },
  {
    number: '02',
    title: 'Haus H33',
    type: 'Erweiterung',
    description: 'Erweiterung und Neuordnung eines Wohnhauses',
    location: 'Wuppertal',
    year: 'In Planung',
    image: 'projects/haus-h33/photos/02-zufahrt.png',
    className: 'project--tall',
    href: '/projekte/haus-h33/',
  },
  {
    number: '03',
    title: 'Casa del Llano',
    type: 'Wohnhaus',
    description: 'Ein Haus zwischen Meer und Wüstenlandschaft',
    location: 'Carboneras · Almería',
    year: 'Studie',
    image: 'casa-llano.png',
    className: 'project--landscape',
  },
]

const services = [
  ['01','Umbau & Weiterbau','Neuordnung, Sanierung und Weiterentwicklung bestehender Gebäude.','umbau'],
  ['02','Aufstockung & Erweiterung','Zusätzliche Wohn- oder Nutzflächen durch Weiterbauen am Bestand.','erweiterung'],
  ['03','Genehmigung & Nutzungsänderung','Baurechtliche Prüfung, Bauantrag und Begleitung von Nutzungsänderungen.','genehmigung'],
  ['04','Förderberatung Wohnen','Beratung zu Fördermöglichkeiten und zur Wohnraumförderung NRW für Vorhaben außerhalb der Stadt Remscheid.','foerderung'],
]

const imageUrl=(name:string)=>`/img/${name}`
const hausCImageUrl=(name:string)=>`/img/projects/haus-c/${name}`
const hausH33PhotoUrl=(name:string)=>`/img/projects/haus-h33/photos/${name}`

function ArrowLink({href,children}:{href:string;children:React.ReactNode}){
  return <a className="arrow-link" href={href}>{children}<span aria-hidden="true">↗</span></a>
}

function ProjectCard({project}:{project:typeof projects[number]}){
  const inner = <>
    <div className="project__image" aria-label={`${project.title} ansehen`}>
      <img src={imageUrl(project.image)} alt={`${project.title}, ${project.type}`} loading="lazy" />
    </div>
    <div className="project__meta">
      <span>{project.number}</span>
      <div><h3>{project.title} — {project.type}</h3><p>{project.description}</p></div>
      <div><p>{project.location}</p><p>{project.year}</p></div>
      <span aria-hidden="true">↗</span>
    </div>
  </>

  return <article className={`project ${project.className}`}>
    {project.href ? <a className="project__link" href={project.href}>{inner}</a> : inner}
  </article>
}

function ServiceIcon({type}:{type:string}){
  const common={
    width:'124',
    height:'92',
    viewBox:'0 0 124 92',
    fill:'none',
    stroke:'currentColor',
    strokeWidth:1.25,
    strokeLinecap:'square' as const,
    strokeLinejoin:'miter' as const,
    style:{width:'7.75rem',height:'5.75rem',opacity:.72},
  }

  if(type==='umbau') return <svg {...common} aria-hidden="true">
    <rect x="9" y="30" width="48" height="43"/>
    <path d="M57 44h43v29H57"/>
    <path d="M57 54h43" strokeDasharray="3 4" opacity=".55"/>
    <path d="M21 51h23M32.5 39.5v23"/>
  </svg>

  if(type==='erweiterung') return <svg {...common} aria-hidden="true">
    <rect x="10" y="41" width="48" height="32"/>
    <rect x="24" y="17" width="34" height="24"/>
    <rect x="58" y="49" width="39" height="24"/>
    <path d="M72 36V17m-5 5 5-5 5 5"/>
    <path d="M82 61h25m-5-5 5 5-5 5"/>
  </svg>

  if(type==='genehmigung') return <svg {...common} aria-hidden="true">
    <rect x="9" y="16" width="76" height="58"/>
    <path d="M36 16v58M36 43h49M58 43v31"/>
    <path d="M17 55h11M17 61h11" opacity=".6"/>
    <path d="M93 52l7 7 15-19"/>
    <path d="M91 68h25" opacity=".6"/>
  </svg>

  return <svg {...common} aria-hidden="true">
    <path d="M9 44 35 21l26 23v30H9Z"/>
    <path d="M29 74V55h13v19"/>
    <circle cx="91" cy="49" r="20"/>
    <path d="M99 37c-3-2-7-3-11-1-6 2-9 7-9 13s3 11 9 13c4 2 8 1 11-1M74 46h18M74 52h16"/>
  </svg>
}

function ServiceItem({service}:{service:string[]}){
  return <article className="service">
    <div className="service__diagram"><ServiceIcon type={service[3]}/></div>
    <p className="eyebrow">{service[0]}</p>
    <h3>{service[1]}</h3>
    <p>{service[2]}</p>
  </article>
}

function Header({menuOpen,setMenuOpen}:{menuOpen:boolean;setMenuOpen:(v:boolean)=>void}) {
  const closeMenu=()=>setMenuOpen(false)
  return <header className="site-header">
    <a href="/" className="wordmark wordmark--header" aria-label="STUDIO HERNÁNDEZ, Startseite">
      <strong className="wordmark__brand"><span className="wordmark__studio">STUDIO</span><span className="wordmark__name">HERNÁNDEZ</span></strong>
    </a>
    <p className="header-meta">ARCHITEKTUR · WUPPERTAL</p>
    <nav id="navigation" className={menuOpen?'nav nav--open':'nav'} aria-label="Hauptnavigation">
      <a href="/#projekte" onClick={closeMenu}>Projekte</a>
      <a href="/#studio" onClick={closeMenu}>Studio</a>
      <a href="/#leistungen" onClick={closeMenu}>Leistungen</a>
      <a href="/#kontakt" onClick={closeMenu}>Kontakt</a>
    </nav>
    <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="navigation">
      <span>{menuOpen?'Schließen':'Menü'}</span>
    </button>
  </header>
}

function Footer(){
  return <footer>
    <a href="#top" className="wordmark wordmark--footer" aria-label="STUDIO HERNÁNDEZ, nach oben"><strong>STUDIO HERNÁNDEZ</strong></a>
    <div><p>Architektur · Wuppertal</p><a href="mailto:mail@studiohernandez.eu">mail@studiohernandez.eu</a></div>
    <div><a href="#top">Nach oben ↑</a><p>© {new Date().getFullYear()}</p></div>
  </footer>
}

function BackToTop(){
  const [showBackToTop,setShowBackToTop]=useState(false)
  useEffect(()=>{
    const handleScroll=()=>setShowBackToTop(window.scrollY > Math.max(420, window.innerHeight * .55))
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive:true })
    return ()=>window.removeEventListener('scroll', handleScroll)
  },[])

  return <a className={showBackToTop?'back-to-top back-to-top--visible':'back-to-top'} href="#top" aria-label="Nach oben scrollen">
    <span>NACH OBEN</span><span aria-hidden="true">↑</span>
  </a>
}

function HomePage(){
  return <>
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
          <img src={imageUrl('01-hero-studiohernandez.webp')} alt="HAUS C – Aufstockung eines Wohnhauses in Wuppertal" fetchPriority="high"/>
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
    <BackToTop/>
    <Footer/>
  </>
}

function ProjectImage({src, alt, className='', fallback='haus-c.png'}:{src:string;alt:string;className?:string;fallback?:string}){
  const [imageSrc,setImageSrc]=useState(src)
  return <img className={className} src={imageSrc} alt={alt} loading="lazy" onError={()=>setImageSrc(imageUrl(fallback))} />
}

function HausCPage(){
  return <>
    <main id="top" className="project-page">
      <section className="project-page__hero">
        <div className="project-page__head">
          <p className="eyebrow">01 / Projekt</p>
          <h1>HAUS C</h1>
          <div className="project-page__meta">
            <p>Aufstockung eines Wohnhauses</p>
            <p>Wuppertal · In Ausführung</p>
          </div>
        </div>
        <figure className="project-page__hero-image">
          <ProjectImage src={hausCImageUrl('01-hero-baustelle-aktuell.webp')} alt="HAUS C – aktueller Baustand der Aufstockung in Wuppertal"/>
        </figure>
      </section>

      <section className="project-page__intro section">
        <p>Die Aufstockung erweitert das bestehende Wohnhaus um ein zusätzliches Geschoss in Holzrahmenbauweise. Der Entwurf entwickelt den Bestand weiter und schafft neue Wohnflächen mit großzügigen Außenbezügen.</p>
      </section>

      <section className="project-page__block section">
        <div className="project-page__label">BESTAND / VOR DEM UMBAU</div>
        <figure className="project-page__full-image"><ProjectImage src={hausCImageUrl('02-bestand.jpeg')} alt="HAUS C – Bestand vor dem Umbau"/></figure>
      </section>

      <section className="project-page__block section">
        <div className="project-page__label">ENTWURF / AUFSTOCKUNG UND ERWEITERUNG</div>
        <figure className="project-page__full-image"><ProjectImage src={hausCImageUrl('03-entwurf-rendering.jpeg')} alt="HAUS C – Rendering der Aufstockung"/></figure>
      </section>

      <section className="project-page__block section">
        <div className="project-page__label">HOLZRAHMENBAU</div>
        <div className="project-page__two-up">
          <figure><ProjectImage src={hausCImageUrl('04-konstruktion-01.jpeg')} alt="HAUS C – Konstruktion 1"/></figure>
          <figure><ProjectImage src={hausCImageUrl('05-konstruktion-02.jpeg')} alt="HAUS C – Konstruktion 2"/></figure>
        </div>
        <p className="project-page__caption">Leichte Aufstockung auf bestehender Tragstruktur.</p>
      </section>

      <section className="project-page__block section">
        <div className="project-page__label">BAUPROZESS</div>
        <figure className="project-page__full-image"><ProjectImage src={hausCImageUrl('06-bauprozess.jpeg')} alt="HAUS C – Bauprozess mit Personen auf der Konstruktion"/></figure>
      </section>

      <section className="project-page__block section">
        <div className="project-page__label">BAUPROZESS / DRAUFSICHT</div>
        <figure className="project-page__full-image"><ProjectImage src={hausCImageUrl('07-drohnenaufnahme.jpeg')} alt="HAUS C – Drohnenaufnahme"/></figure>
      </section>

      <section className="project-page__block section section--last">
        <div className="project-page__label">BAUSTAND 2026</div>
        <figure className="project-page__full-image"><ProjectImage src={hausCImageUrl('08-baustand-2026.jpeg')} alt="HAUS C – aktueller Baustand"/></figure>
      </section>

      <section className="project-page__next section">
        <ArrowLink href="/">Zurück zur Übersicht</ArrowLink>
        <ArrowLink href="/projekte/haus-h33/">Nächstes Projekt · HAUS H33</ArrowLink>
      </section>
    </main>
    <BackToTop/>
    <Footer/>
  </>
}

function HausH33Page(){
  return <>
    <main id="top" className="project-page project-page--h33">
      <section className="project-page__hero">
        <div className="project-page__head">
          <p className="eyebrow">02 / Projekt</p>
          <h1>HAUS H33</h1>
          <div className="project-page__meta">
            <p>Erweiterung und Neuordnung eines Wohnhauses</p>
            <p>Wuppertal · In Planung</p>
          </div>
        </div>
        <figure className="project-page__hero-image">
          <ProjectImage src={hausH33PhotoUrl('01-strasse.png')} fallback="haus-h33.png" alt="HAUS H33 – Bestand im Straßenraum"/>
        </figure>
      </section>

      <section className="project-page__intro section">
        <p>Das Projekt untersucht die Weiterentwicklung eines bestehenden Wohnhauses in Wuppertal. Im Mittelpunkt stehen die Neuordnung des Bestands und die Möglichkeiten einer Erweiterung. Das Projekt befindet sich derzeit in Planung.</p>
      </section>

      <section className="project-page__block section">
        <div className="project-page__label">BESTAND / ZUFAHRT UND ERSCHLIESSUNG</div>
        <div className="project-page__two-up">
          <figure><ProjectImage src={hausH33PhotoUrl('02-zufahrt.png')} fallback="haus-h33.png" alt="HAUS H33 – Zufahrt"/></figure>
          <figure><ProjectImage src={hausH33PhotoUrl('03-treppenaufgang.png')} fallback="haus-h33.png" alt="HAUS H33 – seitlicher Treppenaufgang"/></figure>
        </div>
      </section>

      <section className="project-page__block section">
        <div className="project-page__label">BESTAND / GARTENSEITE</div>
        <figure className="project-page__full-image"><ProjectImage src={hausH33PhotoUrl('05-gartenansicht.png')} fallback="haus-h33.png" alt="HAUS H33 – Gartenansicht"/></figure>
      </section>

      <section className="project-page__block section">
        <div className="project-page__label">TOPOGRAFIE / SEITEN- UND KELLERZUGANG</div>
        <div className="project-page__two-up">
          <figure><ProjectImage src={hausH33PhotoUrl('04-garten-seitlich.png')} fallback="haus-h33.png" alt="HAUS H33 – seitliche Gartenansicht"/></figure>
          <figure><ProjectImage src={hausH33PhotoUrl('06-kellerabgang.png')} fallback="haus-h33.png" alt="HAUS H33 – Kellerabgang"/></figure>
        </div>
      </section>

      <section className="project-page__block section section--last">
        <div className="project-page__label">BESTAND / GARTEN FRONTAL</div>
        <figure className="project-page__full-image"><ProjectImage src={hausH33PhotoUrl('07-garten-frontal.png')} fallback="haus-h33.png" alt="HAUS H33 – frontale Gartenansicht"/></figure>
      </section>




      <section className="project-page__next section">
        <ArrowLink href="/projekte/haus-c/">Vorheriges Projekt · HAUS C</ArrowLink>
        <ArrowLink href="/#projekte">Zurück zur Übersicht</ArrowLink>
      </section>
    </main>
    <BackToTop/>
    <Footer/>
  </>
}

export default function App(){
  const [menuOpen,setMenuOpen]=useState(false)
  const pathname = useMemo(()=>{
    if(typeof window === 'undefined') return '/'
    const p = window.location.pathname || '/'
    return p.endsWith('/') && p.length > 1 ? p.slice(0,-1) : p
  },[])

  const isHausCPage = pathname === '/projekte/haus-c'
  const isHausH33Page = pathname === '/projekte/haus-h33'

  return <>
    <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
    {isHausCPage ? <HausCPage/> : isHausH33Page ? <HausH33Page/> : <HomePage/>}
  </>
}
