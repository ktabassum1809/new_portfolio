// ===========================
// Global Functions
// ===========================
window.animateStats = function() {
  console.log('🚀 animateStats function called');
  
  const statNumbers = document.querySelectorAll('.stat-number');
  console.log('📊 Found stat numbers:', statNumbers.length);
  
  if (statNumbers.length === 0) {
    console.error('❌ No stat numbers found!');
    return;
  }

  statNumbers.forEach((stat, index) => {
    const target = parseInt(stat.getAttribute('data-target'));
    console.log(`📈 Stat ${index + 1}: target = ${target}`);
    
    stat.textContent = '0';
  });

  let completedCount = 0;
  const totalStats = statNumbers.length;

  statNumbers.forEach((stat, index) => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    console.log(`🎯 Starting animation for stat ${index + 1}`);
    
    const timer = setInterval(() => {
      current += step;
      
  
      if (target === 100) {
        stat.textContent = Math.floor(current) + '%';
      } else {
        stat.textContent = Math.floor(current) + '+';
      }
      
      if (current >= target) {
      
        if (target === 100) {
          stat.textContent = target + '%';
        } else {
          stat.textContent = target + '+';
        }
        
        clearInterval(timer);
        completedCount++;
        
        console.log(`✅ Stat ${index + 1} completed`);
        
        // Play sound only when ALL stats are complete
        if (completedCount === totalStats) {
          console.log('🎉 All stats completed!');
          setTimeout(() => {
            playStatsSound();
          }, 100);
        }
      }
    }, 16);
  });
};


// ===========================
// Improved Sound System
// ===========================
let audioContext = null;
let soundsInitialized = false;
let pendingSounds = [];

function initSounds() {
  if (soundsInitialized) return;
  
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    
    console.log('🔊 AudioContext created, state:', audioContext.state);
    
    // Resume audio context if suspended
    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        console.log('🔊 AudioContext resumed and ready');
        soundsInitialized = true;
        playPendingSounds();
      }).catch(error => {
        console.log('🔊 AudioContext resume failed:', error);
        soundsInitialized = true;
      });
    } else {
      soundsInitialized = true;
      console.log('🔊 Sounds initialized');
      playPendingSounds();
    }
  } catch (error) {
    console.log('🔊 Sound initialization failed:', error);
    soundsInitialized = true; // Prevent repeated attempts
  }
}

function playPendingSounds() {
  console.log('🔊 Playing', pendingSounds.length, 'pending sounds');
  while (pendingSounds.length > 0) {
    const sound = pendingSounds.shift();
    playSyntheticSound(sound.frequency, sound.duration, sound.volume);
  }
}

function playStatsSound() {
  console.log('🔊 Attempting to play stats sound');
  
  if (!soundsInitialized || !audioContext) {
    console.log('🔇 Sounds not ready for stats - queuing');
    pendingSounds.push({ frequency: 800, duration: 0.2, volume: 0.3 });
    return;
  }
  
  // Resume context if needed
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      console.log('🔊 Playing stats sound after resume');
      playSyntheticSound(800, 0.2, 0.3);
    });
  } else {
    console.log('🔊 Playing stats sound');
    playSyntheticSound(800, 0.2, 0.3);
  }
}

function playButtonSound() {
  const baseFreq = 300; 
  const variation = Math.random() * 50 - 25;
  
  console.log('🔊 Attempting to play button sound');
  
  if (!soundsInitialized || !audioContext) {
    console.log('🔇 Sounds not ready for button - queuing');
    pendingSounds.push({ frequency: baseFreq + variation, duration: 0.15, volume: 0.25 });
    return;
  }
  
  // Resume context if needed
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      console.log('🔊 Playing button sound after resume');
      playSyntheticSound(baseFreq + variation, 0.15, 0.25);
    });
  } else {
    console.log('🔊 Playing button sound');
    playSyntheticSound(baseFreq + variation, 0.15, 0.25);
  }
}

function playSyntheticSound(frequency, duration, volume) {
  try {
    if (!audioContext) {
      console.log('🔊 No audio context available');
      return;
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    // More pronounced volume envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
    
    console.log('🔊 Sound played:', frequency + 'Hz', volume + 'vol');
    
  } catch (error) {
    console.log('🔊 Sound play failed:', error);
  }
}

document.addEventListener('click', initSounds, { once: true });
document.addEventListener('keydown', initSounds, { once: true });
document.addEventListener('touchstart', initSounds, { once: true });
document.addEventListener('mousemove', initSounds, { once: true });
window.addEventListener('load', initSounds);

// Force initialization after a short delay as fallback
setTimeout(initSounds, 1000);
document.addEventListener("DOMContentLoaded", () => {

  // ----------------------
  // Interactive Particles
  // ----------------------
   function createInteractiveParticles()  {
    const container = document.getElementById('particles-container');
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 15;
    
    if (!container) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 8 + 4;
      const posX = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 10 + 15;
      
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = posX + 'vw';
      particle.style.animationDelay = delay + 's';
      particle.style.animationDuration = duration + 's';
      
      // Add click effect
      particle.addEventListener('click', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(3)';
        this.style.opacity = '0';
        setTimeout(() => this.remove(), 300);
      });
      
      container.appendChild(particle);
    }
  }

createInteractiveParticles();

  // ----------------------
  // Magnetic Cursor
  // ----------------------
  const cursor = document.querySelector('.magnetic-cursor');
  const cursorDot = document.querySelector('.magnetic-dot');
  const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-outline, .hero-main-title');

  if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--gradient-end)';
        });

        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--gradient-start)';
        });
        
    });
  }

  // ----------------------
  // Scroll Progress
  // ----------------------
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    let scrollTimer;
    window.addEventListener('scroll', () => {
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = (window.scrollY / windowHeight) * 100;
          scrollProgress.style.width = scrolled + '%';
          scrollTimer = null;
        }, 16);
      }
    });
  }
  // ----------------------
// Parallax Background Effect
// ----------------------
 let parallaxTimer;
  window.addEventListener('scroll', () => {
    if (!parallaxTimer) {
      parallaxTimer = setTimeout(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.morph-shape');
        
        parallaxElements.forEach((el, index) => {
          const speed = 0.3 + (index * 0.1);
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });
        parallaxTimer = null;
      }, 16);
    }
  });
  // ----------------------
  // Button Sounds
  // ----------------------
function setupButtonSounds() {
  console.log('🔊 Setting up button sounds...');
  
  // Force initialize sounds immediately
  initSounds();
  
  // Add direct event listeners to ALL interactive elements
  document.addEventListener('click', (event) => {
    const target = event.target;
    
    // Check if clicked element is any interactive element
    if (target.matches(
      'button, .btn-primary, .btn-outline, .btn-glow, .btn-magnetic, ' +
      '.tech-bubble, .nav a, .project-item, .education-skill-tag, ' +
      '.modern-cta-button, .cta-button, .submit-btn, .hero-actions a, ' +
      '.trust-item, .stat, .burger, .language-switcher, .logo, .nav ul li a'
    )) {
      
      // Don't play sound for external navigation
      if (target.tagName === 'A' && target.getAttribute('href') && 
          !target.getAttribute('href').startsWith('#') &&
          !target.getAttribute('href').startsWith('mailto:') &&
          !target.getAttribute('href').startsWith('tel:')) {
        return;
      }
      
      console.log('🖱️ Clicked:', target.textContent?.trim() || target.className);
      
      // Small delay to ensure sound plays
      setTimeout(() => {
        playButtonSound();
      }, 10);
    }
  });
  
  // Special cases with direct event listeners
  const navLinks = document.querySelectorAll('.nav a, .nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('📋 Nav link clicked:', link.textContent);
      e.stopPropagation(); // Prevent double triggering
      setTimeout(() => {
        playButtonSound();
      }, 10);
    });
  });
  
  const heroActions = document.querySelectorAll('.hero-actions a');
  heroActions.forEach(button => {
    button.addEventListener('click', () => {
      console.log('🚀 Hero action button clicked');
      setTimeout(() => {
        playButtonSound();
      }, 10);
    });
  });
  
  const startProjectBtn = document.querySelector('a[href="#contact"]');
  if (startProjectBtn) {
    startProjectBtn.addEventListener('click', () => {
      console.log('🎯 Start Project button clicked');
      setTimeout(() => {
        playButtonSound();
      }, 10);
    });
  }
  
  console.log('✅ Button sounds setup complete');
}

  // ---------------------------------
  // Tech bubble click ripple
  // ---------------------------------
  document.querySelectorAll('.tech-bubble').forEach(bubble => {
    bubble.addEventListener('click', function () {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
          position:absolute;width:100%;height:100%;
          background:radial-gradient(circle, rgba(156,79,255,0.3) 0%, transparent 70%);
          border-radius:50%;animation:rippleEffect 0.6s ease-out;
          top:0;left:0;`;
      this.appendChild(ripple);
      setTimeout(()=>ripple.remove(),600);
    });
  });

  // Ripple effect CSS
  const style = document.createElement('style');
  style.textContent = `
  @keyframes rippleEffect {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(2); opacity: 0; }
  }`;
  document.head.appendChild(style);

  // ----------------------
  // Burger Menu Toggle
  // ----------------------
  const burger = document.querySelector('.burger');
  const nav = document.querySelector(".nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      
   
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
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.style.background = "rgba(10, 10, 20, 0.95)";
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.2)";
      } else {
        header.style.background = "rgba(10, 10, 20, 0.9)";
        header.style.boxShadow = "none";
      }
    });
  }

  // ----------------------
  // Particle effect
  // ----------------------
  function createBackgroundParticles() {
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

 createBackgroundParticles();

 

  // ----------------------
  // Project Hover & Click Effect
  // ----------------------
  const projectDescriptions = document.querySelectorAll(".project-desc");
  projectDescriptions.forEach((desc) => {
    desc.addEventListener("mouseenter", function () {
      const preview = this.querySelector(".project-image-preview");
      if (preview) {
        preview.style.opacity = "1";
        preview.style.visibility = "visible";
        preview.style.transform = "translateY(0)";
      }
    });

    desc.addEventListener("mouseleave", function () {
      const preview = this.querySelector(".project-image-preview");
      if (preview) {
        preview.style.opacity = "0";
        preview.style.visibility = "hidden";
        preview.style.transform = "translateY(10px)";
      }
    });
  });

  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    const preview = item.querySelector(".project-image-preview");

    item.addEventListener("mouseenter", () => {
      if (preview) {
        preview.style.opacity = "1";
        preview.style.visibility = "visible";
        preview.style.transform = "translateY(0)";
      }
    });

    item.addEventListener("mouseleave", () => {
      if (preview) {
        preview.style.opacity = "0";
        preview.style.visibility = "hidden";
        preview.style.transform = "translateY(10px)";
      }
    });

    item.addEventListener("mousemove", (e) => {
      if (!preview) return;
      
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
      const projectNumber = item.querySelector(".project-number")?.textContent.trim();
      const projectPages = {
        "01": "project-food-delivery.html",
        "02": "project-weather-app.html",
        "03": "project-ecommerce.html",
        "04": "project-game.html",
      };
      if (projectNumber && projectPages[projectNumber]) {
        window.location.href = projectPages[projectNumber];
      }
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
  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
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
          
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
      skillObserver.observe(bar);
    });
  }

  // ----------------------
  // Animated Elements on Scroll
  // ----------------------
  const animatedElements = document.querySelectorAll('.animated-element');
  if (animatedElements.length > 0) {
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
  }

  // ----------------------
  // Contact Form Validation & Submission
  // ----------------------
  const form = document.getElementById('contactForm');
  if (form) {
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Form validation and submission
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
      
      try {
        const formData = new FormData(form);
        
        // Submit to Formspree
        const response = await fetch(form.action, { 
          method: 'POST', 
          body: formData, 
          headers: { 'Accept': 'application/json' } 
        });
        
        if (response.ok) {
          showMessage(successMessage, 'Message sent successfully!');
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        showMessage(errorMessage, 'Oops! Something went wrong. Please try again.');
      }
    });
    
    function showMessage(element, text) {
      if (!element) return;
      
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
  }

  // ----------------------
  // Education Items Animation
  // ----------------------
  const educationItems = document.querySelectorAll('.education-item');
  if (educationItems.length > 0) {
    const eduObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'educationFadeInRight 0.8s ease forwards';
          eduObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    educationItems.forEach(item => {
      eduObserver.observe(item);
    });
  }

  // ----------------------
  // Skill Tags Hover Effect
  // ----------------------
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
  // ✅ Initialize button sounds
setupButtonSounds();

// ✅ Observe hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
  console.log('👀 Setting up hero observer');
  
  let statsAnimated = false;
  
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      console.log('🎯 Hero section intersection:', entry.isIntersecting, 'Stats animated:', statsAnimated);
      
      if (entry.isIntersecting && !statsAnimated) {
        console.log('🔥 Hero section is in view, triggering stats animation');
        statsAnimated = true;
        
        // Small delay to ensure everything is loaded
        setTimeout(() => {
          window.animateStats();
        }, 300);
        
        heroObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1, 
    rootMargin: '0px 0px 0px 0px'
  });
  
  heroObserver.observe(heroSection);
} else {
  console.error('❌ Hero section not found!');
}
});