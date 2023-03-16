import ConnectButton from "./ConnectButton"
import {Link} from "react-router-dom"

export default function Header({children}) {
    return (
        <header className="bg-gray-100 border-b border-gray-200 shadow-lg">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                <Link to="/">
                <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt=""
                />
                </Link>
                </div>

                {children}

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <ConnectButton/>
                </div>
            </nav>
        </header>
    )
}
