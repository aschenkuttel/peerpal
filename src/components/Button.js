import clsx from "clsx"

function Button({children, className, onClick}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx("rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm",
                "hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                "focus-visible:outline-indigo-600", className)}>
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

export {
    Button,
    SecondaryButton
}