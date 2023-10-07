import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Ingles - UpdateById", () => {
    it("Atualiza registros com sucesso", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });

        const atualizaPeloId = await testServer.put("/tarefas-ingles/1").send({
            nome: "Rock the Night",
            link: "https://www.letras.mus.br/europe/13209/traducao.html#:~:text=Arrase%20Na%20Noite&text=O%20que%20voc%C3%AA%20quer%3F",
            dias: 7,
        });

        expect(atualizaPeloId.statusCode).toEqual(StatusCodes.OK);
    });

    it("Tenta atualizar um registros com id invalido", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });

        const atualizaPeloId = await testServer.put("/tarefas-ingles/-1").send({
            nome: "Rock the Night",
            link: "https://www.letras.mus.br/europe/13209/traducao.html#:~:text=Arrase%20Na%20Noite&text=O%20que%20voc%C3%AA%20quer%3F",
            dias: 7,
        });

        expect(atualizaPeloId.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(atualizaPeloId.body).toHaveProperty("errors.params.id");
    });

    it("Tenta atualizar registros com os tres campos inválidos", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });

        const atualizaPeloId = await testServer.put("/tarefas-ingles/1").send({
            nome: "Ro",
            link: "www.letras.mus.br/europe/13209/traducao.html#:~:text=Arrase%20Na%20Noite&text=O%20que%20voc%C3%AA%20quer%3F",
            dias: 0,
        });
        expect(atualizaPeloId.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(atualizaPeloId.body).toHaveProperty("errors.body.nome");
        expect(atualizaPeloId.body).toHaveProperty("errors.body.link");
        expect(atualizaPeloId.body).toHaveProperty("errors.body.dias");
    });
});
