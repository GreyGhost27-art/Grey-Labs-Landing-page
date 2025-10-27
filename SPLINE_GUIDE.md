# Spline 3D Scene Creation Guide

This guide will walk you through creating beautiful 3D animated scenes using Spline and integrating them into your landing page.

## What is Spline?

Spline is a free, browser-based 3D design tool that makes it easy to create interactive 3D experiences without coding. It's perfect for beginners and offers powerful features for creating animated 3D scenes.

## Step 1: Create a Spline Account

1. Go to [spline.design](https://spline.design)
2. Click "Get Started" or "Sign Up"
3. Create a free account (no credit card required)
4. You'll be taken to the Spline editor

## Step 2: Create Your First 3D Scene

### Option A: Start from Scratch

1. **Create New Project**
   - Click "New File" in Spline
   - You'll see a 3D viewport with a default camera

2. **Add 3D Objects**
   - Click the "+" button or press `Shift + A`
   - Choose from:
     - Primitives (Cube, Sphere, Cylinder, etc.)
     - Shapes (Torus, Cone, Capsule, etc.)
     - Import your own models

3. **Customize Objects**
   - Select object and use right panel to adjust:
     - Material (color, metalness, roughness)
     - Size and position
     - Rotation

4. **Add Animations**
   - Select object
   - Click "States" at top right
   - Create keyframes to animate properties
   - Adjust timing and easing

5. **Add Lighting**
   - Add lights from the "+" menu
   - Types: Directional, Point, Spot, Ambient
   - Adjust intensity and color

6. **Set Up Camera**
   - Adjust camera position for best view
   - Enable camera controls in export settings

### Option B: Use Spline Templates

1. **Browse Community**
   - Go to [spline.design/community](https://spline.design/community)
   - Browse free templates
   - Click "Duplicate" to copy to your account

2. **Customize Template**
   - Modify colors, materials
   - Adjust animations
   - Add your own elements

## Step 3: Recommended Scene Ideas

### For Landing Pages:

1. **Floating Geometric Shapes**
   - Add 3-5 geometric shapes
   - Apply gradient materials
   - Animate rotation and floating motion
   - Best for: Modern tech websites

2. **Product Showcase**
   - Import product 3D model (or use placeholder)
   - Add rotation animation
   - Interactive: Users can drag to rotate
   - Best for: E-commerce, portfolios

3. **Abstract Space Scene**
   - Create spheres with glow effects
   - Add particle effects
   - Animate camera movement
   - Best for: Creative/artistic sites

4. **Isometric Room/Scene**
   - Create simple room layout
   - Add furniture/objects
   - Subtle animations
   - Best for: Real estate, interior design

## Step 4: Optimize Your Scene

### Performance Tips:

1. **Keep It Simple**
   - Limit to 5-10 objects for web performance
   - Use low-poly models when possible

2. **Optimize Materials**
   - Avoid too many transparent materials
   - Use solid colors or simple gradients

3. **Animation**
   - Keep animations smooth and subtle
   - Avoid too many simultaneous animations

4. **File Size**
   - Keep scene under 5MB for fast loading
   - Remove unused objects/materials

## Step 5: Export for Web

1. **Export Settings**
   - Click the "Export" button (top right)
   - Choose "Export for Web"

2. **Configure Options**
   ```
   ✅ Enable Camera Controls (let users interact)
   ✅ Auto Start (animation starts automatically)
   ✅ Background: Transparent (blends with your page)
   ⚙️ Quality: Medium-High (balance performance/quality)
   ```

3. **Get Embed Code**
   - Click "Get Embed Code"
   - Choose "iframe" option
   - Copy the entire iframe code

## Step 6: Integrate into Your Landing Page

1. **Open `index.html`**

2. **Find the Spline Container**
   ```html
   <div id="spline-container" class="spline-container">
       <!-- Paste your Spline embed code here -->
   </div>
   ```

3. **Replace with Your Code**
   ```html
   <div id="spline-container" class="spline-container">
       <iframe 
           src='https://my.spline.design/untitled-1234567890' 
           frameborder='0' 
           width='100%' 
           height='100%'>
       </iframe>
   </div>
   ```

4. **Save and Test**
   - Open `index.html` in your browser
   - Your 3D scene should appear in the hero section!

## Royalty-Free 3D Asset Sources

If you want to import 3D models into Spline:

### Free 3D Model Libraries:

1. **Poly Pizza** - [poly.pizza](https://poly.pizza)
   - 100% free CC0 models
   - No attribution required
   - Great low-poly assets

2. **Sketchfab** - [sketchfab.com](https://sketchfab.com)
   - Filter by "Downloadable" and "Free"
   - Check license (CC0, CC-BY)
   - High-quality models

3. **Kenney Assets** - [kenney.nl](https://kenney.nl)
   - Free game assets
   - CC0 license
   - Consistent style

4. **Quaternius** - [quaternius.com](https://quaternius.com)
   - Free 3D models
   - CC0 license
   - Low-poly style

### Importing Models to Spline:

1. Download model in GLTF/GLB format
2. In Spline, click "Import"
3. Select your downloaded file
4. Model appears in scene
5. Adjust materials and position

## Troubleshooting

### Scene Not Loading?
- Check browser console for errors
- Ensure Spline URL is correct
- Try refreshing the page

### Performance Issues?
- Reduce number of objects
- Simplify materials
- Lower export quality settings
- Test on different devices

### Scene Too Small/Large?
- Adjust in Spline editor
- Or add CSS to iframe:
  ```css
  #spline-container iframe {
      transform: scale(1.2);
  }
  ```

### Background Not Transparent?
- In Spline export settings
- Set Background to "Transparent"
- Re-export and update embed code

## Advanced Tips

### Interactive Events

You can add Spline events using JavaScript:

```javascript
const spline = document.querySelector('#spline-container iframe');

spline.addEventListener('load', () => {
    console.log('Spline scene loaded!');
});
```

### Responsive Design

The scene automatically scales, but you can adjust mobile behavior:

```css
@media (max-width: 768px) {
    #spline-container {
        height: 60vh; /* Shorter on mobile */
    }
}
```

### Loading States

Show loading indicator while scene loads:

```javascript
const splineIframe = document.querySelector('#spline-container iframe');
const loader = document.querySelector('#loader');

splineIframe.addEventListener('load', () => {
    loader.classList.add('hidden');
});
```

## Example Scenes to Try

### 1. Simple Floating Cube
- Add a cube
- Material: Gradient (purple to blue)
- Animation: Rotate Y-axis, Float up/down
- Time: 5 minutes

### 2. Product Display
- Add cylinder (or import model)
- Material: Metallic
- Animation: Slow rotation
- Add 2-3 point lights
- Time: 10 minutes

### 3. Abstract Composition
- Add 5 spheres of different sizes
- Each with different colors
- Stagger animations
- Add glow effect
- Time: 15 minutes

## Resources

- [Spline Documentation](https://docs.spline.design)
- [Spline YouTube Tutorials](https://youtube.com/@splinedesign)
- [Spline Community](https://spline.design/community)
- [Spline Discord](https://discord.gg/spline)

## Next Steps

Once you've created and integrated your Spline scene:

1. ✅ Test on different browsers
2. ✅ Check mobile responsiveness
3. ✅ Optimize loading time
4. ✅ Move to deployment (see DEPLOYMENT_GUIDE.md)

---

**Need Help?** Check out Spline's video tutorials or browse community examples for inspiration!

