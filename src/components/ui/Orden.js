import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../firebase';

export const Orden = ({ orden }) => {

    // Context de firebase
    const { firebase } = useContext(FirebaseContext);

    const [tiempoEntrega, setTiempoEntrega] = useState(0)


    // define el tiempo de entrega en tiempo real
    // toma el id del pedido para saber cual fue
    const definirTiempo = id => {
        try {
            firebase.db.collection('ordenes')
                // paso el id q stoy trayendo
                .doc(id)
                // para actualizar solo esta parte del documento en firebase
                .update({
                    tiempoEntrega
                })
        } catch (error) {
            console.log(error);
        }
    }

    // Completa el estado de una orden
    const completarOrden = id => {
        try {
            firebase.db.collection('ordenes')
                .doc(id)
                .update({
                    completado: true
                })
            // eliminaOrden(id)
        } catch (error) {
            console.log(error);
        }
    }


    // elimina la orden ya completada
    // const eliminaOrden = id => {
    //     console.log(id);
    //     try {
    //         firebase.db.collection('ordenes').doc(id).delete()
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }



    return (
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 shadow-md bg-white">
                <h1 className="text-yellow-600 text-lg font-bold"> {orden.id} </h1>
                {orden.orden.map(platillos => (
                    <p className="text-gray-600"> {platillos.cantidad} {platillos.nombre} </p>
                ))}

                <p className="text-gray-700 font-bold">Total a Pagar: $ {orden.total}</p>

                {/* tiempoEntrega es igual a cero retornamos lo siguiente */}
                {orden.tiempoEntrega === 0 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tiempo de Entrega
                        </label>

                        <input
                            // solo acepta numeros
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
                            // cantidad minima
                            min="1"
                            // la cantidad maxima
                            max="20"
                            placeholder="20"
                            value={tiempoEntrega}
                            // parseInt para poner los numeros
                            onChange={e => setTiempoEntrega(parseInt(e.target.value))}
                        />
                        {/* para definir el tiempo de la orden completada */}
                        <button
                            // pasamos el orden.id para saber la orden en especifico
                            onClick={() => definirTiempo(orden.id)}
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                        >
                            Definir Tiempo
                        </button>
                    </div>
                )}

                {/* si ya definimos q el tiempo de entrega esmayor a cero */}
                {orden.tiempoEntrega > 0 && (
                    <p className="text-gray-700">Tiempo de Entrega:
                        <span className="font-bold"> {orden.tiempoEntrega} Minutos</span>
                    </p>
                )}
                {/* si la orden no esta completada y si el tiempo de entrega es mayor a cero */}
                {!orden.completado && orden.tiempoEntrega > 0 && (
                    <button
                        type="button"
                        className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
                        // pasamos el id para que sepa cual es la que tiene que completar
                        onClick={() => completarOrden(orden.id)}
                    >
                        Marcar como lista
                    </button>
                )}
            </div>
        </div>
    )
}
