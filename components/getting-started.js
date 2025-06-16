
function createGettingStartedSection() {
  return `
    <div style="padding: 4rem 0; background: white;">
      <div class="container">
        <h2 style="text-align: center; font-size: 2rem; font-weight: 700; color: #1e293b; margin-bottom: 2rem;">
          Get Started in Minutes
        </h2>
        <p style="text-align: center; color: #64748b; margin-bottom: 3rem;">
          Follow these simple steps to begin using the platform
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
          <div>
            <div style="width: 3rem; height: 3rem; background: #2563eb; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 1rem;">1</div>
            <h4 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">Browse Controls</h4>
            <p style="color: #64748b; font-size: 0.875rem;">Explore our control library</p>
          </div>
          
          <div>
            <div style="width: 3rem; height: 3rem; background: #2563eb; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 1rem;">2</div>
            <h4 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">View Mappings</h4>
            <p style="color: #64748b; font-size: 0.875rem;">See framework relationships</p>
          </div>
          
          <div>
            <div style="width: 3rem; height: 3rem; background: #2563eb; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 1rem;">3</div>
            <h4 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">Analyze Gaps</h4>
            <p style="color: #64748b; font-size: 0.875rem;">Identify coverage gaps</p>
          </div>
          
          <div>
            <div style="width: 3rem; height: 3rem; background: #2563eb; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 1rem;">4</div>
            <h4 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">Contribute</h4>
            <p style="color: #64748b; font-size: 0.875rem;">Join the community</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 3rem;">
          <a href="./dist/index.html" class="btn btn-primary" style="font-size: 1.125rem; padding: 1rem 2.5rem;">
            Start Using Framework Fusion
            <svg style="margin-left: 0.5rem;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12,5 19,12 12,19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;
}
