# WordPress Integration Guide

This guide explains how to integrate your 3D landing page with WordPress in various ways, from simple embedding to full theme integration.

---

## Method 1: iframe Embed (Easiest)

**Best for:** Quick integration, keeping sites separate  
**Difficulty:** ⭐ Beginner  
**Time:** 5 minutes

### Steps:

1. **Deploy Your Landing Page**
   - First, deploy your 3D site using DEPLOYMENT_GUIDE.md
   - Get your live URL (e.g., `https://your-site.netlify.app`)

2. **In WordPress Admin**
   - Go to Pages → Add New (or edit existing page)
   - Add a "Custom HTML" block
   - Paste this code:

   ```html
   <iframe 
       src="https://your-site.netlify.app" 
       width="100%" 
       height="800px" 
       frameborder="0"
       style="border: none; display: block;">
   </iframe>
   ```

3. **Make it Full-Width (Optional)**
   - Use a page builder (Elementor, Gutenberg)
   - Create full-width section
   - Add HTML block with iframe

4. **Responsive Height (Optional)**
   ```html
   <style>
   .responsive-iframe-container {
       position: relative;
       width: 100%;
       padding-bottom: 56.25%; /* 16:9 aspect ratio */
       height: 0;
       overflow: hidden;
   }
   .responsive-iframe-container iframe {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
   }
   </style>
   
   <div class="responsive-iframe-container">
       <iframe src="https://your-site.netlify.app" frameborder="0"></iframe>
   </div>
   ```

### Pros & Cons:

✅ **Pros:**
- Easy to implement
- Keeps sites separate
- No WordPress performance impact
- Easy to update independently

❌ **Cons:**
- iframe limitations (SEO, mobile scroll)
- Separate domains (if not using same domain)

---

## Method 2: WordPress HTML Block (Full Integration)

**Best for:** Single page integration, no separate hosting  
**Difficulty:** ⭐⭐ Intermediate  
**Time:** 15 minutes

### Steps:

1. **Prepare Your Code**
   - Copy contents of `index.html`
   - Copy contents of `css/style.css`
   - Copy contents of `js/main.js`

2. **Create WordPress Page**
   - Pages → Add New
   - Choose "Custom HTML" block or "Code Editor" mode

3. **Add HTML**
   ```html
   <!-- Paste modified HTML here -->
   <div id="landing-page-container">
       <!-- Your hero section -->
       <!-- Your features section -->
       <!-- etc. -->
   </div>
   ```

4. **Add CSS**
   - Use "Additional CSS" in Customizer (Appearance → Customize → Additional CSS)
   - Or use a plugin like "Simple Custom CSS"
   
   ```css
   /* Paste your CSS here */
   /* Wrap everything in #landing-page-container to avoid conflicts */
   #landing-page-container .hero-section {
       /* styles */
   }
   ```

5. **Add JavaScript**
   - Use plugin: "Insert Headers and Footers"
   - Or add to theme's `functions.php`:
   
   ```php
   function custom_landing_page_scripts() {
       if (is_page('your-page-slug')) {
           wp_enqueue_script('landing-page-js', 
               get_template_directory_uri() . '/js/landing-page.js', 
               array(), 
               '1.0', 
               true
           );
       }
   }
   add_action('wp_enqueue_scripts', 'custom_landing_page_scripts');
   ```

6. **Use Full-Width Template**
   - Page Attributes → Template → Full Width (or Blank)
   - This removes WordPress header/footer/sidebar

### WordPress-Specific Adjustments:

```css
/* Remove WordPress admin bar spacing */
#landing-page-container {
    margin-top: -32px; /* Adjust if admin bar visible */
}

/* Fix WordPress conflicts */
#landing-page-container * {
    box-sizing: border-box;
}

/* Override WordPress default styles */
#landing-page-container p,
#landing-page-container h1,
#landing-page-container h2 {
    margin: 0;
    padding: 0;
}
```

### Pros & Cons:

✅ **Pros:**
- Fully integrated with WordPress
- Single domain
- Better SEO

❌ **Cons:**
- WordPress conflicts possible
- Harder to maintain
- Performance depends on WordPress

---

## Method 3: Custom WordPress Theme/Template

**Best for:** Full control, professional projects  
**Difficulty:** ⭐⭐⭐⭐ Advanced  
**Time:** 1-2 hours

### Steps:

1. **Create Custom Page Template**
   
   In your theme folder, create `template-landing-page.php`:
   
   ```php
   <?php
   /**
    * Template Name: 3D Landing Page
    * Description: Full-screen 3D landing page template
    */
   ?>
   <!DOCTYPE html>
   <html <?php language_attributes(); ?>>
   <head>
       <meta charset="<?php bloginfo('charset'); ?>">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title><?php wp_title(); ?></title>
       
       <!-- Google Fonts -->
       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
       
       <!-- Font Awesome -->
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
       
       <!-- Custom Landing Page CSS -->
       <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/landing-page.css">
       
       <?php wp_head(); ?>
   </head>
   <body <?php body_class(); ?>>
   
   <!-- Your landing page HTML here -->
   <?php
   // Include template parts if needed
   get_template_part('template-parts/landing-page/hero');
   get_template_part('template-parts/landing-page/features');
   get_template_part('template-parts/landing-page/about');
   get_template_part('template-parts/landing-page/contact');
   ?>
   
   <!-- Custom JS -->
   <script src="<?php echo get_template_directory_uri(); ?>/js/landing-page.js"></script>
   
   <?php wp_footer(); ?>
   </body>
   </html>
   ```

2. **Add CSS File**
   - Copy `style.css` to `wp-content/themes/your-theme/css/landing-page.css`

3. **Add JavaScript File**
   - Copy `main.js` to `wp-content/themes/your-theme/js/landing-page.js`

4. **Enqueue Scripts Properly**
   
   In `functions.php`:
   
   ```php
   function landing_page_assets() {
       if (is_page_template('template-landing-page.php')) {
           // Dequeue default WordPress styles if needed
           wp_dequeue_style('wp-block-library');
           
           // Enqueue custom CSS
           wp_enqueue_style(
               'landing-page-css',
               get_template_directory_uri() . '/css/landing-page.css',
               array(),
               '1.0.0'
           );
           
           // Enqueue custom JS
           wp_enqueue_script(
               'landing-page-js',
               get_template_directory_uri() . '/js/landing-page.js',
               array(),
               '1.0.0',
               true
           );
       }
   }
   add_action('wp_enqueue_scripts', 'landing_page_assets');
   ```

5. **Use Template**
   - Create new page in WordPress
   - Page Attributes → Template → 3D Landing Page
   - Publish

### Pros & Cons:

✅ **Pros:**
- Full control over everything
- Professional integration
- Best performance
- Customizable through WordPress

❌ **Cons:**
- Requires PHP/WordPress knowledge
- More complex setup
- Theme-specific

---

## Method 4: WordPress Plugin (Using Elementor/WPBakery)

**Best for:** Page builder users  
**Difficulty:** ⭐⭐ Intermediate  
**Time:** 20 minutes

### Using Elementor:

1. **Install Elementor** (free version works)

2. **Create New Page with Elementor**

3. **Add HTML Widget**
   - Drag "HTML" widget to page
   - Paste your HTML sections

4. **Add Custom CSS**
   - Elementor → Advanced → Custom CSS
   - Paste your styles

5. **Use Elementor Canvas Template**
   - Settings → Page Layout → Elementor Canvas
   - Removes WordPress header/footer

6. **Embed Spline Scene**
   - Use HTML widget with iframe
   - Or use "Video" widget with Spline URL

### Using WPBakery:

1. **Create Page with WPBakery**

2. **Add Raw HTML Elements**
   - Add "Raw HTML" modules
   - Paste your code sections

3. **Custom CSS**
   - Add in "Design Options" for each element

### Pros & Cons:

✅ **Pros:**
- Visual editing
- Easy for non-coders
- Flexible layout

❌ **Cons:**
- Page builder bloat
- Performance overhead
- Less control

---

## Method 5: Subdomain/Subdirectory Setup

**Best for:** Keeping sites separate while maintaining same domain  
**Difficulty:** ⭐⭐⭐ Intermediate-Advanced  
**Time:** 30 minutes

### Option A: Subdomain (landing.yourdomain.com)

1. **Deploy Landing Page** to Netlify/Vercel

2. **Set Up Subdomain**
   - In hosting provider, add DNS record:
     ```
     Type: CNAME
     Name: landing
     Value: your-site.netlify.app
     ```

3. **Configure in Netlify/Vercel**
   - Add custom domain: `landing.yourdomain.com`

4. **Link from WordPress**
   - Add menu item or button linking to subdomain

### Option B: Subdirectory (yourdomain.com/landing)

This is more complex and requires server configuration.

1. **WordPress in Root**
   - WordPress at: `yourdomain.com`

2. **Landing Page in Subfolder**
   - Upload landing page files to: `/public_html/landing/`

3. **Configure WordPress**
   - Ensure WordPress doesn't override the `/landing` route

4. **Access**
   - Landing page: `yourdomain.com/landing`
   - WordPress: `yourdomain.com`

### Pros & Cons:

✅ **Pros:**
- Keeps sites independent
- Same domain benefits
- Easier maintenance

❌ **Cons:**
- Requires DNS setup
- More complex configuration

---

## WordPress Plugins to Help

### Useful Plugins:

1. **Insert Headers and Footers**
   - Add custom JavaScript easily
   - Link: wordpress.org/plugins/insert-headers-and-footers/

2. **Simple Custom CSS and JS**
   - Add custom CSS/JS per page
   - Link: wordpress.org/plugins/custom-css-js/

3. **Elementor**
   - Page builder for easy layouts
   - Link: wordpress.org/plugins/elementor/

4. **WP Coder**
   - Code snippets manager
   - Link: wordpress.org/plugins/wp-coder/

5. **WP External Links**
   - Manage iframe embeds
   - Link: wordpress.org/plugins/wp-external-links/

---

## SEO Considerations

### For iframe Method:
- Search engines may not index iframe content
- Use proper page titles and descriptions
- Add alt text and meta tags

### For Full Integration:
- Better SEO as content is on same domain
- Ensure proper heading structure (H1, H2, etc.)
- Add meta descriptions
- Use Yoast SEO or Rank Math plugins

### Best Practices:
```html
<!-- Add to WordPress page -->
<meta name="description" content="Your 3D landing page description">
<meta property="og:title" content="3D Landing Page">
<meta property="og:description" content="Immersive 3D web experience">
<meta property="og:image" content="screenshot.jpg">
```

---

## Performance Optimization for WordPress

1. **Use Caching Plugin**
   - WP Super Cache or W3 Total Cache
   - Cache Spline content

2. **CDN Setup**
   - Cloudflare (free)
   - Speeds up global delivery

3. **Lazy Load**
   - Load Spline scene only when visible
   - Use Intersection Observer

4. **Optimize WordPress**
   - Remove unused plugins
   - Optimize database
   - Use lightweight theme

---

## Troubleshooting WordPress Integration

### CSS Conflicts?
```css
/* Increase specificity */
.landing-page-wrapper .hero-section {
    /* your styles */
}

/* Or use !important (last resort) */
.hero-title {
    font-size: 48px !important;
}
```

### JavaScript Conflicts?
```javascript
// Wrap in IIFE to avoid conflicts
(function() {
    'use strict';
    // Your landing page JavaScript
})();

// Or use jQuery noConflict mode
jQuery(document).ready(function($) {
    // Your code
});
```

### Admin Bar Overlapping?
```css
@media screen and (min-width: 783px) {
    body.admin-bar .navbar {
        top: 32px;
    }
}
```

### Spline Not Loading?
- Check WordPress security plugins (may block iframes)
- Disable script optimization plugins temporarily
- Check browser console for errors

---

## Recommended Approach by Skill Level

| Skill Level | Best Method | Why |
|-------------|-------------|-----|
| **Beginner** | iframe Embed | Easiest, no coding |
| **Intermediate** | HTML Block or Elementor | Good balance |
| **Advanced** | Custom Template | Full control |
| **Professional** | Subdomain + API Integration | Best performance |

---

## Complete Integration Example

Here's a complete WordPress page setup using Custom HTML block:

```html
<!-- Add this in WordPress Custom HTML block -->
<style>
    /* Scoped styles to avoid conflicts */
    .landing-page-3d {
        margin: -20px -20px 0 -20px; /* Remove WordPress padding */
    }
    
    /* Your CSS here (scoped) */
    .landing-page-3d .hero-section {
        min-height: 100vh;
        /* etc */
    }
</style>

<div class="landing-page-3d">
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="spline-container">
            <iframe src="https://my.spline.design/your-scene"></iframe>
        </div>
        <!-- Rest of hero content -->
    </section>
    
    <!-- Other sections -->
</div>

<script>
    (function() {
        // Your JavaScript here (scoped)
    })();
</script>
```

---

## Next Steps

1. ✅ Choose integration method based on your skill level
2. ✅ Deploy landing page (if using iframe method)
3. ✅ Test on WordPress staging site first
4. ✅ Optimize performance
5. ✅ Test mobile responsiveness
6. ✅ Check SEO settings
7. ✅ Go live!

---

**Need More Help?**
- WordPress Codex: [codex.wordpress.org](https://codex.wordpress.org)
- WordPress Support: [wordpress.org/support](https://wordpress.org/support)
- Community Forums: Stack Overflow, Reddit r/Wordpress

Good luck with your WordPress integration! 🎉

