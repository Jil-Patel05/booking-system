const { app } = require('./src/app');
const PORT = process.env.PORT || 8000;
require("dotenv").config({ path: "./src/config/config.env" });

app.listen(PORT, () => {
    console.log(`Notification service is listing on port-${PORT}`);
})