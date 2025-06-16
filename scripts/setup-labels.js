
#!/usr/bin/env node

/**
 * Script to set up GitHub issue labels for the Framework Fusion Engine project
 * Run with: node scripts/setup-labels.js
 */

const labels = [
  // Type labels
  { name: 'bug', color: 'd73a4a', description: 'Something isn\'t working' },
  { name: 'enhancement', color: 'a2eeef', description: 'New feature or request' },
  { name: 'documentation', color: '0075ca', description: 'Improvements or additions to documentation' },
  
  // Priority labels
  { name: 'priority: critical', color: 'b60205', description: 'Critical priority issue' },
  { name: 'priority: high', color: 'd93f0b', description: 'High priority issue' },
  { name: 'priority: medium', color: 'fbca04', description: 'Medium priority issue' },
  { name: 'priority: low', color: '0e8a16', description: 'Low priority issue' },
  
  // Framework labels
  { name: 'framework: nist', color: '1d76db', description: 'NIST framework related' },
  { name: 'framework: pci', color: '1d76db', description: 'PCI-DSS framework related' },
  { name: 'framework: hipaa', color: '1d76db', description: 'HIPAA framework related' },
  { name: 'framework: sox', color: '1d76db', description: 'SOX framework related' },
  { name: 'framework: iso27001', color: '1d76db', description: 'ISO 27001 framework related' },
  
  // Component labels
  { name: 'component: ui', color: 'c2e0c6', description: 'User interface related' },
  { name: 'component: api', color: 'c2e0c6', description: 'API related' },
  { name: 'component: controls', color: 'c2e0c6', description: 'Security controls related' },
  { name: 'component: community', color: 'c2e0c6', description: 'Community features related' },
  { name: 'component: mapping', color: 'c2e0c6', description: 'Framework mapping related' },
  
  // Contribution labels
  { name: 'good first issue', color: '7057ff', description: 'Good for newcomers' },
  { name: 'help wanted', color: '008672', description: 'Extra attention is needed' },
  { name: 'control improvement', color: 'f9d0c4', description: 'Improvement to security controls' },
  { name: 'community', color: 'fef2c0', description: 'Community-related issue' },
  
  // Status labels
  { name: 'status: needs review', color: 'd4c5f9', description: 'Needs review from maintainers' },
  { name: 'status: in progress', color: 'ffd8b1', description: 'Currently being worked on' },
  { name: 'status: blocked', color: 'e11d21', description: 'Blocked by external dependency' },
  { name: 'status: wontfix', color: 'ffffff', description: 'This will not be worked on' },
  
  // Special labels
  { name: 'duplicate', color: 'cfd3d7', description: 'This issue or pull request already exists' },
  { name: 'invalid', color: 'e4e669', description: 'This doesn\'t seem right' },
  { name: 'question', color: 'd876e3', description: 'Further information is requested' },
  { name: 'security', color: 'b60205', description: 'Security-related issue' }
];

console.log('GitHub Labels Configuration:');
console.log('Copy this configuration to your GitHub repository labels settings:\n');

labels.forEach(label => {
  console.log(`Name: ${label.name}`);
  console.log(`Color: #${label.color}`);
  console.log(`Description: ${label.description}`);
  console.log('---');
});

console.log('\nYou can also use the GitHub CLI to create these labels:');
console.log('gh label create "label-name" --color "color-hex" --description "description"');
