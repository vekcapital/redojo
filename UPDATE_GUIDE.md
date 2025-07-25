# ReDojo.ai Live Update Guide

## 🚀 How to Update Your Live Site

### Quick Updates (5 minutes):
1. Make changes in this environment
2. Run `npm run build` 
3. Download the new `dist` folder
4. Drag to Netlify (or your hosting provider)
5. Live in 30 seconds!

### Common Updates You Might Want:

#### Change Pricing:
- Edit `src/components/Pricing.tsx`
- Update the `$497` amount
- Rebuild and redeploy

#### Update Copy/Text:
- Hero section: `src/components/Hero.tsx`
- Features: `src/components/Features.tsx`
- Testimonials: `src/components/Testimonials.tsx`

#### Add New Features:
- Create new component files
- Import into `src/App.tsx`
- Test locally, then deploy

#### Stripe Settings:
- Update environment variables in hosting dashboard
- No code changes needed

### Emergency Fixes:
- Fix bugs here
- Rebuild immediately
- Deploy within minutes

## 🎯 Pro Tips:
- Test changes locally first
- Keep backup of working version
- Update one section at a time

## 📱 Mobile-First Testing:
Always test on mobile after changes:
- Chrome DevTools (F12 → Mobile view)
- Real phone testing
- Different screen sizes

## 🔧 Quick Fix Examples:

### Change Hero Headline:
```jsx
// In src/components/Hero.tsx
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
  Your New Headline Here
</h1>
```

### Update Pricing:
```jsx
// In src/components/Pricing.tsx
<span className="text-5xl font-bold text-gray-900">$297</span>
```

### Add New Testimonial:
```jsx
// In src/components/Testimonials.tsx - add to testimonials array
{
  name: "Your Customer",
  company: "Their Company", 
  role: "Their Role",
  image: "https://images.pexels.com/...",
  rating: 5,
  text: "Amazing results with ReDojo!"
}
```

## 🚨 Emergency Rollback:
If something breaks:
1. Revert changes here
2. Rebuild quickly
3. Redeploy fixed version
4. Back online in minutes