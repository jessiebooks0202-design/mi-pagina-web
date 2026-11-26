/* ============================================
   DATOS EDITABLES (agrega libros y productos aquí)
============================================ */

// 📚 LIBROS — solo añade un objeto nuevo y aparecerá automáticamente
const libros = [
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    genero: "Realismo mágico",
    calificacion: 5,
    resena: "Una obra que me transportó a Macondo y me dejó con el corazón lleno.",
    emoji: "📕",
    mariposa: true
  },
  {
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    genero: "Clásico romántico",
    calificacion: 5,
    resena: "Elizabeth y Darcy: la historia que me enseñó a amar los clásicos.",
    emoji: "📗",
    mariposa: true
  },
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    genero: "Fábula",
    calificacion: 5,
    resena: "Un libro para el alma que releo cada año y siempre me dice algo nuevo.",
    emoji: "📘",
    mariposa: false
  },
  {
    titulo: "La casa de los espíritus",
    autor: "Isabel Allende",
    genero: "Realismo mágico",
    calificacion: 4,
    resena: "Familias, secretos y magia. Una lectura que se siente como un abrazo.",
    emoji: "📙",
    mariposa: true
  },
  {
    titulo: "Mujeres que corren con los lobos",
    autor: "Clarissa Pinkola Estés",
    genero: "Ensayo / Mitología",
    calificacion: 5,
    resena: "Un libro que despertó mi intuición y me conectó con lo salvaje.",
    emoji: "📔",
    mariposa: false
  },
  {
    titulo: "Como agua para chocolate",
    autor: "Laura Esquivel",
    genero: "Novela romántica",
    calificacion: 4,
    resena: "Cocina, magia y amor: la receta perfecta para una tarde de lectura.",
    emoji: "📓",
    mariposa: true
  }
];

// 🛍️ PRODUCTOS — igual de fácil, agrega o edita objetos
const productos = [
  {
    nombre: "Amigurumi Mariposa",
    descripcion: "Hermoso amigurumi tejido a mano con hilo de algodón.",
    precio: "$45.000",
    emoji: "ʚïɞ"
  },
  {
    nombre: "Marcapáginas tejido",
    descripcion: "Detalle perfecto para tus lecturas favoritas.",
    precio: "$15.000",
    emoji: "🧶"
  },
  {
    nombre: "Funda para libro", 
    descripcion: "Protege tus historias con estilo y suavidad.",
    precio: "$38.000",
    emoji: "📖"
  },
  {
    nombre: "Bolso crochet",
    descripcion: "Amplio, cómodo y lleno de magia artesanal.",
    precio: "$65.000",
    emoji: "👜"
  },
  {
    nombre: "Set de posavasos",
    descripcion: "4 posavasos tejidos en tonos morados y rosados.",
    precio: "$28.000",
    emoji: "🧵"
  },
  {
    nombre: "Corazón amigurumi",
    descripcion: "El detalle perfecto para regalar amor.",
    precio: "$22.000",
    emoji: "💜" 
  }
];

/* ============================================
   RENDER: LIBROS
============================================ */
function renderLibros() {
  const shelf = document.getElementById("bookShelf");
  if (!shelf) return;

  shelf.innerHTML = libros.map(libro => `
    <article class="book">
      ${libro.mariposa ? '<span class="book-butterfly">🦋</span>' : ''}
      <div class="book-cover">${libro.emoji}</div>
      <h3 class="book-title">${libro.titulo}</h3>
      <p class="book-author">${libro.autor}</p>
      <div class="book-rating">${"★".repeat(libro.calificacion)}${"☆".repeat(5 - libro.calificacion)}</div>
      <span class="book-genre">${libro.genero}</span>
      <p class="book-review">"${libro.resena}"</p>
    </article>
  `).join("");
}

/* ============================================
   RENDER: CATÁLOGO
============================================ */
function renderCatalogo() {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;

  grid.innerHTML = productos.map(prod => `
    <article class="product">
      <div class="product-image">${prod.emoji}</div>
      <div class="product-info">
        <h3 class="product-name">${prod.nombre}</h3>
        <p class="product-desc">${prod.descripcion}</p>
        <p class="product-price">${prod.precio}</p>
        <button class="btn-buy" data-producto="${prod.nombre}">
          <i class="fas fa-shopping-bag"></i> Comprar
        </button>
      </div>
    </article>
  `).join("");

  // Evento de compra (puedes enlazarlo a WhatsApp o pasarela de pago)
  grid.querySelectorAll(".btn-buy").forEach(btn => {
    btn.addEventListener("click", () => {
      const nombre = btn.dataset.producto;
      const mensaje = encodeURIComponent(`¡Hola! Me interesa comprar: ${nombre} 🦋`);
      window.open(`https://wa.me/573000000000?text=${mensaje}`, "_blank");
    });
  });
}

/* ============================================
   NAVBAR: SCROLL + MENÚ MÓVIL
============================================ */
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Cerrar menú al hacer clic en un enlace (móvil)
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ============================================
   ANIMACIONES REVEAL (IntersectionObserver)
============================================ */
function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  elements.forEach(el => observer.observe(el));
}

/* ============================================
   FORMULARIO DE CONTACTO
============================================ */
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const mensaje = contactForm.message.value.trim();

    if (!nombre || !email || !mensaje) {
      formMsg.textContent = "Por favor, completa todos los campos 💜";
      formMsg.style.color = "#E91E63";
      return;
    }

    // Aquí puedes conectar con un backend, Formspree, EmailJS, etc.
    formMsg.textContent = `¡Gracias ${nombre}! Tu mensaje fue enviado 🦋`;
    formMsg.style.color = "#7E57C2";
    contactForm.reset();

    // Ejemplo con WhatsApp (opcional):
    // const text = encodeURIComponent(`Hola, soy ${nombre}. ${mensaje} (${email})`);
    // window.open(`https://wa.me/573000000000?text=${text}`, "_blank");

    setTimeout(() => { formMsg.textContent = ""; }, 5000);
  });
}

/* ============================================
   AÑO DINÁMICO EN FOOTER
============================================ */
document.getElementById("year").textContent = new Date().getFullYear();

/* ============================================
   INICIALIZACIÓN
============================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderLibros();
  renderCatalogo();
  initReveal();
});