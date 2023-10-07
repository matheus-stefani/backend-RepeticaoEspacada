import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Ingles - GetById", () => {
    it("Busca por registros com sucesso", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });

        const buscaPeloId = await testServer.get("/tarefas-ingles/1").send();

        expect(buscaPeloId.statusCode).toEqual(StatusCodes.OK);
    });

    it("Busca por registros com id invalido", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });

        const buscaPeloId = await testServer.get("/tarefas-ingles/-1").send();

        expect(buscaPeloId.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(buscaPeloId.body).toHaveProperty("errors.params.id");
    });
});
