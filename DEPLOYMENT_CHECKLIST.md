# Bakestro Website - Deployment Checklist

Use this checklist to ensure everything is properly configured before deploying to production.

---

## Pre-Deployment Phase

### Code Review
- [ ] All code changes reviewed and tested
- [ ] No console errors or warnings
- [ ] All TODOs and FIXMEs resolved
- [ ] Commented out code removed
- [ ] Linting errors fixed
- [ ] Code follows project conventions

### Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API endpoints tested manually
- [ ] Frontend functionality tested
- [ ] Admin dashboard tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked
- [ ] Performance tested (load time acceptable)

### Security Review
- [ ] No API keys/secrets in code
- [ ] All sensitive data in environment variables
- [ ] Input validation implemented
- [ ] Authentication working correctly
- [ ] Authorization checks in place
- [ ] CORS configured properly
- [ ] No SQL injection vulnerabilities
- [ ] Passwords hashed securely

---

## Backend Deployment Checklist

### Environment Configuration
- [ ] .env file created with production values
- [ ] MongoDB connection string set
- [ ] JWT_SECRET configured (strong random string)
- [ ] PORT set correctly
- [ ] NODE_ENV set to 'production'
- [ ] API_URL set for frontend
- [ ] CORS origins configured

### Database
- [ ] MongoDB is running and accessible
- [ ] Database backups configured
- [ ] Indexes created on frequently queried fields
- [ ] Initial data seeded if needed
- [ ] Connection string tested

### Dependencies
- [ ] All dependencies installed: `npm install`
- [ ] Package.json verified for production dependencies
- [ ] Unnecessary dev dependencies removed
- [ ] Node version compatible with dependencies

### Server Configuration
- [ ] Error logging configured
- [ ] Request logging configured (Morgan or similar)
- [ ] Rate limiting implemented if needed
- [ ] Health check endpoint available
- [ ] Graceful shutdown handling

### Database Models
- [ ] Product model with pricingUnit field: ✓
- [ ] Deal model created: ✓
- [ ] Announcement model created: ✓
- [ ] All relationships defined correctly
- [ ] Indexes created

### API Controllers
- [ ] Product controller updated: ✓
- [ ] Deal controller created: ✓
- [ ] Announcement controller created: ✓
- [ ] Error handling in all endpoints
- [ ] Input validation on all endpoints
- [ ] Response format consistent

### API Routes
- [ ] Product routes updated: ✓
- [ ] Deal routes created: ✓
- [ ] Announcement routes created: ✓
- [ ] Authentication middleware applied
- [ ] Admin middleware applied where needed
- [ ] Routes registered in server.js: ✓

### Testing
- [ ] GET /api/products works
- [ ] POST /api/products works (admin)
- [ ] PUT /api/products/:id works (admin)
- [ ] DELETE /api/products/:id works (admin)
- [ ] GET /api/deals works
- [ ] POST /api/deals works (admin)
- [ ] GET /api/announcements works
- [ ] POST /api/announcements works (admin)

---

## Frontend Deployment Checklist

### Build Configuration
- [ ] Vite config verified
- [ ] Build output directory correct
- [ ] Build process completes without errors
- [ ] Build size acceptable
- [ ] Source maps for debugging

### Environment Configuration
- [ ] API_URL points to backend in production
- [ ] All environment variables set
- [ ] No hardcoded URLs
- [ ] .env file not committed to repo

### Component Implementation
- [ ] AnnouncementBar component: ✓
- [ ] DealsSection component: ✓
- [ ] WhyChooseUs component: ✓
- [ ] Testimonials component: ✓
- [ ] Newsletter component: ✓
- [ ] Products admin page: ✓
- [ ] Deals admin page: ✓

### Home Page Integration
- [ ] All new components integrated
- [ ] Components load correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Images load properly
- [ ] No broken links

### Admin Pages
- [ ] Products page functional
- [ ] Deals page functional
- [ ] Forms submit correctly
- [ ] CRUD operations working
- [ ] Validation messages display

### API Service
- [ ] API methods defined: ✓
- [ ] Axios interceptors configured
- [ ] Error handling implemented
- [ ] Auth token management working

### Assets
- [ ] All images optimized
- [ ] Image paths correct
- [ ] Fonts loading properly
- [ ] CSS files included
- [ ] No missing resources

### Performance
- [ ] Lighthouse score acceptable
- [ ] Image lazy loading working
- [ ] Code splitting implemented
- [ ] Minification enabled
- [ ] Gzip compression enabled

### Testing
- [ ] Homepage loads and displays correctly
- [ ] All components render
- [ ] Navigation works
- [ ] Admin pages require authentication
- [ ] Forms work and submit data
- [ ] Mobile layout correct
- [ ] No console errors

---

## Deployment Steps

### Backend Deployment (Heroku/Railway/Custom)

1. [ ] Choose hosting provider
2. [ ] Create production database (MongoDB Atlas or similar)
3. [ ] Set environment variables on hosting platform
4. [ ] Deploy backend code
5. [ ] Run migrations if needed
6. [ ] Test all API endpoints
7. [ ] Monitor logs for errors
8. [ ] Set up automated backups

```bash
# Commands for deployment
npm install
npm start
```

### Frontend Deployment (Vercel/Netlify/AWS)

1. [ ] Build frontend: `npm run build`
2. [ ] Choose hosting provider
3. [ ] Configure build settings
4. [ ] Set environment variables
5. [ ] Deploy to hosting platform
6. [ ] Configure custom domain if needed
7. [ ] Set up SSL/TLS
8. [ ] Test deployed application
9. [ ] Set up CDN if needed

```bash
# Commands for deployment
npm run build
# Deploy dist/ folder to hosting
```

---

## Post-Deployment Phase

### Verification
- [ ] Website loads without errors
- [ ] All pages accessible
- [ ] Images display correctly
- [ ] API endpoints responding
- [ ] Admin login works
- [ ] Product management functional
- [ ] Deal management functional
- [ ] Newsletter subscription working
- [ ] Mobile responsive
- [ ] Performance acceptable

### Monitoring
- [ ] Error logging active
- [ ] Uptime monitoring enabled
- [ ] Performance monitoring enabled
- [ ] Database monitoring enabled
- [ ] Alerts configured
- [ ] Backup verification

### Security
- [ ] SSL/TLS certificate installed
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting active
- [ ] WAF/DDoS protection enabled
- [ ] Security headers set
- [ ] SQL injection protection
- [ ] XSS protection

### Analytics
- [ ] Google Analytics/Tracking set up
- [ ] Event tracking configured
- [ ] User behavior tracking enabled
- [ ] Conversion tracking set up
- [ ] Performance metrics tracking

### Maintenance
- [ ] Backup schedule confirmed
- [ ] Update schedule defined
- [ ] Monitoring dashboard accessible
- [ ] Team has access
- [ ] Documentation updated
- [ ] Deployment guide documented

---

## Rollback Plan

### If Deployment Fails
1. [ ] Keep previous version deployed
2. [ ] Identify issue from logs
3. [ ] Fix issue locally
4. [ ] Test fix thoroughly
5. [ ] Redeploy fixed version
6. [ ] Verify fix in production
7. [ ] Communicate with team

### Backup Strategy
- [ ] Daily database backups
- [ ] Weekly full backups
- [ ] Code repository backed up (Git)
- [ ] Test restore process monthly
- [ ] Store backups in multiple locations

---

## Monitoring & Maintenance

### Daily Tasks
- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Check API response times
- [ ] Review user feedback

### Weekly Tasks
- [ ] Review analytics
- [ ] Check performance metrics
- [ ] Update dependencies if needed
- [ ] Review security logs

### Monthly Tasks
- [ ] Full system audit
- [ ] Database optimization
- [ ] Performance tuning
- [ ] Security audit
- [ ] Backup verification

---

## Known Issues & Workarounds

### Issue: API not connecting
**Solution:** Verify API_URL in frontend config and CORS on backend

### Issue: Database connection error
**Solution:** Check MongoDB connection string and ensure service is running

### Issue: Admin pages not loading
**Solution:** Verify authentication token and admin role

### Issue: Images not displaying
**Solution:** Check image URLs and file existence on server

---

## Contact & Support

**For Deployment Issues:**
- Check server logs: `docker logs service-name`
- Check frontend logs: Browser DevTools Console
- Review documentation: [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- Check API: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

**Emergency Contacts:**
- DevOps Lead: [Contact]
- Backend Developer: [Contact]
- Frontend Developer: [Contact]

---

## Sign-Off

- [ ] Tech Lead: _________________ Date: _______
- [ ] DevOps: _________________ Date: _______
- [ ] QA: _________________ Date: _______
- [ ] Project Manager: _________________ Date: _______

---

**Last Updated:** April 2026
**Version:** 1.0.0
**Status:** Ready for Deployment

---

Use this checklist for every deployment to ensure consistent quality and reliability.
