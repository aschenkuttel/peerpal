import {Link, useParams} from 'react-router-dom'
import {Fragment, useContext, useEffect, useState} from "react"
import clsx from "clsx"
import {PeerContext} from "../components/Context"
import Page from '../components/Page'
import PeerLoader from '../components/PeerLoader'
import Invalid from '../components/Invalid'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowsRotate, faCheck, faChevronRight, faHouse} from '@fortawesome/free-solid-svg-icons'
import {faEthereum} from '@fortawesome/free-brands-svg-icons'
import {amountFormat, dateFormat} from '../utils/parse'
import {Button} from '../components/Button'


export default function TrackTx() {
    const {db, address, confirm, cancel} = useContext(PeerContext)
    const {transactionID} = useParams()
    const [receivedTx, setReceivedTx] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (address === null) return

            await db.getTransaction(transactionID)
            const tx = await db.getTransaction(transactionID)

            if ([tx.seller, tx.buyer].includes(address)) {
                setReceivedTx(tx)
            }
            setLoading(false)
        })()
    }, [address])


    const content = () => {
        if (loading) {
            return <PeerLoader/>
        } else if (receivedTx === null || ![receivedTx.seller, receivedTx.buyer].includes(address)) {
            return <Invalid/>
        } else {
            return <div className="w-full max-w-5xl">
                <div className="sm:flex sm:items-center">
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
                                        className="ml-4 text-sm font-medium text-gray-500  hover:text-gray-700"
                                    >
                                        Track
                                    </Link>
                                </div>
                            </li>

                            <li>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faChevronRight} className="shrink-0 text-gray-400"/>
                                    <Link
                                        to='/'
                                        className="ml-4 text-sm font-medium text-gray-500 pointer-events-none"
                                    >
                                        {receivedTx.id}
                                    </Link>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div
                    className="flex flex-col items-center h-full bg-gray-800 border border-gray-700 rounded-xl px-8 py-4 gap-12">

                    <div className="flex flex-1 justify-between w-full">
                        <div className="text-start">
                            <p className="text-gray-400 mt-2 font-semibold text-2xl">Product: {receivedTx.title}</p>
                            <p className="text-slate-200 mt-2 max-w-lg">Description: {receivedTx.description}</p>
                        </div>
                        <div className="text-end">
                            <p className="text-slate-200 mt-2 align-right">Date
                                Issued: {dateFormat(receivedTx.timestamp)}</p>
                            <p className="text-slate-200 mt-2 align-right">Amount: {amountFormat(receivedTx.amount)}</p>
                        </div>

                    </div>

                    <div className="flex mt-5 max-w-2xl w-full">
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon fixedWidth icon={faEthereum}
                                             className={clsx("text-7xl text-green-600 shrink-0", !receivedTx.buyer && !receivedTx.completed && "animate-pulse")}/>
                            <p className="text-slate-200 mt-2">Open</p>
                        </div>
                        <div className="flex-1 h-12 border-b-2 border-gray-400 mx-8"/>
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon fixedWidth icon={faArrowsRotate}
                                             className={clsx("text-7xl text-gray-400 shrink-0", receivedTx.buyer && "text-green-600", receivedTx.buyer && !receivedTx.completed && "animate-pulse")}/>
                            <p className="text-slate-200 mt-2">On-Going</p>
                        </div>
                        <div className="flex-1 h-12 border-b-2 border-gray-400 mx-8"/>
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon fixedWidth icon={faCheck} className={clsx("text-7xl text-gray-400 shrink-0", receivedTx.completed && "text-green-600")}/>
                            <p className="text-slate-200 mt-2">Finished</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 py-8 ">
                        {
                            receivedTx.seller === address ?
                                <Fragment>
                                    <Button disabled={true} className="w-32">Packing</Button>
                                    <Button disabled={true} className="w-32">Shipping</Button>
                                </Fragment>
                                :
                                <Fragment>
                                    <Button onClick={async () => {
                                        setLoading(true)
                                        await confirm(receivedTx.id)
                                        setLoading(false)
                                        setReceivedTx(receivedTx)
                                    }} disabled={receivedTx.completed} className="w-32">Received</Button>

                                    <Button onClick={async () => {
                                        setLoading(true)
                                        await cancel(receivedTx.id)
                                        setLoading(false)
                                    }} disabled={receivedTx.completed} className="w-32">Cancel</Button>
                                </Fragment>
                        }
                    </div>
                </div>
            </div>
        }
    }


    return (
        <Page>

            {content()}
        </Page>

    )
}