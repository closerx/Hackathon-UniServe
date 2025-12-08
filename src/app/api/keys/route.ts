import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z, ZodError } from "zod";

export async function GET(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const keys = await prisma.apiKey.findMany({
        where: { developerId: session.user.id },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(keys);
}

const createKeySchema = z.object({
    name: z.string().min(1),
    level: z.coerce.number().min(1).max(4).default(1),
});

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, level } = createKeySchema.parse(body);

        const apiKey = await prisma.apiKey.create({
            data: {
                name,
                level,
                key: `sk_${uuidv4().replace(/-/g, "")}`,
                developerId: session.user.id,
            },
        });

        return NextResponse.json(apiKey, { status: 201 });
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
