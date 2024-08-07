import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  try {
    const headersList = headers();
    const userName = headersList.get("x-user-name");
    if (!userName) {
      return NextResponse.json(null, { status: 400 });
    }

    return NextResponse.json(userName, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
