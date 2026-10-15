

"use client";



import { useEffect, useState } from "react";



const images = [

  "/images/portada-06.png",

  "/images/portada-02.png",

  "/images/portada-03.png",

  "/images/portada-04.png",

  "/images/portada-05.png",

  "/images/portada-07.png",

  "/images/portada-08.png",

  "/images/portada-09.png",

  "/images/portada-10.png",

];



const obras = [

  {

    id: "oficina",

    titulo: "Espacis Calidos",

    categoria: "Diseño de interiores",

    imagen: "/images/ofi/ofi6.png",

    galeria: [

      "/images/ofi/ofi1.png",

      "/images/ofi/ofi2.png",

      "/images/ofi/ofi3.png",

      "/images/ofi/ofi4.png",

      "/images/ofi/ofi5.png",

    ],

  },

  {

    id: "lobby",

    titulo: "Decoracion Regional",

    categoria: "Interiorismo · Espacios comunes",

    imagen: "/images/Lobby/lobby4.png",

    descripcion:

    "Ubicado en el centro de Catamarca, el lobby de este hotel es una celebración de la identidad regional. Inspirado en la riqueza cultural de la zona, el diseño combina materiales locales y colores cálidos que reflejan la esencia de la región. Como pieza central, destaca una escultura inspirada en obras del diseñador catamarqueño Cristian Mohaded, que aporta un toque de modernidad y arte al espacio. El resultado es un ambiente acogedor, elegante y profundamente conectado con la cultura local ",

    galeria: [

      "/images/Lobby/lobby1.png",

      "/images/Lobby/lobby2.png",

      "/images/Lobby/lobby3.png",

    ],

  },

  {

    id: "edificio",

    titulo: "Condensador de actividades",

    categoria: "Arquitectura · Proyecto edilicio",

    imagen: "/images/edificio/foto0.png",

    descripcion:

    "Un espacio que transforma la vida del barrio en un hervidero de actividades y conexión. Este proyecto se alza elevando sus bloques de actividades, creando un parque techado en su base, donde la comunidad puede disfrutar al aire libre sin preocuparse por el clima. Caminatas elvadas y bicisendas cruzan el espacio, invitando a moverse y explorar. La piel del edificio, hecha de material reciclado, no solo es sostenible, sino que también está diseñada para maximizar la iluminación natural y proteger del sol",

    galeria: [

      "/images/edificio/foto1.png",

      "/images/edificio/foto2.png",

      "/images/edificio/foto3.png",

      "/images/edificio/foto4.png",

    ],

  },

  {

    id: "habitacion",

    titulo: "Dormir con diseño",

    categoria: "Interiorismo · Diseño residencial",

    imagen: "/images/Habitacion/dormi0.png",

    galeria: [

      "/images/Habitacion/dormi1.png",

      "/images/Habitacion/dormi2.png",

      "/images/Habitacion/dormi3.png",

      "/images/Habitacion/dormi4.png",

    ],

  },

  {

    id: "edificio-2",

    titulo: "Espacios Barriales",

    categoria: "Arquitectura · Diseño",

    imagen: "/images/edi2/edi3.png",

    descripcion:

    "Ubicado en el corazón de Villa Cuba, este centro cultural es un refugio de creatividad y calidez. Su planta baja, completamente libre, invita a la imaginación con espacios versátiles para exposiciones, talleres y eventos comunitarios. En el segundo piso, las actividades cobran vida, en un entorno que combina la esencia de los materiales regionales con tonos cálidos que abrazan a quienes lo visitan. Un espacio pensado para conectar, inspirar y celebrar la cultura local",

    galeria: [

      "/images/edi2/edi1.png",

      "/images/edi2/edi2.png",

    ],

  },

    {

    id: "estacion-modular",

    titulo: "Estación Modular de Investigación y Exploración",

    categoria: "Arquitectura · Investigación y exploración",

    imagen: "/images/estacion-modular/r0.png",

    descripcion:

      "El proyecto propone una estación científica modular destinada a la investigación, observación y exploración de los paisajes de alta montaña de Catamarca. Su innovación consiste en reutilizar andamios metálicos en desuso provenientes de empresas mineras, transformándolos en una estructura elevada, modular y transportable. Integra cerramientos aislantes, calefacción radiante, espacios de alojamiento y servicios, equipamiento de observación y comunicación, y autonomía operativa para terrenos de difícil acceso. Diseñada para montarse y desmontarse rápidamente, combina arquitectura modular, economía circular e investigación territorial.",

    ubicacion:

      "Cerro Multicolor · Paso de San Francisco · Catamarca, Argentina",

    galeria: [

      "/images/estacion-modular/r1.png",

      "/images/estacion-modular/r2.png",

      "/images/estacion-modular/r3.png",

      "/images/estacion-modular/r4.png",

      "/images/estacion-modular/r5.png",

      "/images/estacion-modular/r6.png",

      "/images/estacion-modular/r7.png",

      "/images/estacion-modular/r8.png",

      "/images/estacion-modular/r9.png",

      "/images/estacion-modular/r10.png",

      "/images/estacion-modular/r11.png",

      "/images/estacion-modular/r12.png",

      "/images/estacion-modular/r13.png",

    ],

  },

];



const mapsUrl = "https://maps.app.goo.gl/83deT636JBthNZz77";

const whatsappUrl = "https://wa.me/5493834907322";

const email = "aaronorquera@outlook.com";



export default function Home() {

  const [currentImage, setCurrentImage] = useState(0);

  const [obrasVisible, setObrasVisible] = useState(false);

  const [proyectoSeleccionado, setProyectoSeleccionado] =

    useState<(typeof obras)[number] | null>(null);

  const [firmaAnimada, setFirmaAnimada] = useState(false);



  // Carrusel original: intervalo de 220 ms.

  useEffect(() => {

    let intervalId: number | undefined;

    let cancelled = false;



    const preloadImage = (src: string) =>

      new Promise<void>((resolve) => {

        const image = new Image();

        let settled = false;



        const finish = () => {

          if (settled) return;

          settled = true;

          resolve();

        };



        image.onload = async () => {

          try {

            if (typeof image.decode === "function") {

              await image.decode();

            }

          } catch {

            // Continúa aunque no se pueda decodificar.

          }

          finish();

        };



        image.onerror = finish;

        image.src = src;



        if (image.complete) {

          if (

            image.naturalWidth > 0 &&

            typeof image.decode === "function"

          ) {

            image.decode().catch(() => undefined).finally(finish);

          } else {

            finish();

          }

        }

      });



    const startCarousel = async () => {

      await Promise.all(images.map(preloadImage));

      if (cancelled) return;



      intervalId = window.setInterval(() => {

        setCurrentImage((current) => (current + 1) % images.length);

      }, 220);

    };



    void startCarousel();



    return () => {

      cancelled = true;

      if (intervalId !== undefined) {

        window.clearInterval(intervalId);

      }

    };

  }, []);



  // Animación de la sección de proyectos.

  useEffect(() => {

    const section = document.getElementById("obras");

    if (!section) return;



    if (!("IntersectionObserver" in window)) {

      setObrasVisible(true);

      return;

    }



    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {

          setObrasVisible(true);

          observer.disconnect();

        }

      },

      { threshold: 0.12 }

    );



    observer.observe(section);

    return () => observer.disconnect();

  }, []);



  // Animaciones al desplazarse por la página.

  useEffect(() => {

    const elements = document.querySelectorAll(".scroll-section");



    if (!("IntersectionObserver" in window)) {

      elements.forEach((element) =>

        element.classList.add("section-visible")

      );

      return;

    }



    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("section-visible");

            observer.unobserve(entry.target);

          }

        });

      },

      { threshold: 0.12 }

    );



    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();

  }, []);



  const navegarMenu = (destino: string) => {

    document.querySelector(".menu-control")?.removeAttribute("open");



    window.setTimeout(() => {

      document.getElementById(destino)?.scrollIntoView({

        behavior: "smooth",

        block: "start",

      });

    }, 50);

  };



  // Al pulsar la firma, se activa la animación y se abre la presentación.

  const abrirPresentacion = () => {

    setFirmaAnimada(true);



    window.setTimeout(() => {

      document.getElementById("presentacion")?.scrollIntoView({

        behavior: "smooth",

        block: "start",

      });



      window.setTimeout(() => {

        setFirmaAnimada(false);

      }, 1000);

    }, 250);

  };



  if (proyectoSeleccionado) {

    return (

      <main className="min-h-screen bg-[#f5f4f1] text-[#111111]">

        <header className="site-header">

          <a

            href="#top"

            className="brand-link"

            onClick={(event) => {

              event.preventDefault();

              setProyectoSeleccionado(null);

              window.scrollTo({ top: 0, behavior: "smooth" });

            }}

          >

            ATELIER STUDIO

          </a>



          <button

            type="button"

            className="menu-trigger"

            onClick={() => {

              setProyectoSeleccionado(null);

              window.setTimeout(() => {

                document.getElementById("obras")?.scrollIntoView({

                  behavior: "smooth",

                });

              }, 0);

            }}

          >

            VOLVER A PROYECTOS

          </button>

        </header>



        <section className="mx-auto max-w-[1500px] px-5 pb-20 pt-28 sm:px-10 sm:pt-32 lg:px-16">

          <p className="text-[10px] tracking-[0.16em] opacity-55">

            PORTFOLIO / {proyectoSeleccionado.categoria.toUpperCase()}

          </p>



          <h1 className="mt-5 text-[42px] font-light tracking-[-0.055em] sm:text-[58px] md:text-[72px]">

            {proyectoSeleccionado.titulo}

          </h1>



         {proyectoSeleccionado.ubicacion && (

  <p className="mt-5 text-[10px] tracking-[0.12em] opacity-55">

    {proyectoSeleccionado.ubicacion}

  </p>

)}



<p className="mt-5 max-w-[620px] text-[13px] font-light leading-[1.9] opacity-75 sm:text-[14px]">

  {proyectoSeleccionado.descripcion}

</p>



          <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-5">

            {proyectoSeleccionado.galeria.map((imagen, index) => (

              <figure

                key={imagen}

                className={index === 0 ? "sm:col-span-2" : ""}

              >

                <div

                  className={

                    index === 0

                      ? "aspect-[16/9] overflow-hidden bg-[#e9e6e0]"

                      : "aspect-[4/3] overflow-hidden bg-[#e9e6e0]"

                  }

                >

                  <img

                    src={imagen}

                    alt={`${proyectoSeleccionado.titulo} — imagen ${index + 1}`}

                    loading={index === 0 ? "eager" : "lazy"}

                    className="h-full w-full object-cover"

                  />

                </div>



                <figcaption className="mt-2 text-[10px] tracking-wide opacity-50">

                  {String(index + 1).padStart(2, "0")} /{" "}

                  {String(proyectoSeleccionado.galeria.length).padStart(2, "0")}

                </figcaption>

              </figure>

            ))}

          </div>



          <div className="mt-16 flex justify-between gap-6 border-t border-black/15 pt-6">

            <button

              type="button"

              onClick={() => {

                setProyectoSeleccionado(null);

                window.setTimeout(() => {

                  document.getElementById("obras")?.scrollIntoView({

                    behavior: "smooth",

                  });

                }, 0);

              }}

              className="border-b border-black pb-2 text-left text-[11px] font-light"

            >

              ← Volver a proyectos

            </button>



            <a

              href="#contacto"

              onClick={(event) => {

                event.preventDefault();

                setProyectoSeleccionado(null);

                window.setTimeout(() => {

                  document.getElementById("contacto")?.scrollIntoView({

                    behavior: "smooth",

                  });

                }, 0);

              }}

              className="border-b border-black pb-2 text-[11px] font-light"

            >

              Consultar proyecto ↗

            </a>

          </div>

        </section>



        <style jsx>{`

          :global(html) {

            scroll-behavior: smooth;

            scroll-padding-top: 24px;

            max-width: 100%;

            overflow-x: clip;

          }



          :global(body) {

            margin: 0;

            max-width: 100%;

            overflow-x: clip;

          }



          .site-header {

            position: fixed;

            top: 0;

            left: 0;

            right: 0;

            z-index: 10000;

            display: flex;

            align-items: center;

            justify-content: space-between;

            min-height: 68px;

            padding: 12px 24px;

            box-sizing: border-box;

          }



          .brand-link {

            position: relative;

            z-index: 10002;

            font-size: 11px;

            font-weight: 400;

            letter-spacing: 0.12em;

          }



          button {

            font: inherit;

            color: inherit;

            cursor: pointer;

          }



          .menu-trigger {

            border: 0;

            background: transparent;

            font-size: 10px;

            letter-spacing: 0.12em;

          }

        `}</style>

      </main>

    );

  }



  return (

    <main id="top" className="min-h-screen bg-[#f5f4f1] text-[#111111]">

      {/* ENCABEZADO Y MENÚ */}

      <header className="site-header">

        <a

          href="#top"

          className="brand-link"

          onClick={(event) => {

            event.preventDefault();

            window.scrollTo({ top: 0, behavior: "smooth" });

          }}

        >

          ATELIER STUDIO

        </a>



        <details className="menu-control">

          <summary className="menu-trigger">

            <span className="menu-open-label">MENU</span>

            <span className="menu-close-label">CERRAR</span>

          </summary>



          <div className="menu-overlay">

            <nav className="menu-navigation">

              <a

                href="#obras"

                onClick={(event) => {

                  event.preventDefault();

                  navegarMenu("obras");

                }}

              >

                PROYECTOS

              </a>



              <a

                href="#contacto"

                onClick={(event) => {

                  event.preventDefault();

                  navegarMenu("contacto");

                }}

              >

                COLABORACIONES

              </a>



              <a

                href="#obras"

                onClick={(event) => {

                  event.preventDefault();

                  navegarMenu("obras");

                }}

              >

                ESPACIOS

              </a>



              <a

                href="#estudio"

                onClick={(event) => {

                  event.preventDefault();

                  navegarMenu("estudio");

                }}

              >

                ESTUDIO

              </a>



              <a

                href="#obras"

                onClick={(event) => {

                  event.preventDefault();

                  navegarMenu("obras");

                }}

              >

                HISTORIAS

              </a>
              <a
                href="#presentacion"
                onClick={(event) => {
                  event.preventDefault();
                  navegarMenu("presentacion");
                }}
              >
                SOBRE MÍ
              </a>

              <a
                href="#contacto"
                onClick={(event) => {
                  event.preventDefault();
                  navegarMenu("contacto");
                }}
              >
                CONTACTO
              </a>

            </nav>

          </div>

        </details>

      </header>



      {/* PORTADA */}

      <section className="hero-section relative flex min-h-screen min-h-[100svh] flex-col items-center justify-center px-5">

        <div className="hero-image relative h-[min(300px,42vh)] w-[min(300px,82vw)] overflow-hidden bg-[#e9e6e0] sm:h-[365px] sm:w-[365px]">

          <img

            src={images[currentImage]}

            alt="Proyecto de Atelier de Arquitectura"

            className="hero-photo h-full w-full object-cover"

            fetchPriority="high"

            loading="eager"

          />

        </div>



        <button

          type="button"

          onClick={abrirPresentacion}

          aria-label="Conocer a Aaron Orquera"

          className={`hero-signature signature-trigger mt-6 flex w-full justify-center ${

            firmaAnimada ? "signature-trigger-active" : ""

          }`}

        >

          <img

            src="/images/firma.png"

            alt="Firma de Aaron Orquera"

            className="h-auto w-[230px] max-w-full object-contain sm:w-[280px]"

          />

        </button>



        <a

          href="#presentacion"

          onClick={(event) => {

            event.preventDefault();

            navegarMenu("presentacion");

          }}

          className="hero-info absolute bottom-7 text-[10px] tracking-[0.12em] opacity-60 transition-opacity duration-300 hover:opacity-100"

        >

          INFORMACIÓN

        </a>

      </section>



      {/* PROYECTOS */}

      <section

        id="obras"

        className="scroll-mt-16 px-4 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-20 lg:px-16"

      >

        <div className="mx-auto max-w-[1500px]">

          <h2

            className={`reveal text-center text-[38px] font-light tracking-[-0.055em] sm:text-[46px] md:text-[54px] ${

              obrasVisible ? "reveal-visible" : ""

            }`}

          >

            PROYECTOS

          </h2>



          <p

            className={`reveal reveal-delay-1 mx-auto mt-6 max-w-[700px] text-center text-[13px] font-light leading-relaxed sm:mt-8 sm:text-[14px] ${

              obrasVisible ? "reveal-visible" : ""

            }`}

          >

            Exploramos el encuentro entre la arquitectura, el diseño y

            el entorno para crear espacios con identidad propia.

          </p>



          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-16 sm:gap-x-7 sm:gap-y-10 lg:mt-20 lg:grid-cols-3">

            {obras.map((obra, index) => (

              <button

                type="button"

                key={obra.id}

                onClick={() => {

                  setProyectoSeleccionado(obra);

                  window.scrollTo({ top: 0, behavior: "smooth" });

                }}

                style={{

                  transitionDelay: obrasVisible

                    ? `${250 + index * 130}ms`

                    : "0ms",

                }}

                className={`reveal group block text-left ${

                  obrasVisible ? "reveal-visible" : ""

                }`}

              >

                <div className="aspect-[3/4] overflow-hidden bg-[#e9e6e0]">

                  <img

                    src={obra.imagen}

                    alt={obra.titulo}

                    loading="lazy"

                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"

                  />

                </div>



                <p className="mt-3 text-[10px] font-light leading-relaxed tracking-wide opacity-75 sm:text-[11px]">

                  {obra.titulo}

                </p>



                <p className="mt-1 text-[9px] font-light tracking-wide opacity-50">

                  {obra.categoria}

                </p>

              </button>

            ))}

          </div>

        </div>

      </section>



      {/* ESTUDIO */}

      <section

        id="estudio"

        className="scroll-section scroll-mt-16 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"

      >

        <div className="mx-auto max-w-[1200px]">

          <p className="section-item mb-8 text-center text-[10px] tracking-[0.18em] opacity-55">

            ATELIER DE ARQUITECTURA

          </p>



          <h2 className="section-item text-center text-[38px] font-light tracking-[-0.055em] sm:text-[46px] md:text-[54px]">

            ESTUDIO

          </h2>



          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.5fr] md:gap-20 lg:mt-20">

            <div className="section-item">

              <p className="text-[12px] font-light uppercase tracking-[0.12em] opacity-60">

                Arquitectura · Interiorismo · Diseño

              </p>

            </div>



            <div className="section-item">

              <p className="text-[22px] font-light leading-[1.5] tracking-[-0.035em] sm:text-[28px] md:text-[32px]">

                Entendemos la arquitectura como una forma de interpretar

                el entorno y transformar ideas en espacios.

              </p>



              <p className="mt-8 max-w-[650px] text-[13px] font-light leading-[1.9] opacity-75 sm:text-[14px]">

                Atelier de Arquitectura desarrolla proyectos que integran

                funcionalidad, materialidad y sensibilidad estética. Cada

                propuesta parte de una mirada particular sobre el lugar,

                las necesidades de quienes lo habitan y la identidad que

                se busca construir.

              </p>



              <p className="mt-5 max-w-[650px] text-[13px] font-light leading-[1.9] opacity-75 sm:text-[14px]">

                Trabajamos en arquitectura, diseño de interiores y

                desarrollo visual de proyectos, cuidando la relación

                entre cada decisión y el conjunto.

              </p>



              <div className="mt-10">

                <a

                  href="#contacto"

                  onClick={(event) => {

                    event.preventDefault();

                    navegarMenu("contacto");

                  }}

                  className="border-b border-[#111111] pb-2 text-[12px] font-light transition-opacity hover:opacity-50"

                >

                  Contactar al estudio

                </a>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* PRESENTACIÓN PERSONAL */}

      <section

        id="presentacion"

        className={`personal-section scroll-section scroll-mt-16 px-6 py-24 sm:px-10 sm:py-32 lg:px-16 ${

          firmaAnimada ? "personal-section-active" : ""

        }`}

      >

        <div className="mx-auto max-w-[1050px]">

          <div className="personal-signature-wrap">

            <img

              src="/images/firma.png"

              alt="Firma de Aaron Orquera"

              className="personal-signature"

            />

          </div>



          <p className="personal-eyebrow">

            CATAMARCA, ARGENTINA · ARQUITECTURA Y DISEÑO

          </p>



          <div className="personal-copy">

            <p>

              Soy Aaron Orquera, diseñador y profesional en formación en

              arquitectura. Mi vínculo con el diseño comenzó desde chico,

              cuando elegí una escuela técnica que me permitió obtener el

              título de Maestro Mayor de Obras y dar mis primeros pasos

              hacia la arquitectura.

            </p>



            <p>

              Durante cinco años formé parte de MARCHETTIBRUNO.ARQS,

              bajo la mentoría del arquitecto Diego Marchetti. Allí

              participé en proyectos de distintas escalas y colaboraciones

              internacionales, incluso en México, trabajando en el desarrollo

              y la proyección de ideas desde su concepción hasta su

              materialización.

            </p>



            <p>

              Mi experiencia también se extendió al ámbito de la construcción,

              donde llegué a coordinar cinco obras simultáneamente, abordando

              desde la logística hasta la ejecución. Esa mirada integral

              define mi forma de trabajar: pensar el proyecto, comprender

              cómo se construye y cuidar cada decisión del proceso.

            </p>



            <p>

              Catamarca es una fuente constante de inspiración. Sus paisajes,

              texturas, colores y materiales aparecen en mi trabajo como

              pequeños gestos de identidad regional. Me interesa desarrollar

              una arquitectura contemporánea que dialogue con su contexto

              sin perder una mirada propia.

            </p>



            <p>

              Actualmente desarrollo proyectos de gran escala vinculados

              a la inversión y al futuro de nuevos espacios, mientras avanzo

              en las últimas materias y la tesis de la carrera de Arquitectura.

              Mi objetivo es colaborar con estudios y profesionales de todo

              el mundo, llevando mi mirada a nuevos lugares y construyendo

              una identidad reconocible más allá de mis fronteras.

            </p>

          </div>



          <div className="personal-footer">

            <span>UNA MIRADA PROPIA. UNA ARQUITECTURA CON IDENTIDAD.</span>



            <a

              href="#obras"

              onClick={(event) => {

                event.preventDefault();

                navegarMenu("obras");

              }}

            >

              EXPLORAR PROYECTOS ↗

            </a>

          </div>

        </div>

      </section>





      {/* CONTACTO */}

      <section

        id="contacto"

        className="scroll-section scroll-mt-16 border-t border-black/10 px-6 py-20 sm:px-10 sm:py-28 lg:px-16"

      >

        <div className="mx-auto max-w-[1400px]">

          <p className="section-item text-center text-[10px] tracking-[0.18em] opacity-55">

            HABLEMOS

          </p>



          <h2 className="section-item mt-5 text-center text-[38px] font-light tracking-[-0.055em] sm:text-[46px] md:text-[54px]">

            CONTACTO

          </h2>



          <p className="section-item mx-auto mt-6 max-w-[580px] text-center text-[13px] font-light leading-relaxed opacity-75 sm:text-[14px]">

            ¿Tenés un proyecto en mente? Escribinos para conversar sobre

            tu próxima idea.

          </p>



          <div className="section-item mt-14 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">

            <div className="flex flex-col items-center">

              <p className="text-[10px] tracking-[0.15em] opacity-55">

                CORREO ELECTRÓNICO

              </p>



              <a

                href={`mailto:${email}`}

                className="mt-4 break-all text-[14px] font-light transition-opacity hover:opacity-50"

              >

                {email}

              </a>



              <a

                href={`mailto:${email}`}

                className="mt-3 border-b border-black/60 pb-1 text-[11px] font-light"

              >

                Enviar correo

              </a>

            </div>



            <div className="flex flex-col items-center">

              <p className="text-[10px] tracking-[0.15em] opacity-55">

                WHATSAPP

              </p>



              <a

                href={whatsappUrl}

                target="_blank"

                rel="noreferrer"

                className="mt-4 text-[14px] font-light transition-opacity hover:opacity-50"

              >

                +54 9 383 490-7322

              </a>



              <a

                href={whatsappUrl}

                target="_blank"

                rel="noreferrer"

                className="mt-3 border-b border-black/60 pb-1 text-[11px] font-light"

              >

                Escribir por WhatsApp

              </a>

            </div>



            <div className="flex flex-col items-center sm:col-span-2 lg:col-span-1">

              <p className="text-[10px] tracking-[0.15em] opacity-55">

                UBICACIÓN

              </p>



              <p className="mt-4 text-[14px] font-light">

                Atelier Arquitectura

              </p>



              <a

                href={mapsUrl}

                target="_blank"

                rel="noreferrer"

                className="mt-3 border-b border-black/60 pb-1 text-[11px] font-light"

              >

                Ver en Google Maps

              </a>

            </div>

          </div>



          <div className="section-item mt-16 overflow-hidden bg-[#e9e6e0] sm:mt-20">

            <iframe

              title="Ubicación de Atelier Arquitectura en Google Maps"

              src="https://www.google.com/maps?q=-28.5027709,-65.78813&z=16&output=embed"

              width="100%"

              height="400"

              style={{ border: 0, display: "block" }}

              loading="lazy"

              referrerPolicy="no-referrer-when-downgrade"

              allowFullScreen

            />

          </div>



          <div className="section-item mt-16 flex flex-col items-center gap-5">

            <p className="text-center text-[12px] font-light opacity-65">

              Atelier de Arquitectura · Arquitectura, interiorismo y diseño

            </p>



            <a

              href="#top"

              onClick={(event) => {

                event.preventDefault();

                window.scrollTo({ top: 0, behavior: "smooth" });

              }}

              className="border-b border-[#111111] pb-2 text-[11px] font-light transition-opacity hover:opacity-50"

            >

              Volver al inicio

            </a>

          </div>

        </div>

      </section>



      {/* ESTILOS */}

      <style jsx>{`

        :global(html) {

          scroll-behavior: smooth;

          scroll-padding-top: 24px;

          max-width: 100%;

          overflow-x: clip;

        }



        :global(body) {

          margin: 0;

          max-width: 100%;

          overflow-x: clip;

        }



        button {

          font: inherit;

          color: inherit;

          cursor: pointer;

        }



        .site-header {

          position: fixed;

          top: 0;

          left: 0;

          right: 0;

          z-index: 10000;

          display: flex;

          align-items: center;

          justify-content: space-between;

          width: 100%;

          max-width: 100vw;

          min-height: 68px;

          padding: 12px 24px;

          box-sizing: border-box;

        }



        .brand-link {

          position: relative;

          z-index: 10002;

          display: block;

          font-size: 11px;

          font-weight: 400;

          letter-spacing: 0.12em;

        }



        .menu-control {

          position: relative;

          z-index: 10001;

        }



        .menu-trigger {

          list-style: none;

          cursor: pointer;

          font-size: 10px;

          letter-spacing: 0.12em;

        }



        .menu-trigger::-webkit-details-marker {

          display: none;

        }



        .menu-close-label {

          display: none;

        }



        .menu-control[open] .menu-open-label {

          display: none;

        }



        .menu-control[open] .menu-close-label {

          display: inline;

        }



        .menu-overlay {

          position: fixed;

          inset: 0;

          z-index: -1;

          display: flex;

          align-items: center;

          justify-content: center;

          .menu-overlay {

  background: #111111;

  color: #111111;

}

          opacity: 0;

          visibility: hidden;

          transition: opacity 300ms ease, visibility 300ms ease;

        }



        .menu-control[open] .menu-overlay {

          opacity: 1;

          visibility: visible;

        }



        .menu-navigation {

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 20px;

        }



        .menu-navigation a {

          font-size: clamp(24px, 5vw, 46px);

          font-weight: 300;

          letter-spacing: -0.045em;

          transition: opacity 250ms ease;

        }



        .menu-navigation a:hover {

          opacity: 0.45;

        }



        .hero-signature {

          position: relative;

          z-index: 1;

        }



        .signature-trigger {

          appearance: none;

          border: 0;

          padding: 0;

          background: transparent;

          cursor: pointer;

          transition:

            transform 450ms cubic-bezier(0.2, 0.75, 0.25, 1),

            opacity 300ms ease;

        }



        .signature-trigger:hover {

          transform: scale(1.045);

        }



        .signature-trigger:active {

          transform: scale(0.97);

        }



        .signature-trigger-active {

          transform: scale(1.12);

          opacity: 0.85;

        }



        .personal-section {

          background: #f5f4f1;

          overflow: hidden;

        }



        .personal-signature-wrap {

          display: flex;

          justify-content: center;

          margin: 0 auto 32px;

          animation: signature-appear 900ms cubic-bezier(0.2, 0.75, 0.25, 1) both;

        }



        .personal-signature {

          display: block;

          width: min(540px, 90%);

          height: auto;

          object-fit: contain;

          transform-origin: center;

        }



        .personal-eyebrow {

          margin: 0 auto 42px;

          text-align: center;

          font-size: 10px;

          font-weight: 300;

          letter-spacing: 0.18em;

          opacity: 0.55;

          animation: personal-fade 800ms 150ms both;

        }



        .personal-copy {

          max-width: 760px;

          margin: 0 auto;

        }



        .personal-copy p {

          margin: 0 0 24px;

          font-size: 14px;

          font-weight: 300;

          line-height: 2;

          opacity: 0;

          animation: personal-fade 700ms ease forwards;

        }



        .personal-copy p:nth-child(1) {

          animation-delay: 200ms;

        }



        .personal-copy p:nth-child(2) {

          animation-delay: 300ms;

        }



        .personal-copy p:nth-child(3) {

          animation-delay: 400ms;

        }



        .personal-copy p:nth-child(4) {

          animation-delay: 500ms;

        }



        .personal-copy p:nth-child(5) {

          animation-delay: 600ms;

        }



        .personal-footer {

          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 24px;

          flex-wrap: wrap;

          max-width: 1050px;

          margin: 72px auto 0;

          padding-top: 22px;

          border-top: 1px solid rgb(0 0 0 / 15%);

          font-size: 9px;

          font-weight: 300;

          letter-spacing: 0.1em;

        }



        .personal-footer span {

          opacity: 0.55;

        }



        .personal-footer a {

          padding-bottom: 5px;

          border-bottom: 1px solid #111;

          transition: opacity 250ms ease;

        }



        .personal-footer a:hover {

          opacity: 0.5;

        }



        .personal-section-active .personal-signature {

          animation: signature-zoom 900ms cubic-bezier(0.2, 0.75, 0.25, 1) both;

        }



        .reveal {

          opacity: 0;

          transform: translateY(18px);

          transition:

            opacity 700ms ease,

            transform 700ms ease;

        }



        .reveal-visible {

          opacity: 1;

          transform: translateY(0);

        }



        .reveal-delay-1 {

          transition-delay: 100ms;

        }



        .reveal-delay-2 {

          transition-delay: 250ms;

        }



        .scroll-section .section-item {

          opacity: 0;

          transform: translateY(16px);

          transition:

            opacity 700ms ease,

            transform 700ms ease;

        }



        .scroll-section.section-visible .section-item {

          opacity: 1;

          transform: translateY(0);

        }



        @keyframes signature-appear {

          from {

            opacity: 0;

            transform: translateY(18px) scale(0.92);

          }



          to {

            opacity: 1;

            transform: translateY(0) scale(1);

          }

        }



        @keyframes signature-zoom {

          0% {

            opacity: 0.5;

            transform: scale(0.88);

          }



          60% {

            opacity: 1;

            transform: scale(1.04);

          }



          100% {

            opacity: 1;

            transform: scale(1);

          }

        }



        @keyframes personal-fade {

          from {

            opacity: 0;

            transform: translateY(12px);

          }



          to {

            opacity: 0.78;

            transform: translateY(0);

          }

        }



        @media (max-width: 640px) {

          .site-header {

            padding: 12px 18px;

          }



          .personal-signature-wrap {

            margin-bottom: 26px;

          }



          .personal-eyebrow {

            font-size: 9px;

            line-height: 1.8;

            margin-bottom: 32px;

          }



          .personal-copy p {

            font-size: 13px;

            line-height: 1.9;

            margin-bottom: 20px;

          }



          .personal-footer {

            margin-top: 48px;

            flex-direction: column;

            align-items: flex-start;

          }

        }



        @media (prefers-reduced-motion: reduce) {

          .signature-trigger,

          .personal-signature-wrap,

          .personal-copy p,

          .personal-eyebrow,

          .personal-section-active .personal-signature {

            animation: none;

            transition: none;

            opacity: 1;

            transform: none;

          }



          .reveal,

          .scroll-section .section-item {

            opacity: 1;

            transform: none;

            transition: none;

          }

        }

      `}</style>

    </main>

  );

}
