document.addEventListener("DOMContentLoaded", () => {
  // ----------------------
  // Burger Menu Toggle
  // ----------------------
  const burger =  document.querySelector('.burger');
  const nav = document.querySelector(".nav");

   if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      
      // Optional: Change icon when menu is open
      const icon = burger.querySelector('i');
      if (nav.classList.contains("nav-active")) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking on links
    document.querySelectorAll(".nav a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-active");
        const icon = burger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }
  // ----------------------
  // Header scroll effect
  // ----------------------
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 50) {
        header.style.background = "rgba(10, 10, 20, 0.95)";
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.2)";
      } else {
        header.style.background = "rgba(10, 10, 20, 0.9)";
        header.style.boxShadow = "none";
      }
    }
  });

  // ----------------------
  // Particle effect
  // ----------------------
  function createParticles() {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles";

    for (let i = 0; i < 25; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 15 + 15;
      const delay = Math.random() * 8;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      if (Math.random() > 0.7) {
        particle.style.background = "rgba(156, 79, 255, 0.7)";
        particle.style.boxShadow = "0 0 8px rgba(156, 79, 255, 0.7)";
      }

      particlesContainer.appendChild(particle);
    }

    document.body.appendChild(particlesContainer);
  }

  createParticles();

  // ----------------------
  // Arrow Scroll Animation + Smooth Scroll
  // ----------------------
  const arrowCont = document.querySelector(".arrow-container");
  const arrowShape = document.querySelector(".arrow-shape");

  if (arrowCont && arrowShape) {
    const length = arrowShape.getTotalLength();
    arrowShape.style.strokeDasharray = length;
    arrowShape.style.strokeDashoffset = length;

    setTimeout(() => {
      arrowShape.classList.add("arrow-animate");
    }, 500);

    arrowCont.addEventListener("click", () => {
      arrowShape.classList.remove("arrow-animate");
      void arrowShape.offsetWidth;
      arrowShape.classList.add("arrow-animate");

      const nextSection = document.querySelector(".about");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ----------------------
  // Project Hover & Click Effect
  // ----------------------
  const projectDescriptions = document.querySelectorAll(".project-desc");
  projectDescriptions.forEach((desc) => {
    desc.addEventListener("mouseenter", function () {
      const preview = this.querySelector(".project-image-preview");
      preview.style.opacity = "1";
      preview.style.visibility = "visible";
      preview.style.transform = "translateY(0)";
    });

    desc.addEventListener("mouseleave", function () {
      const preview = this.querySelector(".project-image-preview");
      preview.style.opacity = "0";
      preview.style.visibility = "hidden";
      preview.style.transform = "translateY(10px)";
    });
  });

  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    const preview = item.querySelector(".project-image-preview");

    item.addEventListener("mouseenter", () => {
      preview.style.opacity = "1";
      preview.style.visibility = "visible";
      preview.style.transform = "translateY(0)";
    });

    item.addEventListener("mouseleave", () => {
      preview.style.opacity = "0";
      preview.style.visibility = "hidden";
      preview.style.transform = "translateY(10px)";
    });

    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      let posX = e.clientX - rect.left + 20;
      let posY = e.clientY - rect.top - preview.offsetHeight / 2;

      if (posX + preview.offsetWidth > window.innerWidth) {
        posX = e.clientX - rect.left - preview.offsetWidth - 20;
      }
      if (posY < 0) posY = 0;
      if (posY + preview.offsetHeight > window.innerHeight) {
        posY = window.innerHeight - preview.offsetHeight;
      }

      preview.style.left = `${posX}px`;
      preview.style.top = `${posY}px`;
    });

    // Click-to-open project page
    item.addEventListener("click", (e) => {
      if (e.target.closest(".project-image-preview")) return;
      const projectNumber = item.querySelector(".project-number").textContent.trim();
      const projectPages = {
        "01": "project-food-delivery.html",
        "02": "project-weather-app.html",
        "03": "project-ecommerce.html",
        "04": "project-game.html",
      };
      if (projectPages[projectNumber]) window.location.href = projectPages[projectNumber];
    });
  });

  // ----------------------
  // Typewriter Effect Handling
  // ----------------------
  const title = document.querySelector(".typewriter");
  const subtitle = document.querySelector(".typewriter-subtitle");

  title?.addEventListener("animationend", (e) => {
    if (e.animationName === "typing") title.classList.add("done");
  });

  subtitle?.addEventListener("animationend", (e) => {
    if (e.animationName === "typing-subtitle") subtitle.classList.add("done");
  });

  // ----------------------
  // Animate Skill Bars
  // ----------------------
  const skillBars = document.querySelectorAll(".skill-progress");
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        const level = bar.getAttribute("data-level");
                        
                        // Create number element
                        const numberSpan = document.createElement("span");
                        numberSpan.textContent = "0%";
                        numberSpan.style.position = "absolute";
                        numberSpan.style.top = "-25px";
                        numberSpan.style.right = "0";
                        numberSpan.style.fontSize = "0.9rem";
                        numberSpan.style.fontWeight = "600";
                        numberSpan.style.color = "var(--light)";
                        numberSpan.style.transition = "all 0.3s ease";
                        bar.parentElement.style.position = "relative";
                        bar.parentElement.appendChild(numberSpan);
                        
                        // Animate bar width
                        bar.style.width = level + "%";
                        
                        // Animate number count
                        let count = 0;
                        const duration = 1500;
                        const stepTime = Math.max(10, Math.floor(duration / level));
                        
                        const counter = setInterval(() => {
                            count++;
                            numberSpan.textContent = count + "%";
                            
                            if (count >= level) {
                                clearInterval(counter);
                            }
                        }, stepTime);
                        
                        observer.unobserve(bar);
                    }
                });
            }, { threshold: 0.5 });
            
            skillBars.forEach(bar => {
                observer.observe(bar);
            });
             // ----------------------
  // Animated Elements on Scroll (New Integration)
  // ----------------------
  const animatedElements = document.querySelectorAll('.animated-element');
  const animatedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.classList.contains('delay-1') ? 100 :
                      entry.target.classList.contains('delay-2') ? 200 :
                      entry.target.classList.contains('delay-3') ? 300 :
                      entry.target.classList.contains('delay-4') ? 400 : 0;

        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);

        animatedObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => animatedObserver.observe(el));
             // ----------------------
  // Contact Form Validation & Hover/Focus Effects
  // ----------------------
  const form = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                showMessage(errorMessage, 'Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(errorMessage, 'Please enter a valid email address');
                return;
            }
            
            
            // For demonstration, we'll show a success message
            try {
                // Simulate form submission
                const formData = new FormData(form);
                
                // If you want to actually submit to Formspree, uncomment the next line
               await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
                
                // Show success message (for demo purposes)
                showMessage(successMessage, 'Message sent successfully!');
                form.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } catch (err) {
                showMessage(errorMessage, 'Oops! Something went wrong.');
            }
        });
        
        function showMessage(element, text) {
            element.textContent = text;
            element.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
        
        // Add animation to form inputs on focus
        const formInputs = document.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });
        });

  // Form Submission via Formspree
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if(response.ok){
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        form.reset();
      } else {
        successMsg.style.display = 'none';
        errorMsg.style.display = 'block';
      }
    }).catch(error => {
      successMsg.style.display = 'none';
      errorMsg.style.display = 'block';
      console.error(error);
    });
  });
        // Additional animation on scroll for education items
          const educationItems = document.querySelectorAll('.education-item');
            
            // Intersection Observer for scroll animations
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            };
            
            const eduobserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'educationFadeInRight 0.8s ease forwards';
                        eduobserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observe each education item
            educationItems.forEach(item => {
                eduobserver.observe(item);
            });
            
            // Add hover effect to skill tags
            const skillTags = document.querySelectorAll('.education-skill-tag');
            skillTags.forEach(tag => {
                tag.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1)';
                    this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                });
                
                tag.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = 'none';
                });
            });

        });



