interface Props {
    hp: string;
    attack: string;
    defense: string;
    spAttack: string;
    spDefense: string;
    speed: string;
}

function Stats({ hp, attack, defense, spAttack, spDefense, speed }: Props) {
    return (
        <div className='container'>
            <h6 className="text-center"><u>Pok&eacute;mon Stats:</u></h6>
            <div className="row row-cols-2">
                <div className="col">HP: {hp}</div>
                <div className="col">Sp. Attack: {spAttack}</div>
                <div className="col">Attack: {attack}</div>
                <div className="col">Sp. Defense: {spDefense}</div>
                <div className="col">Defense: {defense}</div>
                <div className="col">Speed: {speed}</div>
            </div>
        </div>
    )
}

export default Stats