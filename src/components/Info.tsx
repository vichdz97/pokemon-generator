import "../App.css"
import { ReactNode } from "react"

interface Props {
    onLoad: () => void;
    children: ReactNode;
}


function Info({ onLoad, children }: Props) {
    return (
        <div className='info-box p-3 bg-light shadow rounded d-flex flex-column justify-content-center align-items-center'
            onLoad={onLoad}>
            {children}
        </div>

    )
}

export default Info