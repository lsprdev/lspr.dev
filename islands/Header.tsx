import { useEffect, useState } from "preact/hooks";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

export default function Header() {

    let [githubData, setGithubData] = useState({} as any);

    useEffect(() => {
        axiod.get("https://api.github.com/users/lsprdev")
            .then((response) => {
                setGithubData(response.data);
            });
    }, []);

    return (
        <>  
            <div className="flex items-center justify-between py-10  bg-black w-full">
                <div className="flex flex-row ml-4">
                    <img className="rounded-lg" src={githubData.avatar_url} alt="avatar_url" width="60px" height="60px" />
                    <p className="text-white hidden h-6 text-2xl font-bold sm:block mt-4 ml-2">lspr.dev</p>
                </div>
                <div className="flex items-center space-x-4 leading-5 sm:space-x-6 mr-10">
                    <a class="hidden text-white font-bold dark:text-gray-100 sm:block" href="/blog">Projetos</a>
                    <a class="hidden text-white font-bold dark:text-gray-100 sm:block" href="/blog">Utils</a>
                    <a class="hidden text-white font-bold dark:text-gray-100 sm:block" href="/blog">Sobre</a>
                </div>
            </div>
        </>
    );
}
    