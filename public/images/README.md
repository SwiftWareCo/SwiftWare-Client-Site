# Image Organization Structure

This directory contains all images used in the SwiftWare landing page.

## Directory Structure

```
public/images/
├── hero/           # Hero section images
├── products/       # Software product screenshots
├── team/           # Team member photos
├── gallery/        # Brand gallery images
├── icons/          # Custom icons and logos
└── README.md       # This file
```

## Image Guidelines

### Hero Section (`/hero/`)
- **hero-image.jpg** - Main hero image showing software/business scene (1200x800px recommended)
- **hero-background.jpg** - Alternative hero background
- **og-image.jpg** - Open Graph image for social media (1200x630px)

### Products (`/products/`)
- Software product screenshots and mockups
- Naming convention: `product-{name}-{variant}.jpg`
- Size: 1200x800px for dashboard screenshots
- Size: 800x600px for feature highlights

### Team (`/team/`)
- Professional headshots
- Size: 400x400px
- Format: JPG or PNG
- Naming: `team-{firstname-lastname}.jpg`

### Gallery (`/gallery/`)
- Brand lifestyle images showing teams using software
- Various sizes supported
- Use for testimonials, office environments, success stories, etc.

### Icons (`/icons/`)
- Custom brand icons
- SVG format preferred
- PNG with transparent background as fallback

## Image Optimization

All images should be:
- Optimized for web (compressed)
- Properly sized for their use case
- Include alt text for accessibility
- Use Next.js Image component for automatic optimization

## Placeholder Images

For development, you can use placeholder images from:
- [Unsplash](https://unsplash.com/) - Free high-quality photos
- [Pexels](https://pexels.com/) - Free stock photos
- [Placeholder.com](https://placeholder.com/) - Quick placeholders 