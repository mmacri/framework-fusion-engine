
function createFeaturesSection() {
  return `
    <div class="features" id="features">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; color: #1e293b; margin-bottom: 1rem;">
          Platform Features
        </h2>
        <p style="text-align: center; color: #64748b; font-size: 1.125rem; max-width: 600px; margin: 0 auto;">
          Comprehensive tools for compliance management and security control analysis
        </p>
        
        <div class="features-grid">
          <div class="feature-card">
            <h3>🛡️ 2,400+ Security Controls</h3>
            <p>Comprehensive library covering NIST, PCI-DSS, HIPAA, SOX, and ISO 27001 frameworks</p>
          </div>
          
          <div class="feature-card">
            <h3>👥 Community-Driven</h3>
            <p>Wikipedia-style collaborative editing with expert reviews and community voting</p>
          </div>
          
          <div class="feature-card">
            <h3>🔍 Gap Analysis</h3>
            <p>Identify coverage gaps and optimization opportunities in your compliance program</p>
          </div>
          
          <div class="feature-card">
            <h3>📄 Framework Mapping</h3>
            <p>Visualize relationships and mappings between different compliance frameworks</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
