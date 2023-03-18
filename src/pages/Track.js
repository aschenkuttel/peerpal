import {useEffect, useContext, useState} from "react"
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight, faHouse} from "@fortawesome/free-solid-svg-icons"
import {PeerContext} from "../components/Context"
import Page from '../components/Page'
import PeerLoader from "../components/PeerLoader"
import {ButtonLink} from "../components/Button"
import {dateFormat, linkifyTx} from "../utils/parse"

export default function Track() {
    const {db, address} = useContext(PeerContext)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            if (address == null) return
            await db.getTransactions(address)
            const transactions = await db.getTransactions(address)
            setTransactions(transactions)
            setLoading(false)
        })()
    }, [address])

    function getTxState(props) {
        if (props.seller && props.buyer && !props.completed) {
            return <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
        On-Going
        </span>
        } else if (props.seller && !props.buyer && !props.completed) {
            return <span
                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
        Open
        </span>
        } else if (props.seller && props.buyer && props.completed) {
            return <span
                className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
        Finished
        </span>
        } else {
            return <span
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
        N/A
        </span>
        }
    }

    return (
        <Page>
            {
                !loading &&
                <div className="w-full max-w-5xl">
                    <nav className="flex ml-2.5 mb-2.5" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <div>
                                    <Link to="/" className="text-gray-400 hover:text-gray-500">
                                        <FontAwesomeIcon icon={faHouse}/>
                                        <span className="sr-only">Home</span>
                                    </Link>
                                </div>
                            </li>

                            <li>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faChevronRight} className="shrink-0 text-gray-400"/>
                                    <Link
                                        to="/track"
                                        className="ml-4 text-sm font-medium text-gray-500 pointer-events-none">
                                        Track
                                    </Link>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="overflow-hidden shadow border border-gray-800 rounded-xl">
                        <table className="min-w-full divide-y divide-gray-700 rounded-xl">
                            <thead className="bg-gray-800">
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">
                                    Transaction
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                                    Owner
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                                    Buyer
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                                    State
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                                    Date Issued
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 bg-gray-800">
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="whitespace-nowrap px-3 py-4">
                                        <ButtonLink to={`/track/${transaction.id}`} className="w-32">
                                            {linkifyTx(transaction.id)}
                                        </ButtonLink>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {linkifyTx(transaction.seller)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {transaction.buyer ? linkifyTx(transaction.buyer) : "No buyer yet"}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {getTxState(transaction)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {dateFormat(transaction.timestamp)}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {
                loading &&
                <PeerLoader/>
            }

        </Page>
    )
}