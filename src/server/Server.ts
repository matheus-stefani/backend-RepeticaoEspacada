import express from "express";

const server = express();

server.get("/", (_, res) => {
    return res.send(
        "'Galera, proximo semestre programa de verdade!' by Clerivaldo since 2022"
    );
});

export { server };
