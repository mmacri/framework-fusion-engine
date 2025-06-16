
function createHeroSection() {
  return `
    <div class="hero">
      <div class="container">
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 2rem;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <h1>Framework Fusion Engine</h1>
        </div>
        
        <div class="badges">
          <span class="badge">🌐 Open Source</span>
          <span class="badge">👥 Community-Driven</span>
          <span class="badge">📚 Wikipedia-Style</span>
        </div>
        
        <p>
          A collaborative platform for managing security controls across multiple compliance frameworks. 
          Join thousands of security professionals building the future of compliance management.
        </p>
        
        <div style="margin: 2rem 0;">
          <a href="./dist/index.html" class="btn btn-primary">
            Launch Full Application
            <svg style="margin-left: 0.5rem;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12,5 19,12 12,19"></polyline>
            </svg>
          </a>
          <a href="#navigation" class="btn btn-secondary">
            Browse Features
          </a>
        </div>
        
        <p style="margin-top: 1rem; font-size: 0.875rem; color: #64748b;">
          No registration required • Free and open source • Community maintained
        </p>
      </div>
    </div>
  `;
}
