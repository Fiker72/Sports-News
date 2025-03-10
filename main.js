// Define API key if not already defined
if (typeof API_KEY === 'undefined') {
    API_KEY = 'c421cbe6782aa78a8b8fb1c1ab4bb5df';
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

    // Function to fetch news from GNews API
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
                query = 'soccer OR football';
        }
        
        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${API_KEY}`;
        
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
        const image = article.image || 'https://placehold.co/600x400/png?text=Soccer+News';
        const title = article.title;
        
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

    // Function to check if article is soccer-related
    function isSoccerArticle(article) {
        const soccerKeywords = ['soccer', 'football', 'premier league', 'la liga', 'champions league', 'fifa', 'uefa', 'world cup', 'soccer news'];
        const content = (article.title + ' ' + article.description).toLowerCase();
        const isSoccer = soccerKeywords.some(keyword => content.includes(keyword)) || article.source.name.toLowerCase().includes('soccer') || article.source.name.toLowerCase().includes('football');
        if (!isSoccer) {
            console.log('Filtered out article:', article);
        }
        return isSoccer;
    }

    // Function to update news grid
    async function updateNewsGrid(category) {
        try {
            // Show loading state
            newsGrid.style.opacity = '0.5';
            loadingSpinner.style.display = 'block';

            const articles = await fetchNews(category);
            const filteredArticles = articles.filter(isSoccerArticle);
            
            if (filteredArticles.length === 0) {
                newsGrid.innerHTML = '<div class="no-results">No soccer news articles found</div>';
                return;
            }

            newsGrid.innerHTML = filteredArticles.map(createNewsCard).join('');
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

    // Automatically load Premier League news on page load
    updateNewsGrid('premier-league');
});
