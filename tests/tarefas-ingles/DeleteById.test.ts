import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Ingles - DeleteById", () => {
    it("Deleta registros com sucesso", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });

        const deleta = await testServer.delete("/tarefas-ingles/1").send();

        expect(deleta.statusCode).toEqual(StatusCodes.OK);
    });

    it("Tenta deletar registros com id invalido", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });

        const deleta = await testServer.delete("/tarefas-ingles/-1").send();

        expect(deleta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(deleta.body).toHaveProperty("errors.params.id");
    });
});
