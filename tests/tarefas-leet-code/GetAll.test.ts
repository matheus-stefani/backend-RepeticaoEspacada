import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Leet-Code - GetAll", () => {
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

        const busca = await testServer.get("/tarefas-leet-code").send();

        const [obj] = busca.body;
        expect(busca.statusCode).toEqual(StatusCodes.OK);
        expect(obj).toHaveProperty("id");
        expect(obj).toHaveProperty("nome");
        expect(obj).toHaveProperty("link1");
        expect(obj).toHaveProperty("link2");
        expect(obj).toHaveProperty("desc");
        expect(obj).toHaveProperty("dias");
        expect(obj).toHaveProperty("diaAno");
    });
});
