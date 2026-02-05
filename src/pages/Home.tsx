import Navbar from '../components/homecomponents/Navbar'
import HeroSection from '../components/homecomponents/HeroSection'
import SocialProofSection from '../components/homecomponents/SocialProofSection'
import FeaturesSection from '../components/homecomponents/FeaturesSection'
import Footer from '../components/homecomponents/Footer'

function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <Footer />
    </div>
  )
}

export default Home
