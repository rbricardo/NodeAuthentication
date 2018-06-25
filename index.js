const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// ============================== Controllers =============================================

require('./src/app/controllers/index')(app);

// ============================== End Controlers ==========================================

app.listen(4000);