import {useEffect, useContext, useState} from "react"
import {PeerContext} from "../components/Context"
import Page from '../components/Page'
import Spinner from '../components/Spinner'
import {ButtonLink} from "../components/Button"
import {dateFormat, linkifyTx} from "../utils/parse"

export default function Track() {
    const {db, address} = useContext(PeerContext)
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);


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
                <div className="w-full max-w-5xl overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 rounded-xl">
                        <thead className="bg-gray-800">
                        <tr>
                            <th scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Transaction
                            </th>
                            <th scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Owner
                            </th>
                            <th scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Buyer
                            </th>
                            <th scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                State
                            </th>
                            <th scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Date Issued
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-gray-700">
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <ButtonLink to={`/track/${transaction.id}`}
                                          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-slate-300 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                                        {linkifyTx(transaction.id)}
                                    </ButtonLink>

                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {linkifyTx(transaction.seller)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {transaction.buyer ? linkifyTx(transaction.buyer) : "No buyer yet"}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {getTxState(transaction)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{dateFormat(transaction.timestamp)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            }
            {
                loading &&
                <Spinner/>
            }

        </Page>
    )
}