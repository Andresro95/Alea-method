// 1. AGREGA useMemo Y useEffect A LA IMPORTACIÓN
import React, { useState, useMemo, useEffect } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaChalkboardTeacher,
} from "react-icons/fa";
import {
  MdEventSeat,
  MdMeetingRoom, // Icono de puerta/entrada a salón
  MdGroups,
} from "react-icons/md";

export const AgendaAlumnos = () => {
  const [step, setStep] = useState(0);
  const [salonSeleccionado, setSalonSeleccionado] = useState(null);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [camaSeleccionada, setCamaSeleccionada] = useState(null);
  const [confirmado, setConfirmado] = useState(false);
  const [baseDate, setBaseDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // --- LEER LAS CLASES REALES DESDE EL LOCALSTORAGE ---
  const [clasesProgramadas, setClasesProgramadas] = useState([]);

  useEffect(() => {
    // Al montar el componente, traemos los horarios guardados por el administrador
    const guardadas =
      JSON.parse(localStorage.getItem("clases_programadas")) || [];
    setClasesProgramadas(guardadas);
  }, []);

  // const horariosDisponibles = useMemo(() => {
  //   const bloques = [];

  //   clasesProgramadas.forEach((clase) => {
  //     const horaInicio = parseInt(clase.horaInicio.split(":")[0], 10);
  //     const horaFin = parseInt(clase.horaFin.split(":")[0], 10);

  //     for (let hora = horaInicio; hora < horaFin; hora++) {
  //       bloques.push({
  //         ...clase,
  //         id: `${clase.id}-${hora}`,
  //         horaInicioBloque: `${String(hora).padStart(2, "0")}:00`,
  //         horaFinBloque: `${String(hora + 1).padStart(2, "0")}:00`,
  //         horaOrden: hora,
  //       });
  //     }
  //   });

  //   // Ordenar por hora para mezclar coaches
  //   bloques.sort((a, b) => {
  //     if (a.horaOrden !== b.horaOrden) {
  //       return a.horaOrden - b.horaOrden;
  //     }

  //     return a.coachNombre.localeCompare(b.coachNombre);
  //   });

  //   return bloques;
  // }, [clasesProgramadas]);

  const horariosDisponibles = useMemo(() => {
    const bloques = [];

    clasesProgramadas.forEach((clase) => {
      // 1. Convertimos la hora de inicio a minutos totales
      const [startH, startM] = clase.horaInicio.split(":").map(Number);
      const startTotalMin = startH * 60 + startM;

      // 2. Convertimos la hora de fin a minutos totales
      const [endH, endM] = clase.horaFin.split(":").map(Number);
      const endTotalMin = endH * 60 + endM;

      // 3. Iteramos de 40 en 40 minutos (o la duración que desees)
      const duracion = 40;

      for (let m = startTotalMin; m < endTotalMin; m += duracion) {
        const hInicio = Math.floor(m / 60);
        const minInicio = m % 60;

        const fin = m + duracion;
        const hFin = Math.floor(fin / 60);
        const minFin = fin % 60;

        bloques.push({
          ...clase,
          id: `${clase.id}-${m}`,
          horaInicioBloque: `${String(hInicio).padStart(2, "0")}:${String(minInicio).padStart(2, "0")}`,
          horaFinBloque: `${String(hFin).padStart(2, "0")}:${String(minFin).padStart(2, "0")}`,
          horaOrden: m, // Ordenamos por minutos totales
        });
      }
    });

    // Ordenar por horaOrden
    bloques.sort(
      (a, b) =>
        a.horaOrden - b.horaOrden || a.coachNombre.localeCompare(b.coachNombre),
    );

    return bloques;
  }, [clasesProgramadas]);
  // Lógica de semanas optimizada
  const weekDays = useMemo(() => {
    const start = new Date(baseDate);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(start.setDate(diff));

    return ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((label, index) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + index);
      return {
        label,
        dayNumber: d.getDate(),
        fullDate: d.toDateString(),
        dateObj: d,
      };
    });
  }, [baseDate]);

  const nextWeek = () => {
    const next = new Date(baseDate);
    next.setDate(baseDate.getDate() + 7);
    setBaseDate(next);
  };

  const prevWeek = () => {
    const prev = new Date(baseDate);
    prev.setDate(baseDate.getDate() - 7);
    setBaseDate(prev);
  };

  // 2. CORREGIDO: Nombre de variable para que coincida con el JSX
  const currentMonthLabel = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(baseDate);

  const handleFinalizar = () => {
    setConfirmado(true);
    setTimeout(() => {
      setConfirmado(false);
      setStep(0); // Cambiado a 0
      setSalonSeleccionado(null);
      setClaseSeleccionada(null);
      setCamaSeleccionada(null);
    }, 4000);
  };

  if (confirmado) {
    return (
      <div className="reserva-success-overlay">
        <div className="success-card">
          <FaCheckCircle
            style={{
              color: "var(--primary)",
              fontSize: "3rem",
              marginBottom: "1rem",
            }}
          />
          <h2>¡Reserva Exitosa!</h2>
          <p>Tu lugar ha quedado asegurado.</p>
          <div className="ticket-summary">
            <p>
              <strong>Clase:</strong> {claseSeleccionada?.horaInicioBloque} -{" "}
              {claseSeleccionada?.horaFinBloque} (
              {claseSeleccionada?.especialidad})
            </p>
            <p>
              <strong>Cama:</strong> #{camaSeleccionada}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agenda-premium-wrapper">
      <header className="agenda-header">
        {/* Botón atrás: aparece en paso 1 y 2 */}
        {step > 0 && (
          <button
            className="back-btn"
            onClick={() => {
              if (step === 2) {
                setStep(1);
                setCamaSeleccionada(null);
              } else if (step === 1) {
                setStep(0);
                setSalonSeleccionado(null);
              }
            }}
          >
            <FaArrowLeft />
          </button>
        )}

        <h1>
          {step === 0 && "Seleccionar Salón"}
          {step === 1 && "Horarios Disponibles"}
          {step === 2 && "Selecciona tu Lugar"}
        </h1>

        <p>
          {step === 0 && "Elige el espacio para tu clase"}
          {step === 1 &&
            `Salón ${salonSeleccionado} • Elige el momento perfecto`}
          {step === 2 &&
            `${claseSeleccionada?.horaInicioBloque} - ${claseSeleccionada?.horaFinBloque} • Coach ${claseSeleccionada?.coachNombre}`}
        </p>
      </header>

      {/* PASO 0: SELECCIÓN DE SALÓN */}
      {step === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            paddingTop: "40px",
            paddingBottom: "40px",
          }}
        >
          {[1, 2].map((num) => (
            <div
              key={num}
              className="salon-card"
              onClick={() => {
                setSalonSeleccionado(num);
                setStep(1);
              }}
              style={{
                background: "white",
                width: "240px",
                padding: "30px 15px",
                borderRadius: "16px",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 6px 15px rgba(0,0,0,0.06)",
                transition: "transform 0.2s",
                border: "1px solid #eee",
              }}
            >
              <div
                style={{
                  fontSize: "2.8rem",
                  color: "var(--primary)",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <MdMeetingRoom />
              </div>

              <h3
                style={{
                  margin: 0,
                  fontSize: "1.2rem",
                  fontWeight: 600,
                }}
              >
                Salón {num}
              </h3>

              <p
                style={{
                  color: "#666",
                  marginTop: "4px",
                  fontSize: "0.9rem",
                }}
              >
                {num === 1 ? "Principal" : "Reformers"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PASO 1: CALENDARIO Y HORARIOS */}
      {step === 1 && (
        <>
          <div className="calendar-nav-container">
            <div className="calendar-month-header">
              <span className="month-name">{currentMonthLabel}</span>
              <div className="nav-arrows">
                <button onClick={prevWeek} className="nav-btn">
                  <FaChevronLeft />
                </button>
                <button onClick={nextWeek} className="nav-btn">
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="days-row">
              {weekDays.map((day, idx) => {
                const isSelected = selectedDate.toDateString() === day.fullDate;
                const isToday = new Date().toDateString() === day.fullDate;

                return (
                  <div
                    key={idx}
                    className={`day-item ${isSelected ? "active" : ""} ${isToday ? "today" : ""}`}
                  >
                    <span className="day-label">{day.label}</span>
                    <span className="day-number">{day.dayNumber}</span>
                    {isToday && <span className="today-dot"></span>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="horarios-grid">
            {horariosDisponibles.length === 0 ? (
              <p
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  color: "#a3978e",
                  fontStyle: "italic",
                  padding: "20px",
                }}
              >
                No hay horarios asignados todavía.
              </p>
            ) : (
              horariosDisponibles.map((clase) => {
                // Definimos capacidad base en 6 por tus camas físicas
                const capacidadBase = 6;
                const alumnosInscritosCount =
                  clase.alumnosInscritos?.length || 0;
                const disp = capacidadBase - alumnosInscritosCount;
                const full = disp === 0;

                return (
                  <div
                    key={clase.id}
                    className={`horario-card ${full ? "disabled" : ""}`}
                    onClick={() =>
                      !full && (setClaseSeleccionada(clase), setStep(2))
                    }
                  >
                    {/* Renderiza rango real de horas y especialidad */}
                    <span
                      className="time"
                      style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                    >
                      {clase.horaInicioBloque} - {clase.horaFinBloque}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--primary)",
                        fontWeight: "600",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      {clase.especialidad}
                    </span>

                    <div className="coach-info">
                      <span>{clase.coachNombre}</span>
                      <span className={`badge ${full ? "full" : "low"}`}>
                        {full ? "Lleno" : `${disp} Libres`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* PASO 2: MAPA DE CAMAS */}
      {step === 2 && (
        <div className="mapa-estudio-container">
          <div className="estudio-layout">
            <div className="espejo-indicador">
              ESPEJO / INSTRUCTOR - SALÓN {salonSeleccionado}
            </div>
            <div className="grid-reformers">
              {[1, 2, 3, 4, 5, 6].map((n) => {
                // Evaluamos si el número de cama está ocupado en el arreglo real
                const isOccupied = claseSeleccionada?.alumnosInscritos?.some(
                  (alumno) => alumno.cama === n,
                );
                const isSelected = camaSeleccionada === n;
                return (
                  <div
                    key={n}
                    className={`reformer-unit ${isOccupied ? "occupied" : ""} ${isSelected ? "selected" : ""}`}
                    onClick={() => !isOccupied && setCamaSeleccionada(n)}
                  >
                    <div className="reformer-shape">
                      <MdEventSeat />
                      <span className="num">{n}</span>
                    </div>
                    <span className="label">
                      {isOccupied
                        ? "Ocupado"
                        : isSelected
                          ? "Tu lugar"
                          : "Libre"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            className={`confirm-reserva-btn ${camaSeleccionada ? "active" : ""}`}
            disabled={!camaSeleccionada}
            onClick={handleFinalizar}
          >
            {camaSeleccionada
              ? `Confirmar Cama ${camaSeleccionada}`
              : "Selecciona una cama"}
          </button>
        </div>
      )}
    </div>
  );
};
