import { Request, Response } from "express";

class GithubAuthenticationCallbackController {
    async handle(request: Request, response: Response) {
        const { code } = request.query;

        if (!code)
            return response.json({
                message: "Nenhum Código foi recebido."
            });

        return response.json(code);
    };
};

export { GithubAuthenticationCallbackController };