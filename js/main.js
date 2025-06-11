
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

// services-data.json
const servicesData = {
  services: [
    {
      id: 'cloture-bois',
      title: 'Clôture Bois',
      description: 'Conception et réalisation de clôtures en bois sur mesure, combinant savoir-faire traditionnel et solutions modernes pour des installations durables et esthétiques.',
      image: 'img/carpenter.webp',
      category: 'cloture'
    },
    {
      id: 'terrasses-bois',
      title: 'Terrasses en bois',
      description: 'Création de terrasses uniques adaptées à votre espace extérieur, avec un large choix d\'essences de bois pour un résultat à la fois durable et élégant.',
      image: 'img/deck.webp',
      category: 'terrasse'
    },
    {
      id: 'extensions-bois',
      title: 'Extensions bois',
      description: 'Agrandissement de votre espace de vie avec des extensions en ossature bois, alliant performance thermique et intégration parfaite à votre habitat existant.',
      image: 'img/extension.webp',
      category: 'extension'
    },
    {
      id: 'pergolas',
      title: 'Pergolas',
      description: 'Pergolas sur mesure pour créer des espaces extérieurs élégants et ombragés. Nos conceptions allient esthétisme, durabilité et adaptation parfaite à votre cadre de vie.',
      image: 'img/pergola.webp',
      category: 'pergola'
    }
  ],
  portfolio: [
    {
      id: 'cloture-saint-emilion',
      title: 'Clôture traditionnelle',
      location: 'Saint-Émilion',
      image: 'img/carpenter.webp',
      category: 'cloture'
    },
    {
      id: 'terrasse-bordeaux',
      title: 'Terrasse en ipé',
      location: 'Bordeaux Centre',
      image: 'img/deck.webp',
      category: 'terrasse'
    },
    {
      id: 'pergola-arcachon',
      title: 'Pergola contemporaine',
      location: 'Arcachon',
      image: 'img/pergola.webp',
      category: 'pergola'
    },
    {
      id: 'extension-pessac',
      title: 'Extension maison d\'architecte',
      location: 'Pessac',
      image: 'img/extension.webp',
      category: 'extension'
    },
    {
      id: 'extension-pessac-2',
      title: 'Extension maison d\'architecte',
      location: 'Pessac',
      image: 'img/extension-2.webp',
      category: 'extension'
    },
    {
      id: 'cloture-saint-estephe',
      title: 'Rénovation château',
      location: 'Saint-Estèphe',
      image: 'img/carpenter.webp',
      category: 'cloture'
    },
    {
      id: 'terrasse-blanquefort',
      title: 'Terrasse autour de piscine',
      location: 'Blanquefort',
      image: 'img/deck.webp',
      category: 'terrasse'
    }
  ],
  filters: [
    { id: 'all', label: 'Tous' },
    { id: 'cloture', label: 'Clôtures' },
    { id: 'terrasse', label: 'Terrasses' },
    { id: 'pergola', label: 'Pergolas' },
    { id: 'extension', label: 'Extensions' }
  ]
};

// Dynamic rendering functions
class DynamicContent {
  constructor(data) {
    this.data = data;
  }

  // Render services section
  renderServices() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = '';

    this.data.services.forEach(service => {
      const serviceCard = document.createElement('div');
      serviceCard.className = 'service-card';
      serviceCard.innerHTML = `
        <div class="service-image" style="background: url('${service.image}') center/cover no-repeat;"></div>
        <div class="service-content">
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </div>
      `;
      servicesGrid.appendChild(serviceCard);
    });
  }

  // Render portfolio filters
  renderPortfolioFilters() {
    const filterContainer = document.querySelector('.portfolio-filter');
    if (!filterContainer) return;

    filterContainer.innerHTML = '';

    this.data.filters.forEach((filter, index) => {
      const filterBtn = document.createElement('button');
      filterBtn.className = `filter-btn ${index === 0 ? 'active' : ''}`;
      filterBtn.setAttribute('data-filter', filter.id);
      filterBtn.textContent = filter.label;
      filterContainer.appendChild(filterBtn);
    });

    // Add event listeners for filters
    this.attachFilterListeners();
  }

  // Render portfolio items
  renderPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = '';

    this.data.portfolio.forEach(item => {
      const portfolioItem = document.createElement('div');
      portfolioItem.className = 'portfolio-item';
      portfolioItem.setAttribute('data-category', item.category);
      portfolioItem.innerHTML = `
        <div class="portfolio-image" style="background: url('${item.image}') center/cover no-repeat;"></div>
        <div class="portfolio-overlay">
          <h3>${item.title}</h3>
          <p>${item.location}</p>
        </div>
      `;
      portfolioGrid.appendChild(portfolioItem);
    });
  }

  // Attach filter event listeners
  attachFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        portfolioItems.forEach(item => {
          item.style.display = 'none';
          item.style.opacity = '0';
          item.style.transition = 'opacity 0.3s ease';
        });
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
  }

  // Initialize all dynamic content
  init() {
    this.renderServices();
    this.renderPortfolio();
    this.renderPortfolioFilters();
  }

  // Add new service dynamically
  addService(serviceData) {
    this.data.services.push(serviceData);
    this.renderServices();
  }

  // Add new portfolio item dynamically
  addPortfolioItem(portfolioData) {
    this.data.portfolio.push(portfolioData);
    this.renderPortfolio();
    // Re-attach listeners since DOM was updated
    this.attachFilterListeners();
  }

  // Load data from external JSON file
  static async loadFromFile(jsonPath) {
    try {
      const response = await fetch(jsonPath);
      const data = await response.json();
      return new DynamicContent(data);
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }
}

// Usage examples:

// 1. Initialize with embedded data
document.addEventListener('DOMContentLoaded', () => {
  const dynamicContent = new DynamicContent(servicesData);
  dynamicContent.init();
});

// 2. Load from external JSON file
document.addEventListener('DOMContentLoaded', async () => {
  const dynamicContent = await DynamicContent.loadFromFile('data/services-data.json');
  if (dynamicContent) {
    dynamicContent.init();
  }
});

// 3. Add content dynamically
const addNewService = () => {
  dynamicContent.addService(newService);
};

// 4. Lazy loading images
class LazyImageLoader {
  constructor() {
    this.observer = new IntersectionObserver(this.loadImage.bind(this), {
      rootMargin: '50px'
    });
  }

  loadImage(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        if (src) {
          img.style.backgroundImage = `url('${src}')`;
          img.removeAttribute('data-src');
          this.observer.unobserve(img);
        }
      }
    });
  }

  observe(elements) {
    elements.forEach(el => this.observer.observe(el));
  }
}

// Enhanced version with lazy loading
class EnhancedDynamicContent extends DynamicContent {
  constructor(data) {
    super(data);
    this.lazyLoader = new LazyImageLoader();
  }

  renderServices() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = '';

    this.data.services.forEach(service => {
      const serviceCard = document.createElement('div');
      serviceCard.className = 'service-card';
      serviceCard.innerHTML = `
        <div class="service-image" data-src="${service.image}"></div>
        <div class="service-content">
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </div>
      `;
      servicesGrid.appendChild(serviceCard);
    });

    // Enable lazy loading
    const images = servicesGrid.querySelectorAll('.service-image[data-src]');
    this.lazyLoader.observe(images);
  }

  renderPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = '';

    this.data.portfolio.forEach(item => {
      const portfolioItem = document.createElement('div');
      portfolioItem.className = 'portfolio-item';
      portfolioItem.setAttribute('data-category', item.category);
      portfolioItem.innerHTML = `
        <div class="portfolio-image" data-src="${item.image}"></div>
        <div class="portfolio-overlay">
          <h3>${item.title}</h3>
          <p>${item.location}</p>
        </div>
      `;
      portfolioGrid.appendChild(portfolioItem);
    });

    // Enable lazy loading
    const images = portfolioGrid.querySelectorAll('.portfolio-image[data-src]');
    this.lazyLoader.observe(images);
  }
}

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
