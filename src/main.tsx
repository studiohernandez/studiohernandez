import React from 'react'
import ReactDOM from 'react-dom/client'
import SiteRoot from './SiteEnhancements'
import HausCImageUpgrade from './HausCImageUpgrade'
import HeroImageUpgrade from './HeroImageUpgrade'
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
    <HeroImageUpgrade />
  </React.StrictMode>,
)
