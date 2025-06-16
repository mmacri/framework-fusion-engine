
function createFooterSection() {
  return `
    <div class="footer">
      <div class="container">
        <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
            </svg>
            <span style="font-size: 0.875rem;">Star us on GitHub</span>
          </div>
          <span style="color: #64748b;">•</span>
          <span style="font-size: 0.875rem;">Join our community discussions</span>
          <span style="color: #64748b;">•</span>
          <span style="font-size: 0.875rem;">Contribute to the project</span>
        </div>
        <p style="color: #94a3b8; font-size: 0.875rem;">
          © 2024 Framework Fusion Engine. Open source project licensed under MIT.
        </p>
      </div>
    </div>
  `;
}
