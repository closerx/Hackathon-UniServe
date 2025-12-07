import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'test@test.com';
    const password = await bcrypt.hash('password123', 10);

    const user = await prisma.developer.upsert({
        where: { email },
        update: {},
        create: {
            email,
            password,
            name: 'Test Setup',
            role: 'ADMIN',
        },
    });

    const key = await prisma.apiKey.create({
        data: {
            name: 'Test Key',
            key: 'sk_test_12345',
            level: 4,
            developerId: user.id,
        }
    });

    console.log('Created User:', user.email);
    console.log('Created Key:', key.key);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
