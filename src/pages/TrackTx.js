import {useParams, Link} from 'react-router-dom'
import {useEffect, useContext, useState} from "react"
import {PeerContext} from "../components/Context"
import Page from '../components/Page'
import Spinner from '../components/Spinner'
import Invalid from '../components/Invalid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faChevronRight, faArrowsRotate, faCheck} from '@fortawesome/free-solid-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'



export default function TrackTx() {
    const {db, address} = useContext(PeerContext)
    const {transactionID} = useParams()
    const [receivedTx, setReceivedTx] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBuyer,setBuyer] = useState(false);
    const [isSeller,setSeller] = useState(false);

    useEffect(() => {
        (async () => {
            await db.getTransaction(transactionID)
            const tx = await db.getTransaction(transactionID)
            if ([tx.seller, tx.buyer].includes(address)) {
                setReceivedTx(tx)
            }
            setLoading(false)
        })()
    }, [])



    

    const content = () => {
        if (loading) {
            return <Spinner/>
        } else if (receivedTx != null && address == receivedTx.seller) {
            return <div className="w-full max-w-5xl">
                <div className="sm:flex sm:items-center">

                <nav className="flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                    <li>
                    <div>
                        <Link to="/" className="text-gray-400 hover:text-gray-500">
                            <FontAwesomeIcon icon={faHouse}/>
                        <span className="sr-only">Home</span>
                        </Link>
                    </div>
                    </li>

                    <li >
                        <div className="flex items-center">
                        <FontAwesomeIcon icon={faChevronRight} className="shrink-0 text-gray-400"/>
                        <Link
                            to="/track"
                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            Track
                        </Link>
                        </div>
                    </li>

                    <li>
                        <div className="flex items-center">
                        <FontAwesomeIcon icon={faChevronRight} className="shrink-0 text-gray-400"/>
                        <Link
                            to='/' disabled={true}
                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            {receivedTx.id}
                        </Link>
                        </div>
                    </li>
                </ol>
                </nav>
                
                    
                
                </div>

                <div className="h-full bg-gray-800 border border-gray-700 rounded-xl px-8 py-4">
                    <div className="flex h-24 justify-between">
                    <FontAwesomeIcon icon={faEthereum} className="text-8xl text-gray-400 shrink-0"/>
                    <div className="flex-1 h-1/2 border-b-2 border-gray-400 mx-8"/>
                    <FontAwesomeIcon icon={faArrowsRotate} className="text-8xl text-gray-400 shrink-0"/>
                    <div className="flex-1 h-1/2 border-b-2 border-gray-400 mx-8"/>
                    <FontAwesomeIcon icon={faCheck} className="text-8xl text-gray-400 shrink-0"/>
                </div>
                
                    
                </div>
                
                
            </div>
            

        } else {
            return <Invalid/>
        }
    }


    return (
        <Page>

            {content()}
        </Page>

    )
}