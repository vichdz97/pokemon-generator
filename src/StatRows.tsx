import { Pokemon } from "./PokemonData";

interface Props {
    pokemon: Pokemon;
    getStatbarColor: (value: number) => string;
}

function StatRows({ pokemon, getStatbarColor }: Props) {

    const stats: Array<{ label: string, value: number }> = [
        { label: 'HP', value: pokemon.stats.hp },
        { label: 'Attack', value: pokemon.stats.attack },
        { label: 'Defense', value: pokemon.stats.defense },
        { label: 'Sp. Attack', value: pokemon.stats.spAttack },
        { label: 'Sp. Defense', value: pokemon.stats.spDefense },
        { label: 'Speed', value: pokemon.stats.speed }
    ];

    return (
        <div className="w-100">
            { stats.map(stat => (
                <div className='row m-0 d-flex align-items-center gap-2' key={stat.label}>
                    <p className='col-4 m-0 p-0 text-end'>{stat.label}:</p>
                    <p className='col-1 m-0 p-0 text-end'>{stat.value}</p>
                    <div className='col p-0 rounded' style={{width: '100%', height: '15px'}}>
                        <div className='h-100 rounded'
                            style={{
                                width: `${(stat.value / 255) * 100}%`,
                                backgroundColor: getStatbarColor(stat.value)
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatRows;