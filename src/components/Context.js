import {Component, createContext} from "react"
import {ethers} from "ethers"

const PeerContext = createContext(null)

class PeerProvider extends Component {

    constructor(props) {
        super(props)

        this.state = {
            address: null
        }

        this.provider = null
    }

    connect = async () => {
        if (this.state.address === null) {
            await this.provider.send("eth_requestAccounts", [])
            const signer = this.provider.getSigner()
            const address = await signer.getAddress()

            this.setState({
                address: address
            })
        }
    }

    async componentDidMount() {
        if (window.ethereum) {
            this.provider = new ethers.providers.Web3Provider(window.ethereum)

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
                connect: this.connect
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