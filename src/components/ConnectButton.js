import {useContext} from "react"
import {PeerContext} from "./Context"
import {Button} from "./Button"

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
        <Button className="w-28" onClick={connect}>
            {buttonContent()}
        </Button>
    )
}