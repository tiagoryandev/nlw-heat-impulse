import { Request, Response } from "express";

class GithubRedirectController {
    async handle(request: Request, response: Response) {
        return response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
    };
};

export { GithubRedirectController };