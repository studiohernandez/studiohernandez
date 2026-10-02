import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import App from './App'

const CONSENT_KEY='studiohernandez-consent-v1'
const FONT_LINK_ID='studiohernandez-google-fonts'

function BrandName({className=''}:{className?:string}){
  return <span className={`brand-name ${className}`.trim()} aria-label="STUDIO HERNÁNDEZ"><span className="brand-name__studio">STUDIO</span><span className="brand-name__hernandez">HERNÁNDEZ</span></span>
}

function loadExternalFonts(){
  if(document.getElementById(FONT_LINK_ID)) return
  const link=document.createElement('link')
  link.id=FONT_LINK_ID
  link.rel='stylesheet'
  link.href='https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Newsreader:ital,opsz,wght@1,6..72,300&display=swap'
  document.head.appendChild(link)
}

function CookieConsent(){
  const [open,setOpen]=useState(false)
  const [choice,setChoice]=useState<'all'|'necessary'|null>(null)

  useEffect(()=>{
    let stored:null|'all'|'necessary'=null
    try{ stored=localStorage.getItem(CONSENT_KEY) as null|'all'|'necessary' }catch{}
    setChoice(stored)
    if(stored==='all') loadExternalFonts()
    if(!stored) setOpen(true)

    const reopen=()=>setOpen(true)
    window.addEventListener('studiohernandez:privacy-settings',reopen)
    return()=>window.removeEventListener('studiohernandez:privacy-settings',reopen)
  },[])

  const save=(next:'all'|'necessary')=>{
    const hadExternalFonts=!!document.getElementById(FONT_LINK_ID)
    try{ localStorage.setItem(CONSENT_KEY,next) }catch{}
    setChoice(next)
    if(next==='all') loadExternalFonts()
    setOpen(false)
    if(next==='necessary' && hadExternalFonts) window.location.reload()
  }

  if(!open) return null

  return <aside className="privacy-banner" role="dialog" aria-labelledby="privacy-title">
    <div className="privacy-banner__copy">
      <p className="eyebrow" id="privacy-title">Cookie-Einstellungen</p>
      <p>Diese Website verwendet keine Analyse- oder Marketing-Cookies. Externe Schriftarten von Google werden nur nach Ihrer Zustimmung geladen. Ihre Auswahl wird ausschließlich lokal in Ihrem Browser gespeichert.</p>
      <a href="/datenschutz/">Mehr zum Datenschutz ↗</a>
    </div>
    <div className="privacy-banner__actions">
      <button type="button" className="privacy-button privacy-button--secondary" onClick={()=>save('necessary')}>Nur erforderlich</button>
      <button type="button" className="privacy-button" onClick={()=>save('all')}>Alle akzeptieren</button>
      {choice && <button type="button" className="privacy-close" onClick={()=>setOpen(false)} aria-label="Cookie-Einstellungen schließen">×</button>}
    </div>
  </aside>
}

function PrivacySettingsButton(){
  return <button type="button" className="footer__button" onClick={()=>window.dispatchEvent(new Event('studiohernandez:privacy-settings'))}>Cookie-Einstellungen</button>
}

function FooterLegalLinks(){
  const [target,setTarget]=useState<HTMLElement|null>(null)
  useEffect(()=>{ setTarget(document.querySelector('footer')) },[])
  if(!target) return null
  return createPortal(<div className="footer__legal">
    <a href="/impressum/">Impressum</a>
    <a href="/datenschutz/">Datenschutz</a>
    <PrivacySettingsButton/>
  </div>,target)
}

function LegalHeader(){
  return <header className="site-header legal-header">
    <a href="/" className="wordmark wordmark--header" aria-label="STUDIO HERNÁNDEZ, Startseite">
      <strong className="wordmark__brand"><BrandName className="brand-name--header"/></strong>
    </a>
    <p className="header-meta">ARCHITEKTUR · WUPPERTAL</p>
    <nav className="nav" aria-label="Hauptnavigation">
      <a href="/#projekte">Projekte</a>
      <a href="/#studio">Studio</a>
      <a href="/#leistungen">Leistungen</a>
      <a href="/#kontakt">Kontakt</a>
    </nav>
  </header>
}

function LegalFooter(){
  return <footer>
    <a href="/" className="wordmark wordmark--footer" aria-label="STUDIO HERNÁNDEZ, Startseite"><strong><BrandName className="brand-name--footer"/></strong></a>
    <div><p>Architektur · Wuppertal</p><a href="mailto:mail@studiohernandez.eu">mail@studiohernandez.eu</a></div>
    <div className="footer__legal">
      <a href="/impressum/">Impressum</a>
      <a href="/datenschutz/">Datenschutz</a>
      <PrivacySettingsButton/>
    </div>
    <div className="footer__end"><a href="#top">Nach oben ↑</a><p>© {new Date().getFullYear()}</p></div>
  </footer>
}

function LegalLayout({kind}:{kind:'impressum'|'datenschutz'}){
  useEffect(()=>{
    document.title=`${kind==='impressum'?'Impressum':'Datenschutz'} — STUDIO HERNÁNDEZ`
  },[kind])

  return <>
    <LegalHeader/>
    <main id="top" className="legal-page">
      <header className="legal-page__head">
        <p className="eyebrow">Rechtliches / {kind==='impressum'?'01':'02'}</p>
        <h1>{kind==='impressum'?'Impressum':'Datenschutz'}</h1>
        <p>Stand: September 2026</p>
      </header>
      {kind==='impressum'?<ImpressumContent/>:<DatenschutzContent/>}
    </main>
    <LegalFooter/>
  </>
}

function LegalSection({title,children}:{title:string;children:React.ReactNode}){
  return <section className="legal-section">
    <h2>{title}</h2>
    <div className="legal-section__copy">{children}</div>
  </section>
}

function ImpressumContent(){
  return <div className="legal-page__content">
    <LegalSection title="Angaben gemäß § 5 DDG">
      <p>STUDIO HERNÁNDEZ<br/>Danyel Hernández, Architekt M.Sc.<br/>Am Opphof 21<br/>42109 Wuppertal<br/>Deutschland</p>
      <p>E-Mail: <a href="mailto:mail@studiohernandez.eu">mail@studiohernandez.eu</a><br/>Telefon: +49 155 33 4 66 5</p>
      <p>Gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen.</p>
    </LegalSection>

    <LegalSection title="Berufsrechtliche Angaben">
      <p>Gesetzliche Berufsbezeichnung: Architekt<br/>Verliehen in: Bundesrepublik Deutschland</p>
      <p>Zuständige Kammer und Aufsichtsbehörde:<br/>Architektenkammer Nordrhein-Westfalen<br/>Zollhof 1<br/>40221 Düsseldorf</p>
      <p>Es gelten insbesondere das Baukammerngesetz Nordrhein-Westfalen (BauKaG NRW), die Durchführungsverordnung zum BauKaG NRW sowie die Satzungen und Berufsregelungen der Architektenkammer Nordrhein-Westfalen.</p>
      <p><a href="https://www.aknw.de/recht/gesetze-und-verordnungen" target="_blank" rel="noreferrer">Berufsrechtliche Regelungen bei der AKNW ↗</a></p>
    </LegalSection>

    <LegalSection title="Berufshaftpflichtversicherung">
      <p>Markel Insurance SE<br/>Sophienstraße 26<br/>80333 München<br/>Geltungsbereich: Deutschland</p>
    </LegalSection>

    <LegalSection title="Verantwortlichkeit für Inhalte">
      <p>Verantwortlich für die Inhalte dieser Website: Danyel Hernández, Anschrift wie oben.</p>
      <p>Für Inhalte externer Websites, auf die durch Links verwiesen wird, sind ausschließlich deren Betreiber verantwortlich.</p>
    </LegalSection>
  </div>
}

function DatenschutzContent(){
  return <div className="legal-page__content">
    <LegalSection title="1. Verantwortlicher">
      <p>STUDIO HERNÁNDEZ<br/>Danyel Hernández<br/>Am Opphof 21<br/>42109 Wuppertal</p>
      <p>E-Mail: <a href="mailto:mail@studiohernandez.eu">mail@studiohernandez.eu</a></p>
    </LegalSection>

    <LegalSection title="2. Hosting und technische Bereitstellung">
      <p>Diese Website wird über Dienste von Cloudflare ausgeliefert. Anbieter in Deutschland ist die Cloudflare Germany GmbH, c/o Design Offices München Atlas, Rosenheimer Straße 143C, 81671 München. Beim Aufruf der Website können technisch erforderliche Verbindungs- und Protokolldaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt und Ziel der Anfrage, Browser- und Geräteinformationen sowie technische Statusdaten.</p>
      <p>Die Verarbeitung erfolgt zur sicheren, stabilen und schnellen Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt in der sicheren und störungsfreien Bereitstellung des Online-Angebots. Soweit Cloudflare Daten in Drittländern verarbeitet, erfolgt dies nach Maßgabe der gesetzlichen Voraussetzungen für internationale Datenübermittlungen.</p>
      <p><a href="https://www.cloudflare.com/de-de/privacypolicy/" target="_blank" rel="noreferrer">Datenschutzhinweise von Cloudflare ↗</a></p>
    </LegalSection>

    <LegalSection title="3. Kontaktaufnahme">
      <p>Wenn Sie per E-Mail Kontakt aufnehmen, werden die von Ihnen übermittelten Angaben zur Bearbeitung Ihrer Anfrage verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche oder vertragliche Kommunikation geht; im Übrigen Art. 6 Abs. 1 lit. f DSGVO aufgrund des berechtigten Interesses an der Bearbeitung eingehender Anfragen.</p>
      <p>Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
    </LegalSection>

    <LegalSection title="4. Externe Schriftarten / Google Fonts">
      <p>Für die typografische Darstellung können Schriftarten des Dienstes Google Fonts geladen werden. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Verbindung zu Google wird erst hergestellt, wenn Sie im Datenschutz-Banner ausdrücklich „Alle akzeptieren“ wählen. Dabei kann insbesondere Ihre IP-Adresse an Google übermittelt werden.</p>
      <p>Die Verarbeitung erfolgt ausschließlich auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Soweit dabei Informationen auf Ihrem Endgerät gespeichert oder ausgelesen werden, erfolgt dies ebenfalls nur mit Ihrer Einwilligung nach § 25 Abs. 1 TDDDG, soweit diese Vorschrift anwendbar ist. Sie können Ihre Einwilligung jederzeit über „Cookie-Einstellungen“ im Footer mit Wirkung für die Zukunft widerrufen.</p>
    </LegalSection>

    <LegalSection title="5. Cookie-Einstellungen und lokale Speicherung">
      <p>Zur Speicherung Ihrer Datenschutzentscheidung wird ausschließlich eine technisch notwendige Information im lokalen Speicher Ihres Browsers (Local Storage) unter dem Schlüssel „studiohernandez-consent-v1“ abgelegt. Sie enthält nur die Auswahl „Alle akzeptieren“ oder „Nur erforderlich“ und dient dazu, Ihre Entscheidung bei weiteren Seitenaufrufen zu berücksichtigen.</p>
      <p>Diese Speicherung ist für die Bereitstellung der von Ihnen gewählten Datenschutzeinstellung erforderlich. Analyse-, Werbe- oder Marketing-Cookies werden derzeit nicht eingesetzt.</p>
    </LegalSection>

    <LegalSection title="6. Ihre Rechte">
      <p>Sie haben nach Maßgabe der gesetzlichen Voraussetzungen insbesondere das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).</p>
    </LegalSection>

    <LegalSection title="7. Beschwerderecht">
      <p>Sie haben gemäß Art. 77 DSGVO das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für den Sitz des Studios ist insbesondere zuständig:</p>
      <p>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br/>Kavalleriestraße 2–4<br/>40213 Düsseldorf<br/><a href="https://www.ldi.nrw.de/" target="_blank" rel="noreferrer">www.ldi.nrw.de ↗</a></p>
    </LegalSection>

    <LegalSection title="8. Sicherheit und Aktualisierung">
      <p>Die Übertragung dieser Website erfolgt verschlüsselt über HTTPS. Diese Datenschutzerklärung wird angepasst, wenn sich eingesetzte Dienste oder rechtliche Anforderungen ändern.</p>
    </LegalSection>
  </div>
}

export default function SiteRoot(){
  const path=useMemo(()=>{
    const current=window.location.pathname || '/'
    return current.length>1 ? current.replace(/\/+$/,'') : current
  },[])

  const legal=path==='/impressum'?'impressum':path==='/datenschutz'?'datenschutz':null

  return <>
    {legal?<LegalLayout kind={legal}/>:<><App/><FooterLegalLinks/></>}
    <CookieConsent/>
  </>
}
