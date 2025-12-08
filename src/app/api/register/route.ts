import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    company: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name, company } = registerSchema.parse(body);

        const existingUser = await prisma.developer.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.developer.create({
            data: {
                email,
                password: hashedPassword,
                name,
                company,
            },
        });

        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ message: error.errors }, { status: 400 });
        }
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
