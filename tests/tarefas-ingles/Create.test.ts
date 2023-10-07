import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Ingles - Create", () => {
    it("Cria registro com sucesso", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });

        expect(result.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof result.body).toEqual("number");
    });

    it("Cria registro com o nome muito curto", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "St",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(result.body).toHaveProperty("errors.body.nome");
    });

    it("Cria registro com a url invalida", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
        });
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(result.body).toHaveProperty("errors.body.link");
    });

    it("Cria registro com dias invalido", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 0,
        });
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(result.body).toHaveProperty("errors.body.dias");
    });

    it("Cria registro com os tres campos inválidos", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "St",
            link: "www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 0,
        });
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(result.body).toHaveProperty("errors.body.nome");
        expect(result.body).toHaveProperty("errors.body.link");
        expect(result.body).toHaveProperty("errors.body.dias");
    });

    it("Cria registro sem o nome", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 1,
        });
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(result.body).toHaveProperty(
            "errors.body.nome",
            "Este campo é obrigatório"
        );
    });

    it("Cria registro sem o link", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            dias: 0,
        });
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);

        expect(result.body).toHaveProperty(
            "errors.body.link",
            "Este campo é obrigatório"
        );
    });

    it("Cria registro sem o campo dias", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
        });
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);

        expect(result.body).toHaveProperty(
            "errors.body.dias",
            "Este campo é obrigatório"
        );
    });
});
