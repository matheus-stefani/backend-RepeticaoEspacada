import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Entrar - Usuario", () => {
    it("Logar com o usuario com sucesso", async () => {
        const result = await testServer
            .post("http://localhost:3333/cadastrar")
            .send({
                nome: "Matheus",
                email: "matheus@gmail.com",
                senha: "12345678",
            });
        const entrar = await testServer
            .post("http://localhost:3333/entrar")
            .send({
                email: "matheus@gmail.com",
                senha: "12345678",
            });
        expect(entrar.statusCode).toEqual(StatusCodes.OK);
        expect(result.body).toHaveProperty("accessToken", "teste.teste.teste");
    });
    it("Logar com o usuario com a senha ou email invalido", async () => {
        const result = await testServer
            .post("http://localhost:3333/cadastrar")
            .send({
                nome: "Matheus",
                email: "matheus@gmail.com",
                senha: "12345678",
            });

        const entrar = await testServer
            .post("http://localhost:3333/entrar")
            .send({
                email: "matheus1@gmail.com",
                senha: "123456789",
            });
        expect(entrar.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(result.body).toHaveProperty(
            "errors.default",
            "Email ou senha são inválidos"
        );
    });
});
