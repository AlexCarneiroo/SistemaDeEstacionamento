import { useEffect, useState } from 'react'
import './app.css'
import * as C from './styledComponets'
import {FaTrashCan} from 'react-icons/fa6'



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

  //botão
  const [modalDelete , setModalDelete] = useState(false)
  const [nomeDelete , setNomeDelete] = useState('')
  const [placaDelete , setPlacaDelete] = useState('')
  const [id, setId] =useState(0)

  const [alerta,setAlerta] = useState(false)
  const [alertaDelete, setAlertaDelete] = useState(false);


  useEffect(()=>{
    const handleScroll = (event) => {
      if (modalDelete) {
        event.preventDefault();
      }
    };
  
    if(modalDelete){
      document.body.style.overflow = 'hidden'
      window.removeEventListener('scroll' , handleScroll )
    }else{
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll' , handleScroll )
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  },[modalDelete])

  
  
  useEffect(()=>{
    const getCar = JSON.parse(localStorage.getItem('meuArrays'))
    if(getCar){
      setInfoCar(getCar)
      horas()
    }
  },[])




  const horas = ()=>{
    const horaa = new Date()
    const minutos = new Date()

    let horaFormatada = horaa.getHours() < 10 ? `0${horaa.getHours()}` : `${horaa.getHours()}`;
    let minutosFormatados = minutos.getMinutes() < 10 ? `0${minutos.getMinutes()}` : `${minutos.getMinutes()}`;

    setHora(`${horaFormatada}:${minutosFormatados}`)

  }

  const handlAlerta = ()=>{
    setTimeout(()=>{
      setAlerta(false)
    },2000)
  }
  const handlAlertaDelete = ()=>{
    setTimeout(()=>{
      setAlertaDelete(false)
    },2000)
  }




  const color ={
    color:'#1A5D1A'
  }


  const handlCadastra = ()=>{
    
    if(nameCar == '' || placaCar == ''){
      alert('Digite o Nome e placa do carro!')
    }else{
      horas()
      setAlerta(true)
      handlAlerta()
      const newCar = {
        nome:nameCar,
        placa:placaCar,
        horario:horaCadastrado,
        horarioBaixa:null,
        baixa:false
      }
      

      
      setInfoCar([...infoCar , newCar])
      localStorage.setItem('meuArrays' , JSON.stringify([...infoCar , newCar]))
      setNameCar('')
      setPlacaCar('')
    }

  }



  const handlDelete = (id)=>{
    const updateCar = [...infoCar]
    updateCar.splice(id , 1)
    setInfoCar(updateCar)
    localStorage.setItem('meuArrays' , JSON.stringify(updateCar))
    setModalDelete(false)
    setAlertaDelete(true)
    handlAlertaDelete()
  }

  const handlfechar = ()=>!modal ? setModal(true) : setModal(false);

  const handlBaixa = (id)=>{

    const horaa = new Date()
    const minutos = new Date()
    let horaDaBaixa = `${horaa.getHours()}:${minutos.getMinutes() < 10 ? '0' : ''}${minutos.getMinutes()}`;

    const updateCar = [...infoCar]
    updateCar[id].horarioBaixa = horaDaBaixa;
    updateCar[id].baixa = true
    setInfoCar(updateCar)
    localStorage.setItem('meuArrays', JSON.stringify(updateCar))
    
  }

  const handlAbrir = ()=>{
    !modal ? setModal(true) : setModal(false)
  } 


  const handlModalDelete = (id)=>{
    modalDelete ? setModalDelete(false) : setModalDelete(true)
    const updateCar = [...infoCar]
    setNomeDelete(updateCar[id].nome)
    setPlacaDelete(updateCar[id].placa)
    setId(id)
  }
  const handlFechaModal = ()=> setModalDelete(false)




  return(

      <div className='body'>
        <div className='header'>
          <h1>Sistema De Estacionamento</h1>
        </div>

          <>
            <C.cadastro $modal={modal} className='cadastro'>
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
            </C.cadastro>
          </>
        {modal && 
          <button className='btncadastro' onClick={handlAbrir} >Cadastra Veiculo</button>
        }

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
                  <th>Horario Da Baixa</th>

                </tr>
              </thead>
              <tbody>
                {infoCar.map((item,index)=>(
                  <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{item.placa}</td>
                    <td>{item.horario}</td>
                    <td style={color}>{item.horarioBaixa}</td>

                    <td className='btns'>
                      <FaTrashCan className='buDelete' onClick={()=>handlModalDelete(index)}/>
                      <C.BtnBaixa className='buPagar' $baixa={!item.baixa} onClick={()=>handlBaixa(index)} disabled={item.baixa}>Dar Baixa</C.BtnBaixa>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
        {modalDelete && 

          <div className="modalDelete">
            <div className="conteudo-modal">
              <span>Tem Certeza que deseja Deletar?</span>
              <h1>Nome do Veiculo: </h1><h4>{nomeDelete}</h4>
              <h1>Placa do Veiculo: </h1><h3>{placaDelete}</h3>
              <button onClick={()=>handlDelete(id)} className='deletarList'>Sim Deletar!</button>

              <button className='fechar' onClick={handlFechaModal}>X</button> 
            </div>
          </div>
        }


        <C.AlertaDelete $alertaDelete={alertaDelete} className='AlertaDelete'>
          <h1>Veiculo Deletado!</h1>
        </C.AlertaDelete>
        <C.Alerta $teste={alerta} className="alerta">
            <h1>Veiculo adicionado!</h1>
        </C.Alerta>
      </div>

  )


}

export default App
