
function createNavigationSection() {
  return `
    <div class="navigation" id="navigation">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; color: #1e293b; margin-bottom: 1rem;">
          Quick Access to Platform Features
        </h2>
        <p style="text-align: center; color: #64748b; font-size: 1.125rem; max-width: 600px; margin: 0 auto;">
          Jump directly to any section of the Framework Fusion platform
        </p>
        
        <div class="nav-grid">
          <div class="nav-section">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              Core Platform
            </h3>
            <div class="nav-links">
              <a href="./dist/index.html" class="btn btn-nav">Dashboard Overview</a>
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'controls')">Security Controls Library</a>
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'mapping')">Framework Mapping</a>
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'gaps')">Gap Analysis</a>
            </div>
          </div>

          <div class="nav-section">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="m22 21-3-3m0 0L16 21"/>
              </svg>
              Community
            </h3>
            <div class="nav-links">
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'community')">Community Dashboard</a>
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'community-edits')">Propose Edits</a>
            </div>
          </div>

          <div class="nav-section">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
              Resources
            </h3>
            <div class="nav-links">
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'use-cases')">Use Cases Library</a>
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'reports')">Reports & Export</a>
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'guide')">User Guide</a>
            </div>
          </div>

          <div class="nav-section">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Frameworks
            </h3>
            <div class="nav-links">
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'controls'); localStorage.setItem('ffFramework', 'nist')">NIST Cybersecurity</a>
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'controls'); localStorage.setItem('ffFramework', 'pci')">PCI-DSS</a>
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'controls'); localStorage.setItem('ffFramework', 'hipaa')">HIPAA</a>
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'controls'); localStorage.setItem('ffFramework', 'sox')">SOX</a>
              <a href="./dist/index.html" class="btn btn-nav" onclick="localStorage.setItem('ffView', 'controls'); localStorage.setItem('ffFramework', 'iso27001')">ISO 27001</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
