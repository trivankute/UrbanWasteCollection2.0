import { Express } from 'express'
import catchAsync from "../utils/catchAsync";
import requireUser from '../middlewares/requireUser';
import requireBackofficer from '../middlewares/requireBackofficer';
import { backOfficerReviewTaskBodySchema, backOfficerReviewTaskParamsSchema, createTaskSchema, searchTasksSchema, updateNeedReviewTaskSchema } from '../schemas/schema.task';
import requireWorker from '../middlewares/requireWorker';
import zodMiddlewares from '../middlewares/zodMiddlewares';
import { backOfficerReviewTaskHandle, createTaskHandle, deleteDoneTasksHandle, deleteTaskHandle, getTaskById, searchTask, updateNeedReviewTaskHandle } from '../controllers/controller.task';

export default function (app: Express) {
    const baseUrl = "/task"
    // get by id
    app.get(baseUrl + "/:id", catchAsync(getTaskById))

    // create
    app.post(baseUrl + "/create", requireUser, requireBackofficer, zodMiddlewares(createTaskSchema, "body"), catchAsync(createTaskHandle))

    // search by disposalName (old or later) and state, type with pagination(need more, get by disposal and state)
    app.post(baseUrl, zodMiddlewares(searchTasksSchema, "body"), catchAsync(searchTask))

    // delete all done tasks
    app.delete(baseUrl + "/donetasks", catchAsync(deleteDoneTasksHandle))

    // delete task
    app.delete(baseUrl + "/:id", catchAsync(deleteTaskHandle))

    // update state to needReview task for worker
    app.put(baseUrl + "/:id/needreview", requireUser, requireWorker, zodMiddlewares(updateNeedReviewTaskSchema, "param"), catchAsync(updateNeedReviewTaskHandle))

    // backoffcer answer
    app.put(baseUrl + "/:id/answer", requireUser, requireBackofficer, zodMiddlewares(backOfficerReviewTaskParamsSchema, "param"), zodMiddlewares(backOfficerReviewTaskBodySchema, "body"), catchAsync(backOfficerReviewTaskHandle))

}