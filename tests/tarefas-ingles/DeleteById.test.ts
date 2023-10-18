import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Ingles - DeleteById", () => {
    it("Deleta registros com sucesso", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });
        const [del1, del2, del3] = result.body;

        const deleta1 = await testServer
            .delete(`/tarefas-ingles/${del1}`)
            .send();
        const deleta2 = await testServer
            .delete(`/tarefas-ingles/${del2}`)
            .send();
        const deleta3 = await testServer
            .delete(`/tarefas-ingles/${del3}`)
            .send();

        expect(deleta1.statusCode).toEqual(StatusCodes.NO_CONTENT);
        expect(deleta2.statusCode).toEqual(StatusCodes.NO_CONTENT);
        expect(deleta3.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Tenta deletar registros com id invalido", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });

        const deleta = await testServer.delete("/tarefas-ingles/-1").send();

        expect(deleta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(deleta.body).toHaveProperty("errors.params.id");
    });
});
