import { blogs } from "#site/content";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Covers are WebP, which LinkedIn can't preview. Serve each one as a
// 1200x630 JPEG for og:image, rendered once at build time.
export const dynamic = "force-static";
export const dynamicParams = false;

type Params = { slug: string[] };

export function generateStaticParams(): Params[] {
  return blogs.map((b) => ({ slug: b.slugAsParams.split("/") }));
}

export async function GET(_req: Request, { params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slugAsParams === slug.join("/"));
  if (!blog) return new Response("Not found", { status: 404 });

  const cover = await readFile(path.join(process.cwd(), "public", blog.image));
  const jpeg = await sharp(cover)
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
