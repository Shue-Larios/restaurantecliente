import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'
import { Platillo } from '../ui/Platillo'

export const Menu = () => {

  // definir el state para los platillos
  const [platillos, setPlatillos] = useState([])
  const { firebase } = useContext(FirebaseContext);


  // consultar la base de datos al cargar
  useEffect(() => {
    const obtenerPlatillos = () => {
      // onSnapshot para obtener los valores en tiempo real sin recargar la pagina ni nada 
      // productos es como se llama la coleccion en firebase cuidado con eso
      firebase.db.collection('productos').onSnapshot(manejarSnapshot);
    }
    obtenerPlatillos();
  }, []);


  // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
  function manejarSnapshot(snapshot) {
    const platillos = snapshot.docs.map(doc => {
      return {
        // para retornar un id
        id: doc.id,
        // obtenemos una copia
        ...doc.data()
      }
    });
    // almacenar los resultados en el state
    setPlatillos(platillos);
  }



  return (
    <>
      <h1 className='text-3xl font-light mb-4'>Menu</h1>
      <Link
        className='bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold'
        to='/nuevo-platillo'>Agregar Platillo</Link>
       
       {platillos.map(platillo => (
        <Platillo 
        key={platillo.id}
        platillo={platillo}
        />
       ))}
    </>
  )
}
