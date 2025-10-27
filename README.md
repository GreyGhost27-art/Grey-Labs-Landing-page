# Grey's Studio - Portfolio Website

A minimalist, interactive portfolio website built with Japanese aesthetic design principles, featuring modern web technologies and best practices.

## 🎨 Features

### Design & User Experience
- **Japanese Minimalist Aesthetic** - Clean design inspired by Japanese art and philosophy
- **Custom Shuriken Cursor** - Interactive animated cursor with trail effects
- **Sakura Petal Animation** - Beautiful falling cherry blossom petals
- **Interactive Elements** - Draggable shapes, magnetic hover effects, and text scramble animations
- **Parallax Scrolling** - Smooth depth effects throughout the page
- **Dark/Light Theme Toggle** - Seamless theme switching with localStorage persistence

### Performance
- **Loading Screen** - Elegant loading animation with progress indication
- **Lazy Loading** - Optimized image and resource loading
- **Resource Hints** - DNS prefetch and preconnect for faster loading
- **Service Worker** - PWA support with offline caching
- **Optimized Fonts** - Display swap for better font loading performance

### Accessibility
- **WCAG Compliant** - Follows accessibility best practices
- **Skip to Main Content** - Quick navigation for keyboard users
- **ARIA Labels** - Comprehensive screen reader support
- **Focus Management** - Enhanced keyboard navigation
- **High Contrast Support** - Adapts to user preferences
- **Reduced Motion** - Respects prefers-reduced-motion settings
- **Semantic HTML** - Proper use of HTML5 landmarks

### SEO & Discoverability
- **Meta Tags** - Comprehensive meta descriptions and keywords
- **Open Graph** - Rich social media previews
- **Twitter Cards** - Optimized Twitter sharing
- **Structured Data** - JSON-LD schema for search engines
- **Sitemap Ready** - Semantic HTML structure for crawlers

### Mobile Experience
- **Fully Responsive** - Adapts to all screen sizes
- **Touch Optimized** - Proper touch target sizes (44x44px minimum)
- **Mobile-First CSS** - Optimized for mobile devices
- **iOS Safe Areas** - Respects device notches and safe areas
- **No Zoom on Input** - Prevents unwanted zooming on form fields

### Interactive Features
- **Contact Form** - Full validation with real-time feedback
- **Text Scramble Effect** - Hover effect that transitions between English and Japanese
- **Bamboo Interaction** - Interactive bamboo stems with leaf animations
- **Sakura Burst** - Click effects with flower animations
- **Magnetic Elements** - Elements that subtly follow the cursor
- **Scroll Progress** - Visual indicator of page scroll position
- **Smooth Scroll** - Buttery smooth navigation between sections

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- A local web server (optional for development)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/grey-portfolio.git
cd grey-portfolio
```

2. Start a local server:

Using Python 3:
```bash
python3 -m http.server 8000
```

Using Node.js:
```bash
npx serve .
```

Using PHP:
```bash
php -S localhost:8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## 📁 Project Structure

```
Website/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for PWA
├── css/
│   └── style.css      # All styles including themes
├── js/
│   └── main.js        # All JavaScript functionality
├── LICENSE
├── package.json       # Project metadata
└── README.md         # This file
```

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --black: #0a0a0a;
    --white: #f5f5f0;
    --red: #d32f2f;
    --sakura: #ffb7c5;
    /* ... more colors */
}
```

### Content
Update your information in `index.html`:
- Hero section titles
- About text
- Work projects
- Contact information
- Social media links

### SEO
Update meta tags and structured data in `index.html`:
- Meta descriptions
- Open Graph tags
- JSON-LD structured data
- Update `yourwebsite.com` with your actual domain

### Contact Form
The contact form currently simulates submission. To make it functional:

1. Set up a backend endpoint (e.g., Firebase, Netlify Functions, or your own server)
2. Update the `submitForm` method in `js/main.js`:
```javascript
async submitForm(data) {
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

## 🌐 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to Settings → Pages
3. Select your branch and save
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Connect your GitHub repository
2. Build command: (leave empty)
3. Publish directory: `/`
4. Deploy!

### Vercel
```bash
npm install -g vercel
vercel
```

## 📱 PWA Installation

Your website can be installed as a Progressive Web App:
1. Visit the website
2. Look for the "Install" prompt in your browser
3. Click "Install" to add it to your home screen

## 🧪 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Canvas API** - For custom cursor trail and sakura petals
- **Service Workers** - PWA support
- **LocalStorage** - Theme persistence

## 🎯 Performance Metrics

The website is optimized for:
- **First Contentful Paint** < 1.5s
- **Time to Interactive** < 3s
- **Lighthouse Score** > 90

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Japanese design principles and aesthetics
- Web accessibility guidelines (WCAG 2.1)
- Modern web performance best practices

## 📬 Contact

- Email: ashwingrey.office@gmail.com
- Phone: +91 88709 99846
- LinkedIn: [Ashwin P](https://www.linkedin.com/in/ashwin-p-72a92216a/)
- Behance: [ashwingrey27](https://www.behance.net/ashwingrey27)
- Instagram: [@greycstudios2](https://www.instagram.com/greycstudios2/)
- ArtStation: [ash_grey](https://www.artstation.com/ash_grey)

## 🔄 Version History

### Version 2.0.0 (2025)
- ✨ Added dark/light theme toggle
- 🎬 Added loading screen animation
- 📧 Implemented contact form with validation
- 🔍 Enhanced SEO with structured data
- ♿ Improved accessibility features
- 📱 Enhanced mobile responsiveness
- 🚀 Added PWA support
- ⚡ Performance optimizations

### Version 1.0.0 (Initial Release)
- 🎨 Japanese minimalist design
- ✨ Interactive animations
- 🌸 Sakura petal effects
- 🥷 Custom cursor
- 📱 Responsive design

---

**Made with ❤️ and a lot of ☕ by Grey**
