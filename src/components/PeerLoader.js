import {useState, useRef, useEffect} from "react"
import {Transition} from "@headlessui/react"
import arrowUp from "../assets/logo_arrow_up.png"
import arrowDown from "../assets/logo_arrow_down.png"

export default function PeerLoader({className}) {
    const [isShowing, setIsShowing] = useState(true)
    const effectInterval = useRef(null)

    useEffect(() => {
        setIsShowing(true)

        effectInterval.current = setInterval(() => {
            setIsShowing(prevState => !prevState)
        }, 1000)
        return (() => {
            clearInterval(effectInterval.current)
        })
    }, [])

    return (
        <div className="relative w-20 flex items-start justify-center">
            <div className="absolute flex flex-col gap-1 mx-auto">
                <Transition
                    show={isShowing}
                    enter="transition duration-150 transform"
                    enterFrom="opacity-10 translate-x-6"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition duration-200 transform"
                    leaveFrom="opacity-100 -translate-x-0"
                    leaveTo="opacity-10 -translate-x-5">
                    <img src={arrowUp} className="h-5" alt=""/>
                </Transition>
                <Transition
                    show={isShowing}
                    enter="transition duration-150 transform"
                    enterFrom="opacity-10 -translate-x-6"
                    enterTo="opacity-100 -translate-x-0"
                    leave="transition duration-200 transform"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-10 translate-x-5">
                    <img src={arrowDown} className="h-5" alt=""/>
                </Transition>
            </div>
        </div>
    )
}