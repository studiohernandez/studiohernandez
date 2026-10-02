import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/newsreader/300-italic.css'
import SiteRoot from './SiteEnhancements'
import HausCImageUpgrade from './HausCImageUpgrade'
import Seo from './Seo'
import './styles.css'
import './brand-overrides.css'
import './project-pages.css'
import './legal.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Seo />
    <SiteRoot />
    <HausCImageUpgrade />
  </React.StrictMode>,
)
