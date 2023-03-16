import {useContext} from "react"
import {PeerContext} from "./Context"

export default function ConnectButton() {
    const {address, connect} = useContext(PeerContext)

    const buttonContent = () => {
        if (address === null) {
            return "Connect"
        } else {
            return "0x..." + address.substring(address.length - 6, address.length)
        }
    }

    return (
        <button
            type="button"
            onClick={connect}
            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {buttonContent()}
        </button>
    )
}