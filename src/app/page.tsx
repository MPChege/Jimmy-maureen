'use client'

import { useState } from 'react'
import Hero from "@/components/Hero"
import Countdown from "@/components/Countdown"
import OurStory from "@/components/OurStory"
import EventDetails from "@/components/EventDetails"
import RSVP from "@/components/RSVP"
import Footer from "@/components/Footer"
import LoadingScreen from "@/components/LoadingScreen"

export default function Home() {
  const [showSite, setShowSite] = useState(false)

  if (!showSite) {
    return <LoadingScreen onEnter={() => setShowSite(true)} />
  }

  return (
    <>
      <Hero />
      <Countdown />
      <OurStory />
      <EventDetails />
      <RSVP />
      <Footer />
    </>
  )
}
