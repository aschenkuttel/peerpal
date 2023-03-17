import clsx from "clsx"

export default function Footer({className}) {

    return (
        <footer className={clsx("h-20 flex justify-center items-center bg-gray-100 border-t border-gray-200 shadow-lg px-8", className)}>
            <p className="font-mono text-sm">Copyright © 2023 <span className="text-blue-600">Fodengas</span></p>
        </footer>
    )
}