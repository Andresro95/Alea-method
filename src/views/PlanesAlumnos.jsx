import React, { useState, useEffect } from "react";
import { FaCheck, FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
// import "./PlanesAlumnos.css"; // Asegúrate de que los estilos del Home estén disponibles aquí

const PLANES_MOCK = [
  {
    id: 1,
    nombre: "Básico",
    precio: "1,200",
    clases: "4 clases al mes",
    beneficios: [
      "Acceso a Salón Principal",
      "App de reservas",
      "Vigencia 30 días",
    ],
    recomendado: false,
  },
  {
    id: 2,
    nombre: "Pro",
    precio: "2,200",
    clases: "8 clases al mes",
    beneficios: [
      "Acceso a ambos salones",
      "App de reservas",
      "Prioridad en lista de espera",
      "Toallas incluidas",
    ],
    recomendado: true,
  },
  {
    id: 3,
    nombre: "Elite",
    precio: "3,500",
    clases: "Clases ilimitadas",
    beneficios: [
      "Acceso total",
      "Invitado gratis al mes",
      "Kit de bienvenida",
      "App de reservas",
    ],
    recomendado: false,
  },
];

export const PlanesAlumnos = () => {
  const [planes, setPlanes] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("mis_planes"));
    if (guardados && guardados.length > 0) {
      setPlanes(guardados);
    } else {
      // Si no hay nada en LocalStorage, podrías cargar unos por defecto
      // setPlanes(PLANES_MOCK);
    }
  }, []);
  // LÓGICA DE INTERRUPTOR IGUAL AL HOME
  if (selectedPlan) {
    return (
      <CheckoutForm plan={selectedPlan} onBack={() => setSelectedPlan(null)} />
    );
  }

  return (
    <div className="planes-container">
      <div className="planes-header">
        <h1>Nuestras Membresías</h1>
        <p>Elige el plan que mejor se adapte a tu ritmo de entrenamiento</p>
      </div>

      <div className="pricing-grid">
        {/* Cambiamos PLANES_MOCK por 'planes' que viene del localStorage */}
        {planes.map((plan) => (
          <div
            key={plan.id}
            className={`pricing-card ${plan.recomendado ? "featured" : ""}`}
          >
            {plan.recomendado && (
              <span className="badge-recomendado">Más Popular</span>
            )}

            <div className="card-top">
              <h3
                style={{
                  fontSize: "28px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {plan.nombre}
              </h3>
              <div className="price-box">
                <span className="currency">$</span>
                <span className="amount">{plan.precio}</span>
                <span className="period">/mes</span>
              </div>
              {/* Ajuste: Si no guardas 'clases' en el admin, mostramos el primer beneficio o un texto base */}
              <p className="clases-label">
                {plan.clases || (plan.items && plan.items[0]) || "Plan Activo"}
              </p>
            </div>

            <ul className="beneficios-list">
              {/* Usamos plan.items porque así lo definiste en el Admin (descripcion.split(',')) */}
              {plan.items &&
                plan.items.map((ben, index) => (
                  <li key={index}>
                    <FaCheck className="check-icon" /> {ben}
                  </li>
                ))}
            </ul>

            <button
              className="btn-elegir-plan"
              onClick={() => setSelectedPlan(plan)}
            >
              Elegir Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// COMPONENTE DE PAGO CON LA LÓGICA COMPLETA DEL HOME
const CheckoutForm = ({ plan, onBack }) => {
  const [formData, setFormData] = useState({
    nombreTarjeta: "",
    correo: "", // Mantenemos "correo" para el backend
    numeroTarjeta: "",
    cvc: "",
    mesExpiracion: "",
    anioExpiracion: "",
  });

  const [cardType, setCardType] = useState("unknown");

  const detectCardType = (number) => {
    const re = {
      visa: /^4/,
      mastercard: /^(5[1-5]|2[2-7])/,
      amex: /^3[47]/,
    };
    if (re.visa.test(number)) return "visa";
    if (re.mastercard.test(number)) return "mastercard";
    if (re.amex.test(number)) return "amex";
    return "unknown";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "numeroTarjeta") {
      const cleanValue = value.replace(/\D/g, "").substring(0, 16);
      setCardType(detectCardType(cleanValue));
      setFormData({ ...formData, [name]: cleanValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const renderCardIcons = () => {
    const iconStyle = { fontSize: "24px", transition: "0.3s ease" };
    if (cardType === "visa")
      return <FaCcVisa style={{ ...iconStyle, color: "#1A1F71" }} />;
    if (cardType === "mastercard")
      return <FaCcMastercard style={{ ...iconStyle, color: "#EB001B" }} />;
    if (cardType === "amex")
      return <FaCcAmex style={{ ...iconStyle, color: "#0070CD" }} />;

    return (
      <div style={{ opacity: 0.5, display: "flex", gap: "8px" }}>
        <FaCcVisa style={iconStyle} />
        <FaCcMastercard style={iconStyle} />
        <FaCcAmex style={iconStyle} />
      </div>
    );
  };

  return (
    <div className="checkout-main-wrapper">
      <div className="back-button-container">
        <button onClick={onBack} className="btn-back">
          ← Volver a planes
        </button>
      </div>

      <div className="checkout-card-main">
        {/* LADO IZQUIERDO: RESUMEN */}
        <div className="summary-section">
          <h3 className="text-label">Resumen de compra</h3>
          <h2 className="plan-title">{plan.nombre}</h2>
          <div className="price-tag">${plan.precio}.00 MXN / mes</div>
          <p className="plan-description">
            {plan.clases}. Suscripción mensual con renovación automática.
          </p>
        </div>

        {/* LADO DERECHO: FORMULARIO */}
        <div className="payment-section">
          <h3 className="text-label">Detalles de Pago</h3>
          <div className="form-stack">
            <input
              type="text"
              name="nombreTarjeta"
              placeholder="Nombre en la tarjeta"
              className="input-custom"
              onChange={handleChange}
            />

            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              className="input-custom"
              value={formData.correo}
              onChange={handleChange}
            />

            <div className="card-input-box">
              <input
                type="text"
                name="numeroTarjeta"
                placeholder="Número de tarjeta"
                className="input-custom"
                value={formData.numeroTarjeta}
                onChange={handleChange}
              />
              <div className="card-icons-right">{renderCardIcons()}</div>
            </div>

            <div className="expiry-cvc-row">
              <div className="expiry-combo">
                <select
                  name="mesExpiracion"
                  className="select-clean"
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    MM
                  </option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <span style={{ color: "#dcd8d0" }}>/</span>
                <select
                  name="anioExpiracion"
                  className="select-clean"
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    AA
                  </option>
                  {[24, 25, 26, 27, 28, 29, 30].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                maxLength="4"
                className="input-custom"
                style={{ textAlign: "center" }}
                onChange={handleChange}
              />
            </div>

            <button className="btn-confirm">[ CONFIRMAR Y PAGAR ]</button>

            <div className="secure-footer">
              <BsShieldLockFill style={{ color: "var(--primary)" }} />
              <span>Pago encriptado y seguro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
