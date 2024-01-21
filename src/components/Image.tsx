interface Props {
    sprite: string;
}

function Image({ sprite }: Props) {
    return (
        <img src={sprite} alt='Image of pokemon' width='150' className="p-0 m-0"/>
    )
}

export default Image