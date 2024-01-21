interface Props {
    region: string;
}

function Region({ region }: Props) {
    return (
        <p className="text-secondary">{region}</p>
    )
}

export default Region