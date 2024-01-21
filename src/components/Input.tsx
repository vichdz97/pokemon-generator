interface Props {
    value: string;
    onChange: (input: any) => void;
}

function Input({ value, onChange }: Props) {
    return (
        <input type='text' className='form-control' placeholder='Enter a Pok&eacute;mon name'
        value={value}
        onChange={onChange} />
    )
}

export default Input