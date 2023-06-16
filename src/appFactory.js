const express = require('express');
const cors = require('cors');

const appFactory = (dbConnectionMgr, weatherApiMgr) => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.post("/order", async(req, res)=>{
        const {lunch} = req.body;
        if(!lunch){
            return res.status(400).send({
                status:'error',
                message:'Required fields are missing'
            })
        }
        try{
            const id = await dbConnectionMgr.createOrder(lunch);
            lunch.id = id;
            res.status(201).send({
                status:'created',
                data:{
                    lunch
                }
            })
        }catch(err){
            res.status(500).send({
                status: 'error',
                message: 'Database operation failed'
            });
        }
    });

    return app;
}

module.exports = appFactory;