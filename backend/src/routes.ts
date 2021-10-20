import express from "express";

import { GithubRedirectController } from "./controllers/GithubRedirectController";
import { GithubAuthenticationCallbackController } from "./controllers/GithubAuthenticationCallbackController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";

const router = express.Router();
const githubRedirectController = new GithubRedirectController();
const githubAuthenticationCallbackController = new GithubAuthenticationCallbackController();
const getLast3MessagesController = new GetLast3MessagesController();
const authenticateUserController = new AuthenticateUserController();
const createMessageController = new CreateMessageController();
const profileUserController = new ProfileUserController();

router.get("/github", githubRedirectController.handle);
router.get("/signin/callback", githubAuthenticationCallbackController.handle);
router.get("/messages/last3", getLast3MessagesController.handle);

router.post("/authenticate", authenticateUserController.handle);
router.post("/messages", ensureAuthenticate, createMessageController.handle);
router.post("/profile", ensureAuthenticate, profileUserController.handle);

export default router;