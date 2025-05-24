// Actualizar el año actual en el footer
document.addEventListener("DOMContentLoaded", () => {
  const yearElements = document.querySelectorAll("#current-year")
  const currentYear = new Date().getFullYear()

  yearElements.forEach((element) => {
    element.textContent = currentYear
  })

  // Menú móvil
  const menuToggle = document.querySelector(".menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (mainNav.style.display === "flex") {
        mainNav.style.display = "none"
      } else {
        mainNav.style.display = "flex"
        mainNav.style.flexDirection = "column"
        mainNav.style.position = "absolute"
        mainNav.style.top = "70px"
        mainNav.style.left = "0"
        mainNav.style.width = "100%"
        mainNav.style.backgroundColor = "white"
        mainNav.style.padding = "20px"
        mainNav.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
      }
    })
  }

  // Smooth scrolling para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Ajuste para el header fijo
          behavior: "smooth",
        })
      }
    })
  })

  // Validación básica de formularios
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      let isValid = true
      const inputs = form.querySelectorAll("input, textarea")

      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          isValid = false
          input.style.borderColor = "var(--error-color)"
        } else {
          input.style.borderColor = "var(--border-color)"
        }

        if (input.type === "email" && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(input.value.trim())) {
            isValid = false
            input.style.borderColor = "var(--error-color)"
          }
        }
      })

      if (isValid) {
        // Aquí iría la lógica para enviar el formulario
        alert("Formulario enviado correctamente!")
        form.reset()
      } else {
        alert("Por favor, completa correctamente todos los campos requeridos.")
      }
    })
  })
})
