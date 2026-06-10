import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- CONTROL DE NAVEGACIÓN INTERNA ---
  const [vistaActiva, setVistaActiva] = useState("precios");

  // ESTADOS DE PLANES
  const [planes, setPlanes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [clases, setClases] = useState("");
  const [esRecomendado, setEsRecomendado] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  // ESTADOS DE DISCIPLINAS
  const [disciplinas, setDisciplinas] = useState([]);
  const [discNombre, setDiscNombre] = useState("");
  const [discDescCorta, setDiscDescCorta] = useState("");
  const [discDetalles, setDiscDetalles] = useState("");
  const [discBeneficios, setDiscBeneficios] = useState("");
  const [discImg, setDiscImg] = useState("");
  const [editandoDiscId, setEditandoDiscId] = useState(null);

  // --- ESTADOS DE COACHES ---
  const [coaches, setCoaches] = useState([]);
  const [coachNombre, setCoachNombre] = useState("");
  const [coachCorreo, setCoachCorreo] = useState("");
  const [coachEspecialidad, setCoachEspecialidad] = useState("");
  const [editandoCoachId, setEditandoCoachId] = useState(null);

  // --- ESTADOS: CLASES Y HORARIOS PROGRAMADOS ---
  const [clasesProgramadas, setClasesProgramadas] = useState([]);
  const [claseCoachId, setClaseCoachId] = useState("");
  const [claseDia, setClaseDia] = useState("");
  const [claseHoraInicio, setClaseHoraInicio] = useState("");
  const [claseHoraFin, setClaseHoraFin] = useState("");

  // ESTADO DE VENTAS
  const [ventas, setVentas] = useState([]);

  // Cargar datos al iniciar
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("mis_planes")) || [];
    setPlanes(guardados);

    const guardadosCoaches =
      JSON.parse(localStorage.getItem("mis_coaches")) || [];
    setCoaches(guardadosCoaches);

    const guardadasDisc =
      JSON.parse(localStorage.getItem("mis_disciplinas")) || [];
    setDisciplinas(guardadasDisc);

    // Cargar horarios asignados (estos se leerán desde Reservas también)
    const guardadasClases =
      JSON.parse(localStorage.getItem("clases_programadas")) || [];
    setClasesProgramadas(guardadasClases);

    const guardadasVentas = JSON.parse(localStorage.getItem("mis_ventas")) || [
      {
        id: 1,
        cliente: "Ana García",
        correo: "ana@ejemplo.com",
        plan: "Plan Pro",
        fecha: "2024-05-20",
        estatus: "Pagado",
      },
      {
        id: 2,
        cliente: "Karen López",
        correo: "karen@ejemplo.com",
        plan: "Membresía Basic",
        fecha: "2024-05-21",
        estatus: "Pendiente",
      },
    ];
    setVentas(guardadasVentas);
  }, []);

  // --- LÓGICA DE PLANES ---
  const handleGuardarPlan = () => {
    if (!nombre || !precio || !clases) {
      alert(
        "Por favor, llena los campos principales (Nombre, Precio y Clases).",
      );
      return;
    }

    const infoPlan = {
      id: editandoId || Date.now(),
      nombre: nombre,
      precio: precio,
      clases: clases,
      items: descripcion
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i !== ""),
      recomendado: esRecomendado || nombre.toLowerCase() === "pro",
    };

    let nuevaLista = editandoId
      ? planes.map((p) => (p.id === editandoId ? infoPlan : p))
      : [...planes, infoPlan];

    setPlanes(nuevaLista);
    localStorage.setItem("mis_planes", JSON.stringify(nuevaLista));

    setNombre("");
    setPrecio("");
    setClases("");
    setDescripcion("");
    setEsRecomendado(false);
    setEditandoId(null);
    alert("¡Plan publicado con éxito!");
  };

  const eliminarPlan = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este precio?")) {
      const filtrados = planes.filter((p) => p.id !== id);
      setPlanes(filtrados);
      localStorage.setItem("mis_planes", JSON.stringify(filtrados));
    }
  };

  const prepararEdicion = (plan) => {
    setEditandoId(plan.id);
    setNombre(plan.nombre);
    setDescripcion(plan.items.join(", "));
    setPrecio(plan.precio);
    setClases(plan.clases || "");
    setEsRecomendado(plan.recomendado || false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- LÓGICA DE IMÁGENES ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDiscImg(reader.result);
      };
      reader.readAsDataURL(file);
      e.target.value = null;
    }
  };

  // --- LÓGICA DE DISCIPLINAS ---
  const handleGuardarDisciplina = () => {
    if (!discNombre || !discDescCorta || !discImg)
      return alert("Completa el título, descripción corta e imagen");

    const nuevaDisc = {
      id: editandoDiscId || Date.now(),
      nombre: discNombre,
      descCorta: discDescCorta,
      detalles: discDetalles,
      img: discImg,
      beneficios: discBeneficios
        .split(",")
        .map((b) => b.trim())
        .filter((b) => b !== ""),
    };

    const nuevaLista = editandoDiscId
      ? disciplinas.map((d) => (d.id === editandoDiscId ? nuevaDisc : d))
      : [...disciplinas, nuevaDisc];

    setDisciplinas(nuevaLista);
    localStorage.setItem("mis_disciplinas", JSON.stringify(nuevaLista));

    setDiscNombre("");
    setDiscDescCorta("");
    setDiscDetalles("");
    setDiscBeneficios("");
    setDiscImg("");
    setEditandoDiscId(null);
    alert("¡Disciplina actualizada!");
  };

  const eliminarDisciplina = (id) => {
    if (window.confirm("¿Eliminar esta disciplina?")) {
      const filtrados = disciplinas.filter((d) => d.id !== id);
      setDisciplinas(filtrados);
      localStorage.setItem("mis_disciplinas", JSON.stringify(filtrados));
    }
  };

  const prepararEdicionDisc = (d) => {
    setEditandoDiscId(d.id);
    setDiscNombre(d.nombre);
    setDiscDescCorta(d.descCorta);
    setDiscDetalles(d.detalles);
    setDiscBeneficios(d.beneficios.join(", "));
    setDiscImg(d.img || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- LÓGICA DE COACHES ---
  const handleGuardarCoach = () => {
    if (!coachNombre || !coachCorreo || !coachEspecialidad) {
      return alert("Por favor completa el nombre, correo y especialidad.");
    }

    const nuevoCoach = {
      id: editandoCoachId || Date.now(),
      nombre: coachNombre,
      correo: coachCorreo,
      especialidad: coachEspecialidad,
      rol: "coach",
    };

    const nuevaLista = editandoCoachId
      ? coaches.map((c) => (c.id === editandoCoachId ? nuevoCoach : c))
      : [...coaches, nuevoCoach];

    setCoaches(nuevaLista);
    localStorage.setItem("mis_coaches", JSON.stringify(nuevaLista));

    setCoachNombre("");
    setCoachCorreo("");
    setCoachEspecialidad("");
    setEditandoCoachId(null);
    alert("Coach guardado correctamente");
  };

  const eliminarCoach = (id) => {
    if (window.confirm("¿Eliminar este coach?")) {
      const filtrados = coaches.filter((c) => c.id !== id);
      setCoaches(filtrados);
      localStorage.setItem("mis_coaches", JSON.stringify(filtrados));

      const clasesFiltradas = clasesProgramadas.filter(
        (clase) => clase.coachId !== id,
      );
      setClasesProgramadas(clasesFiltradas);
      localStorage.setItem(
        "clases_programadas",
        JSON.stringify(clasesFiltradas),
      );
    }
  };

  const prepararEdicionCoach = (c) => {
    setEditandoCoachId(c.id);
    setCoachNombre(c.nombre);
    setCoachCorreo(c.correo);
    setCoachEspecialidad(c.especialidad);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- LÓGICA: GUARDAR ASIGNACIÓN DE HORARIOS ---
  const handleGuardarHorario = () => {
    if (!claseCoachId || !claseDia || !claseHoraInicio || !claseHoraFin) {
      return alert("Por favor, completa todos los campos del horario.");
    }

    const coachSeleccionado = coaches.find(
      (c) => c.id === Number(claseCoachId),
    );
    if (!coachSeleccionado) return alert("Coach no encontrado.");

    const nuevoHorario = {
      id: Date.now(),
      coachId: coachSeleccionado.id,
      coachNombre: coachSeleccionado.nombre,
      especialidad: coachSeleccionado.especialidad,
      diaSemana: claseDia,
      horaInicio: claseHoraInicio,
      horaFin: claseHoraFin,
      alumnosInscritos: [],
    };

    const listaActualizada = [...clasesProgramadas, nuevoHorario];
    setClasesProgramadas(listaActualizada);
    localStorage.setItem(
      "clases_programadas",
      JSON.stringify(listaActualizada),
    );

    setClaseHoraInicio("");
    setClaseHoraFin("");
    alert("¡Horario asignado exitosamente!");
  };

  const eliminarHorario = (id) => {
    if (window.confirm("¿Eliminar este horario programado?")) {
      const filtrados = clasesProgramadas.filter((h) => h.id !== id);
      setClasesProgramadas(filtrados);
      localStorage.setItem("clases_programadas", JSON.stringify(filtrados));
    }
  };

  // --- COMPONENTES INTERNOS ---
  const SidebarItem = ({ active, label, onClick }) => (
    <div
      onClick={onClick}
      style={{
        padding: "14px 18px",
        borderRadius: "14px",
        cursor: "pointer",
        transition: ".25s",
        background: active ? "rgba(125,23,13,.08)" : "transparent",
        color: active ? "var(--primary)" : "var(--text-primary)",
        fontWeight: active ? "600" : "500",
        borderLeft: active
          ? "4px solid var(--primary)"
          : "4px solid transparent",
      }}
    >
      {label}
    </div>
  );

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", background: "transparent" }}
    >
      {/* Sidebar / Barra Lateral */}
      <aside
        style={{
          width: "280px",
          background: "#f3ede8",
          borderRight: "1px solid var(--border)",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <img
            src="/img/I agree_logo-06.png"
            alt="Logo"
            style={{ width: "180px" }}
          />
          <div
            style={{
              height: "3px",
              width: "100%",
              background: "var(--primary)",
              marginTop: "15px",
              borderRadius: "999px",
            }}
          />
        </div>

        <div
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            opacity: 0.6,
            marginBottom: "20px",
            paddingLeft: "15px",
          }}
        >
          Gestión
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <SidebarItem
            active={vistaActiva === "precios"}
            label="Precios"
            onClick={() => setVistaActiva("precios")}
          />
          <SidebarItem
            active={vistaActiva === "disciplinas"}
            label="Disciplinas"
            onClick={() => setVistaActiva("disciplinas")}
          />
          <SidebarItem
            active={vistaActiva === "coaches"}
            label="Gestión de Coaches"
            onClick={() => setVistaActiva("coaches")}
          />

          {/* ÚNICO APARTADO NUEVO REQUERIDO */}
          <SidebarItem
            active={vistaActiva === "asignar_horarios"}
            label="Asignar Horarios"
            onClick={() => setVistaActiva("asignar_horarios")}
          />

          <SidebarItem
            active={vistaActiva === "ventas"}
            label="Clientes"
            onClick={() => setVistaActiva("ventas")}
          />
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main style={{ flex: 1, padding: "40px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            marginBottom: "30px",
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          ← Ver Sitio Web
        </button>

        {/* VISTA PRECIOS */}
        {vistaActiva === "precios" && (
          <>
            <h2
              style={{
                marginBottom: "40px",
                fontFamily: "Playfair Display",
                fontSize: "32px",
                color: "#4a3b32",
              }}
            >
              {editandoId ? "EDITAR PLAN" : "CREAR NUEVO PLAN"}
            </h2>
            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "30px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
                marginBottom: "50px",
                maxWidth: "850px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "25px",
                  alignItems: "center",
                }}
              >
                <label>Título del Plan</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Plan Pro"
                />

                <label>Precio</label>
                <input
                  type="text"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="$ 1,200"
                />

                <label>Clases (frecuencia)</label>
                <input
                  type="text"
                  value={clases}
                  onChange={(e) => setClases(e.target.value)}
                  placeholder="Ej. 4 clases al mes"
                />

                <label>Beneficios (separados por coma)</label>
                <textarea
                  rows="3"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Mat incluido, Acceso a regaderas..."
                />

                <label>¿Es Recomendado?</label>
                <input
                  type="checkbox"
                  checked={esRecomendado}
                  onChange={(e) => setEsRecomendado(e.target.checked)}
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <button
                  onClick={handleGuardarPlan}
                  className="btn-pill"
                  style={{ padding: "15px 50px" }}
                >
                  {editandoId ? "ACTUALIZAR CAMBIOS" : "GUARDAR Y PUBLICAR"}
                </button>
              </div>
            </div>

            <h3
              style={{
                marginBottom: "20px",
                fontFamily: "Playfair Display",
                color: "#4a3b32",
              }}
            >
              Planes Publicados
            </h3>
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(0,0,0,0.02)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead style={{ background: "#f9f7f2", color: "#4a3b32" }}>
                  <tr>
                    <th style={{ padding: "15px" }}>Título</th>
                    <th style={{ padding: "15px" }}>Precio</th>
                    <th style={{ padding: "15px" }}>Frecuencia</th>
                    <th style={{ padding: "15px" }}>Beneficios</th>
                    <th style={{ padding: "15px" }}>Destacado</th>
                    <th style={{ padding: "15px" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {planes.map((plan) => (
                    <tr
                      key={plan.id}
                      style={{ borderBottom: "1px solid #f0ece3" }}
                    >
                      <td style={{ padding: "15px", fontWeight: "600" }}>
                        {plan.nombre}
                      </td>
                      <td style={{ padding: "15px" }}>{plan.precio}</td>
                      <td
                        style={{
                          padding: "15px",
                          fontSize: "13px",
                          color: "#555",
                        }}
                      >
                        {plan.clases || "No especificado"}
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          fontSize: "12px",
                          color: "#666",
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {plan.items?.join(" • ") || "Sin beneficios"}
                      </td>
                      <td style={{ padding: "15px" }}>
                        {plan.recomendado ? (
                          <span
                            style={{
                              color: "#d4a373",
                              fontWeight: "bold",
                              fontSize: "13px",
                            }}
                          >
                            ★ Sí
                          </span>
                        ) : (
                          <span style={{ color: "#aaa", fontSize: "13px" }}>
                            No
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "15px", whiteSpace: "nowrap" }}>
                        <button
                          onClick={() => prepararEdicion(plan)}
                          style={{
                            marginRight: "10px",
                            color: "#6b705c",
                            cursor: "pointer",
                            background: "none",
                            border: "1px solid",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => eliminarPlan(plan.id)}
                          style={{
                            color: "#e63946",
                            cursor: "pointer",
                            background: "none",
                            border: "1px solid",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* VISTA DISCIPLINAS */}
        {vistaActiva === "disciplinas" && (
          <>
            <h2
              style={{
                marginBottom: "40px",
                fontFamily: "Playfair Display",
                fontSize: "32px",
                color: "#4a3b32",
              }}
            >
              {editandoDiscId ? "EDITAR DISCIPLINA" : "NUEVA DISCIPLINA"}
            </h2>
            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "30px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
                marginBottom: "50px",
                maxWidth: "850px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "25px",
                  alignItems: "center",
                }}
              >
                <label>Nombre Disciplina</label>
                <input
                  type="text"
                  value={discNombre}
                  onChange={(e) => setDiscNombre(e.target.value)}
                  placeholder="Ej. Pilates"
                />

                <label>Imagen</label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "8px",
                      border: "1px dashed #c2b9ad",
                      background: "#f9f7f2",
                      cursor: "pointer",
                    }}
                  >
                    {discImg ? "Cambiar Imagen" : "Subir desde PC"}
                  </button>
                  {discImg && (
                    <img
                      src={discImg}
                      alt="Preview"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>

                <label>Descripción Corta</label>
                <input
                  type="text"
                  value={discDescCorta}
                  onChange={(e) => setDiscDescCorta(e.target.value)}
                  placeholder="Breve descripción..."
                />

                <label>Detalles del Modal</label>
                <textarea
                  rows="4"
                  value={discDetalles}
                  onChange={(e) => setDiscDetalles(e.target.value)}
                  placeholder="Información extendida..."
                />

                <label>Beneficios (por coma)</label>
                <input
                  type="text"
                  value={discBeneficios}
                  onChange={(e) => setDiscBeneficios(e.target.value)}
                  placeholder="Fuerza, Flexibilidad..."
                />
              </div>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <button
                  onClick={handleGuardarDisciplina}
                  className="btn-pill"
                  style={{ padding: "15px 50px" }}
                >
                  {editandoDiscId
                    ? "ACTUALIZAR DISCIPLINA"
                    : "GUARDAR DISCIPLINA"}
                </button>
              </div>
            </div>

            <h3
              style={{
                marginBottom: "20px",
                fontFamily: "Playfair Display",
                color: "#4a3b32",
              }}
            >
              Disciplinas Activas
            </h3>
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(0,0,0,0.02)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead style={{ background: "#f9f7f2", color: "#4a3b32" }}>
                  <tr>
                    <th style={{ padding: "15px" }}>Vista</th>
                    <th style={{ padding: "15px" }}>Disciplina</th>
                    <th style={{ padding: "15px" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplinas.map((d) => (
                    <tr
                      key={d.id}
                      style={{ borderBottom: "1px solid #f0ece3" }}
                    >
                      <td style={{ padding: "15px" }}>
                        <img
                          src={d.img}
                          alt="preview"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td style={{ padding: "15px", fontWeight: "600" }}>
                        {d.nombre}
                      </td>
                      <td style={{ padding: "15px" }}>
                        <button
                          onClick={() => prepararEdicionDisc(d)}
                          style={{
                            marginRight: "10px",
                            color: "#6b705c",
                            cursor: "pointer",
                            background: "none",
                            border: "1px solid",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => eliminarDisciplina(d.id)}
                          style={{
                            color: "#e63946",
                            cursor: "pointer",
                            background: "none",
                            border: "1px solid",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* VISTA COACHES */}
        {vistaActiva === "coaches" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "between",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h2
                style={{
                  fontFamily: "Playfair Display",
                  fontSize: "32px",
                  color: "#4a3b32",
                  margin: 0,
                }}
              >
                {editandoCoachId ? "Editar Coach" : "Nuevo Coach"}
              </h2>
            </div>

            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(74, 59, 50, 0.05)",
                marginBottom: "50px",
                maxWidth: "850px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b5e53",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={coachNombre}
                    onChange={(e) => setCoachNombre(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e6e1da",
                      backgroundColor: "#fbfbfa",
                      fontSize: "15px",
                      color: "#4a3b32",
                      outline: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b5e53",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={coachCorreo}
                    onChange={(e) => setCoachCorreo(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e6e1da",
                      backgroundColor: "#fbfbfa",
                      fontSize: "15px",
                      color: "#4a3b32",
                      outline: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    gridColumn: "1 / -1",
                  }}
                >
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b5e53",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Especialidad
                  </label>
                  <input
                    type="text"
                    value={coachEspecialidad}
                    onChange={(e) => setCoachEspecialidad(e.target.value)}
                    placeholder="Ej. Yoga, HIIT, Pilates"
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e6e1da",
                      backgroundColor: "#fbfbfa",
                      fontSize: "15px",
                      color: "#4a3b32",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "15px",
                  marginTop: "35px",
                }}
              >
                {editandoCoachId && (
                  <button
                    onClick={() => {
                      setCoachNombre("");
                      setCoachCorreo("");
                      setCoachEspecialidad("");
                      setEditandoCoachId(null);
                    }}
                    style={{
                      padding: "14px 28px",
                      borderRadius: "50px",
                      border: "1px solid #e6e1da",
                      background: "transparent",
                      color: "#6b5e53",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Cancelar
                  </button>
                )}
                <button
                  onClick={handleGuardarCoach}
                  className="btn-pill"
                  style={{
                    padding: "14px 40px",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  {editandoCoachId ? "GUARDAR CAMBIOS" : "REGISTRAR COACH"}
                </button>
              </div>
            </div>

            <h3
              style={{
                marginBottom: "24px",
                fontFamily: "Playfair Display",
                fontSize: "24px",
                color: "#4a3b32",
              }}
            >
              Lista de Coaches
            </h3>
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(74, 59, 50, 0.03)",
                maxWidth: "850px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead
                  style={{
                    background: "#fdfbfa",
                    color: "#6b5e53",
                    borderBottom: "2px solid #f3ece3",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        padding: "18px 24px",
                        fontSize: "13px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                      }}
                    >
                      Nombre
                    </th>
                    <th
                      style={{
                        padding: "18px 24px",
                        fontSize: "13px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                      }}
                    >
                      Correo
                    </th>
                    <th
                      style={{
                        padding: "18px 24px",
                        fontSize: "13px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                      }}
                    >
                      Especialidad
                    </th>
                    <th
                      style={{
                        padding: "18px 24px",
                        fontSize: "13px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        textAlign: "right",
                      }}
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coaches.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          padding: "40px",
                          textAlign: "center",
                          color: "#a3978e",
                          fontSize: "15px",
                        }}
                      >
                        No hay coaches registrados todavía.
                      </td>
                    </tr>
                  ) : (
                    coaches.map((c) => (
                      <tr
                        key={c.id}
                        style={{ borderBottom: "1px solid #f5f2eb" }}
                      >
                        <td
                          style={{
                            padding: "18px 24px",
                            fontWeight: "600",
                            color: "#4a3b32",
                            fontSize: "15px",
                          }}
                        >
                          {c.nombre}
                        </td>
                        <td
                          style={{
                            padding: "18px 24px",
                            color: "#6b5e53",
                            fontSize: "14px",
                          }}
                        >
                          {c.correo}
                        </td>
                        <td
                          style={{
                            padding: "18px 24px",
                            color: "#6b5e53",
                            fontSize: "14px",
                          }}
                        >
                          <span
                            style={{
                              background: "#f3ece3",
                              color: "#4a3b32",
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {c.especialidad}
                          </span>
                        </td>
                        <td
                          style={{ padding: "18px 24px", textAlign: "right" }}
                        >
                          <button
                            onClick={() => prepararEdicionCoach(c)}
                            style={{
                              marginRight: "8px",
                              color: "#8c7e74",
                              cursor: "pointer",
                              background: "none",
                              border: "1px solid #e6e1da",
                              padding: "6px 14px",
                              borderRadius: "8px",
                              fontSize: "13px",
                            }}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarCoach(c.id)}
                            style={{
                              color: "#d94141",
                              cursor: "pointer",
                              background: "#fff5f5",
                              border: "1px solid #fecdcd",
                              padding: "6px 14px",
                              borderRadius: "8px",
                              fontSize: "13px",
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* VISTA: ASIGNAR HORARIOS (ADMIN / COACH VIEW) */}
        {vistaActiva === "asignar_horarios" && (
          <>
            <h2
              style={{
                marginBottom: "40px",
                fontFamily: "Playfair Display",
                fontSize: "32px",
                color: "#4a3b32",
              }}
            >
              Asignar Horario a Coach
            </h2>

            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(74, 59, 50, 0.05)",
                marginBottom: "40px",
                maxWidth: "850px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "24px",
                }}
              >
                {/* Selector de Coach */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b5e53",
                      textTransform: "uppercase",
                    }}
                  >
                    Coach
                  </label>
                  <select
                    value={claseCoachId}
                    onChange={(e) => setClaseCoachId(e.target.value)}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e6e1da",
                      backgroundColor: "#fbfbfa",
                      color: "#4a3b32",
                      fontSize: "15px",
                      outline: "none",
                    }}
                  >
                    <option value="">Selecciona un coach...</option>
                    {coaches.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre} ({c.especialidad})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selector de Día */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b5e53",
                      textTransform: "uppercase",
                    }}
                  >
                    Día de la semana
                  </label>
                  <select
                    value={claseDia}
                    onChange={(e) => setClaseDia(e.target.value)}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e6e1da",
                      backgroundColor: "#fbfbfa",
                      color: "#4a3b32",
                      fontSize: "15px",
                      outline: "none",
                    }}
                  >
                    <option value="">Selecciona un día...</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                  </select>
                </div>

                {/* Hora de Inicio */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b5e53",
                      textTransform: "uppercase",
                    }}
                  >
                    Hora Inicio
                  </label>
                  <input
                    type="time"
                    value={claseHoraInicio}
                    onChange={(e) => setClaseHoraInicio(e.target.value)}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e6e1da",
                      backgroundColor: "#fbfbfa",
                      color: "#4a3b32",
                      fontSize: "15px",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Hora de Fin */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b5e53",
                      textTransform: "uppercase",
                    }}
                  >
                    Hora Fin
                  </label>
                  <input
                    type="time"
                    value={claseHoraFin}
                    onChange={(e) => setClaseHoraFin(e.target.value)}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e6e1da",
                      backgroundColor: "#fbfbfa",
                      color: "#4a3b32",
                      fontSize: "15px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "30px",
                }}
              >
                <button
                  onClick={handleGuardarHorario}
                  className="btn-pill"
                  style={{
                    padding: "14px 40px",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  ASIGNAR HORARIO
                </button>
              </div>
            </div>

            {/* Tabla de Control de Horarios Asignados */}
            <h3
              style={{
                marginBottom: "20px",
                fontFamily: "Playfair Display",
                color: "#4a3b32",
              }}
            >
              Horarios Activos
            </h3>
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(0,0,0,0.02)",
                maxWidth: "850px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead
                  style={{
                    background: "#fdfbfa",
                    color: "#6b5e53",
                    borderBottom: "2px solid #f3ece3",
                  }}
                >
                  <tr>
                    <th style={{ padding: "15px" }}>Coach</th>
                    <th style={{ padding: "15px" }}>Día</th>
                    <th style={{ padding: "15px" }}>Horario</th>
                    <th style={{ padding: "15px" }}>Especialidad</th>
                    <th style={{ padding: "15px", textAlign: "right" }}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clasesProgramadas.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          padding: "30px",
                          textAlign: "center",
                          color: "#a3978e",
                        }}
                      >
                        No hay horarios asignados todavía.
                      </td>
                    </tr>
                  ) : (
                    clasesProgramadas.map((h) => (
                      <tr
                        key={h.id}
                        style={{ borderBottom: "1px solid #f5f2eb" }}
                      >
                        <td
                          style={{
                            padding: "15px",
                            fontWeight: "600",
                            color: "#4a3b32",
                          }}
                        >
                          {h.coachNombre}
                        </td>
                        <td style={{ padding: "15px", color: "#6b5e53" }}>
                          {h.diaSemana}
                        </td>
                        <td style={{ padding: "15px", color: "#6b5e53" }}>
                          {h.horaInicio} - {h.horaFin}
                        </td>
                        <td style={{ padding: "15px" }}>
                          <span
                            style={{
                              background: "#f3ece3",
                              color: "#4a3b32",
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "12px",
                            }}
                          >
                            {h.especialidad}
                          </span>
                        </td>
                        <td style={{ padding: "15px", textAlign: "right" }}>
                          <button
                            onClick={() => eliminarHorario(h.id)}
                            style={{
                              color: "#e63946",
                              cursor: "pointer",
                              background: "none",
                              border: "1px solid",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              fontSize: "12px",
                            }}
                          >
                            Quitar Horario
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* VISTA CLIENTES */}
        {vistaActiva === "ventas" && (
          <>
            <h2
              style={{
                marginBottom: "40px",
                fontFamily: "Playfair Display",
                fontSize: "32px",
                color: "#4a3b32",
              }}
            >
              CONTROL DE CLIENTES
            </h2>
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(0,0,0,0.02)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead style={{ background: "#f9f7f2", color: "#4a3b32" }}>
                  <tr>
                    <th style={{ padding: "18px" }}>Cliente</th>
                    <th style={{ padding: "18px" }}>Correo</th>
                    <th style={{ padding: "18px" }}>Plan</th>
                    <th style={{ padding: "18px" }}>Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((v) => (
                    <tr
                      key={v.id}
                      style={{ borderBottom: "1px solid #f0ece3" }}
                    >
                      <td style={{ padding: "18px", fontWeight: "600" }}>
                        {v.cliente}
                      </td>
                      <td style={{ padding: "18px", color: "#666" }}>
                        {v.correo}
                      </td>
                      <td style={{ padding: "18px" }}>
                        <span
                          style={{
                            background: "#f3ede8",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {v.plan}
                        </span>
                      </td>
                      <td style={{ padding: "18px" }}>
                        <span
                          style={{
                            color:
                              v.estatus === "Pagado" ? "#27ae60" : "#d4a373",
                            fontWeight: "bold",
                            fontSize: "13px",
                          }}
                        >
                          ● {v.estatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
