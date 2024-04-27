import { Handlers, PageProps } from "$fresh/server.ts";
import { extract } from "https://deno.land/std@0.145.0/encoding/front_matter.ts";
import { join } from "$std/path/mod.ts";
import { IPost } from "./types.ts";

export async function getPost(slug: string): Promise<IPost | null> {
  const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
  const { attrs, body }: any = extract(text);
  return {
    slug,
    title: attrs.title,
    publishedAt: new Date(attrs.published_at),
    content: body,
    snippet: attrs.snippet,
  };
}

export async function getPosts(): Promise<IPost[]> {
  const files = Deno.readDir("./posts");
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as IPost[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}

export function PostCard({ post }: { post: IPost }) {
  return (
    <div class="border(t gray-200)">
      <hr className="h-px my-8 bg-[#a7a7a7] border-0" />
      <a class="sm:col-span-2" href={`/${post.slug}`}>
        <h3 class="text-white text-xl font-bold">
          {post.title}
        </h3>
        <time class="text-white">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div class="mt-4 text-white">
          {post.snippet}
        </div>
      </a>
    </div>
  );
}

export function Feed({ data }: PageProps<IPost[]>) {
    const posts = data;
    return (
        <>  
            <main className="w-full-md px-4 pt-2 mx-auto">
                <h1 className="text-5xl text-white font-bold mb-2">Recentes</h1>
                <p className="text-lg font-semibold leading-7 text-[#dbdbdbd3]">O lspr.dev nasceu da minha visão de criar um espaço próprio para experimentação - meu homelab pessoal. Aqui, compartilho conteúdos sobre infra, cripto, hacking e, principalmente, liberdade.</p>
                <div className="mt-4 mb-2">
                    {posts.map((post) => (
                        <PostCard post={post} />
                    ))}
                </div>
            </main>
        </>
    );
}