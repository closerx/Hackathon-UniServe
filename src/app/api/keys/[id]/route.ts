import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // In Next.js 15+, params is a Promise
) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Ensure user owns the key
    const key = await prisma.apiKey.findUnique({
        where: { id },
    });

    if (!key || key.developerId !== session.user.id) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await prisma.apiKey.delete({
        where: { id },
    });

    return NextResponse.json({ message: "Deleted" });
}
