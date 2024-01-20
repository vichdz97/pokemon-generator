import './App.css'

function App() {

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className='my-4 d-flex flex-column align-items-center'>
                <h1 className='text-center text-dark'>Pok&eacute;mon Generator</h1>
                <a className='btn btn-primary'>Generate</a>
            </div>
            <div className='info-box p-3 border border-dark rounded bg-light d-flex flex-column justify-content-center align-items-center'>
                <span>Pokemon Name</span>
                <img src='/' alt='image of pokemon'></img>
            </div>
        </div>
    )
}

export default App
