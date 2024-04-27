export default function Header() {
    return (
        <>  
            <div className="flex items-center justify-between py-10 background w-full">
                <div className="flex flex-row ml-4">
                    <img className="rounded-lg" src='/icon.png' alt="avatar_url" width="60px" height="60px" />
                    <p className="text-white hidden h-6 text-2xl font-bold sm:block mt-4 ml-2">lspr.dev</p>
                </div>
                <div className="flex items-center space-x-4 leading-5 sm:space-x-6 mr-10">
                    <a class="hidden text-white text-xl font-bold sm:block" href="/projetos">Projetos</a>
                    <a class="hidden text-white text-xl font-bold sm:block" href="/utils">Utils</a>
                    <a class="hidden text-white text-xl font-bold sm:block" href="/sobre">Sobre</a>
                </div>
            </div>
        </>
    );
}