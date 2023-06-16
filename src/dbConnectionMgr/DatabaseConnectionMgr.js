const env = require('dotenv');
const mysql = require("mysql2");

env.config();

const connection = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

const createOrder = async(lunch) =>{
    const {firstName, lastName, order, paid} = lunch;

    if(!firstName || !lastName || !order || paid === undefined){
        throw new Error("Invalid input");
    }

    try{
        const result = await connection.promise().query(
            `INSERT INTO orders (first_name, last_name, food_order, paid) VALUES (?,?,?,?)`,
            [firstName, lastName, order, paid]
        );
        return result[0].insertId
    }catch(err){
        throw new Error('Database query failed');
    }
}

const getAllOrders = async()=>{
    try {
        const result = await connection.promise().query(
            `SELECT * from orders LIMIT 20`
        )
        return convertBoolean(result[0]);
    }catch(err){
        throw new Error('Database query failed')
    }
}

const convertBoolean = (data) =>{
    for(let i = 0; i < data.length; i++){
        data[i].paid = Boolean(data[i].paid)
    }
    return data;
}

module.exports = {
    createOrder,
    getAllOrders
}