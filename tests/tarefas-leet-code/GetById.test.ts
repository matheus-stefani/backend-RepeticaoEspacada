import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Leet-Code - GetById", () => {
    it("Busca por registros com sucesso", async () => {
        const result = await testServer.post("/tarefas-leet-code").send({
            nome: "Contains Duplicate",
            link1: "https://leetcode.com/problems/contains-duplicate/",
            link2: "https://www.youtube.com/watch?v=3OamzN90kPg",
            desc: "Fiz com certa facilidade",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });

        const buscaPeloId = await testServer
            .get(`/tarefas-leet-code/${result.body[0]}`)
            .send();

        expect(buscaPeloId.statusCode).toEqual(StatusCodes.OK);
        expect(buscaPeloId.body).toHaveProperty("id");
        expect(buscaPeloId.body).toHaveProperty("nome");
        expect(buscaPeloId.body).toHaveProperty("link1");
        expect(buscaPeloId.body).toHaveProperty("link2");
        expect(buscaPeloId.body).toHaveProperty("desc");
        expect(buscaPeloId.body).toHaveProperty("dias");
        expect(buscaPeloId.body).toHaveProperty("diaAno");
    });

    it("Busca por registros com id invalido", async () => {
        const result = await testServer.post("/tarefas-leet-code").send({
            nome: "Contains Duplicate",
            link1: "https://leetcode.com/problems/contains-duplicate/",
            link2: "https://www.youtube.com/watch?v=3OamzN90kPg",
            desc: "Fiz com certa facilidade",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });

        const buscaPeloId = await testServer
            .get("/tarefas-leet-code/-1")
            .send();

        expect(buscaPeloId.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(buscaPeloId.body).toHaveProperty("errors.params.id");
    });
});
