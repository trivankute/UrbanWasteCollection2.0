import {Express} from "express"

import {checkinHandle, checkoutHandle, getMeHandle, searchUserHandle, loginHandle, logoutHandle, registerHandle, resetcheckincheckoutHandle, updateProfileHandle, updateRoleHandle} from "../controllers/controller.user";
import catchAsync from "../utils/catchAsync";
import {loginUserSchema, registerUserSchema, searchUserSchema, updateProfileSchema, updateRoleSchema} from '../schemas/schema.user'
import alreadyLoggedIn from "../middlewares/alreadyLoggedIn";
import requireUser from "../middlewares/requireUser";
import requireBackofficer from "../middlewares/requireBackofficer";
import multer from 'multer'
import { storage } from "../cloudinary";
import zodMiddlewares from "../middlewares/zodMiddlewares";
const upload = multer({ storage })

export default function(app: Express) {
    const baseUrl = "/user"
    // // Register user
    app.post(baseUrl+"/register", zodMiddlewares(registerUserSchema, "body"), catchAsync(registerHandle));

    // // Login
    app.post(baseUrl+"/login", alreadyLoggedIn, zodMiddlewares(loginUserSchema, "body"),catchAsync(loginHandle))

    // // Log out
    app.get(baseUrl+"/logout", requireUser, catchAsync(logoutHandle))

    // update role
    app.put(baseUrl+"/role", zodMiddlewares(updateRoleSchema, "body"), catchAsync(updateRoleHandle))
    
    // // Get the user information
    app.get(baseUrl, requireUser, catchAsync(getMeHandle))

    // search by name and role with pagination, with no name then get all (need more, get by disposalName and state)
    app.post(baseUrl, requireUser, requireBackofficer, zodMiddlewares(searchUserSchema, "body"), catchAsync(searchUserHandle))

    // update profile information, if image is nothing then not update image
    app.put(baseUrl, requireUser, upload.single('image'), zodMiddlewares(updateProfileSchema, "body"), catchAsync(updateProfileHandle))
    
    // checkin
    app.get(baseUrl+"/checkin", requireUser, catchAsync(checkinHandle))

    // checkout
    app.get(baseUrl+"/checkout", requireUser, catchAsync(checkoutHandle))

    // reset checking
    app.get(baseUrl+"/resetcheck", requireUser, catchAsync(resetcheckincheckoutHandle))

    // // for Posts
    // // create
    // app.post("/api/posts",
    // [requiresUser, validateRequest(createPostSchema)], createPostHandler)

    // // get
    // app.get("/api/posts/:postId", getPostHandler)

    // // update
    // app.put("/api/posts/:postId",[requiresUser, validateRequest(updatePostSchema)], updatePostHandler)

    // // delete
    // app.delete("/api/posts/:postId",[requiresUser, validateRequest(deletePostSchema)], deletePostHandler)

    // // find all post of a user
    // app.get("/api/allposts", requiresUser, getAllPostHandler)

}