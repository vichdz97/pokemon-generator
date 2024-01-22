import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

function Heading({ children }: Props) {
    return (
        <h1 className='text-dark'>
            <img src='pokeball.png' width='50' className='mb-1 mx-1' />
            {children}
        </h1>
    )
}

export default Heading