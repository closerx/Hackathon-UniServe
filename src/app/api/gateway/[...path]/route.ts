import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function getService(name: string, description: string) {
    let service = await prisma.service.findUnique({ where: { name } });
    if (!service) {
        service = await prisma.service.create({
            data: { name, description }
        });
    }
    return service;
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const serviceName = path[0];
    const endpoint = path.slice(1).join("/");

    // 1. Authenticate API Key
    const apiKeyHeader = req.headers.get("X-API-Key");
    if (!apiKeyHeader) {
        return NextResponse.json({ message: "Missing API Key" }, { status: 401 });
    }

    const apiKey = await prisma.apiKey.findUnique({
        where: { key: apiKeyHeader },
        include: { developer: true },
    });

    if (!apiKey || !apiKey.isActive) {
        return NextResponse.json({ message: "Invalid API Key" }, { status: 403 });
    }

    // 2. Mock Routing Logic
    let responseData = null;
    let serviceDesc = "";

    // Helper to ensure simple ID-based endpoints
    const getId = () => endpoint.split("/")[1] || "unknown";

    switch (serviceName) {
        case "commerce":
            if (endpoint.startsWith("verify/")) {
                const cr = getId();
                responseData = {
                    cr_number: cr,
                    company_name: `Company ${cr} Test`,
                    status: "active",
                    expiry_date: "2025-12-31",
                    activities: ["Retail", "Import/Export"]
                };
                serviceDesc = "Ministry of Commerce";
            }
            break;

        case "justice":
            if (endpoint.startsWith("verify-lawyer/")) {
                const id = getId();
                responseData = {
                    license_id: id,
                    lawyer_name: "Ahmed Al-Fulan",
                    status: "active",
                    license_type: "Practicing",
                    expiry_hijri: "1447/05/20"
                };
                serviceDesc = "Ministry of Justice";
            }
            break;

        case "health":
            if (endpoint.startsWith("verify-practitioner/")) {
                const id = getId();
                responseData = {
                    practitioner_id: id,
                    name: "Dr. Sara Al-Test",
                    specialty: "General Medicine",
                    classification: "Consultant",
                    status: "valid",
                    expiry_date: "2026-01-01"
                };
                serviceDesc = "Ministry of Health";
            }
            break;

        case "education":
            if (endpoint.startsWith("verify-degree/")) {
                const id = getId();
                responseData = {
                    national_id: id,
                    degree: "Bachelor of Computer Science",
                    university: "King Saud University",
                    graduation_year: "2023",
                    gpa: "4.5/5.0"
                };
                serviceDesc = "Ministry of Education";
            }
            break;

        case "hrsd": // Human Resources
            if (endpoint.startsWith("verify-employment/")) {
                const id = getId();
                responseData = {
                    national_id: id,
                    status: "Employed",
                    employer: "Tech Solutions Co.",
                    job_title: "Software Engineer",
                    registered_at: "2023-03-15"
                };
                serviceDesc = "Ministry of Human Resources";
            }
            break;

        case "traffic":
            if (endpoint.startsWith("verify-vehicle/")) {
                const plate = getId();
                responseData = {
                    plate_number: plate,
                    make: "Toyota",
                    model: "Camry",
                    year: 2024,
                    color: "White",
                    istimara_status: "valid"
                };
                serviceDesc = "Traffic Department";
            }
            break;
    }

    if (responseData) {
        // 3. Log Usage
        try {
            const service = await getService(serviceName, serviceDesc);
            await prisma.usageLog.create({
                data: {
                    apiKeyId: apiKey.id,
                    serviceId: service.id,
                    endpoint: `${serviceName}/${endpoint}`,
                    status: 200
                }
            });
        } catch (e) {
            console.error("Failed to log usage", e);
        }

        return NextResponse.json(responseData);
    }

    return NextResponse.json({ message: "Service or endpoint not found" }, { status: 404 });
}
