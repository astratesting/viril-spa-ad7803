import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const DEMO_POSTS = [
  {
    id: "1",
    title: "Welcome to the house — introductions",
    category: "Introductions",
    author_name: "Aurelia Vance",
    reply_count: 3,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: "2",
    title: "Thoughts on the inaugural salon reading",
    category: "Events",
    author_name: "Elena Marchetti",
    reply_count: 8,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Cellar dinner wine list — suggestions",
    category: "General",
    author_name: "Julian Okonkwo",
    reply_count: 5,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "4",
    title: "Membership tiers — what sealed your choice?",
    category: "General",
    author_name: "Rafael Santos",
    reply_count: 12,
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: "5",
    title: "Recommendations for the house library",
    category: "Feedback",
    author_name: "Camille Dubois",
    reply_count: 2,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "member" && session.role !== "admin") {
    return NextResponse.json({ error: "Active membership required" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const posts = category
    ? DEMO_POSTS.filter((p) => p.category === category)
    : DEMO_POSTS;

  return NextResponse.json({ posts });
}