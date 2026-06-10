// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Home from "./views/Home";
// // import Admin from "./views/Admin";

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/admin" element={<Admin />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate, // <--- Asegúrate de que esté este import
// } from "react-router-dom";
// import Home from "./views/Home";
// import Admin from "./views/Admin";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import { AgendaAlumnos } from "./views/AgendaAlumnos";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 🌍 RUTA PÚBLICA: Los clientes y visitantes ven el Home sin trabas */}
//         <Route path="/" element={<Home />} />

//         {/* 🔒 RUTA PRIVADA: Solo el administrador puede entrar aquí */}
//         <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
//           <Route path="/admin" element={<Admin />} />
//         </Route>
//         <Route path="/reservar" element={<AgendaAlumnos />} />

//         {/* 🔄 Redirección: Si escriben algo mal, los regresa al Home */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AgendaAlumnos } from "./views/AgendaAlumnos";
import { PlanesAlumnos } from "./views/PlanesAlumnos";
import MisClases from "./views/MisClases";

// 1. Componente Navbar con la lógica de Scroll e Intersección corregida
const NavbarPrincipal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("inicio");
  const isScrollingByClick = useRef(false);

  const loginComoAdmin = () => {
    const usuarioDummy = {
      nombre: "Administrador Prototipo",
      correo: "admin@test.com",
      rol: "admin",
    };
    localStorage.setItem("usuario_sesion", JSON.stringify(usuarioDummy));

    // Usamos navigate en lugar de window.location para que sea más fluido
    navigate("/Dashboard");
  };
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    // const sections = ["inicio", "clases", "precios", "contacto"];
    const sections = ["inicio", "precios", "contacto"];

    const observerOptions = {
      root: null,
      // Bajamos el margen superior (-30%) para que no detecte la sección de arriba tan rápido
      // y subimos el inferior (-60%) para que solo cuente lo que está en el tercio superior
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0.1, // Requiere que al menos un 10% sea visible para activarse
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingByClick.current) return;

      entries.forEach((entry) => {
        // Solo activamos si está cruzando y tiene una visibilidad real
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScrollManual = () => {
      // Si estamos muy cerca del tope (menos de 80px), forzar siempre Inicio
      if (window.scrollY < 80 && !isScrollingByClick.current) {
        setActiveSection("inicio");
      }
    };

    window.addEventListener("scroll", handleScrollManual);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollManual);
    };
  }, [location.pathname]);
  const handleNavClick = (id: string, type: string) => {
    isScrollingByClick.current = true;
    setActiveSection(id);

    // Aquí está la lógica que ya tienes: si es tipo 'nav', navega a la ruta
    if (type === "nav") {
      navigate(`/${id}`);
    } else {
      // Lógica de scroll para el Home
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }

    setTimeout(() => {
      isScrollingByClick.current = false;
    }, 1000);
  };
  // const handleNavClick = (id: string, type: string) => {
  //   isScrollingByClick.current = true;
  //   setActiveSection(id);

  //   if (type === "nav") {
  //     navigate("/reservar");
  //   } else {
  //     if (location.pathname !== "/") {
  //       navigate("/");
  //       // Esperamos a que cargue el Home para hacer el scroll
  //       setTimeout(() => {
  //         if (id === "inicio") {
  //           window.scrollTo({ top: 0, behavior: "smooth" });
  //         } else {
  //           const el = document.getElementById(id);
  //           if (el) el.scrollIntoView({ behavior: "smooth" });
  //         }
  //       }, 150);
  //     } else {
  //       // Si ya estamos en Home
  //       if (id === "inicio") {
  //         window.scrollTo({ top: 0, behavior: "smooth" });
  //       } else {
  //         const el = document.getElementById(id);
  //         if (el) el.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }
  //   }

  //   // Reactivamos el observer tras un segundo (cuando termine la animación)
  //   setTimeout(() => {
  //     isScrollingByClick.current = false;
  //   }, 1000);
  // };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
        position: "sticky",
        top: 0,
        background: "rgba(250,248,246,0.96)",
        backdropFilter: "blur(14px)",
        borderBottom: "2px solid var(--primary)",
        boxShadow: "0 4px 25px rgba(0,0,0,0.05)",
        zIndex: 1000,
      }}
    >
      <div
        onClick={() => handleNavClick("inicio", "scroll")}
        style={{ cursor: "pointer" }}
      >
        <img
          src="/img/I agree_logo-06.png"
          // src="/img/I agree_logo-02.png"
          alt="Logo"
          style={{ height: "70px", width: "auto", objectFit: "contain" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "35px",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {[
          { name: "Inicio", id: "mis-clases", type: "nav" },
          // { name: "Clases", id: "mis-clases", type: "nav" },
          { name: "Membresía", id: "precios", type: "nav" },
          { name: "Reservas", id: "reservar", type: "nav" },
          { name: "Contacto", id: "contacto", type: "scroll" },
        ].map((item) => {
          const isActive =
            item.type === "nav"
              ? location.pathname === `/${item.id}`
              : activeSection === item.id && location.pathname === "/";

          return (
            <span
              key={item.id}
              onClick={() => handleNavClick(item.id, item.type)}
              style={{
                cursor: "pointer",
                color: isActive ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: isActive ? "600" : "500",
                paddingBottom: "6px",
                borderBottom: isActive
                  ? "2px solid var(--primary)"
                  : "2px solid transparent",
                transition: "all 0.3s ease",
              }}
            >
              {item.name}
            </span>
          );
        })}
      </div>

      <button
        onClick={loginComoAdmin}
        style={{
          background: "var(--primary)",
          color: "white",
          border: "none",
          padding: "8px 25px",
          borderRadius: "50px",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        Iniciar sesión
      </button>
    </nav>
  );
};

// Componente intermedio para aplicar la lógica sin romper hooks
const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.toLowerCase() === "/dashboard";

  return (
    <>
      {!hideNavbar && <NavbarPrincipal />}
      <Routes>
        {/* Rutas Públicas / Alumnos */}
        <Route path="/" element={<Home />} />
        <Route path="/reservar" element={<AgendaAlumnos />} />
        <Route path="/precios" element={<PlanesAlumnos />} />
        <Route path="/mis-clases" element={<MisClases />} />

        {/* Dashboard Protegido para Admin y Coach */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "coach"]} />}>
          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

// Componente principal App
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
