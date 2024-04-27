import { useEffect, useState } from "preact/hooks";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

export default function GithubAvatar() {
    const [githubData, setGithubData] = useState({} as any);
    useEffect(() => {
        axiod.get("https://api.github.com/users/lsprdev")
            .then((response) => {
                console.log(response.data);
                setGithubData(response.data);
            });
    }, []);

    return (
        <>  
            <img className="rounded-lg" src={githubData?.avatar_url} alt="avatar_url" width="60px" height="60px" />
        </>
    );
}
    