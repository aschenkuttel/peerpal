import {Component, createContext} from "react"
import {ethers} from "ethers"
import factoryABI from "../assets/ABI/Factory.json"
import ERC20ABI from "../assets/ABI/ERC20.json"

const PeerContext = createContext(null)

class PeerProvider extends Component {

    constructor(props) {
        super(props)

        this.state = {
            address: null
        }

        this.provider = null
        this.factory = null
        this.factoryAddress = "0xB601e33606628Fc7c2A3c9959Ad1D1a18483832b"
    }

    connect = async () => {
        if (this.state.address === null) {
            await this.provider.send("eth_requestAccounts", [])
            const signer = this.provider.getSigner()
            const address = await signer.getAddress()

            this.setState({address})
        }
    }

    openTransaction = async ({title, description, amount}) => {
        const signer = await this.factory.connect(this.provider.getSigner())

        try {
            const response = await signer.openTransaction(amount)
            const receipt = await response.wait(2)



            console.log("done")
        } catch(error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        if (window.ethereum) {
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            this.factory = new ethers.Contract(this.factoryAddress, factoryABI)

            window.ethereum.on('accountsChanged', async (wallets) => {
                if (wallets.length === 0) {
                    this.setState({address: null})
                } else {
                    const address = ethers.utils.getAddress(wallets[0])
                    this.setState({address})
                }
            })

            window.ethereum.on('chainChanged', (_) => {
                window.location.reload()
            })

            const accounts = await this.provider.listAccounts()
            const address = (accounts.length > 0) ? accounts[0] : null
            this.setState({address})
        }
    }

    render() {
        return (
            <PeerContext.Provider value={{
                address: this.state.address,
                connect: this.connect,
                openTransaction: this.openTransaction
            }}>
                {this.props.children}
            </PeerContext.Provider>
        )
    }
}

export {
    PeerProvider,
    PeerContext
}