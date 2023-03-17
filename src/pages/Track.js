import {useParams, Link} from 'react-router-dom'
import bg from '../assets/bg.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useEffect, useContext, useState} from "react"
import {PeerContext} from "../components/Context"
import Page from '../components/Page'

export default function Track() {
    const {db, address} = useContext(PeerContext)

    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        (async () => {
            await db.getTransactions(address)
            const a = await db.getTransactions(address)
            setTransactions(a)
        })()
    }, [])


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
            <div className="mt-8 flow-root">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"></div>
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
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
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.id}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.seller}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {transaction.buyer ? transaction.buyer : "No buyer yet"}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {getTxState(transaction)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{

                                    }</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Page>
    )
}