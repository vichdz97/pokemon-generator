import './App.css'
import { useState } from 'react'
import axios from 'axios'
import clickSfx from './assets/click.mp3';

import Button from './components/Button';
import Info from './components/Info';
import Name from './components/Name';
import Image from './components/Image';
import Type from './components/Type';
import Input from './components/Input';
import Heading from './components/Heading';
import ErrorMessage from './components/ErrorMessage';
import Stats from './components/Stats';
import Region from './components/Region';

function App() {
    const URL = "https://pokeapi.co/api/v2/pokemon/";
    const GEN_LIMIT = 1025;
    const [ randomNum, setRandomNum ] = useState(Math.floor(Math.random() * GEN_LIMIT + 1));
    
    const [ audio ] = useState(new Audio(clickSfx));
    const playSound = () => audio.play();

    const [ region, setRegion ] = useState('');
    const [ pokemonID, setPokemonID ] = useState(0);
    const [ pokemonName, setPokemonName ] = useState('');
    const [ pokemonSprite, setPokemonSprite ] = useState('');
    const [ pokemonShiny, setPokemonShiny] = useState('');
    const [ pokemonType, setPokemonType ] = useState('');
    const [ pokemonType2, setPokemonType2 ] = useState('');

    const [ hp, setHP ] = useState('');
    const [ attack, setAttack ] = useState('');
    const [ defense, setDefense ] = useState('');
    const [ spAttack, setSpAttack ] = useState('');
    const [ spDefense, setSpDefense ] = useState('');
    const [ speed, setSpeed ] = useState('');

    const [ bgColor, setBgColor ] = useState('');
    const [ bgColor2, setBgColor2 ] = useState('');

    const [ pokemonInput, setPokemonInput ] = useState('');
    const [ showErrorMsg, setShowErrorMsg] = useState(false);

    const capitalizeString = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const getPokemon = () => {
        showErrorMsg ? setShowErrorMsg(false) : showErrorMsg;
        setPokemonInput('');
        if (pokemonType2)
            setPokemonType2('');

        setRandomNum(Math.floor(Math.random() * GEN_LIMIT + 1));
        axios.get(URL + randomNum.toString())
            .then(response => {
                setPokemonID(response.data.id);
                setPokemonName(capitalizeString(response.data.name));
                setPokemonSprite(response.data.sprites.front_default);
                setPokemonShiny(response.data.sprites.front_shiny);
                setPokemonType(response.data.types[0].type.name);
                if (response.data.types[1])
                    setPokemonType2(response.data.types[1].type.name)

                setHP(response.data.stats[0].base_stat);
                setAttack(response.data.stats[1].base_stat);
                setDefense(response.data.stats[2].base_stat);
                setSpAttack(response.data.stats[3].base_stat);
                setSpDefense(response.data.stats[4].base_stat);
                setSpeed(response.data.stats[5].base_stat);

                playSound();
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getPokemonByName = (name: string) => {
        if (name == '') return;
        if (pokemonType2)
            setPokemonType2('');

        axios.get(URL + name.toLowerCase())
            .then(response => {
                setPokemonID(response.data.id);
                setPokemonName(capitalizeString(response.data.name));
                setPokemonSprite(response.data.sprites.front_default);
                setPokemonShiny(response.data.sprites.front_shiny);
                setPokemonType(response.data.types[0].type.name);
                if (response.data.types[1])
                    setPokemonType2(response.data.types[1].type.name)

                setHP(response.data.stats[0].base_stat);
                setAttack(response.data.stats[1].base_stat);
                setDefense(response.data.stats[2].base_stat);
                setSpAttack(response.data.stats[3].base_stat);
                setSpDefense(response.data.stats[4].base_stat);
                setSpeed(response.data.stats[5].base_stat);

                setPokemonInput('');

                playSound();
            })
            .catch(() => {
                setPokemonInput('');
                setShowErrorMsg(true);
                setPokemonName('');
            });
    }

    const getGeneration = (id: number) => {
        if (id >= 906) setRegion('Paldea (Gen IX)');
        else if (id >= 899) setRegion('Hisui (Gen VIII)');
        else if (id >= 810) setRegion('Galar (Gen VIII)');
        else if (id >= 722) setRegion('Alola (Gen VII)');
        else if (id >= 650) setRegion('Kalos (Gen VI)');
        else if (id >= 494) setRegion('Unova (Gen V)');
        else if (id >= 387) setRegion('Sinnoh (Gen IV)');
        else if (id >= 252) setRegion('Hoenn (Gen III)');
        else if (id >= 152) setRegion('Johto (Gen II)');
        else if (id > 0) setRegion('Kanto (Gen I)');
        else setRegion('Undiscovered');
    }

    const setColors = (type: string, type2?:string) => {
        switch (type) {
            case 'normal': setBgColor('#A8A77A'); break;
            case 'grass': setBgColor('#7AC74C'); break;
            case 'water': setBgColor('#6390F0'); break;
            case 'fire': setBgColor('#EE8130'); break;
            case 'electric': setBgColor('#F7D02C'); break;
            case 'ice': setBgColor('#96D9D6'); break;
            case 'fighting': setBgColor('#C22E28'); break;
            case 'poison': setBgColor('#A33EA1'); break;
            case 'ground': setBgColor('#E2BF65'); break;
            case 'flying': setBgColor('#A98FF3'); break;
            case 'psychic': setBgColor('#F95587'); break;
            case 'bug': setBgColor('#A6B91A'); break;
            case 'rock': setBgColor('#B6A136'); break;
            case 'ghost': setBgColor('#735797'); break;
            case 'dragon': setBgColor('#6F35FC'); break;
            case 'dark': setBgColor('#705746'); break;
            case 'steel': setBgColor('#B7B7CE'); break;
            case 'fairy': setBgColor('#D685AD'); break;
            default: setBgColor('lightgray');
        }

        if (type2) {
            switch (type2) {
                case 'normal': setBgColor2('#A8A77A'); break;
                case 'grass': setBgColor2('#7AC74C'); break;
                case 'water': setBgColor2('#6390F0'); break;
                case 'fire': setBgColor2('#EE8130'); break;
                case 'electric': setBgColor2('#F7D02C'); break;
                case 'ice': setBgColor2('#96D9D6'); break;
                case 'fighting': setBgColor2('#C22E28'); break;
                case 'poison': setBgColor2('#A33EA1'); break;
                case 'ground': setBgColor2('#E2BF65'); break;
                case 'flying': setBgColor2('#A98FF3'); break;
                case 'psychic': setBgColor2('#F95587'); break;
                case 'bug': setBgColor2('#A6B91A'); break;
                case 'rock': setBgColor2('#B6A136'); break;
                case 'ghost': setBgColor2('#735797'); break;
                case 'dragon': setBgColor2('#6F35FC'); break;
                case 'dark': setBgColor2('#705746'); break;
                case 'steel': setBgColor2('#B7B7CE'); break;
                case 'fairy': setBgColor2('#D685AD'); break;
                default: setBgColor2('lightgray');
            }
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className='my-4 d-flex flex-column align-items-center'>
                <Heading>Pok&eacute;mon Generator</Heading>
                <div className="input-group">
                    <Input value={pokemonInput} 
                        onChange={input => {
                            setPokemonInput(input.target.value);
                            showErrorMsg ? setShowErrorMsg(false) : showErrorMsg;
                        }} />
                    <Button color='secondary' onClick={() => getPokemonByName(pokemonInput)}>Search</Button>
                </div>
                <ErrorMessage hidden={!showErrorMsg}>Please enter a valid Pok&eacute;mon name</ErrorMessage>
                <span className='my-2'>- or -</span>
                <Button color='primary' onClick={getPokemon}>Generate</Button>
            </div>

            { pokemonName ? 
                <Info onLoad={() => {
                    pokemonType2 ? setColors(pokemonType, pokemonType2) : setColors(pokemonType);
                    getGeneration(pokemonID);
                }}>
                    <Name name={pokemonName} />
                    <Region region={region}/>
                    <div className='flex-row'>
                        <Image sprite={pokemonSprite} />
                        <Image sprite={pokemonShiny} />
                    </div>
                    <div className="d-flex flex-row">
                        <Type backgroundColor={bgColor}>{capitalizeString(pokemonType)}</Type>
                        {pokemonType2 ? <Type backgroundColor={bgColor2}>{capitalizeString(pokemonType2)}</Type> : null}
                    </div>
                    <Stats hp={hp} attack={attack} defense={defense} spAttack={spAttack} spDefense={spDefense} speed={speed} />
                </Info> 
                : null 
            }
        </div>
    )
}

export default App
