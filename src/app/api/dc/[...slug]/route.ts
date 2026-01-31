import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = process.env.UPSTREAM_API || "https://api.sansekai.my.id/api/dramabox";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const path = slug.join("/");
    const searchParams = request.nextUrl.searchParams;

    // Mapping for legacy segments
    // /api/dc/detail/[bookId] -> UPSTREAM/detail?bookId=[bookId]
    // /api/dc/allepisode/[bookId] -> UPSTREAM/allepisode?bookId=[bookId]

    let upstreamUrl = `${UPSTREAM_API}/${path}`;

    if (slug[0] === "detail" && slug[1]) {
        upstreamUrl = `${UPSTREAM_API}/detail?bookId=${slug[1]}`;
    } else if (slug[0] === "allepisode" && slug[1]) {
        upstreamUrl = `${UPSTREAM_API}/allepisode?bookId=${slug[1]}`;
    }

    // Append any existing search params
    const queryString = searchParams.toString();
    if (queryString && !upstreamUrl.includes("?")) {
        upstreamUrl += `?${queryString}`;
    } else if (queryString) {
        upstreamUrl += `&${queryString}`;
    }

    try {
        const response = await fetch(upstreamUrl, {
            next: { revalidate: 300 },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch data" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
