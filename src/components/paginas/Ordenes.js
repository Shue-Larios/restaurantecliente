import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase';
import { Orden } from '../ui/Orden';


export const Ordenes = () => {

  // context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  // state con las ordenes
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const obtenerOrdenes = () => {
      firebase.db.collection('ordenes').where('completado', '==', false).onSnapshot(manejarSnapshot);
    }
    obtenerOrdenes()
  }, [])

  // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
  function manejarSnapshot(snapshot) {
    const ordenes = snapshot.docs.map(doc => {
      return {
        // para retornar un id
        id: doc.id,
        // obtenemos una copia de toda la informacion
        ...doc.data()
      }
    });
    // almacenar los resultados en el state
    setOrdenes(ordenes);
  }




  return (
    <>
      <h1 className='text-3xl font-light mb-4'>Ordenes</h1>
      <div className='sm:flex sm:flex-wrap -mx-3'>
      {ordenes.map(orden => (
        <Orden
          key={orden.id}
          // esto se manda como prosp
          orden={orden}
        />
      ))}
      </div>
     

    </>
  )
}
