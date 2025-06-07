import './App.css'
import { useState } from 'react'
import axios from 'axios'
import { Pokemon, REGIONS, TYPE_COLORS, STATBAR_COLORS, FIXED_NAMES } from './PokemonData';
import StatRows from './StatRows';

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const GEN_LIMIT = 1025;

function App() {
    const [ pokemon, setPokemon ] = useState<Pokemon | null>(null);
    const [ searchInput, setSearchInput ] = useState('');
    const [ error, setError] = useState(false);
    const [ displaySprite, setDisplaySprite ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showInstructions, setShowInstructions ] = useState(true);

    const getRegion = (id: number): string => {
        const region = REGIONS.find(choice => id >= choice.min);
        return region ? region.name : 'Undiscovered';
    }

    const getTypeColors = (types: string[]): string[] => {
        return types.map(type => TYPE_COLORS[type] || 'lightgray');
    }

    const getStatbarColor = (value: number): string => {
        const found = STATBAR_COLORS.find((choice) => value >= choice.min);
        return found ? found.color : 'rgb(0, 0, 0)';
    }

    const capitalize = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const prettifyString = (str: string, region?: string): string => {
        if (FIXED_NAMES[str]) return FIXED_NAMES[str];

        if (str.includes('tapu') || (region?.includes('Paldea') && !str.includes('gourgeist') && !str.includes('therian'))) {
            const [first, last] = str.split('-');
            return `${capitalize(first)} ${capitalize(last)}`;
        }

        if (str.includes('-')) {
            const [first, ...rest] = str.split('-');
            if (rest.includes('incarnate') || rest.includes('therian')) rest.push('form');
            return `${capitalize(first)} (${rest.map(word => capitalize(word)).join(' ')})`;
        }

        return capitalize(str);
    }

    // TODO: convert ogg to mp3 -> https://cloudconvert.com/api/v2#overview
    const playSound = (src: string): void => { 
        const audio = new Audio(src);
        audio.volume = 0.1;
        audio.play();
    };

    const storePokemonData = (data: any) => {
        const types = data.types.map((typeData: any) => typeData.type.name);
        const newPokemon: Pokemon = {
            id: data.id,
            name: prettifyString(data.name, getRegion(data.id)),
            sprite: data.sprites.front_default,
            spriteGif: data.sprites.other.showdown.front_default,
            shinySprite: data.sprites.front_shiny,
            shinyGif: data.sprites.other.showdown.front_shiny,
            types: types,
            stats: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                spAttack: data.stats[3].base_stat,
                spDefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat
            },
            region: getRegion(data.id),
            typeColors: getTypeColors(types)
        };

        setPokemon(newPokemon);
    };

    const getPokemon = (name: string) => {
        setSearchInput('');
        setError(false);
        setPokemon(null);
        setIsLoading(true);
        
        const randomNum = Math.floor(Math.random() * GEN_LIMIT + 1);
        const nameInAPI = name.toLowerCase().replace(/\s/g, '-').replace(/[\.]/g, '');
        const URL = `${BASE_URL}/${name.trim() === '' ? randomNum : nameInAPI}`;

        axios.get(URL)
            .then(response => {
                setShowInstructions(false);
                storePokemonData(response.data);
                setDisplaySprite(response.data.sprites.other.showdown.front_default || response.data.sprites.front_default );
                playSound(response.data.cries.latest);
            })
            .catch(() => setError(true))
            .finally(() => setIsLoading(false));
    }

    return (
        <div>
            <div className='w-75 mx-auto my-4'>
                <div className='d-flex align-items-center justify-content-center'>
                    <img src="pokeball.png" alt="pok&eacute;ball" width={45} />
                    <h2 className='m-0'>Pok&eacute;mon Generator</h2>
                </div>
                <div className='input-group my-2'>
                    <input 
                        type="text"
                        className='form-control'
                        placeholder='Search Pok&eacute;mon'
                        value={searchInput}
                        onChange={e => {
                            setSearchInput(e.target.value);
                            setError(false);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && getPokemon(searchInput)}
                    />
                    <button className='btn btn-primary' onClick={() => getPokemon(searchInput)}>Generate</button>
                </div>
                <p className='text-danger text-center' hidden={!error}>Error loading Pok&eacute;mon</p>
            </div>

            {/* INSTRUCTIONS */}
            { showInstructions && (
                <div className='d-sm-flex justify-content-center m-4 p-4 bg-light rounded shadow'>
                    <div className='d-flex flex-column align-items-center'>
                        <h3 className='text-decoration-underline'>Instructions:</h3>
                        <p className='m-0 fw-normal text-center'>Enter any Pok&eacute;mon name or its ID above to generate their stats!</p>
                        <p className='m-2 fw-bold'>OR</p>
                        <p className='m-0 text-center'>Just click on the generate button for a random Pok&eacute;mon!</p>
                    </div>
                </div>
            )}
                    
            { pokemon ? (
                <div className='d-sm-flex justify-content-center m-4 p-4 bg-light rounded shadow'>
                    {/* POKEMON SPRITE */}
                    <div className='flex-fill d-flex flex-column align-items-center justify-content-center'>
                        <div className='flex-fill d-flex flex-column align-items-center justify-content-evenly gap-4'>
                            <img 
                                src={displaySprite} 
                                alt={`${pokemon.name} ${displaySprite === pokemon.shinySprite ? 'shiny sprite' : 'sprite'}`} 
                                width={'70%'}
                                className='m-0 p-0'
                            />
                            <div className='d-flex align-items-center justify-content-center gap-2'>
                                <button className='sprite-btn' onClick={() => setDisplaySprite(pokemon.spriteGif || pokemon.sprite)}>
                                    <img src={pokemon.sprite} alt={`${pokemon.name} sprite`} />
                                </button>
                                <button className='sprite-btn' onClick={() => setDisplaySprite(pokemon.shinyGif || pokemon.shinySprite)}>
                                    <img src={pokemon.shinySprite} alt={`${pokemon.name} shiny sprite`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* POKEMON INFO */}
                    <div className='flex-fill d-flex align-items-center justify-content-center justify-content-sm-start'>
                        <div className='d-flex flex-column' style={{minWidth: '100%', width: '75%', maxWidth: '75%'}}>
                            {/* ID */}
                            <h6 className='text-center text-secondary fw-light m-0'>#{pokemon.id.toString().padStart(3, '0')}</h6>

                            {/* NAME */}
                            <h3 className='text-center m-0'>{pokemon.name}</h3>

                            {/* REGION */}
                            <h6 className='text-center text-secondary fst-italic fw-light m-0'>{pokemon.region}</h6>

                            {/* TYPES */}
                            <div className='d-flex justify-content-center gap-2 p-4 text-light'>
                                <div className='text-center rounded p-1' style={{backgroundColor: pokemon.typeColors[0], width: 100}}>{prettifyString(pokemon.types[0])}</div>
                                { pokemon.typeColors.length === 2 && <div className='text-center rounded p-1' style={{backgroundColor: pokemon.typeColors[1], width: 100}}>{prettifyString(pokemon.types[1])}</div> }
                            </div>

                            {/* STATS */}
                            <div className='flex-fill d-flex flex-column align-items-center justify-content-center'>
                                <h3 className='text-decoration-underline'>Pok&eacute;mon Stats</h3>
                                <StatRows pokemon={pokemon} getStatbarColor={getStatbarColor} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='d-flex flex-column gap-4 align-items-center justify-content-center text-light' style={{height: '50vh'}}>
                    <div className="spinner-border" role="status" hidden={!isLoading}></div>
                    <h3 hidden={!isLoading}>Searching...</h3>
                </div>
            )}
        </div>
    )
}

export default App
