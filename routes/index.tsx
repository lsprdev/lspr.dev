import Header from "../islands/Header.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { extract } from "https://deno.land/std@0.145.0/encoding/front_matter.ts";
import { join } from "$std/path/mod.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

async function getPost(slug: string): Promise<Post | null> {
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

async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}

interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet: string;
}

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="py-8 border(t gray-200)">
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

export default function Home(props: PageProps<Post[]>) {  
  const posts = props.data;
  return (
    <>  
        <section className="mx-auto h-screen max-w-7xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 bg-black ">
            <Header/>
            <main class="w-full-md px-4 pt-16 mx-auto">
              <h1 class="text-5xl text-white font-bold">Recentes</h1>
              <div class="mt-8">
                {posts.map((post) => <PostCard post={post} />)}
              </div>
            </main>
        </section>
      
    </>
  );
}