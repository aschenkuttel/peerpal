import {Component, createContext} from "react"
import {ethers} from "ethers"
import factoryABI from "../assets/ABI/Factory.json"
import ERC20ABI from "../assets/ABI/ERC20.json"
import transactionABI from "../assets/ABI/Transaction.json"
import Firestore from "../utils/Firestore"

const PeerContext = createContext(null)

class PeerProvider extends Component {

    constructor(props) {
        super(props)

        this.db = new Firestore()
        this.provider = null
        this.factory = null
        this.factoryAddress = "0xB601e33606628Fc7c2A3c9959Ad1D1a18483832b"
        this.currencyAddress = "0xb106ed7587365a16b6691a3D4B2A734f4E8268a2"

        this.state = {
            address: null
        }
    }

    connect = async () => {
        if (this.state.address === null) {
            await this.provider.send("eth_requestAccounts", [])
            const signer = this.provider.getSigner()
            const address = await signer.getAddress()

            this.setState({address})
        }
    }

    openTransaction = async (title, description, amount) => {
        const signer = await this.factory.connect(this.provider.getSigner())

        try {
            const response = await signer.openTransaction(amount)
            const receipt = await response.wait()

            const factoryInterface = new ethers.utils.Interface(factoryABI)
            const logs = factoryInterface.parseLog(receipt.logs[0])

            await this.db.insertTransaction(
                logs.args.transactionAddress,
                logs.args.owner,
                title,
                description,
                amount,
                logs.args.timestamp.toString()
            )

            return `http://localhost:3000/approve/${logs.args.transactionAddress}`

        } catch (error) {
            console.log(error)
        }
    }

    approve = async (transactionID, amount) => {
        const contract = new ethers.Contract(this.currencyAddress, ERC20ABI)
        const signer = await contract.connect(this.provider.getSigner())

        try {
            console.log(amount)
            const response = await signer.approve(transactionID, amount)
            await response.wait()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    deposit = async(transactionID) => {
        const contract = new ethers.Contract(transactionID, transactionABI)
        const signer = await contract.connect(this.provider.getSigner())

        try {
            const response = await signer.deposit()
            await response.wait()
            await this.db.updateTransaction(transactionID,{buyer: this.state.address})
            return true
        } catch (error) {
            console.log(error)
            return true
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
                openTransaction: this.openTransaction,
                approve: this.approve,
                deposit: this.deposit,
                db: this.db,
                provider: this.provider
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