const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.hander');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://myapp.co'];
const options = {
    origin: (origin, callback) => {
        if( whiteList.includes(origin) || !origin ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed'));
        }
    }
}
app.use(cors(options));

routerApi( app );
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto: ", port);
});
