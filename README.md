# Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from OpenWeatherMap API.

## Features

✅ **Current Weather Display**
- Real-time temperature and weather conditions
- Weather icons and descriptions
- Detailed metrics (humidity, wind speed, visibility, pressure, feels-like temperature)

✅ **5-Day Forecast**
- Daily weather predictions
- Temperature ranges (high/low)
- Weather icons and conditions

✅ **City Search**
- Search weather by city name
- Autocomplete support
- Error handling for invalid cities

✅ **Geolocation**
- Get weather for your current location
- One-click location access

✅ **Saved Cities**
- Save frequently searched cities
- Quick access to saved locations
- Persistent storage using localStorage
- Remove cities from saved list

✅ **Responsive Design**
- Mobile-friendly interface
- Adapts to all screen sizes
- Touch-friendly buttons

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ohiosfavoritebartender-ctrl/Ohiosfavgal.com.git
cd Ohiosfavgal.com
```

2. Open in your browser:
   - Double-click `index.html` or
   - Use a local server:
   ```bash
   python -m http.server 8000
   # Then open http://localhost:8000
   ```

## How to Use

### Search by City
1. Enter a city name in the search box
2. Press Enter or click the search button
3. View current weather and 5-day forecast

### Use Your Location
1. Click the location button (📍)
2. Allow browser permission to access your location
3. Weather for your location will load automatically

### Save Cities
- When you search for a city, it's automatically added to your saved cities
- Click any saved city card to quickly view its weather
- Remove cities by clicking the × button on the card

## API Information

This dashboard uses the **OpenWeatherMap API** (free tier):
- Current weather data
- 5-day weather forecast
- No authentication required for free tier
- Visit: [openweathermap.org](https://openweathermap.org)

## File Structure

```
├── index.html      # Main HTML file
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript functionality
├── README.md       # Documentation
└── .gitignore      # Git ignore rules
```

## Customization

### Change API Key
To use your own API key, edit `script.js`:
```javascript
const API_KEY = 'your-api-key-here';
```

### Modify Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... more colors ... */
}
```

### Add More Features
- Air quality index
- Weather alerts
- Hourly forecast
- Historical data
- Weather maps

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### "City not found" error
- Check the spelling of the city name
- Try using a different city name

### Geolocation not working
- Enable location access in browser settings
- Try a different browser
- Check your internet connection

### Weather data not loading
- Verify internet connection
- Check if OpenWeatherMap API is accessible
- Clear browser cache and try again

## Performance Tips

- Saved cities are stored locally - no server required
- Weather data is fetched on-demand
- Images are optimized from CDN
- Responsive design minimizes data on mobile devices

## Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Air quality index display
- [ ] Hourly weather breakdown
- [ ] Weather history graphs
- [ ] Dark/Light theme toggle
- [ ] Multiple language support
- [ ] Weather maps integration
- [ ] Severe weather warnings

## License

MIT License - Free to use and modify

## Support

For issues or suggestions, please visit the [GitHub repository](https://github.com/ohiosfavoritebartender-ctrl/Ohiosfavgal.com/issues)

## Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org)
- Icons: [Font Awesome](https://fontawesome.com)
- Inspiration: Modern weather applications

---

**Made with ❤️ by Ohio's Favorite Gal**
