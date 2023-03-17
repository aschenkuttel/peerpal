import {useParams} from 'react-router-dom'
import bg from '../assets/bg.png'
import {Button} from '../components/Button'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useEffect, useContext} from "react"
import {PeerContext} from "../components/Context"

export default function Track() {
    const {db} = useContext(PeerContext)
    const {transactionID} = useParams()

    const people = [
        {transaction: transactionID, state: 'Pending', date: '2023-03-17'},
        // More people...
    ]

    useEffect(() => {
        (async () => {
           await db.getTransaction(transactionID)
        })()
    },[])

    return (
        <div className="flex-1 bg-gray-900">
            <Header>
                <p className="text-center text-3xl font-medium">Track your Transaction</p>
            </Header>
            <div className="relative isolate overflow-hidden pt-14">
                <img
                    src={bg}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
                />
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                    <svg
                        className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                        viewBox="0 0 1155 678"
                    >
                        <path
                            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                            fillOpacity=".2"
                            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                        />
                        <defs>
                            <linearGradient
                                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                                x1="1155.49"
                                x2="-78.208"
                                y1=".177"
                                y2="474.645"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#9089FC"/>
                                <stop offset={1} stopColor="#FF80B5"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>


                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">Transactions</h1>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Transaction
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                State
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Date
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                        {people.map((transaction) => (
                                            <tr key={transaction.transaction}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.transaction}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.state}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.date}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <svg
                        className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                        viewBox="0 0 1155 678"
                    >
                        <path
                            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                            fillOpacity=".2"
                            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                        />
                        <defs>
                            <linearGradient
                                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                                x1="1155.49"
                                x2="-78.208"
                                y1=".177"
                                y2="474.645"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#9089FC"/>
                                <stop offset={1} stopColor="#FF80B5"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            <Footer/>
        </div>
    )
}