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
        <button className="bg-indigo-400 rounded-lg" onClick={connect}>
            {buttonContent()}
        </button>
    )
}