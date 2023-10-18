import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Ingles - UpdateById", () => {
    it("Atualiza registros com sucesso", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });
        const updateRegistro = await testServer
            .put(`/tarefas-ingles/${result.body[0]}`)
            .send({
                nome: "Crazy train",
                link: "https://www.letras.mus.br/ozzy-osbourne/29623/traducao.html",
                dias: 11,
            });
        expect(updateRegistro.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Tenta atualizar um registros com id invalido", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });
        const updateRegistro = await testServer
            .put(`/tarefas-ingles/999999999`)
            .send({
                nome: "Crazy train",
                link: "https://www.letras.mus.br/ozzy-osbourne/29623/traducao.html",
                dias: 11,
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
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });
        const updateRegistro = await testServer
            .put(`/tarefas-ingles/${result.body[0]}`)
            .send({
                nome: "Cr",
                link: "/w.letras.mus.br/ozzy-osbourne/29623/traducao.html",
                dias: -3,
            });
            expect(updateRegistro.body).toHaveProperty(
                "errors.body.nome",
                "Deve ter pelo menos 3 caracteres"
            );
            expect(updateRegistro.body).toHaveProperty(
                "errors.body.link",
                "Deve ter um formato de URL válida"
            );
            expect(updateRegistro.body).toHaveProperty(
                "errors.body.dias",
                "Deve ser maior que 0"
            );
    });
});
