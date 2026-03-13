# DP Studio - Manual QA Checklist
## Desktop & Mobile Testing

---

## DESKTOP QA (Chrome, Firefox, Edge)

### UI/UX Testing
- [ ] **Homepage**
  - [ ] Hero section displays properly with background image
  - [ ] Main H1 "DP Studio" is visible and centered
  - [ ] Call-to-action button "View Portfolio" is clickable
  - [ ] Services preview shows 3 cards with images
  - [ ] Portfolio preview shows 6 images in grid
  - [ ] Testimonials section displays correctly
  - [ ] All images load without broken image icons

- [ ] **Navigation Bar**
  - [ ] Logo clickable and links to home
  - [ ] All nav links present: Home, About, Services, Portfolio, Contact
  - [ ] Admin/Dashboard links visible when logged in
  - [ ] Logout button appears for authenticated users
  - [ ] Navbar sticky/fixed at top while scrolling

- [ ] **About Page**
  - [ ] Hero section with title loads
  - [ ] Studio image loads and displays
  - [ ] Stats (500+ Events, 10+ Years, 1000+ Clients) readable
  - [ ] Equipment sections (Cameras, Lenses, Lighting, Accessories) all visible
  - [ ] Team member images load
  - [ ] All team member info displays correctly

- [ ] **Services Page**
  - [ ] Hero section displays
  - [ ] Service cards load with images (5 cards)
  - [ ] Each card shows: title, description, image
  - [ ] "Learn More" button present on each card
  - [ ] Cards responsive and well-spaced

- [ ] **Portfolio Page**
  - [ ] Category filter buttons appear (All, Wedding, Events, Baby, Outdoor, PreWedding)
  - [ ] All images load in gallery grid
  - [ ] Clicking image opens lightbox
  - [ ] Lightbox shows large image with title and category
  - [ ] Close button (×) works in lightbox
  - [ ] Category filters work and display correct images
  - [ ] 9+ images display in grid (or fallback images show)

- [ ] **Contact Page**
  - [ ] Hero section loads
  - [ ] Contact form visible with fields: Name, Email, Phone, Message
  - [ ] Contact info section on right shows address, phone, email
  - [ ] Form placeholder text readable
  - [ ] Submit button clickable

- [ ] **Footer**
  - [ ] Logo and description present
  - [ ] Quick Links section with Home, About, Services, Portfolio
  - [ ] Services section lists photography types
  - [ ] Contact info section with email and phone
  - [ ] Copyright year correct
  - [ ] All footer links clickable

### Functional Testing
- [ ] **Contact Form**
  - [ ] Can type in all fields without errors
  - [ ] Submit button works
  - [ ] Form shows "Sending..." during submission
  - [ ] Success message appears after submission
  - [ ] Form clears after successful submission
  - [ ] Email validation works (rejects invalid email)
  - [ ] Phone validation works (requires 10+ digits)
  - [ ] Required fields show error if left empty

- [ ] **Authentication**
  - [ ] Register link on navbar when not logged in
  - [ ] Registration page loads
  - [ ] Can create new account (name, email, password)
  - [ ] Cannot register with existing email
  - [ ] Password confirmation match validation works
  - [ ] After registration, automatically logged in
  - [ ] Dashboard accessible after login
  - [ ] Admin users can access admin panel
  - [ ] Logout clears session and shows login

- [ ] **Dashboard/Admin**
  - [ ] Admin panel loads (if logged in as admin)
  - [ ] Can view contact messages
  - [ ] Can view portfolio images
  - [ ] Can view services
  - [ ] Can add new service
  - [ ] Can delete service
  - [ ] Can upload new portfolio image
  - [ ] Can delete portfolio image

### Error Handling
- [ ] **Invalid Routes**
  - [ ] Visiting `/invalid-route` shows 404 page
  - [ ] 404 page has "Back to Home" button
  - [ ] Button navigates back to home
  - [ ] 404 page is properly styled

- [ ] **Network Errors**
  - [ ] If API fails, graceful error message shows
  - [ ] Default fallback images display if API down
  - [ ] Contact form shows error if submission fails
  - [ ] Console shows meaningful error messages

- [ ] **Loading States**
  - [ ] Home page shows skeleton loaders while loading
  - [ ] Services page shows skeleton while loading
  - [ ] Portfolio page shows skeleton while filtering
  - [ ] Skeleton animations smooth and visible

### Performance Testing
- [ ] **Page Load Speed**
  - [ ] Homepage loads in < 3 seconds
  - [ ] Gallery page loads in < 3 seconds
  - [ ] No obvious lag when scrolling
  - [ ] Images lazy load (don't all load at once)

- [ ] **Bundle Size** (Check Chrome DevTools > Network)
  - [ ] Total bundle < 300kB
  - [ ] Gzipped < 100kB
  - [ ] CSS < 30kB
  - [ ] JavaScript < 260kB

- [ ] **Memory Usage**
  - [ ] No memory leaks when navigating between pages
  - [ ] Image lightbox doesn't cause lag
  - [ ] Filter actions smooth

### Accessibility Testing
- [ ] **Keyboard Navigation**
  - [ ] Can tab through all links and buttons
  - [ ] Tab order is logical (top to bottom, left to right)
  - [ ] Can submit forms with Enter key
  - [ ] Can close lightbox with Escape key
  - [ ] Focus indicators visible (outline around focused element)

- [ ] **Screen Reader (Use NVDA or JAWS)**
  - [ ] Page titles announced correctly
  - [ ] H1 headings on each page
  - [ ] Form labels associated with inputs
  - [ ] Images have meaningful alt text
  - [ ] Links have descriptive text (not "click here")
  - [ ] Buttons have labels

- [ ] **Color & Contrast**
  - [ ] All text has sufficient contrast (WCAG AA minimum)
  - [ ] Color not the only indicator (icons, patterns used)
  - [ ] Links distinguishable from regular text

### Browser Compatibility
- [ ] **Chrome** (Latest)
  - [ ] All features work
  - [ ] No console errors
  
- [ ] **Firefox** (Latest)
  - [ ] All features work
  - [ ] No console errors
  
- [ ] **Safari** (Latest if on Mac)
  - [ ] All features work
  - [ ] No console errors
  
- [ ] **Edge** (Latest)
  - [ ] All features work
  - [ ] No console errors

### SEO Testing
- [ ] **Meta Tags** (Right-click > View Page Source)
  - [ ] `<title>` tag present and descriptive
  - [ ] `description` meta tag present
  - [ ] `og:image`, `og:title`, `og:description` present
  - [ ] favicon loads (browser tab icon)
  - [ ] `canonical` link present

- [ ] **Structured Data**
  - [ ] robots.txt loads (visit /robots.txt)
  - [ ] sitemap.xml loads (visit /sitemap.xml)
  - [ ] Sitemap has all main pages

---

## MOBILE QA (iOS Safari, Android Chrome)
### Device: iPhone 12/13 and Android Phone (375px width)

### Responsive Layout
- [ ] **Homepage**
  - [ ] Hero section mobile-friendly
  - [ ] Text readable without horizontal scroll
  - [ ] Service cards stack vertically (1 column)
  - [ ] Portfolio grid shows 1-2 columns
  - [ ] All images scale properly
  - [ ] Buttons large enough to tap (48px minimum)

- [ ] **Navigation** (Mobile Menu)
  - [ ] Hamburger menu visible on mobile
  - [ ] Menu expands/collapses properly
  - [ ] All nav items visible when expanded
  - [ ] Menu closes when link clicked

- [ ] **Forms**
  - [ ] Input fields large enough for touch
  - [ ] Form labels visible
  - [ ] Phone keyboard (numpad) appears for phone field
  - [ ] Email keyboard appears for email field
  - [ ] Form submission button large and easy to tap

- [ ] **Images**
  - [ ] No horizontal scrolling needed
  - [ ] Images scale to container width
  - [ ] Lightbox image viewable on small screen
  - [ ] Lightbox close button easily tappable

### Touch Interactions
- [ ] **Buttons & Links**
  - [ ] All buttons tappable (48px min height)
  - [ ] No double-tap zoom needed
  - [ ] Touch feedback visible (highlight/change color)
  - [ ] Fast response time (no lag)

- [ ] **Scrolling**
  - [ ] Smooth scrolling
  - [ ] No content jumps
  - [ ] Lazy loading images as you scroll portfolio

- [ ] **Lightbox**
  - [ ] Pinch-to-zoom works
  - [ ] Close button tappable
  - [ ] Swipe to next/previous image works

- [ ] **Forms**
  - [ ] Can tap all input fields
  - [ ] Keyboard covers < 50% of form
  - [ ] Submit button accessible below keyboard

### Mobile-Specific Issues
- [ ] **Viewport**
  - [ ] Viewport meta tag set correctly
  - [ ] No fixed widths breaking layout
  - [ ] Safe area respected (notch/status bar)

- [ ] **Performance**
  - [ ] Page loads in < 4 seconds on 4G
  - [ ] Scrolling smooth (60 FPS)
  - [ ] No layout shift when images load

- [ ] **Battery/Data**
  - [ ] Images lazy-load (don't load all at once)
  - [ ] No auto-playing videos consuming bandwidth
  - [ ] Minimal animations for battery life

### Orientation Testing
- [ ] **Portrait Mode**
  - [ ] Layout adapts correctly
  - [ ] Images display properly
  - [ ] Form is usable

- [ ] **Landscape Mode**
  - [ ] Layout adapts correctly
  - [ ] Images display properly
  - [ ] Navigation works (menu might be full-width)

---

## SECURITY CHECKLIST

### Network Security
- [ ] **HTTPS**
  - [ ] All pages load over HTTPS (padlock icon)
  - [ ] No mixed content warnings (HTTP resources)

- [ ] **Security Headers** (Chrome DevTools > Network > Response Headers)
  - [ ] `Strict-Transport-Security` header present
  - [ ] `X-Frame-Options` header present
  - [ ] `X-Content-Type-Options` header present
  - [ ] `X-XSS-Protection` header present

- [ ] **CORS**
  - [ ] API requests work from frontend domain
  - [ ] No CORS errors in console

### Data Security
- [ ] **Authentication**
  - [ ] Passwords hashed (not visible in network requests)
  - [ ] JWT token in Bearer header (not in URL)
  - [ ] Session expires after inactivity
  - [ ] Cannot access protected pages without login

- [ ] **Form Submission**
  - [ ] Submitted data goes to API (not stored in localStorage unencrypted)
  - [ ] Contact form data saved to database
  - [ ] No sensitive info in URL parameters

### Input Validation
- [ ] **Client-Side**
  - [ ] Email field validates email format
  - [ ] Phone field validates minimum length
  - [ ] Required fields show error if empty
  - [ ] Error messages are helpful

- [ ] **Server-Side** (Check network tab)
  - [ ] Form validation errors from server show to user
  - [ ] Can't bypass validation with invalid data

---

## CROSS-PAGE TESTING

### Navigation Flow
- [ ] Home → About (back to Home works)
- [ ] Home → Services (View All Services button works)
- [ ] Home → Portfolio (View Full Portfolio button works)
- [ ] Services → Portfolio → Contact → Home (all links work)
- [ ] Portfolio → Lightbox → Click outside to close
- [ ] Contact → Submit → Success message → Form clears

### State Preservation
- [ ] Portfolio filter selection maintained when navigating away and back
- [ ] Login state maintained across page navigation
- [ ] Cart/preferences maintained (if applicable)

### Error Recovery
- [ ] Navigate to invalid page → 404 → Back to Home works
- [ ] API fails → Fallback data shows
- [ ] Stop network request → Can retry
- [ ] Form fails → Error message + can resubmit

---

## PRODUCTION VERIFICATION

### Live Deployment Tests
- [ ] Render services both running (Status: "Live")
- [ ] No Render build errors in deploy history
- [ ] Frontend URL resolves correctly
- [ ] Backend API responds at `/api/health`
- [ ] Environment variables loaded (correct API URL)
- [ ] Database seeded (can login with demo credentials)
- [ ] Images from Cloudinary load properly
- [ ] Email notifications work (test contact form)

### Traffic Simulation
- [ ] Fast connection: All pages load smoothly
- [ ] Slow 3G: Resources still load, spinner shows
- [ ] Offline: Error message shows gracefully
- [ ] Multiple users: No conflicts or data corruption

---

## SIGN-OFF

**QA Tester**: ________________
**Date**: ________________
**Device(s) Tested**: ________________
**Browsers Tested**: ________________

**Overall Status**:
- [ ] ✅ All tests PASSED - Ready for Production
- [ ] ⚠️ Some issues found - Review issues below
- [ ] ❌ Critical issues - Do NOT deploy

**Issues Found** (if any):
1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

**Notes**:
___________________________________________
___________________________________________

---

**Great work ensuring quality! Your thorough testing helps maintain production excellence.**
