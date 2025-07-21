// Form validation for login page
document.addEventListener('DOMContentLoaded', function() {
    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(event) {
        if (!loginForm.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        loginForm.classList.add('was-validated');
      });
    }
  
    // Register form validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      // Custom password confirmation validation
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      
      function validatePassword() {
        if (password.value !== confirmPassword.value) {
          confirmPassword.setCustomValidity("Passwords don't match");
        } else {
          confirmPassword.setCustomValidity('');
        }
      }
      
      password.onchange = validatePassword;
      confirmPassword.onkeyup = validatePassword;
  
      registerForm.addEventListener('submit', function(event) {
        if (!registerForm.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        registerForm.classList.add('was-validated');
      });
    }
  
    // Navbar active link highlighting
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const themeToggle = document.querySelector('.theme-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    } else {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
}

// Search Functionality
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    // Add your search logic here
    console.log('Searching for:', searchTerm);
});

// Weather Widget
function updateWeather() {
    // This is a placeholder. In a real application, you would fetch weather data from an API
    const weatherWidget = document.querySelector('.weather-widget');
    if (weatherWidget) {
        // Simulate weather data update
        const temperature = Math.floor(Math.random() * 30) + 10;
        const weatherIcon = ['🌤️', '🌞', '🌧️', '⛅'][Math.floor(Math.random() * 4)];
        
        weatherWidget.querySelector('.temperature').textContent = `${temperature}°C`;
        weatherWidget.querySelector('.weather-icon').textContent = weatherIcon;
    }
}

// Update weather every 30 minutes
setInterval(updateWeather, 30 * 60 * 1000);
updateWeather(); // Initial update

// Share Adventure Feature
function shareAdventure() {
    if (navigator.share) {
        navigator.share({
            title: 'QuestMate Adventure',
            text: 'Check out this amazing adventure on QuestMate!',
            url: window.location.href
        })
        .catch(error => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support the Web Share API
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Link copied to clipboard!');
    }
}

// Initialize features when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const themeToggle = document.querySelector('.theme-toggle i');
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    }
});

// Location Exploration
function exploreLocation(city) {
    const locationData = {
        'Islamabad': {
            attractions: ['Margalla Hills', 'Faisal Mosque', 'Daman-e-Koh', 'Pakistan Monument', 'Lok Virsa Museum'],
            bestTime: 'October to April',
            description: 'Islamabad offers a perfect blend of natural beauty and modern architecture.'
        },
        'Lahore': {
            attractions: ['Badshahi Mosque', 'Lahore Fort', 'Food Street', 'Shalimar Gardens', 'Walled City'],
            bestTime: 'October to March',
            description: 'Experience the rich cultural heritage and delicious cuisine of Lahore.'
        },
        'Karachi': {
            attractions: ['Clifton Beach', 'Port Grand', 'Mohatta Palace', 'Quaid\'s Mausoleum', 'Empress Market'],
            bestTime: 'November to February',
            description: 'Discover the vibrant city life and beautiful beaches of Karachi.'
        }
    };

    const cityData = locationData[city];
    if (cityData) {
        // Create a modal with city information
        const modal = document.createElement('div');
        modal.className = 'location-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${city}</h2>
                <p>${cityData.description}</p>
                <h3>Top Attractions:</h3>
                <ul>
                    ${cityData.attractions.map(attraction => `<li>${attraction}</li>`).join('')}
                </ul>
                <p><strong>Best Time to Visit:</strong> ${cityData.bestTime}</p>
                <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">Close</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .location-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .modal-content {
                background: white;
                padding: 20px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            .dark-mode .modal-content {
                background: #2d2d2d;
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
}

// Update weather information
function updateWeatherInfo() {
    const cities = ['Islamabad', 'Lahore', 'Karachi'];
    const weatherCards = document.querySelectorAll('.weather-card');
    
    weatherCards.forEach((card, index) => {
        const temperature = Math.floor(Math.random() * 15) + 20; // Random temperature between 20-35
        const weatherIcons = ['☀️', '🌤️', '⛅', '🌥️', '☁️'];
        const weatherDesc = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Mild', 'Warm'];
        
        card.querySelector('.temperature').textContent = `${temperature}°C`;
        card.querySelector('.weather-icon').textContent = weatherIcons[Math.floor(Math.random() * weatherIcons.length)];
        card.querySelector('.weather-desc').textContent = weatherDesc[Math.floor(Math.random() * weatherDesc.length)];
    });
}

// Update weather every 30 minutes
setInterval(updateWeatherInfo, 30 * 60 * 1000);
updateWeatherInfo(); // Initial update