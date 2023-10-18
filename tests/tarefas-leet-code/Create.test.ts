import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Leet-Code - Create", () => {
    it("Cria registro com sucesso", async () => {
        const result = await testServer.post("/tarefas-leet-code").send({
            nome: "Contains Duplicate",
            link1: "https://leetcode.com/problems/contains-duplicate/",
            link2: "https://www.youtube.com/watch?v=3OamzN90kPg",
            desc: "Fiz com certa facilidade",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });

        expect(result.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof result.body).toEqual("object");
    });

    it("Cria registro com os tres campos inválidos", async () => {
        const result = await testServer.post("/tarefas-leet-code").send({
            nome: "Co",
            link1: "htt://leetcode.com/problems/contains-duplicate/",
            link2: "htt://ww.youtube.com/watch?v=3OamzN90kPg",
            desc: "Fi",
            dias: -1,
            dias2: 0,
            dias3: -3,
        });

        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(result.body).toHaveProperty(
            "errors.body.nome",
            "Deve ter pelo menos 3 caracteres"
        );
        expect(result.body).toHaveProperty(
            "errors.body.link1",
            "Deve ter um formato de URL válida"
        );
        expect(result.body).toHaveProperty(
            "errors.body.link2",
            "Deve ter um formato de URL válida"
        );
        expect(result.body).toHaveProperty(
            "errors.body.dias",
            "Deve ser maior que 0"
        );
        expect(result.body).toHaveProperty(
            "errors.body.desc",
            "Deve ter pelo menos 5 caracteres"
        );
    });

    it("Cria registro sem os tres campos", async () => {
        const result = await testServer.post("/tarefas-leet-code").send({});

        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(result.body).toHaveProperty(
            "errors.body.nome",
            "Este campo é obrigatório"
        );
        expect(result.body).toHaveProperty(
            "errors.body.link1",
            "Este campo é obrigatório"
        );
        expect(result.body).toHaveProperty(
            "errors.body.link2",
            "Este campo é obrigatório"
        );
        expect(result.body).toHaveProperty(
            "errors.body.dias",
            "Este campo é obrigatório"
        );
        expect(result.body).toHaveProperty(
            "errors.body.desc",
            "Este campo é obrigatório"
        );
    });
});
