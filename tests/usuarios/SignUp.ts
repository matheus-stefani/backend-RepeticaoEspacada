import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cadastrar - Usuario", () => {
    it("Cadastrar usuario com sucesso", async () => {
        const result = await testServer
            .post("http://localhost:3333/cadastrar")
            .send({
                nome: "Matheus",
                email: "matheus@gmail.com",
                senha: "12345678",
            });
        expect(result.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof result.body).toEqual("number");
    });
    it("Cadastrar usuario com os campos invalidos", async () => {
        const result = await testServer
            .post("http://localhost:3333/cadastrar")
            .send({
                nome: "Ma",
                email: "matheus gmail.com",
                senha: "1234",
            });
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof result.body).toEqual("number");
        expect(result.body).toHaveProperty(
            "errors.body.nome",
            "Deve ter pelo menos 3 caracteres"
        );
        expect(result.body).toHaveProperty(
            "errors.body.email",
            "Formato de e-mail digitado não é valido"
        );
        expect(result.body).toHaveProperty(
            "errors.body.nome",
            "Deve ter pelo menos 5 caracteres"
        );
    });

    it("Cadastrar usuario sem mandar os campos", async () => {
        const result = await testServer
            .post("http://localhost:3333/cadastrar")
            .send({});
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof result.body).toEqual("number");
        expect(result.body).toHaveProperty(
            "errors.body.nome",
            "Este campo é obrigatório"
        );
        expect(result.body).toHaveProperty(
            "errors.body.email",
            "Este campo é obrigatório"
        );
        expect(result.body).toHaveProperty(
            "errors.body.nome",
            "Este campo é obrigatório"
        );
    });
});
