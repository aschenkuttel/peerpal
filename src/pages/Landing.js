import {Link} from 'react-router-dom'
import bg from '../assets/bg.png'



export default function Landing() {
    return (
        <div className="relative flex-1 bg-gray-900">

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

            <div className="absolute w-full z-20">
                <header className="w-full">
                    <Link to="/">
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt=""
                        />
                    </Link>
                </header>

                {/*<FontAwesomeIcon icon={faHouse}/>*/}

                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
                            A trustless and safe way to ensure your transactions are honored!
                        </h1>
                        <p className="mt-10 text-lg leading-8 text-gray-200">
                            Welcome to PeerPal! Our platform offers a secure and reliable way for traders to
                            transact with digital assets, using advanced blockchain technology. Our escrow service
                            acts as a trusted third party between the buyer and seller, ensuring that both parties
                            fulfill their obligations and that the transaction is completed successfully. The
                            mediation part in case of bad acting will be taken care by our dedicated community of
                            trusted mediators within our DAO.
                        </p>
                        <div className="flex flex-col mt-10 justify-center gap-y-6">
                            <Link to="/open"
                                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-slate-300 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                                Get started
                            </Link>
                            <p className="text-gray-200">or</p>
                            <input
                                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                placeholder="0x00000000..." type="text" name="search"/>
                            <Link to="/track"
                                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-slate-300 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                                Track your Tx
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <img
                src={bg}
                alt=""
                className="inset-0 h-full w-full object-cover opacity-25"
            />
        </div>
    )
}
