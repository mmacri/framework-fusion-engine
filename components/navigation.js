
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
              <a href="./dist/index.html#overview" class="btn btn-nav">Dashboard Overview</a>
              <a href="./dist/index.html#controls" class="btn btn-nav">Security Controls Library</a>
              <a href="./dist/index.html#mapping" class="btn btn-nav">Framework Mapping</a>
              <a href="./dist/index.html#gaps" class="btn btn-nav">Gap Analysis</a>
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
              <a href="./dist/index.html#community" class="btn btn-nav">Community Dashboard</a>
              <a href="./dist/index.html#community-edits" class="btn btn-nav">Propose Edits</a>
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
              <a href="./dist/index.html#use-cases" class="btn btn-nav">Use Cases Library</a>
              <a href="./dist/index.html#reports" class="btn btn-nav">Reports & Export</a>
              <a href="./dist/index.html#guide" class="btn btn-nav">User Guide</a>
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
              <a href="./dist/index.html#controls?framework=nist" class="btn btn-nav">NIST Cybersecurity</a>
              <a href="./dist/index.html#controls?framework=pci" class="btn btn-nav">PCI-DSS</a>
              <a href="./dist/index.html#controls?framework=hipaa" class="btn btn-nav">HIPAA</a>
              <a href="./dist/index.html#controls?framework=sox" class="btn btn-nav">SOX</a>
              <a href="./dist/index.html#controls?framework=iso27001" class="btn btn-nav">ISO 27001</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
