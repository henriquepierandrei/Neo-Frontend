import FormRegister from "../../components/authcomponents/FormRegister"
import Footer from "../../components/homecomponents/Footer"
import Navbar from "../../components/homecomponents/Navbar"

function Register() {
  return (
    <div className="min-h-screen b text-white overflow-x-hidden">
      <Navbar />
      <FormRegister />
      <div className="border-t border-[var(--color-border)]"></div>
      <Footer />
    </div>
  )
}

export default Register
