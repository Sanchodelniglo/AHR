
// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Portfolio filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    // Filter portfolio items
    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');

      if (filter === 'all' || filter === category) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
        }, 100);
      } else {
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Testimonial slider
const testimonials = [
  {
    content: "Élégance Bois a réalisé notre terrasse en bois exotique, un travail remarquable avec un souci du détail impressionnant. Le résultat dépasse nos attentes et s'intègre parfaitement à notre jardin.",
    author: "Famille Lecomte",
    location: "Pessac, Gironde"
  },
  {
    content: "La rénovation de notre cloture était un projet ambitieux, mais l'équipe d'Élégance Bois a relevé le défi avec brio. Leur expertise et leur professionnalisme nous ont convaincus dès le premier contact.",
    author: "Jean-Pierre Brun",
    location: "Saint-Émilion, Gironde"
  },
  {
    content: "Nous recommandons vivement cette entreprise pour la qualité de leur travail et leur écoute attentive. Notre pergola est devenue le point central de notre jardin et fait l'admiration de tous nos invités.",
    author: "Sophie Lopez",
    location: "Bordeaux, Gironde"
  }
];

const testimonialContainer = document.querySelector('.testimonial');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentTestimonial = 0;

// Function to update testimonial
function updateTestimonial(index) {
  const testimonial = testimonials[index];
  testimonialContainer.innerHTML = `
                <div class="testimonial-content">
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-author">${testimonial.author}</div>
                <div class="testimonial-location">${testimonial.location}</div>
            `;

  // Update active dot
  sliderDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Set up click events for dots
sliderDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentTestimonial = i;
    updateTestimonial(i);
  });
});

// Auto rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonial(currentTestimonial);
}, 5000);

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  const service = document.getElementById('service').value.trim();

  if (name && email && phone && message && service) {
    const formData = new FormData(contactForm);
    const button = contactForm.querySelector('button[type="submit"]');
    button.innerHTML = '<span class="loader"></span>';

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Usage inside an async function:
    await sleep(4000); // pauses execution for 4 seconds
    window.fetch = async () => {
      return {
        ok: true,
        json: async () => ({ error: "Simulated failure" })
      };
    };

    try {
      const response = await fetch('https://formspree.io/f/xrbkbkeb', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        contactForm.reset();
        contactForm.innerHTML = "✅ Merci pour votre message ! Nous vous contacterons très rapidement.";
      } else {
        contactForm.innerHTML = '❌ Une erreur est survenue lors de l’envoi. Veuillez réessayer plus tard.';
      }
    } catch (error) {
      contactForm.innerHTML = '❌ Une erreur réseau est survenue. Veuillez vérifier votre connexion.';
    }
  } else {
    alert('Veuillez remplir tous les champs obligatoires.');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href');

    if (href === '#') return;

    const targetElement = document.querySelector(href);

    if (targetElement) {
      // Close mobile menu if open
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }

      window.scrollTo({
        top: targetElement.offsetTop - header.offsetHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Animation on scroll
const animateOnScroll = () => {
  const sections = document.querySelectorAll('section:not(.hero)');

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.8) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
};

// Apply initial styles for animation
document.querySelectorAll('section:not(.hero)').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

// Run on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);
