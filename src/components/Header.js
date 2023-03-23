import ConnectButton from "./ConnectButton"
import {Link} from "react-router-dom"
import logo from "../assets/logo.png"
import clsx from "clsx"


export default function Header({children, className}) {
    return (
        <header className={clsx("bg-gray-100 border-b border-gray-200 shadow-lg", className)}>
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/">
                        <img
                            className="h-12 w-auto"
                            src={logo}
                            alt="PeerPal"
                        />
                    </Link>
                </div>

                {children}

                <div className="flex">
                    <ConnectButton/>
                </div>
            </nav>
        </header>
    )
}
