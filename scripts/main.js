const fs = require('fs');
const path = require('path');

// Path to the JSON file
const jsonFilePath = path.join(__dirname, 'water-sc.json');

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the JSON file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Get all the items
        const items = jsonData.items; // Assuming the items are stored in a property called 'items'
        console.log('Items:', items);
    } catch (parseErr) {
        console.error('Error parsing the JSON data:', parseErr);
    }
});