import React, { useContext, useRef } from 'react'
import { FirebaseContext } from '../../firebase';

export const Platillo = ({ platillo }) => {
    // context de firebase para cambios en la BD
    const { firebase } = useContext(FirebaseContext)

    // Existencia ref para acceder al valor directamente
    const existenciaRef = useRef(platillo.existencia);

    const { id, nombre, imagen, existencia, categoria, precio, descripcion } = platillo;

    // modificar el estado del platillo en firebase
    const actualizarDisponibilidad = () => {
        // forma de modificar un string true o false a un boleano y esto ya nos regresa un true o false 
        const existencia = (existenciaRef.current.value === "true");

        try {
            firebase.db.collection('productos')
            // este es como el where cuando estas actualizando en firebase
                .doc(id)
                // aca le digo que solo actualice esa parte como nombre las dos igual pues solo coloco una ves el nombre
                .update({
                    existencia
                });
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="w-full px-3 mb-4">
            {/* shadow-md es una sombra de tamaño mediano */}
            <div className="p-5 shadow-md bg-white">
                {/* en un dispositivo grande le colocamos flexbox */}
                <div className="lg:flex">
                    {/* toma 5 espacio de 12 disponibles en resto son 7 los tomamos abajo */}
                    {/* xl es una pantalla muy grande ahi toma 3 de las 12 columnas */}
                    <div className="lg:w-5/12 xl:w-3/12">
                        {/* mostramos la imagen del platillo */}
                        <img src={imagen} alt=" imagen platillo " />

                        <div className="sm:flex sm:-mx-2 pl-2">
                            {/* label de la existencia */}
                            <label className="block mt-5 sm:w-2/4">
                                <span className="block text-gray-800 mb-2">Existencia</span>
                                {/* el select para poner si esta o no disponible*/}
                                <select
                                    className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    // para que se mire el valor en base a ka existencia de la base de datos
                                    value={existencia}
                                    ref={existenciaRef}
                                    onChange={() => actualizarDisponibilidad()}
                                >
                                    <option value="true">Disponible</option>
                                    <option value="false">No Disponible</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    {/* aca es donde tomamos el resto de la pantalla */}
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                        {/* aca ponemos el nombre en color amarillo */}
                        <p className="font-bold text-2xl text-yellow-600 mb-4">{nombre}</p>
                        <p className="text-gray-600 mb-4">Categoría: {''}
                            {/* con toUpperCase ponemos el nombre en mayusculas */}
                            <span className="text-gray-700 font-bold">{categoria.toUpperCase()}</span>
                        </p>
                        <p className="text-gray-600 mb-4">{descripcion} </p>

                        <p className="text-gray-600 mb-4">Precio: {''}
                            <span className="text-gray-700 font-bold">${precio}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
