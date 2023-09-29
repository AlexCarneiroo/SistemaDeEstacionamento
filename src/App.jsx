import { useEffect, useState } from 'react'
import './app.css'



function App() {

  //abri e fechar cadastro
  const[modal , setModal] = useState(false)
  
  //value dos inputs
  const [nameCar, setNameCar] = useState('')
  const [placaCar, setPlacaCar] = useState('')
  // Arrays dos carros
  const[infoCar,setInfoCar] = useState([])
  //Horarios
  const [horaCadastrado , setHora] = useState('')
  
  
  useEffect(()=>{
    const getCar = JSON.parse(localStorage.getItem('meuArrays'))
    if(getCar){
      setInfoCar(getCar)
      hora()
    }
  },[])

  const hora = ()=>{
    const horaa = new Date().getHours()
    const minutos = new Date().getMinutes()
  
    setHora(`${horaa}:${minutos}`)
  }


  const handlCadastra = ()=>{

    if(nameCar == '' || placaCar == ''){
      alert('Digite o Nome e placa do carro!')
    }else{
      const newCar = {
        nome:nameCar,
        placa:placaCar,
        horario:horaCadastrado
      }
  
      setInfoCar([...infoCar , newCar])
      localStorage.setItem('meuArrays' , JSON.stringify([...infoCar , newCar]))
      setNameCar('')
      setPlacaCar('')
      hora()
    }

  }



  const handlDelete = (id)=>{
    const updateCar = [...infoCar]
    updateCar.splice(id , 1)
    setInfoCar(updateCar)
    localStorage.setItem('meuArrays' , JSON.stringify(updateCar))
  }

  const handlfechar = ()=>{
    if(!modal){
      setModal(true)
    }else{
      setModal(false)
    }
  }
  const handlAbrir = ()=>{
    setModal(false)
  }


  return(

      <div>
        <div className='header'>
          <h1>Sistema De Estacionamento</h1>
        </div>

        {!modal &&
          <div className="cadastro">
            <div className="inputs">
              <div className="inp">
                <label htmlFor="">Nome Do Carro:</label>
                <input type="search" placeholder='Celta' value={nameCar} onChange={(e)=>setNameCar(e.target.value)}/>
              </div>
              <div className="inp">
                <label htmlFor="">Placa do Veiculo:</label>
                <input type="text" placeholder='123BC' value={placaCar} onChange={(e)=>setPlacaCar(e.target.value)}/>
              </div>
              <br />
            </div>
            <button onClick={handlCadastra}>Cadastrar</button>
            <span onClick={handlfechar}>Fechar</span>
          </div>
        }
        {modal && <>
          <button className='btncadastro' onClick={handlAbrir}>Cadastra Veiculo</button>
        </>}
        <div className="container">
          <h1>Lista de Carros</h1>
          <h2> Total de Veiculos - {infoCar.length} </h2>

          <div className="tabela">
            <table>
              <thead>
                <tr>
                  <th>Nome do Carro</th>
                  <th>Placa do Carro</th>
                  <th>Horario De Entrada</th>
                </tr>
              </thead>
              <tbody>
                {infoCar.map((item,index)=>(
                  <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{item.placa}</td>
                    <td>{item.horario}</td>
                    <td><button className='buDelete' onClick={()=>handlDelete(index)}>Delete</button></td>
                    <td><button className='buPagar'>Pago</button></td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
  )


}

export default App
