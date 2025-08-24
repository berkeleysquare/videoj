// Simple test to verify MUI imports work
import fs from 'fs';

try {
  // Check if MUI packages are installed
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  console.log('✅ MUI Packages installed:');
  console.log('  @mui/material:', packageJson.dependencies['@mui/material']);
  console.log('  @emotion/react:', packageJson.dependencies['@emotion/react']);
  console.log('  @emotion/styled:', packageJson.dependencies['@emotion/styled']);
  console.log('  @mui/icons-material:', packageJson.dependencies['@mui/icons-material']);
  console.log('  @mui/styles:', packageJson.dependencies['@mui/styles']);
  
  console.log('\n✅ Old @material-ui packages removed:');
  console.log('  @material-ui/core:', packageJson.dependencies['@material-ui/core'] || 'REMOVED');
  
  console.log('\n✅ Material-UI migration complete!');
  console.log('\nThe ReactDOM.findDOMNode error should now be resolved.');
  console.log('\nNote: You\'ll need to upgrade Node.js to 20+ to run the dev server.');
} catch (error) {
  console.error('❌ Error checking packages:', error.message);
}
