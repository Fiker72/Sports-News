// Define API key if not already defined
if (typeof API_KEY === 'undefined') {
    API_KEY = '705f793a5c7d4daf9055a6cba26f1e44';
}

document.addEventListener('DOMContentLoaded', () => {
    const newsGrid = document.querySelector('.news-grid');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Theme handling
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update button icons
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Function to fetch news from NewsAPI
    async function fetchNews(category = 'all') {
        let query;
        switch(category) {
            case 'premier-league':
                query = 'Premier League soccer football';
                break;
            case 'la-liga':
                query = 'La Liga soccer football';
                break;
            case 'champions-league':
                query = 'UEFA Champions League soccer football';
                break;
            default:
                query = 'soccer football';
        }
        
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${API_KEY}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch news');
            
            const data = await response.json();
            return data.articles;
        } catch (error) {
            console.error('Error fetching news:', error);
            showError('Failed to load news. Please try again later.');
            return [];
        }
    }

    // Function to create news card HTML
    function createNewsCard(article) {
        const image = article.urlToImage || 'https://placehold.co/600x400/png?text=Soccer+News';
        const title = article.title.split(' - ')[0]; // Remove source name from title
        
        return `
            <a href="${article.url}" target="_blank" rel="noopener" class="news-card">
                <div class="news-image" style="background-image: url('${image}')"></div>
                <div class="news-content">
                    <div class="news-category">${article.source.name}</div>
                    <h3 class="news-title">${title}</h3>
                    <p class="news-excerpt">${article.description || 'No description available'}</p>
                    <div class="news-footer">
                        <div class="news-date">${formatDate(article.publishedAt)}</div>
                        <span class="read-more">Read More</span>
                    </div>
                </div>
            </a>
        `;
    }

    // Function to update news grid
    async function updateNewsGrid(category) {
        try {
            // Show loading state
            newsGrid.style.opacity = '0.5';
            loadingSpinner.style.display = 'block';

            const articles = await fetchNews(category);
            
            if (articles.length === 0) {
                newsGrid.innerHTML = '<div class="no-results">No news articles found</div>';
                return;
            }

            newsGrid.innerHTML = articles.map(createNewsCard).join('');
        } catch (error) {
            showError(error.message);
        } finally {
            // Hide loading state
            newsGrid.style.opacity = '1';
            loadingSpinner.style.display = 'none';
        }
    }

    // Add category filter functionality
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active category
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Fetch news for selected category
            const category = link.dataset.category;
            updateNewsGrid(category);
        });
    });

    // Function to format dates
    function formatDate(dateStr) {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString(undefined, { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        } catch (e) {
            return dateStr;
        }
    }

    // Function to show errors
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        newsGrid.innerHTML = '';
        newsGrid.appendChild(errorDiv);
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Load initial news
    updateNewsGrid('all');
});
