import {useParams, Link} from 'react-router-dom'
import {useEffect, useContext, useState} from "react"
import {PeerContext} from "../components/Context"
import Page from '../components/Page'
import Spinner from '../components/Spinner'

export default function Track() {
    const {db, address} = useContext(PeerContext)
    const [transactions, setTransactions] = useState([]);
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            await db.getTransactions(address)
            const a = await db.getTransactions(address)
            setTransactions(a)
            setLoading(false)
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

    function dateFormat(timestamp){
      const time = new Date(parseInt(timestamp)*1000);
      const day = time.getDate();
      const month = time.getMonth() +1;
      const year = time.getFullYear();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      
      // create a formatted date string using the day, month, and year
      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      
    }

    function linkifyTx(tx){
      const txF = tx.substring(tx.length-6, tx.length);
      return `0x...${txF}`;
    }

    return (
        <Page>
          {
            !loading &&
              <div className="mt-8 flow-root max-w-5xl w-full">
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
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <Link to={`/track/${transaction.id}`} className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-slate-300 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                                    {linkifyTx(transaction.id)}
                                    </Link>
                                    
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {linkifyTx(transaction.seller) }
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
                </div>
            </div>
          } 
          {
            loading &&
            <Spinner/>
          }
            
        </Page>
    )
}