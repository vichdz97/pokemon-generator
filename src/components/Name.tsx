interface Props {
    name: string;
}

function Name({ name }: Props) {
    return (
        <h4 className="p-0 m-0">{name}</h4>
    )
}

export default Name