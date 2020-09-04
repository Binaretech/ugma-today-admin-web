const path = require('path');
const fs = require('fs');

fs.copyFileSync(path.join(__dirname, 'src', 'configs.js.example'),
    path.join(__dirname, 'src', 'configs.js'));

fs.copyFileSync(path.join(__dirname, '.env.example'),
    path.join(__dirname, '.env'));