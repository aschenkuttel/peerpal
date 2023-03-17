import {Fragment, useContext, useState} from "react"
import {Listbox, Transition} from "@headlessui/react"
import {Link} from "react-router-dom"
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {BigNumber, utils} from "ethers"
import clsx from "clsx"
import Header from "../components/Header"
import Footer from "../components/Footer"
import {Button} from "../components/Button"
import {PeerContext} from "../components/Context"
import feedback from "../assets/feedback.png"
import safeTransaction from "../assets/safe_transaction.png"
import dao from "../assets/dao.png"
import Spinner from "../components/Spinner";


export default function Open() {
    const {address, openTransaction} = useContext(PeerContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState(BigNumber.from(0))
    const [loading, setLoading] = useState(false)
    const [transactionURL, setTransactionURL] = useState("")

    // hardcoded for poc
    const selected = {
        symbol: "EURe",
        address: "EURe"
    }

    const content = () => {
        if (loading) {
            return <Spinner/>
        } else if (transactionURL) {
            return <a href={transactionURL} rel="noopener">{transactionURL}</a>
        } else {
            return (
                <Fragment>
                    <div className="w-full max-w-2xl py-12">
                        <div
                            className="w-full flex flex-col gap-2 bg-gray-100 border border-gray-200 rounded-xl px-8 py-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        maxLength="64"
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        placeholder="Productname"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div>
                            <textarea
                                name="description"
                                id="description"
                                maxLength="240"
                                onChange={(e) => setDescription(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                placeholder="A short description of your product/service"
                            />
                                </div>
                            </div>

                            <div className="flex justify-between gap-4">
                                <div className="flex-1">
                                    <label htmlFor="amount"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Amount
                                    </label>
                                    <div>
                                        <input
                                            type="text"
                                            name="amount"
                                            id="amount"
                                            onChange={(e) => {
                                                try {
                                                    setAmount(utils.parseEther(e.target.value))
                                                } catch (_) {
                                                    setAmount(BigNumber.from(0))
                                                }
                                            }}
                                            className="flex-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <Listbox value={selected} disabled={true}>
                                        {({open}) => (
                                            <>
                                                <Listbox.Label
                                                    className="block text-sm font-medium leading-6 text-gray-900">
                                                    Currency
                                                </Listbox.Label>
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                                                        disabled={true}>
                                                        <span className="block truncate">{selected.symbol}</span>
                                                        <span
                                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options
                                                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {[selected].map((currency) => (
                                                                <Listbox.Option
                                                                    key={currency.address}
                                                                    className={({active}) =>
                                                                        clsx(
                                                                            active ? 'bg-blue-600 text-white' : 'text-gray-900',
                                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                        )
                                                                    }
                                                                    value={currency}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                        <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {currency.symbol}
                        </span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={clsx(
                                                                                        active ? 'text-white' : 'text-blue-600',
                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                    )}
                                                                                >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 mt-2">
                                <Button
                                    disabled={address === null || !title || !description || amount.eq(0)}
                                    onClick={async () => {
                                        setLoading(true)
                                        const transactionURL = await openTransaction(title, description, amount)
                                        setTransactionURL(transactionURL)
                                        setLoading(false)
                                    }} className="w-24">
                                    Confirm
                                </Button>
                                <Link to="/" className="w-24 rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900
                        shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-center">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className={loading ? "hidden" : ""}>
                        <p className="text-3xl font-medium mt-4">How it works</p>

                        <div className="w-full max-w-2xl flex flex-col gap-12 mt-8">
                            <div className="flex justify-between items-center gap-12">
                                <div className="text-end">
                                    <p className="text-lg font-semibold">Secure your payment</p>
                                    <p className="font-medium">Smart contract locks the funds of your costumer, so you
                                        can
                                        ship
                                        your goods safely
                                        knowing that you will get paid</p>
                                </div>
                                <img src={safeTransaction} alt="Safe Transaction" className="max-w-xs rounded-xl"/>
                            </div>

                            <div className="flex justify-between items-center gap-12">
                                <img src={feedback} alt="Feedback" className="max-w-xs rounded-xl"/>
                                <div>
                                    <p className="text-lg font-semibold">Forced feedback</p>
                                    <p className="font-medium">Upon purchase your client deposits the value of the goods
                                        and
                                        a
                                        small deposit.
                                        Once the parcel arrives, your client unlocks the money and gets his deposit
                                        back.</p>
                                </div>
                            </div>

                            <div className="relative flex justify-between items-center gap-12 pb-12">
                                <img src={dao} alt="Feedback" className="rounded-xl"/>
                                <div className="absolute text-gray-200 left-12 max-w-md">
                                    <p className="text-lg font-semibold">Integrated DAO</p>
                                    <p className="font-medium">DAO mediates flagged transactions with decentralized
                                        decision-making and transparent voting to punish bad actors.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    return (
        <Fragment>
            <Header>
                <p className="text-center text-3xl font-medium">Open your Transaction</p>
            </Header>
            <div className="flex-1 flex flex-col justify-center items-center p-4 bg-gray-50">
                {content()}
            </div>

            <Footer/>
        </Fragment>
    )
}