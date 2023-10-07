import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Ingles - GetAll", () => {
    it("Busca por registros com sucesso", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });

        const busca = await testServer.get("/tarefas-ingles").send();

        expect(busca.statusCode).toEqual(StatusCodes.OK);
    });
});
