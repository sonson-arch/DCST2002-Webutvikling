import express from 'express';
 
const listRouter = express.Router();

listRouter.get('/', (request, response) => {
    response.json(allLists);
});
 
export default listRouter;