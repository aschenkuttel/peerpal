import {Link} from "react-router-dom"
import clsx from "clsx"

function Button({children, className, onClick, disabled}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={clsx("rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm",
                "hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                "focus-visible:outline-blue-600 disabled:opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed", className)}>
            {children}
        </button>
    )
}

function SecondaryButton({children, className, onClick}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx("rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm",
                "ring-1 ring-inset ring-gray-300 hover:bg-gray-50", className)}>
            {children}
        </button>
    )
}

function ButtonLink({to, children, className, disabled}) {
    return (
        <Link
            to={to}
            disabled={disabled}
            className={clsx("rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm",
                "hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                "focus-visible:outline-blue-600 disabled:opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed", className)}>
            {children}
        </Link>
    )
}

export {
    Button,
    ButtonLink,
    SecondaryButton
}