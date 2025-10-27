# ⚡ Quick Start Guide

Get your 3D landing page up and running in **under 30 minutes**!

## 🎯 What You'll Build

A beautiful, interactive 3D landing page with:
- Animated 3D scene in the hero section
- Smooth scroll effects
- Modern glassmorphism design
- Fully responsive layout
- Free hosting

## 📋 Prerequisites

- [ ] A web browser (Chrome, Firefox, Safari, or Edge)
- [ ] A text editor (VS Code, Sublime, or any editor)
- [ ] 30 minutes of time
- [ ] Internet connection

## 🚀 Step-by-Step (30 Minutes)

### Step 1: Set Up Files (2 minutes)

You already have all the files! Your project structure looks like this:

```
Website/
├── index.html              ✅ Ready
├── css/style.css          ✅ Ready
├── js/main.js             ✅ Ready
├── assets/                ✅ Ready
├── SPLINE_GUIDE.md        ✅ Ready
├── DEPLOYMENT_GUIDE.md    ✅ Ready
└── README.md              ✅ Ready
```

### Step 2: Preview Locally (2 minutes)

**Option A: Double-click**
- Simply double-click `index.html`
- It opens in your default browser

**Option B: Local Server** (better)
```bash
# Navigate to folder
cd /Users/grey/Desktop/Projects/Website

# Start server (choose one):

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Step 3: Create 3D Scene (15 minutes)

This is where the magic happens!

1. **Go to Spline**
   - Visit [spline.design](https://spline.design)
   - Click "Get Started" (free account)

2. **Quick Scene Options**

   **Option A: Use Template (Fastest - 5 min)**
   - Click "Community" at top
   - Browse templates
   - Find one you like
   - Click "Duplicate" to copy to your account
   - Customize colors if you want
   - Skip to step 3

   **Option B: Create Simple Scene (10 min)**
   - Click "New File"
   - Add object: Click `+` or `Shift+A`
   - Choose "Cube" or "Sphere"
   - Click material panel (right side)
   - Change color to purple/blue gradient
   - Add rotation animation:
     - Click "States" (top right)
     - Add keyframe at 0s
     - Move to 5s, rotate object
     - Play to test!

   **Option C: Skip for Now**
   - The placeholder will show until you add Spline
   - You can add it later!

3. **Export Scene**
   - Click "Export" button (top right)
   - Choose "Export for Web"
   - Settings:
     - ✅ Camera Controls
     - ✅ Auto Start
     - Background: Transparent
   - Click "Get Embed Code"
   - Copy the `<iframe>` code

4. **Add to Your Page**
   - Open `index.html` in your editor
   - Find line ~45: `<div id="spline-container" class="spline-container">`
   - Replace the placeholder content with your iframe:
   ```html
   <div id="spline-container" class="spline-container">
       <!-- PASTE YOUR IFRAME HERE -->
       <iframe src='https://my.spline.design/...' 
               frameborder='0' 
               width='100%' 
               height='100%'>
       </iframe>
   </div>
   ```
   - Save file
   - Refresh browser

### Step 4: Customize Content (5 minutes)

Open `index.html` and customize:

**Change the Title:**
```html
<!-- Find line ~72 -->
<h1 class="hero-title animate-on-scroll">
    <span class="gradient-text">Your Title Here</span><br>
    Your Subtitle
</h1>
```

**Change Description:**
```html
<!-- Find line ~76 -->
<p class="hero-subtitle animate-on-scroll">
    Your description here
</p>
```

**Change Colors (Optional):**
Open `css/style.css`:
```css
/* Find line ~4 */
:root {
    --primary-color: #6366f1;  /* Change this */
    --secondary-color: #8b5cf6; /* And this */
    --accent-color: #ec4899;    /* And this */
}
```

### Step 5: Deploy for Free (6 minutes)

**Netlify Method (Easiest):**

1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)
3. Look for "Want to deploy a new site without connecting to Git?"
4. **Drag your entire `Website` folder** into the box
5. Wait 30 seconds
6. Done! You get a URL like: `your-site-123.netlify.app`

**Want a better URL?**
- Click "Site settings"
- Click "Change site name"
- Enter: `your-cool-name`
- New URL: `your-cool-name.netlify.app`

### Step 6: Share! (1 minute)

🎉 **Congratulations!** Your 3D landing page is live!

- Copy your URL
- Share on social media
- Add to your portfolio
- Send to clients/friends

## 🎨 Next Steps (Optional)

### Beginner Customizations:
- [ ] Change text content
- [ ] Update colors
- [ ] Add your social media links
- [ ] Change fonts (see Google Fonts)

### Intermediate:
- [ ] Create custom 3D scene
- [ ] Add more sections
- [ ] Integrate with WordPress
- [ ] Add custom domain

### Advanced:
- [ ] Add contact form
- [ ] Integrate with backend
- [ ] Add analytics
- [ ] SEO optimization

## 📚 Helpful Resources

**Detailed Guides:**
- [SPLINE_GUIDE.md](SPLINE_GUIDE.md) - Complete 3D creation guide
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - All hosting options
- [WORDPRESS_INTEGRATION.md](WORDPRESS_INTEGRATION.md) - WordPress setup

**External Resources:**
- [Spline Tutorials](https://youtube.com/@splinedesign)
- [Spline Community](https://spline.design/community)
- [Free 3D Models](https://poly.pizza)

## 🆘 Troubleshooting

**3D scene not showing?**
- Make sure you pasted the iframe correctly
- Check Spline URL is correct
- Refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

**Looks broken on mobile?**
- It should be responsive by default
- Clear browser cache
- Test on real device, not just browser resize

**Deployment not working?**
- Make sure you uploaded the whole `Website` folder
- Check all files are included
- Try different hosting (Vercel or GitHub Pages)

**Want to make changes after deploying?**
- Edit local files
- Re-upload to Netlify (drag & drop again)
- Or connect to GitHub for auto-deploy

## 💡 Pro Tips

1. **Start Simple**
   - Don't try to add everything at once
   - Get basic version live first
   - Iterate and improve

2. **Test Early, Test Often**
   - Check on mobile frequently
   - Test in different browsers
   - Ask friends for feedback

3. **Performance Matters**
   - Keep 3D scenes simple
   - Limit to 5-10 objects
   - Test loading speed

4. **Backup Your Work**
   - Save to GitHub
   - Keep local copy
   - Download from hosting platform

## ✅ Checklist

Before launching:

- [ ] 3D scene added and animating
- [ ] All text customized
- [ ] Colors match your brand
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested in Chrome
- [ ] Tested in Safari/Firefox
- [ ] All links work
- [ ] Social media links updated
- [ ] Deployed successfully
- [ ] Shared with the world!

## 🎯 Time Breakdown

| Task | Time |
|------|------|
| Setup & Preview | 2 min |
| Create 3D Scene | 15 min |
| Customize Content | 5 min |
| Deploy | 6 min |
| Test & Share | 2 min |
| **Total** | **30 min** |

## 🚀 You're Ready!

Everything you need is already set up. Just follow the steps above and you'll have a stunning 3D landing page in 30 minutes or less!

**Questions?** Check the detailed guides or open an issue.

**Good luck and have fun creating!** 🎨✨

---

[← Back to README](README.md) | [Spline Guide →](SPLINE_GUIDE.md)

