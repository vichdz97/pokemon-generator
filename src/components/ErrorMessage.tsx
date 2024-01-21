import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    hidden: boolean
}

function ErrorMessage({ hidden, children }: Props) {
    return (
        <p className='text-danger mt-1' hidden={hidden}>{children}</p>
    )
}

export default ErrorMessage