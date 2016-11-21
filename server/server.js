const express = require('express')
const app = express();

require('./config/middleware.js')(app, express);

app.listen(process.env.PORT, '', () => {
    console.log(`Express server listening on port ${process.env.PORT}`)
});

module.exports = app;