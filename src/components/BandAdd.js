import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

    const { socket } = useContext(SocketContext);

    const [valor, setValor] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        if (valor.length > 0) {
            //TODO LLamar la funcion para llamar el evento
            socket.emit('crear-banda', valor);
        }
        setValor('');
    }
    return (
        <>
            <h3>Agregar Banda</h3>
            <form onSubmit={onSubmit}>
                <input className='form-control' placeholder='Nuevo nombre de banda' value={valor} onChange={(event) => setValor(event.target.value)} />
            </form>
        </>
    )
}
