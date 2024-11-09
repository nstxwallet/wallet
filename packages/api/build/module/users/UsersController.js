"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const error_1 = require("./error");
const onRequestAuth_1 = require("../../hooks/onRequestAuth");
class UsersController {
    constructor(fastify, service) {
        this.fastify = fastify;
        this.service = service;
    }
    init() {
        this.fastify.post("/login", async (req, reply) => {
            try {
                const { email, password } = req.body;
                const user = await this.service.validateCredentials({
                    email,
                    password,
                });
                if (user) {
                    const accessToken = this.fastify.jwt.sign({ id: user.id });
                    reply.setCookie("token", accessToken, {
                        path: "/",
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                    });
                    return reply.send({ accessToken });
                }
            }
            catch (error) {
                if (error instanceof error_1.WrongCredentialsError) {
                    return reply.status(401).send({ error: "Invalid credentials" });
                }
                console.error("Error logging in:", error);
                return reply.status(500).send({ error: "Internal server error" });
            }
        });
        this.fastify.post("/sign-up", async (req, reply) => {
            const user = await this.service.create({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            });
            return reply.send(user);
        });
        this.fastify.get("/logout", async (_req, reply) => {
            reply.clearCookie("token");
            return reply.send({ success: true });
        });
        this.fastify.get("/users/me", { onRequest: onRequestAuth_1.onRequestAuth }, async (req, reply) => {
            const user = await this.service.getById(req.user.id);
            if (!user) {
                return reply
                    .status(400)
                    .send({ success: false, message: "User not found" });
            }
            return reply.send(user);
        });
    }
}
exports.UsersController = UsersController;
