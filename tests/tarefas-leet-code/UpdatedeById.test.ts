import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Leet-Code - UpdateById", () => {
    it("Atualiza registros com sucesso", async () => {
        const result = await testServer.post("/tarefas-leet-code").send({
            nome: "Contains Duplicate",
            link1: "https://leetcode.com/problems/contains-duplicate/",
            link2: "https://www.youtube.com/watch?v=3OamzN90kPg",
            desc: "Fiz com certa facilidade",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });
        const updateRegistro = await testServer
            .put(`/tarefas-leet-code/${result.body[0]}`)
            .send({
                nome: "Longest Common Prefix",
                link1: "https://leetcode.com/problems/longest-common-prefix/",
                link2: "https://www.youtube.com/watch?v=0sWShKIJoo4",
                desc: "Um pouco de dificuldade, mas consegui",
                dias: 13,
            });
        expect(updateRegistro.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Tenta atualizar um registros com id invalido", async () => {
        const result = await testServer.post("/tarefas-leet-code").send({
            nome: "Contains Duplicate",
            link1: "https://leetcode.com/problems/contains-duplicate/",
            link2: "https://www.youtube.com/watch?v=3OamzN90kPg",
            desc: "Fiz com certa facilidade",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });
        const updateRegistro = await testServer
            .put(`/tarefas-leet-code/999999999`)
            .send({
                nome: "Longest Common Prefix",
                link1: "https://leetcode.com/problems/longest-common-prefix/",
                link2: "https://www.youtube.com/watch?v=0sWShKIJoo4",
                desc: "Um pouco de dificuldade, mas consegui",
                dias: 13,
            });
        expect(updateRegistro.statusCode).toEqual(
            StatusCodes.INTERNAL_SERVER_ERROR
        );
        expect(updateRegistro.body).toHaveProperty(
            "errors.default",
            "Erro ao atualizar registro"
        );
    });

    it("Tenta atualizar registros com os tres campos inválidos", async () => {
        const result = await testServer.post("/tarefas-leet-code").send({
            nome: "Contains Duplicate",
            link1: "https://leetcode.com/problems/contains-duplicate/",
            link2: "https://www.youtube.com/watch?v=3OamzN90kPg",
            desc: "Fiz com certa facilidade",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });
        const updateRegistro = await testServer
            .put(`/tarefas-leet-code/${result.body[0]}`)
            .send({
                nome: "Lo",
                link1: "hts:/letcode.com/problems/longest-common-prefix/",
                link2: "hps://ww.youtube.com/watch?v=0sWShKIJoo4",
                desc: "U",
                dias: 0,
            });
        expect(updateRegistro.body).toHaveProperty(
            "errors.body.nome",
            "Deve ter pelo menos 3 caracteres"
        );
        expect(updateRegistro.body).toHaveProperty(
            "errors.body.link1",
            "Deve ter um formato de URL válida"
        );
        expect(updateRegistro.body).toHaveProperty(
            "errors.body.link2",
            "Deve ter um formato de URL válida"
        );
        expect(updateRegistro.body).toHaveProperty(
            "errors.body.desc",
            "Deve ter pelo menos 5 caracteres"
        );
        expect(updateRegistro.body).toHaveProperty(
            "errors.body.dias",
            "Deve ser maior que 0"
        );
    });
});
