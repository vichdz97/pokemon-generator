import { ReactNode } from "react";

interface Props {
    color: string;
    onClick: () => void;
    children: ReactNode;
}

function Button({color, onClick, children }: Props) {
    return (
        <a className={"btn btn-" + color} role='button' onClick={onClick}>{children}</a>
    )
}

export default Button