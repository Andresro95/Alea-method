import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTrashAlt,
  FaCheckCircle,
  FaUser,
  FaHistory,
  FaCreditCard,
  FaSignOutAlt,
  FaBoxOpen,
  FaCalendarDay,
} from "react-icons/fa";

const MisClases = () => {
  const [misReservas, setMisReservas] = useState([]);
  const [misPlanes, setMisPlanes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = () => {
      const guardadas = JSON.parse(localStorage.getItem("reservas")) || [];
      if (guardadas.length === 0) {
        setMisReservas([
          {
            id: "m-1",
            clase: "Pilates Reformer",
            fecha: "2026-06-08",
            hora: "08:00 AM",
            coach: "Valentina Rossi",
            salon: "A",
            cama: "04",
          },
          {
            id: "m-2",
            clase: "Pilates Mat",
            fecha: "2026-06-10",
            hora: "06:30 PM",
            coach: "Julian Schmidt",
            salon: "B",
            cama: "N/A",
          },
        ]);
      } else {
        setMisReservas(
          guardadas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)),
        );
      }

      setMisPlanes([
        {
          id: "p-1",
          nombre: "Plan Mensual 8 Sesiones",
          estado: "Activo",
          sesiones: "5/8",
          vencimiento: "2026-07-01",
        },
        {
          id: "p-2",
          nombre: "Taller Avanzado Reformer",
          estado: "Completado",
          sesiones: "1/1",
          vencimiento: "2026-05-15",
        },
      ]);
    };
    cargarDatos();
  }, []);

  return (
    <div className="dashboard-layout">
      {/* SECCIÓN IZQUIERDA: MI CUENTA */}
      <aside className="sidebar-cuenta">
        <div className="profile-header">
          <div className="avatar-circle">JS</div>
          <h3>Mi Perfil</h3>
          <p className="status-badge">Alumno Premium</p>
        </div>

        <div className="profile-info-container">
          <div className="info-group">
            <label>Nombre</label>
            <p>Angela</p>
          </div>

          <div className="info-group">
            <label>Apellido</label>
            <p>Silvera</p>
          </div>

          <div className="info-group">
            <label>Correo</label>
            <p>angela.silvera@ejemplo.com</p>
          </div>

          <div className="info-group">
            <label>Teléfono</label>
            <p>+52 55 1234 5678</p>
          </div>

          <hr />

          <nav className="menu-sidebar">
            <button className="btn-logout">
              <FaSignOutAlt /> Cerrar Sesión
            </button>
          </nav>
        </div>
      </aside>

      {/* SECCIÓN DERECHA: CONTENIDO PRINCIPAL */}
      <main className="main-content-dashboard">
        <header className="header-clases">
          <h1>Tu Agenda Personal</h1>
          <p>
            Gestiona tus próximas sesiones y mantén el control de tu
            entrenamiento.
          </p>
        </header>

        {/* TABLA 1: MIS RESERVAS */}
        <section className="table-section">
          <div className="section-title-wrapper">
            <FaCalendarDay /> <h2>Mis Próximas Clases</h2>
          </div>
          <div className="tabla-reservas-wrapper">
            <table className="tabla-boutique">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Sesión</th>
                  <th>Fecha</th>
                  <th>Horario</th>
                  <th>Coach</th>
                  <th>Salón</th>
                  <th>Cama</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {misReservas.map((clase) => (
                  <tr key={clase.id}>
                    <td>
                      <span className="status-pill active">
                        <FaCheckCircle /> Confirmada
                      </span>
                    </td>
                    <td className="clase-name">{clase.clase}</td>
                    <td>{clase.fecha}</td>
                    <td>{clase.hora}</td>
                    <td className="coach-name">{clase.coach || "Staff"}</td>
                    <td>{clase.salon || "A"}</td>
                    <td>{clase.cama || "S/N"}</td>
                    <td>
                      <button className="btn-cancel-icon" title="Cancelar">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* TABLA 2: MIS PLANES COMPRADOS */}
        <section className="table-section mt-40">
          <div className="section-title-wrapper">
            <FaBoxOpen /> <h2>Mis Planes Comprados</h2>
          </div>
          <div className="tabla-reservas-wrapper">
            <table className="tabla-boutique">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Estado</th>
                  <th>Sesiones Disponibles</th>
                  <th>Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                {misPlanes.map((plan) => (
                  <tr key={plan.id}>
                    <td className="clase-name">{plan.nombre}</td>
                    <td>
                      <span
                        className={`status-pill ${plan.estado.toLowerCase()}`}
                      >
                        {plan.estado}
                      </span>
                    </td>
                    <td>
                      <strong>{plan.sesiones}</strong>
                    </td>
                    <td>{plan.vencimiento}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MisClases;
