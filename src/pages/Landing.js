import Page from "../components/Page"
import {ButtonLink} from "../components/Button"

export default function Landing() {
    return (
        <Page>
            <div className="mx-auto max-w-2xl">
                <div className="text-center p-4">
                <h1 className="text-4xl font-bold tracking-tight text-slate-300 sm:text-6xl">
                        Welcome to <span className='text-blue-600'>PeerPal</span>
                    </h1>
                    <h1 className="mt-10 text-2xl font-bold tracking-tight text-slate-400 sm:text-4xl">
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
                    <div className="flex flex-col mt-10 justify-center gap-4 sm:flex-row">
                        <ButtonLink to="/open" className="sm:w-72">
                            Get started
                        </ButtonLink>
                        {/*<p className="text-slate-400">or</p>*/}
                        <ButtonLink to='/track' className="sm:w-72">
                            Track your Transactions!
                        </ButtonLink>
                    </div>
                </div>
            </div>
        </Page>
    )
}
