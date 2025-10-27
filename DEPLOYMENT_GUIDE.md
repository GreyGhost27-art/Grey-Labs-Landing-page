# Deployment Guide - Free Hosting Options

This guide covers three free hosting platforms to deploy your 3D landing page. All options provide HTTPS, custom domains, and excellent performance.

---

## Option 1: Netlify (Recommended for Beginners)

**Why Netlify?**
- Easiest drag-and-drop deployment
- Automatic HTTPS
- Instant preview URLs
- Built-in form handling
- Generous free tier

### Step-by-Step Deployment:

#### Method A: Drag and Drop (Fastest)

1. **Prepare Your Files**
   - Ensure all files are in the `Website` folder:
     ```
     Website/
     ├── index.html
     ├── css/
     │   └── style.css
     ├── js/
     │   └── main.js
     └── assets/ (if you have any)
     ```

2. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign up for free (use GitHub, GitLab, or Email)

3. **Deploy**
   - Look for "Want to deploy a new site without connecting to Git?"
   - Drag your entire `Website` folder into the drop zone
   - Wait 10-30 seconds

4. **Your Site is Live!**
   - You'll get a URL like: `random-name-123.netlify.app`
   - Click to view your site

5. **Customize Domain (Optional)**
   - Click "Domain settings"
   - Click "Options" → "Edit site name"
   - Change to: `your-cool-name.netlify.app`

#### Method B: Git-Based Deployment (Recommended for Updates)

1. **Create Git Repository**
   ```bash
   cd /Users/grey/Desktop/Projects/Website
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   - Create new repository on [github.com](https://github.com)
   - Follow GitHub's instructions to push your code

3. **Connect to Netlify**
   - In Netlify, click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository
   - Build settings (leave default):
     - Build command: (leave empty)
     - Publish directory: `.` or `/`
   - Click "Deploy site"

4. **Auto-Deploy on Push**
   - Now every time you push to GitHub, Netlify auto-deploys!
   ```bash
   git add .
   git commit -m "Updated scene"
   git push
   ```

### Netlify Tips:

- **Custom Domain**: Domain settings → Add custom domain
- **HTTPS**: Automatic and free
- **Analytics**: Enable in site settings
- **Forms**: Add `netlify` attribute to forms

---

## Option 2: Vercel (Best Performance)

**Why Vercel?**
- Blazing fast CDN
- Excellent for modern web apps
- Instant deployments
- Great analytics

### Deployment Steps:

1. **Sign Up**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Install Vercel CLI (Optional)**
   ```bash
   npm install -g vercel
   ```

3. **Deploy via CLI**
   ```bash
   cd /Users/grey/Desktop/Projects/Website
   vercel
   ```
   - Follow prompts
   - Your site deploys in seconds!

4. **Or Deploy via GitHub**
   - Click "Add New Project"
   - Import your GitHub repository
   - Click Deploy

5. **Get URL**
   - Vercel provides: `your-project.vercel.app`
   - Add custom domain in project settings

### Vercel Configuration (Optional)

Create `vercel.json` in your Website folder:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## Option 3: GitHub Pages (Free with GitHub)

**Why GitHub Pages?**
- Free with GitHub account
- Simple setup
- Great for static sites
- Direct from repository

### Deployment Steps:

1. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it: `your-username.github.io` (for personal site)
   - Or any name for project site

2. **Push Your Code**
   ```bash
   cd /Users/grey/Desktop/Projects/Website
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository settings
   - Scroll to "Pages" section
   - Source: Deploy from branch
   - Branch: `main`, folder: `/ (root)`
   - Click Save

4. **Access Your Site**
   - Personal site: `https://your-username.github.io`
   - Project site: `https://your-username.github.io/repo-name`
   - Takes 1-2 minutes to deploy

### GitHub Pages Tips:

- **Custom Domain**: Add `CNAME` file with your domain
- **HTTPS**: Automatic for `.github.io` domains
- **Update Site**: Just push to GitHub
  ```bash
  git add .
  git commit -m "Update"
  git push
  ```

---

## Comparison Table

| Feature | Netlify | Vercel | GitHub Pages |
|---------|---------|--------|--------------|
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Speed** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Free Tier** | Generous | Generous | Unlimited |
| **Custom Domain** | ✅ Free | ✅ Free | ✅ Free |
| **HTTPS** | ✅ Auto | ✅ Auto | ✅ Auto |
| **Build Time** | Fast | Fastest | Medium |
| **Analytics** | ✅ Paid | ✅ Free | ❌ |
| **Forms** | ✅ Built-in | ❌ | ❌ |
| **Best For** | Beginners | Performance | GitHub users |

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly
- [ ] 3D scene appears and animates
- [ ] Navigation works on all pages
- [ ] Mobile responsive
- [ ] All links work
- [ ] HTTPS is enabled
- [ ] Custom domain (if configured)

---

## Testing Your Deployed Site

### Performance Testing

1. **Google PageSpeed Insights**
   - Go to [pagespeed.web.dev](https://pagespeed.web.dev)
   - Enter your URL
   - Check performance scores

2. **Lighthouse (Built into Chrome)**
   - Open site in Chrome
   - Right-click → Inspect
   - Go to "Lighthouse" tab
   - Run audit

### Cross-Browser Testing

Test on:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Mobile Testing

- Use Chrome DevTools device emulator
- Test on actual mobile devices
- Check touch interactions
- Verify 3D scene performance

---

## Updating Your Site

### Netlify
```bash
# Drag-and-drop: Just re-upload folder
# Git: Push changes to GitHub
git add .
git commit -m "Updates"
git push
```

### Vercel
```bash
# CLI
vercel --prod

# Or push to GitHub (auto-deploys)
git push
```

### GitHub Pages
```bash
git add .
git commit -m "Updates"
git push
```

---

## Custom Domain Setup (All Platforms)

### 1. Purchase Domain
- [Namecheap](https://namecheap.com)
- [Google Domains](https://domains.google)
- [Cloudflare](https://cloudflare.com)

### 2. Configure DNS

**For Netlify:**
- Netlify DNS Settings → Add custom domain
- Update your domain's nameservers to Netlify's
- HTTPS automatically configured

**For Vercel:**
- Project Settings → Domains
- Add your domain
- Update DNS records as shown
- HTTPS automatically configured

**For GitHub Pages:**
- Add `CNAME` file to repository with your domain
- In domain provider, add CNAME record:
  ```
  Type: CNAME
  Name: www
  Value: your-username.github.io
  ```

### 3. Enable HTTPS
- All platforms provide free SSL
- Usually automatic
- May take 24-48 hours to propagate

---

## Troubleshooting

### Site Not Loading?
- Check build logs in hosting platform
- Verify file paths are correct
- Ensure `index.html` is in root

### 3D Scene Not Appearing?
- Check Spline embed URL is correct
- Verify internet connection (Spline loads from CDN)
- Check browser console for errors

### Slow Loading?
- Optimize Spline scene
- Compress images (if any)
- Enable CDN (automatic on all platforms)

### Custom Domain Not Working?
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct
- Check nameserver configuration

---

## Advanced: Environment Variables (Optional)

If you need API keys or configuration:

**Netlify:**
- Site settings → Environment variables
- Add variables
- Access in JavaScript: `process.env.VAR_NAME`

**Vercel:**
- Project Settings → Environment Variables
- Add variables
- Access in JavaScript: `process.env.VAR_NAME`

---

## Cost Expectations

All free tiers are generous:

| Platform | Free Tier Limits |
|----------|-----------------|
| **Netlify** | 100GB bandwidth/month, 300 build minutes |
| **Vercel** | 100GB bandwidth/month, Unlimited projects |
| **GitHub Pages** | 100GB bandwidth/month, 10 builds/hour |

For a landing page, you'll likely never exceed free limits!

---

## Next Steps

After deployment:

1. ✅ Share your site URL
2. ✅ Set up custom domain (optional)
3. ✅ Add to portfolio
4. ✅ Integrate with WordPress (see WORDPRESS_INTEGRATION.md)
5. ✅ Monitor analytics

---

**Congratulations!** Your 3D landing page is now live and accessible worldwide! 🎉

