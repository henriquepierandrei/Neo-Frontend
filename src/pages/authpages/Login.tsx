import FormLogin from "../../components/authcomponents/FormLogin"
import Footer from "../../components/homecomponents/Footer"
import Navbar from "../../components/homecomponents/Navbar"

function Login() {
  

  return (
    <div className="min-h-screen overflow-x-hidden">


      <Navbar />
      <FormLogin />
      <div className="border-t border-[var(--color-border)]"></div>
      <Footer />
    </div>
  )
}

export default Login
