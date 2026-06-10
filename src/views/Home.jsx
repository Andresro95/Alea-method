import React, { useState, useEffect } from "react";
import "../index.css";

const Home = () => {
  const [disciplinasDinamicas, setDisciplinasDinamicas] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  // Cargamos solo las disciplinas del admin
  useEffect(() => {
    const guardadosDisciplinas =
      JSON.parse(localStorage.getItem("mis_disciplinas")) || [];
    setDisciplinasDinamicas(guardadosDisciplinas);
  }, []);

  return (
    <div className="home-wrapper">
      {/* 1. HERO SECTION */}
      {/* <header
        id="inicio"
        style={{
          textAlign: "center",
          padding: "120px 20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      > */}
      <header
        id="inicio"
        className="container text-center py-5"
        style={{
          maxWidth: "900px",
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            marginBottom: "20px",
            color: "var(--text-primary)",
            lineHeight: "1.1",
          }}
        >
          Reencuentra el equilibrio <br />{" "}
          <span style={{ fontStyle: "italic", fontWeight: "400" }}>
            de tu cuerpo.
          </span>
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "40px",
            fontSize: "19px",
            lineHeight: "1.6",
          }}
        >
          Un espacio dedicado al bienestar integral a través del método Pilates.{" "}
          <br />
          Clases personalizadas para todos los niveles en un ambiente de paz.
        </p>

        {/* Botón que lleva a la sección de clases dentro del mismo Home */}
        <button
          onClick={() =>
            document
              .getElementById("clases")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="btn-pill"
          style={{ padding: "18px 45px", fontSize: "16px" }}
        >
          Explorar Disciplinas
        </button>

        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "80px",
            marginTop: "100px",
          }}
        >
          <Benefit
            icon="🌿"
            title="Paz Mental"
            text="Reduce el estrés diario"
          />
          <Benefit icon="📏" title="Postura" text="Alineación corporal" />
          <Benefit icon="✨" title="Vitalidad" text="Energía para tu día" />
        </div> */}
        <div className="row justify-content-center mt-5 g-4">
          <div className="col-12 col-md-4">
            <Benefit
              icon="🌿"
              title="Paz Mental"
              text="Reduce el estrés diario"
            />
          </div>

          <div className="col-12 col-md-4">
            <Benefit icon="📏" title="Postura" text="Alineación corporal" />
          </div>

          <div className="col-12 col-md-4">
            <Benefit icon="✨" title="Vitalidad" text="Energía para tu día" />
          </div>
        </div>
      </header>

      {/* 2. SOBRE NOSOTROS */}
      <section
        className="py-5"
        style={{
          background: "var(--surface)",
        }}
      >
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
                alt="Studio"
                style={{
                  width: "100%",
                  borderRadius: "30px",
                  boxShadow: "20px 20px 0px #ead7cf",
                }}
              />
            </div>

            <div className="col-12 col-lg-6">
              <h2
                style={{
                  fontFamily: "Playfair Display",
                  fontSize: "42px",
                  color: "var(--text-primary)",
                  marginBottom: "25px",
                }}
              >
                Tu bienestar es nuestra prioridad.
              </h2>

              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "17px",
                  lineHeight: "1.8",
                  marginBottom: "30px",
                }}
              >
                En Mente y Cuerpo Pilates, creemos que el movimiento es
                medicina. Nuestras sesiones están diseñadas para fortalecer no
                solo tus músculos, sino también tu conexión interna.
              </p>

              <div
                style={{
                  borderLeft: "4px solid var(--primary)",
                  paddingLeft: "20px",
                  fontStyle: "italic",
                  color: "var(--secondary)",
                }}
              >
                "La salud es un estado normal de la mente y el cuerpo." - Joseph
                Pilates
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section
        style={{
          display: "flex",
          padding: "100px 50px",
          alignItems: "center",
          gap: "50px",
          background: "var(--surface)",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
            alt="Studio"
            style={{
              width: "100%",
              borderRadius: "30px",
              boxShadow: "20px 20px 0px #ead7cf",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontFamily: "Playfair Display",
              fontSize: "42px",
              color: "var(--text-primary)",
              marginBottom: "25px",
            }}
          >
            Tu bienestar es nuestra prioridad.
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "17px",
              lineHeight: "1.8",
              marginBottom: "30px",
            }}
          >
            En Mente y Cuerpo Pilates, creemos que el movimiento es medicina.
            Nuestras sesiones están diseñadas para fortalecer no solo tus
            músculos, sino también tu conexión interna.
          </p>
          <div
            style={{
              borderLeft: "4px solid var(--primary)",
              paddingLeft: "20px",
              fontStyle: "italic",
              color: "var(--secondary)",
            }}
          >
            "La salud es un estado normal de la mente y el cuerpo." - Joseph
            Pilates
          </div>
        </div>
      </section> */}

      {/* 3. SECCIÓN DE CLASES (DINÁMICA DESDE ADMIN) */}
      {/* <section
        id="clases"
        style={{
          padding: "100px 50px",
          textAlign: "center",
          background: "var(--background)",
        }}
      >
        <h2
          style={{
            fontFamily: "Playfair Display",
            fontSize: "40px",
            marginBottom: "15px",
            color: "var(--text-primary)",
          }}
        >
          Nuestras Disciplinas
        </h2>
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "60px",
          }}
        >
          {disciplinasDinamicas.length > 0 ? (
            disciplinasDinamicas.map((disciplina) => (
              <ClassCard
                key={disciplina.id}
                img={disciplina.img}
                title={disciplina.nombre}
                desc={disciplina.descCorta}
                onOpen={() => setSelectedClass(disciplina)}
              />
            ))
          ) : (
            <p>No hay disciplinas disponibles por ahora.</p>
          )}
        </div>
      </section> */}
      <section
        id="clases"
        className="py-5"
        style={{
          background: "var(--background)",
        }}
      >
        <div className="container text-center">
          <h2
            style={{
              fontFamily: "Playfair Display",
              fontSize: "40px",
              marginBottom: "15px",
              color: "var(--text-primary)",
            }}
          >
            Nuestras Disciplinas
          </h2>

          <div className="row g-4 mt-5">
            {disciplinasDinamicas.length > 0 ? (
              disciplinasDinamicas.map((disciplina) => (
                <div key={disciplina.id} className="col-12 col-md-6 col-lg-4">
                  <ClassCard
                    img={disciplina.img}
                    title={disciplina.nombre}
                    desc={disciplina.descCorta}
                    onOpen={() => setSelectedClass(disciplina)}
                  />
                </div>
              ))
            ) : (
              <p>No hay disciplinas disponibles por ahora.</p>
            )}
          </div>
        </div>
      </section>

      {/* 4. CONTACTO */}
      <section
        id="contacto"
        className="py-5"
        style={{
          background: "var(--surface)",
        }}
      >
        <div className="container">
          <div className="row g-5">
            <div className="col-12 col-lg-4">
              <h2
                style={{
                  fontFamily: "Playfair Display",
                  fontSize: "40px",
                  marginBottom: "20px",
                }}
              >
                Contáctanos
              </h2>

              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "30px",
                }}
              >
                ¿Tienes dudas? Déjanos un mensaje y te responderemos pronto.
              </p>

              <div style={{ marginBottom: "15px" }}>
                📍 Calle Pilates #45, Col. Centro
              </div>

              <div style={{ marginBottom: "15px" }}>📞 +52 555 987 6543</div>

              <div style={{ marginBottom: "15px" }}>
                📧 hola@menteycuerpo.com
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div
                style={{
                  background: "var(--background)",
                  padding: "40px",
                  borderRadius: "30px",
                }}
              >
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <input
                      type="text"
                      placeholder="Nombre"
                      style={{
                        border: "1px solid var(--border)",
                        padding: "12px",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <input
                      type="email"
                      placeholder="Correo"
                      style={{
                        border: "1px solid var(--border)",
                        padding: "12px",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>

                <textarea
                  placeholder="¿En qué podemos ayudarte?"
                  rows="5"
                  style={{
                    border: "1px solid #eee",
                    marginBottom: "20px",
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                  }}
                />

                <button
                  className="btn-pill"
                  style={{
                    width: "100%",
                  }}
                >
                  Enviar Mensaje
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section
        id="contacto"
        style={{ padding: "100px 50px", background: "var(--surface)" }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            gap: "80px",
          }}
        >
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontFamily: "Playfair Display",
                fontSize: "40px",
                marginBottom: "20px",
              }}
            >
              Contáctanos
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>
              ¿Tienes dudas? Déjanos un mensaje y te responderemos pronto.
            </p>
            <div style={{ marginBottom: "15px" }}>
              📍 Calle Pilates #45, Col. Centro
            </div>
            <div style={{ marginBottom: "15px" }}>📞 +52 555 987 6543</div>
            <div style={{ marginBottom: "15px" }}>📧 hola@menteycuerpo.com</div>
          </div>
          <div
            style={{
              flex: 1.5,
              background: "var(--background)",
              padding: "40px",
              borderRadius: "30px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Nombre"
                style={{
                  border: "1px solid var(--border)",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              />
              <input
                type="email"
                placeholder="Correo"
                style={{
                  border: "1px solid var(--border)",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              />
            </div>
            <textarea
              placeholder="¿En qué podemos ayudarte?"
              rows="5"
              style={{
                border: "1px solid #eee",
                marginBottom: "20px",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
              }}
            ></textarea>
            <button className="btn-pill" style={{ width: "100%" }}>
              Enviar Mensaje
            </button>
          </div>
        </div>
      </section> */}

      {/* 5. FOOTER */}
      <footer
        className="py-5"
        style={{
          padding: "60px 50px",
          background: "var(--footer)",
          color: "white",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Playfair Display",
            fontSize: "24px",
            marginBottom: "10px",
          }}
        >
          Mente y Cuerpo Pilates
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "30px",
            fontSize: "12px",
            opacity: 0.7,
          }}
        >
          © 2026 MENTE Y CUERPO PILATES. DISEÑADO PARA TU BIENESTAR.
        </div>
      </footer>

      {/* MODAL DE INFORMACIÓN DE CLASES */}
      <InfoModal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        title={selectedClass?.nombre}
        data={selectedClass || {}}
      />
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const InfoModal = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--surface)",
          padding: "40px",
          borderRadius: "30px",
          maxWidth: "500px",
          width: "100%",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            border: "none",
            background: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "var(--text-secondary)",
          }}
        >
          ✕
        </button>
        <h3
          style={{
            fontFamily: "Playfair Display",
            fontSize: "32px",
            marginBottom: "15px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "var(--text-secondary)",
            lineHeight: "1.6",
            marginBottom: "20px",
          }}
        >
          {data.detalles}
        </p>
        {data.beneficios && (
          <div
            style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}
          >
            <h4
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                color: "var(--secondary)",
                marginBottom: "10px",
              }}
            >
              Beneficios:
            </h4>
            <ul
              style={{
                paddingLeft: "18px",
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              {data.beneficios.map((b, i) => (
                <li key={i} style={{ marginBottom: "5px" }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="btn-pill"
          style={{ width: "100%", marginTop: "30px" }}
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const Benefit = ({ icon, title, text }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: "35px", marginBottom: "15px" }}>{icon}</div>
    <div
      style={{
        fontWeight: "600",
        fontSize: "16px",
        color: "var(--text-primary)",
        marginBottom: "5px",
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
      {text}
    </div>
  </div>
);

const ClassCard = ({ img, title, desc, onOpen }) => (
  <div
    style={{
      background: "var(--surface)",
      borderRadius: "25px",
      // width: "320px",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
      textAlign: "left",
    }}
  >
    <img
      src={img}
      alt={title}
      style={{ width: "100%", height: "200px", objectFit: "cover" }}
    />
    <div style={{ padding: "25px" }}>
      <h4
        style={{
          fontFamily: "Playfair Display",
          fontSize: "20px",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: "1.5",
        }}
      >
        {desc}
      </p>
      <button
        onClick={onOpen}
        style={{
          marginTop: "20px",
          background: "none",
          border: "none",
          color: "var(--secondary)",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Saber más →
      </button>
    </div>
  </div>
);

export default Home;
