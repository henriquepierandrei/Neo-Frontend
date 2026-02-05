// App.tsx
import { ThemeProvider } from "./hooks/ThemeProvider";
import Navbar from "./components/homecomponents/Navbar"; // seu Navbar original
import Home from "./pages/Home"; // sua página Home

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// Componente separado para poder usar o hook useTheme
function AppContent() {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-black">
      <Navbar />
      
      {/* Conteúdo principal */}
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
