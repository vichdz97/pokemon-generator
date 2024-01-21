import { ReactNode } from "react";

interface Props {
    backgroundColor: string;
    children: ReactNode;
}

function Type({ backgroundColor, children }: Props) {
    return (
        <h5 className={'px-2 py-1 mx-1 mb-3 border border-dark rounded text-center text-light'} 
            style={{backgroundColor: backgroundColor, width: 90}}>
                {children}
        </h5>
    )
}

export default Type