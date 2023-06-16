const dbConnectionMgr = require('./src/dbConnectionMgr/DatabaseConnectionMgr');
const appFactory = require('./src/appFactory')
let weatherApiMgr;
const app = appFactory(dbConnectionMgr, weatherApiMgr);

app.listen(8081, ()=>console.log("Server is running"))