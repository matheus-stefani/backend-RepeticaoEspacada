import { server } from "./server/Server";

server.listen(process.env.PORT || 3333, () =>
    console.log(`Servidor Rodando na porta ${process.env.PORT || 3333}`)
);
