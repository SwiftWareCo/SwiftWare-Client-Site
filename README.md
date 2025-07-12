# SwiftWare Landing Page

A modern, responsive landing page for SwiftWare - a software company providing enterprise solutions for modern businesses.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Performance**: Optimized with Next.js 15 and modern web technologies
- **Accessibility**: Built with accessibility best practices
- **SEO Optimized**: Proper meta tags and structured data
- **Dark Mode**: Automatic dark mode support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Font**: Geist Sans & Geist Mono

## Project Structure

```
landing-page/
├── public/
│   ├── images/
│   │   ├── hero/         # Hero section images
│   │   ├── products/     # Software product screenshots
│   │   ├── team/         # Team member photos
│   │   ├── gallery/      # Brand gallery images
│   │   └── icons/        # Custom icons and logos
│   └── [other static files]
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout with SEO
│   │   └── page.tsx      # Main landing page
│   └── components/
│       ├── Hero.tsx      # Hero section
│       ├── Features.tsx  # Features section
│       ├── Navbar.tsx    # Navigation bar
│       ├── Footer.tsx    # Footer
│       └── index.ts      # Component exports
└── [config files]
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Adding Images

### Required Images
For the landing page to display properly, add these images to `public/images/`:

1. **Hero Section** (`/hero/`):
   - `hero-image.jpg` - Main hero image showing software/business scene (1200x800px)
   - `og-image.jpg` - Social media preview (1200x630px)

### Image Guidelines
- Use high-quality, web-optimized images
- Follow the naming conventions in `/public/images/README.md`
- Ensure proper alt text for accessibility
- Use Next.js Image component for automatic optimization

## Customization

### Brand Colors
Update the color scheme in `src/app/globals.css` and component files:
Primary: Electric Blue (#0066FF)
Secondary: Deep Navy (#1A237E)
Accent: Bright Cyan (#00E5FF)
Neutrals: White + Light Gray (#F5F7FA)

### Content
Update content in the component files:
- `src/components/Hero.tsx` - Hero section content
- `src/components/Features.tsx` - Features and benefits
- `src/components/Navbar.tsx` - Navigation links
- `src/components/Footer.tsx` - Footer links and information

### SEO
Update SEO metadata in `src/app/layout.tsx`:
- Title and description
- Open Graph tags
- Twitter Card data
- Keywords and author information

## Performance

- ✅ Next.js Image optimization
- ✅ Automatic code splitting
- ✅ CSS optimization with Tailwind
- ✅ Font optimization with next/font
- ✅ Efficient animations with Framer Motion

## Deployment

Build for production:
```bash
npm run build
```

The site is ready to deploy to platforms like:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any static hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
# landingPage
