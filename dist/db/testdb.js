"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Criar um novo usuário
        const newUser = yield prisma.userTest.create({
            data: {
                name: 'John Doe',
                email: 'john.doe1@example.com',
                password: 'hashedpassword123', // Em um ambiente real, hash a senha com bcrypt
            },
        });
        console.log('New User Created:', newUser);
        // 2. Encontrar um usuário pelo email
        const user = yield prisma.userTest.findUnique({
            where: {
                email: 'john.doe@example.com',
            },
        });
        console.log('User Found:', user);
        // 3. Listar todos os usuários
        const allUsers = yield prisma.userTest.findMany();
        console.log('All Users:', allUsers);
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
