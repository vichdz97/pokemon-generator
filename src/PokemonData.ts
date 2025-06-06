export interface Pokemon {
    id: number;
    name: string;
    sprite: string;
    spriteGif: string;
    shinySprite: string;
    shinyGif: string;
    types: string[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
        spAttack: number;
        spDefense: number;
        speed: number;
    };
    region: string;
    typeColors: string[];
}

export const REGIONS: Array<{ min: number, name: string }> = [
    { min: 906, name: 'Paldea (Gen IX)' },
    { min: 899, name: 'Hisui (Gen VIII)' },
    { min: 810, name: 'Galar (Gen VIII)' },
    { min: 722, name: 'Alola (Gen VII)' },
    { min: 650, name: 'Kalos (Gen VI)' },
    { min: 494, name: 'Unova (Gen V)' },
    { min: 387, name: 'Sinnoh (Gen IV)' },
    { min: 252, name: 'Hoenn (Gen III)' },
    { min: 152, name: 'Johto (Gen II)' },
    { min: 1, name: 'Kanto (Gen I)' },
];

export const TYPE_COLORS: { [key: string]: string } = {
    normal: '#A8A77A',
    grass: '#7AC74C',
    water: '#6390F0',
    fire: '#EE8130',
    electric: '#F7D02C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};

export const STATBAR_COLORS: Array<{ min: number, color: string }> = [
    { min: 150, color: 'rgb(87, 191, 183)'},    // TEAL
    { min: 120, color: 'rgb(98, 202, 107)'},    // GREEN
    { min: 90, color: 'rgb(175, 227, 75)'},     // LIGHTGREEN
    { min: 60, color: 'rgb(249, 222, 110)'},    // YELLOW
    { min: 30, color: 'rgb(239, 134, 54)'},     // ORANGE
    { min: 0, color: 'rgb(224, 83, 76)'}        // RED
];

export const FIXED_NAMES: { [key: string]: string } = {
    'dudunsparce-two-segment': 'Dudunsparcen (Two-Segment Form)',
    'dudunsparce-three-segment': 'Dudunsparce (Three-Segment Form)',
    'eiscue-ice': 'Eiscue (Ice Face)',
    'eiscue-noice': 'Eiscue (Noice Face)',
    'farfetchd': 'Farfetch\'d',
    'ho-oh': 'Ho-Oh',
    'indeedee-female': 'Indeedee (Female)',
    'jangmo-o': 'Jangmo-o',
    'hakamo-o': 'Hakamo-o',
    'kommo-o': "Kommo-o",
    'maushold-family-of-three': 'Maushold (Family of Three)',
    'maushold-family-of-four': 'Maushold (Family of Four)',
    'mime-jr': 'Mime Jr.',
    'mr-mime': 'Mr. Mime',
    'mr-rime': 'Mr. Rime',
    'nidoran-m': 'Nidoran♂',
    'nidoran-f': 'Nidoran♀',
    'palafin-zero': 'Palafin (Zero Form)',
    'palafin-hero': 'Palafin (Hero Form)',
    'porygon-z': 'Porygon-Z',
    'type-null': 'Type: Null',
    'wishiwashi-solo': 'Wishiwashi (Solo Form)',
    'wishiwashi-school': 'Wishiwashi (School Form)',
    'wo-chien': 'Wo-Chien',
    'ting-lu': 'Ting-Lu',
    'chien-pao': 'Chien-Pao',
    'chi-yu': 'Chi-Yu',
};