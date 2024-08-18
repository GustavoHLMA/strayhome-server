"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // 1. Criar um novo usuário
    const newUser = await prisma.userTest.create({
        data: {
            name: 'John Doe',
            email: 'john.doe1@example.com',
            password: 'hashedpassword123', // Em um ambiente real, hash a senha com bcrypt
        },
    });
    console.log('New User Created:', newUser);
    // 2. Encontrar um usuário pelo email
    const user = await prisma.userTest.findUnique({
        where: {
            email: 'john.doe@example.com',
        },
    });
    console.log('User Found:', user);
    // 3. Listar todos os usuários
    const allUsers = await prisma.userTest.findMany();
    console.log('All Users:', allUsers);
}
main()
    .catch((e) => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
