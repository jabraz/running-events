import bcrypt from "bcrypt";
import { RegistrarUsuarioUsecase } from "../../usecases/registrarUsuarioUseCase";
import { usuarioService } from "../../services/usuario.service";

jest.mock("../../models/Usuario");
jest.mock("../../services/usuario.service");
jest.mock("bcrypt");

describe("RegistrarUsuarioUseCase", () => {
    const usuarioBodyMock = {
        nome: "José",
        email: "jose@email.com",
        senha: "123456",
        roles: ["atleta", "organizador"],
    };

    let registrarUsuarioUseCase: RegistrarUsuarioUsecase;

    beforeEach(() => {
        registrarUsuarioUseCase = new RegistrarUsuarioUsecase();
        jest.clearAllMocks();
    });

    describe("execute", () => {
        it("deve criar um usuário com senha hash", async () => {
            (bcrypt.hash as jest.Mock).mockResolvedValue("hashed123");

            (usuarioService.criar as jest.Mock).mockResolvedValue({
                ...usuarioBodyMock,
                senha: "hashed123",
                _id: "68c5e73cd153f334e888a9fa",
                __v: "0",
            });

            const resultado = await registrarUsuarioUseCase.execute(usuarioBodyMock);

            expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
            expect(usuarioService.criar).toHaveBeenCalledWith({
                ...usuarioBodyMock,
                senha: "hashed123",
            });
            expect(resultado.senha).toBe("hashed123");
        });
    });
});
