import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {

    const { socket } = useContext(SocketContext);

    const [bands, setBands] = useState([]);

    useEffect(() => {
        socket.on('current-bands', (data) => {
            setBands(data);
        });
        //* Se limpia
        return () => socket.off('current-bands');
    }, [socket]);

    const cambioNombre = (event, id) => {
        const nuevoNombre = event.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = nuevoNombre;
            }
            return band;
        }))
    }

    const onPerdioFoco = (id, nombre) => {
        // TODO: Disparar el evento del socket
        socket.emit('cambiar-nombre-banda', { id, nombre });
    }

    const onBorrar = (id) => {
        socket.emit('borrar-banda', id);
    }

    const onVotar = (id) => {
        socket.emit('votar-banda', id);
    }


    const crearRows = () => {
        return (
            bands.map(band => (
                < tr key={band.id}>
                    <td>
                        <button className='btn btn-primary' onClick={() => onVotar(band.id)}>+1</button>
                    </td>
                    <td>
                        <input
                            className='form-control'
                            placeholder=''
                            value={band.name}
                            onChange={(event) => cambioNombre(event, band.id)}
                            onBlur={() => onPerdioFoco(band.id, band.name)} />
                    </td>
                    <td><h3>{band.votes}</h3></td>
                    <td>
                        <button className='btn btn-danger' onClick={() => onBorrar(band.id)}>Borrar</button>
                    </td>
                </tr >
            ))

        )
    }
    return (

        <>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {crearRows()}
                </tbody>
            </table>
        </>
    )
}
