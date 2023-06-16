const request = require('supertest');
const appFactory = require('../appFactory');

describe("Orders", ()=>{

    let mockDBConnectionMgr;
    let mockWeatherApiMgr;
    let testApp;
    let mockOrder01;

    beforeEach(()=>{
        mockDBConnectionMgr = {
            createOrder: jest.fn(),
            getAllOrders: jest.fn()
        };

        mockOrder01 = {
            lunch:{
                firstName:"BrotherMan",
                lastName:"FromTheFifthFloor",
                order:"Smache",
                paid:false
            }
        };

        testApp = appFactory(mockDBConnectionMgr, mockWeatherApiMgr);
    });

    it('Should respond with 400', async ()=>{
        const response = await request(testApp)
            .post("/order")
            .send({});
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            status:'error',
            message:'Required fields are missing'
        })
    });

    it('Should respond with 201',async ()=>{
        const mockId =1;
        mockDBConnectionMgr.createOrder.mockResolvedValue(mockId);
        const response = await request(testApp)
            .post("/order")
            .send(mockOrder01)
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({
            status:'created',
            data:{
                lunch:{
                    id:mockId,
                    firstName:"BrotherMan",
                    lastName:"FromTheFifthFloor",
                    order:"Smache",
                    paid:false
                }
            }
        })
    })

    it('should respons with 500', async()=>{
        mockDBConnectionMgr.createOrder.mockRejectedValue(new Error('Database error'));
        const response = await request(testApp)
            .post("/order")
            .send(mockOrder01);
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Database operation failed',
        });
    })

    it('should respond with 200', async()=>{
        const sampleData = [
            {
                id:1,
                firstName:"BrotherMan",
                lastName:"FromTheFifthFloor",
                order:"Smache",
                paid:false
            }
        ];
        mockDBConnectionMgr.getAllOrders.mockResolvedValue(sampleData);
        const response = await request(testApp)
            .get("/orders")

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            data:{
                orders:sampleData
            }
        })
    })
});

