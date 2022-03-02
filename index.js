const server = require('./config/server');
const connection = require('./db/connection');
const Tables = require('./db/tables');

connection.connect(error => {
    if (error) {
        console.log('error: ', error);
    } else {

        Tables.init(connection);
        
        const app = server();

        app.listen(3000, () => console.log('Server running in 3000'));
    }
});