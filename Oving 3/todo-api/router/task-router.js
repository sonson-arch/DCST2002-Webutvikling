import express from 'express';
 
const taskRouter = express.Router();

taskRouter.get('/', (request, response) => {
    response.json(allTasks);
});
 
export default taskRouter;