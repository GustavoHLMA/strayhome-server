"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV !== 'production' ? ['warn', 'error'] : [],
    errorFormat: process.env.NODE_ENV !== 'production' ? 'pretty' : 'colorless',
});
prisma
    .$connect()
    .then(() => {
    console.log('📦 Successfully connected with database');
})
    .catch((error) => {
    console.log('❌ Error connecting to database', error);
});
exports.default = prisma;
