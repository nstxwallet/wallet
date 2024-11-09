"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequestAuth = void 0;
const onRequestAuth = async (req, res) => {
    try {
        await req.jwtVerify();
    }
    catch (e) {
        return res.send(e);
    }
};
exports.onRequestAuth = onRequestAuth;
