import React, {useState} from 'react';
import api from './Api';
import '../Styles.css'


function Finder(props){

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({})

    async function Search(){
        if(input === ''){
            alert('Por favor preencha um cep')
            return
        }

        try{
            const request = await api.get(`${input}/json`)
            setCep(request.data)
            setInput('')
        }catch{
            alert('Erro, digite um cep válido.')
            setInput('')
        }
    }

    return(
        <div className="container">

            <h1 className='title'>CEP Finder</h1>
            <div className='input-container'>
                <input onChange={((event)=>{setInput(event.target.value)})} value={input} type="text" placeholder='Digite o cep'></input>
                <button onClick={Search} className='btn'>Procurar</button>
            </div>

          {Object.keys(cep).length > 0 && (
            <main className='main-content'>
                <h2>CEP: {cep.cep}</h2>
                <span>Logradouro: {cep.logradouro}</span>
                <span>Complemento: {cep.complemento}</span>
                <span>Bairro: {cep.bairro}</span>
                <span>{cep.localidade} - {cep.uf}</span>
            </main>
            )}
        </div>
    )

}


export default Finder;