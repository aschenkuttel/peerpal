import ConnectButton from "./ConnectButton"

export default function Header() {
    return (
        <header className="bg-white">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-8 w-auto"
                             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
                    </a>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <ConnectButton/>
                </div>
            </nav>
        </header>
    )
}
