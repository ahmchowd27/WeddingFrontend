# WeddingWishCraft Frontend

A beautiful React application for sharing Bengali wedding wishes and photos.

## 🌸 Features

- **Create Wedding Wishes**: Users can write heartfelt messages in English or Bengali
- **Photo Upload**: Support for uploading up to 2 wedding photos (10MB each)
- **Wish Feed**: Browse all wedding wishes in a beautiful, responsive layout
- **Presentation Mode**: Full-screen slideshow for displaying wishes at events
- **Bengali Language Support**: Full support for Bengali text with appropriate fonts
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Beautiful UI**: Elegant design with Bengali cultural elements

## 🎨 Design Features

- Traditional Bengali wedding color scheme (maroon, gold, cream)
- Animated background elements with floating flowers and mandalas
- Smooth page transitions using Framer Motion
- Bengali typography with Google Fonts (Noto Serif Bengali)
- Accessible design with proper contrast and semantic markup

## 🛠 Technology Stack

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling with CSS Grid and Flexbox
- **Google Fonts** - Bengali and English typography

## 📁 Project Structure

```
src/
├── components/
│   └── Header.js          # Navigation header with tabs
├── pages/
│   ├── CreateWish.js      # Form for creating new wishes
│   ├── WishFeed.js        # Display all wishes in a feed
│   └── PresentationView.js # Full-screen slideshow mode
├── styles/
│   ├── App.css            # Main app styles and background elements
│   ├── index.css          # Global styles and CSS variables
│   ├── CreateWish.css     # Create wish form styles
│   ├── WishFeed.css       # Wish feed layout styles
│   └── PresentationView.css # Presentation mode styles
├── utils/
│   └── api.js             # API functions and utilities
├── App.js                 # Main app component with routing
└── index.js               # React app entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the WeddingFrontend directory
3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🎯 Key Features Explained

### Create Wish Page
- Form validation for name and message fields
- Character counters (100 chars for name, 1000 for message)
- Image upload with preview and validation
- Support for both English and Bengali text
- Real-time Bengali text detection for appropriate font rendering

### Wish Feed
- Responsive card layout for wishes
- Image gallery with modal view
- Relative time stamps (e.g., "2 hours ago")
- Bengali text support with proper typography
- Smooth loading states and error handling

### Presentation Mode
- Full-screen slideshow experience
- Auto-play with 60-second intervals
- Keyboard navigation (arrow keys, spacebar, escape)
- Progress indicators and slide counter
- Click-to-navigate slide dots
- Beautiful dark theme optimized for presentations

## 🌐 API Integration

The frontend communicates with a backend API for:
- Creating new wishes with image uploads
- Fetching all wishes for display
- Health checks and error handling

API base URL is configured automatically:
- Development: `http://localhost:5000/api`
- Production: `/api` (relative path)

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- Desktop: 1024px+
- Tablet: 768px - 1023px  
- Mobile: 320px - 767px

## 🎨 Styling Approach

- CSS Custom Properties for consistent theming
- Mobile-first responsive design
- CSS Grid and Flexbox for layouts
- Smooth transitions and hover effects
- Bengali font loading optimization
- Accessible color contrasts

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

### Code Quality

- ESLint configuration for code quality
- Proper React hooks usage
- Accessibility best practices
- Performance optimizations

## 🌟 Cultural Considerations

This application is specifically designed for Bengali weddings with:
- Traditional color palette (maroon, gold, cream)
- Bengali typography and language support
- Cultural symbols and decorative elements
- Respectful and elegant presentation suitable for wedding ceremonies

## 🚀 Deployment

The build folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any web server capable of serving static files

## 📄 License

This project is designed for wedding celebrations and personal use.

---

**WeddingWishCraft** - Celebrating love with beautiful wishes! 🌸💝
