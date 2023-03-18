import {Fragment, useContext, useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"
import {PeerContext} from "../components/Context"
import {ethers, BigNumber} from "ethers"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheck} from "@fortawesome/free-solid-svg-icons"
import Page from "../components/Page"
import Spinner from "../components/Spinner"
import {Button} from "../components/Button"
import trust from "../assets/trust.png"
import scam from "../assets/scam.png"
import dao from "../assets/dao.png"
import ERC20ABI from "../assets/ABI/ERC20.json"
import Invalid from "../components/Invalid"

export default function Approve() {
    const {transactionID} = useParams()
    const navigate = useNavigate()
    const {address, db, approve, deposit, provider} = useContext(PeerContext)
    const [transaction, setTransaction] = useState(null)
    const [loading, setLoading] = useState(true)
    const [approved, setApproved] = useState(false)

    useEffect(() => {
        (async () => {
            if (address === null) return

            const transaction = await db.getTransaction(transactionID)

            if (transaction === null) {
                setLoading(false)
            } else {
                const currencyContract = new ethers.Contract(
                    "0xb106ed7587365a16b6691a3D4B2A734f4E8268a2",
                    ERC20ABI
                )

                const signer = await currencyContract.connect(provider.getSigner())
                const allowance = await signer.allowance(address, transactionID)

                if (allowance.gte(transaction.amount)) {
                    setApproved(true)
                }

                setTransaction(transaction)
                setLoading(false)
            }
        })()
    }, [address])

    const content = () => {
        if (loading) {
            return <Spinner/>
        } else if (transaction === null || transaction.buyer !== null) {
            return <Invalid/>
        } else {
            return (
                <Fragment>
                    <div className="w-full max-w-2xl pt-12 pb-8">
                        <div
                            className="w-full flex flex-col gap-2 bg-gray-800 border border-gray-700 rounded-xl px-8 py-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={transaction.title}
                                    disabled={true}
                                    className="flex-1 block w-full rounded-md border-0 py-1.5 bg-gray-700 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div>
                                <label htmlFor="description"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={transaction.description}
                                    disabled={true}
                                    className="flex-1 block w-full rounded-md border-0 py-1.5 bg-gray-700 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="flex justify-between gap-4">
                                <div className="flex-1">
                                    <label htmlFor="amount"
                                           className="block text-sm font-medium leading-6 text-white">
                                        Amount
                                    </label>
                                    <input
                                        type="text"
                                        name="amount"
                                        id="amount"
                                        value={ethers.utils.formatEther(BigNumber.from(transaction.amount)) + " EURe"}
                                        disabled={true}
                                        className="flex-1 block w-full rounded-md border-0 py-1.5 bg-gray-700 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="currency"
                                           className="block text-sm font-medium leading-6 text-white">
                                        Currency
                                    </label>
                                    <div>
                                        <input
                                            type="text"
                                            name="currency"
                                            id="currency"
                                            value="EURe"
                                            disabled={true}
                                            className="flex-1 block w-full rounded-md border-0 py-1.5 bg-gray-700 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 mt-2">
                                <Button
                                    disabled={address === null || approved}
                                    onClick={async () => {
                                        setLoading(true)
                                        const response = await approve(transactionID, transaction.amount)
                                        setApproved(response)
                                        setLoading(false)
                                    }} className="w-24">
                                    {approved ? <FontAwesomeIcon icon={faCheck}/> : "Approve"}
                                </Button>

                                <Button
                                    disabled={address === null || !approved}
                                    onClick={async () => {
                                        setLoading(true)
                                        const response = await deposit(transactionID)

                                        if (response) {
                                            await navigate(`/track/${transactionID}`)
                                        }

                                    }} className="w-24">
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl flex flex-col gap-8">
                        <div className="flex justify-between items-center">
                            <div className="w-80 text-end">
                                <p className="text-white text-lg font-semibold">Avoid Scams</p>
                                <p className="text-gray-300 font-medium mt-2">
                                    Control the flow of your funds, by only releasing them once you get what you purchased
                                </p>
                            </div>
                            <img src={scam} alt="Safe Transaction" className="w-80 rounded-xl"/>
                        </div>

                        <div className="flex justify-between items-center">
                            <img src={trust} alt="Feedback" className="w-80 rounded-xl"/>
                            <div className="w-80 text-start">
                                <p className="text-white text-lg font-semibold">Fairness</p>
                                <p className="text-gray-300 font-medium mt-2">
                                    when purchasing a good/service you lock it’s price plus a small deposit into a smart contract.
                                    Once you confirm the deliverance of the purchasse, you have to release the funds back to the seller and recieve back your deposit
                                </p>
                            </div>
                        </div>

                        <div className="relative flex justify-between items-center gap-8 pb-12">
                            <img src={dao} alt="Feedback" className="rounded-xl"/>
                            <div className="absolute text-gray-200 left-12 max-w-md">
                                <p className="text-lg font-semibold">Integrated DAO</p>
                                <p className="font-medium">DAO mediates flagged transactions with decentralized
                                    decision-making and transparent voting to punish bad actors.</p>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    return (
        <Page headerChildren={
            <p className="text-center text-white text-3xl font-bold">Approve the Transaction</p>
        }>
            {content()}
        </Page>
    )
}