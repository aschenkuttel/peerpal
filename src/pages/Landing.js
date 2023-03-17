import {Link} from 'react-router-dom'
import bg from '../assets/bg.png'
import Footer from '../components/Footer'
import Header from '../components/Header'


export default function Landing() {
    return (
        <div className="relative flex flex-col flex-1 bg-gray-900">
            <Header className="bg-transparent border-b-0 shadow-none"/>

            <div className="relative flex justify-center items-center flex-1 isolate overflow-hidden">
                <div className="absolute z-50 mx-auto max-w-2xl">
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

            </div>
            <Footer className="bg-transparent border-t-0 shadow-none text-gray-200"/>

            {/*background image + svgs*/}
            <div className="absolute w-full h-full overflow-hidden">
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
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

                <div
                    className="absolute inset-x-0 top-[-10rem] transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                    <svg
                        className="left-[calc(50%-11rem)] h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
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

                <img
                    src={bg}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
                />
            </div>

        </div>
    )
}
