document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const sliderContainer = document.querySelector(".slider-container")

  if (!slides.length) return

  let currentSlide = 0
  let slideInterval
  let isPaused = false

  // Iniciar el slider automático
  startSlideInterval()

  // Función para iniciar el intervalo del slider
  function startSlideInterval() {
    if (!isPaused) {
      slideInterval = setInterval(() => {
        goToSlide((currentSlide + 1) % slides.length)
      }, 4000) // Cambiar slide cada 4 segundos
    }
  }

  // Función para reiniciar el intervalo
  function resetSlideInterval() {
    clearInterval(slideInterval)
    startSlideInterval()
  }

  // Función para pausar el slider
  function pauseSlider() {
    isPaused = true
    clearInterval(slideInterval)
  }

  // Función para reanudar el slider
  function resumeSlider() {
    isPaused = false
    startSlideInterval()
  }

  // Función para ir a un slide específico
  function goToSlide(n) {
    slides[currentSlide].classList.remove("active")
    dots[currentSlide].classList.remove("active")

    currentSlide = n

    slides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")
  }

  // Pausar slider al hacer hover
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", pauseSlider)
    sliderContainer.addEventListener("mouseleave", resumeSlider)
  }

  // Event listeners para los botones de navegación
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      let newSlide = currentSlide - 1
      if (newSlide < 0) newSlide = slides.length - 1
      goToSlide(newSlide)
      resetSlideInterval()
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const newSlide = (currentSlide + 1) % slides.length
      goToSlide(newSlide)
      resetSlideInterval()
    })
  }

  // Event listeners para los dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index)
      resetSlideInterval()
    })
  })

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      let newSlide = currentSlide - 1
      if (newSlide < 0) newSlide = slides.length - 1
      goToSlide(newSlide)
      resetSlideInterval()
    } else if (e.key === "ArrowRight") {
      const newSlide = (currentSlide + 1) % slides.length
      goToSlide(newSlide)
      resetSlideInterval()
    }
  })

  // Soporte para gestos táctiles en dispositivos móviles
  let startX = 0
  let endX = 0

  if (sliderContainer) {
    sliderContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
    })

    sliderContainer.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      handleSwipe()
    })
  }

  function handleSwipe() {
    const swipeThreshold = 50
    const diff = startX - endX

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        const newSlide = (currentSlide + 1) % slides.length
        goToSlide(newSlide)
      } else {
        // Swipe right - previous slide
        let newSlide = currentSlide - 1
        if (newSlide < 0) newSlide = slides.length - 1
        goToSlide(newSlide)
      }
      resetSlideInterval()
    }
  }
})
