const path = require('path')
const analyticsFilePath = path.join(__dirname, '..', 'analytics', 'analytics.json');
const fs = require('fs');


const analytics= (req,res) => {
        fs.readFile(analyticsFilePath, (err, data) => {
            if (err) {
                return res.status(500).send('Failed to load analytics data');
            }
            res.json(JSON.parse(data));
        });
}

module.exports = {
    analytics
}