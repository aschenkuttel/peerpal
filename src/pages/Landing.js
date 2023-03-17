import {Link} from 'react-router-dom'
import Page from "../components/Page"

export default function Landing() {
    return (
        <Page>
            <div className="mx-auto max-w-2xl">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-300 sm:text-6xl">
                        A trustless and safe way to ensure your transactions are honored!
                    </h1>
                    <p className="mt-10 text-lg leading-8 text-slate-400">
                        Welcome to PeerPal! Our platform offers a secure and reliable way for traders to transact
                        with digital assets, using advanced blockchain technology. Our escrow service acts as a
                        trusted third party between the buyer and seller, ensuring that both parties fulfill their
                        obligations and that the transaction is completed successfully. The mediation part in case
                        of bad acting will be taken care by our dedicated community of trusted mediators within our
                        DAO.
                    </p>
                    <div className="flex flex-col mt-10 justify-center gap-y-6">
                        <Link to="/open"
                              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-slate-300 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            Get started
                        </Link>
                        <p className="text-slate-400">or</p>
                        <Link to='/track'
                              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-slate-300 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            Track your Transactions!
                        </Link>
                    </div>
                </div>
            </div>
        </Page>
    )
}
