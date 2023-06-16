const {createOrder, getAllOrders} = require("../../dbConnectionMgr/DatabaseConnectionMgr");
const mysql2 = require("mysql2")

jest.mock('mysql2', () => {
    const mPool = {
        promise: jest.fn().mockReturnThis(),
        query: jest.fn(),
    };
    return {
        createPool: jest.fn(() => mPool),
    };
});

let mockLunch;

describe('Database Functions', ()=>{
    beforeEach(()=>{
        mockLunch = {
                firstName:"BrotherMan",
                lastName:"FromTheFifthFloor",
                order:"Smache",
                paid:false
        }
    });

    it('createOrder', async () => {
        const insertId = 1;
        mysql2.createPool().query.mockResolvedValueOnce([{insertId}]);
        const result = await createOrder(mockLunch);
        expect(result).toBe(insertId)
    })

    it('getAllOrders', async () =>{
        const sampleData = [[
            {
                id:1,
                firstName:"BrotherMan",
                lastName:"FromTheFifthFloor",
                order:"Smache",
                paid:0
            }
        ]];
        const expectedData = [
            {
                id:1,
                firstName:"BrotherMan",
                lastName:"FromTheFifthFloor",
                order:"Smache",
                paid:false
            }
        ];
        mysql2.createPool().query.mockResolvedValueOnce(sampleData);
        const result = await getAllOrders();
        expect(result).toEqual(expectedData);
    })
})