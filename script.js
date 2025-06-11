// Theme Toggle
const themeToggle = document.getElementById("theme-toggle")
const themeIcon = themeToggle.querySelector(".theme-icon")
const body = document.body

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙"
}

// Mobile Navigation
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(".glass-card, .project-card, .testimonial-card, .stat-item")

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Contact form handling
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  const submitButton = contactForm.querySelector(".form-submit")
  const originalText = submitButton.querySelector("span").textContent

  // Show loading state
  submitButton.querySelector("span").textContent = "Envoi en cours..."
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    // Show success message
    showNotification("Message envoyé avec succès !", "success")

    // Reset form
    contactForm.reset()

    // Reset button
    submitButton.querySelector("span").textContent = originalText
    submitButton.disabled = false
  }, 2000)
})

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === "success" ? "✅" : "ℹ️"}</span>
            <span class="notification-message">${message}</span>
        </div>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
    `

  if (body.getAttribute("data-theme") === "dark") {
    notification.style.background = "rgba(43, 25, 62, 0.9)"
    notification.style.color = "var(--text-dark)"
  }

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 4000)
}

// Add some interactive effects
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effect to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-2px) scale(1.02)"
    })

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add parallax effect to floating elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-element")

    parallaxElements.forEach((element, index) => {
      const speed = 0.8 + index * 0.2 // Augmenté la vitesse
      element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.2}deg)` // Rotation plus rapide
    })
  })

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.innerHTML
    heroTitle.innerHTML = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 25) // Changé de 50ms à 25ms
      }
    }

    // Start typing effect after a shorter delay
    setTimeout(typeWriter, 500) // Changé de 1000ms à 500ms
  }

  // Add counter animation for stats
  const animateCounters = () => {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = counter.textContent
      const numericValue = Number.parseFloat(target.replace(/[^\d.]/g, ""))

      if (!isNaN(numericValue)) {
        let current = 0
        const increment = numericValue / 50 // Changé de 100 à 50 pour plus de rapidité
        const suffix = target.replace(/[\d.]/g, "")

        const updateCounter = () => {
          if (current < numericValue) {
            current += increment
            counter.textContent = Math.floor(current) + suffix
            requestAnimationFrame(updateCounter)
          } else {
            counter.textContent = target
          }
        }

        updateCounter()
      }
    })
  }

  // Trigger counter animation when stats section is visible
  const statsSection = document.querySelector(".about-stats")
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters()
            statsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    statsObserver.observe(statsSection)
  }
})

// Add cursor trail effect
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div")
  trail.className = "cursor-trail"
  trail.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, var(--primary), var(--accent));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 2}px;
        top: ${e.clientY - 2}px;
        opacity: 0.7;
        animation: trailFade 0.5s ease-out forwards;
    `

  document.body.appendChild(trail)

  setTimeout(() => {
    if (trail.parentNode) {
      trail.parentNode.removeChild(trail)
    }
  }, 500)
})

// Add CSS for cursor trail animation
const style = document.createElement("style")
style.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 0.7;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.25rem;
    }
    
    .notification-message {
        font-weight: 500;
    }
`
document.head.appendChild(style)