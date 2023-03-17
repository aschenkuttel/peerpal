import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSpinner} from "@fortawesome/free-solid-svg-icons"
import clsx from "clsx"

export default function Spinner({className}) {
    return (
        <FontAwesomeIcon icon={faSpinner} className={clsx("text-blue-600 text-4xl animate-spin", className)}/>
    )
}