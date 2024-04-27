import Header from "../components/Header.tsx";
import { Feed } from "../components/Feed.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts } from "../components/Feed.tsx";
import { IPost } from "../components/types.ts";

export const handler: Handlers<IPost[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function Home({ data, ...props }: PageProps<IPost[]>) {  
  return (
    <>  
        <section className="mx-auto h-screen max-w-7xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 background ">
            <Header/>
            <Feed data={ data } {...props} />
        </section>
      
    </>
  );
}