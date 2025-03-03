# Soccer News Hub 🌐⚽

A modern, responsive web application that aggregates and displays the latest soccer news from around the world. Built with vanilla JavaScript and powered by NewsAPI.

![Soccer News Hub Screenshot](screenshot.png)

## Features 🌟

- **Real-time News**: Latest soccer news from multiple reliable sources
- **Category Filtering**: Quick access to specific leagues
  - All Soccer
  - Premier League
  - La Liga
  - Champions League
- **Dark/Light Mode**: Elegant theme switching with automatic preference saving
- **Responsive Design**: Seamless experience across all devices
- **Clean UI**: Modern and intuitive interface

## Technologies Used 🛠

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (ES6+)
- NewsAPI
- Google Fonts (Roboto)

## Getting Started 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/soccer-news-hub.git
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. The app should now be running at `http://localhost:8000`

## API Configuration 🔑

The app uses NewsAPI to fetch soccer news. The API key is already configured, but you can replace it with your own:

1. Get an API key from [NewsAPI](https://newsapi.org)
2. Replace the API key in `index.html`:
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```

## Features in Detail 📋

### News Categories
- **All Soccer**: General soccer news from around the world
- **Premier League**: Focus on English Premier League
- **La Liga**: Spanish league coverage
- **Champions League**: UEFA Champions League updates

### Theme Switching
- Click the sun/moon icon to toggle between light and dark modes
- Theme preference is automatically saved
- Smooth transitions between themes

### Responsive Design
- Mobile-first approach
- Flexible grid layout
- Optimized for all screen sizes

## Project Structure 📁

```
soccer-news-hub/
├── index.html      # Main HTML file
├── style.css       # Styles and theme variables
├── main.js         # Core functionality
└── README.md       # Documentation
```

## Limitations ⚠️

- NewsAPI free tier restrictions:
  - 100 requests per day
  - News from the last month only
  - Developer use only
- Images may not always be available (fallback provided)

## Future Improvements 🔮

- [ ] Add search functionality
- [ ] Implement news caching
- [ ] Add more leagues and categories
- [ ] Enhanced error handling
- [ ] Pagination support
- [ ] Share buttons for social media

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 👏

- NewsAPI for providing the news data
- Google Fonts for the Roboto font family
- All contributors and users of the app
