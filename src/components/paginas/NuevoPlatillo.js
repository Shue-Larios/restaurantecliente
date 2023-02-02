import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase'
// para importar el FileUploader
import FileUploader from 'react-firebase-file-uploader'


export const NuevoPlatillo = () => {

  // useState para los archivos
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0) // subes una imagen y comienza en cero x eso ese es el valor inicial
  const [urlImagen, setUrlImagen] = useState('')

  // nos permite leer un context
  // context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext)

  // console.log(firebase);

  // hook para redireccionar
  const navigate = useNavigate()

  // validacion y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: '',
    },
    // para la validaciones
    validationSchema: Yup.object({
      nombre: Yup.string().min(3, 'Los platillos deben tener al menos 3 caracteres').required('El nombre del platillo es obligatorio'),
      precio: Yup.number().min(1, 'Debes agregar un numero').required('El precio del platillo es obligatorio'),
      categoria: Yup.string().required('La categoria es obligatoria'),
      descripcion: Yup.string().min(10, 'la descripcion debe tener al menos 10 caracteres').required('la descripcion es obligatoria'),
    }),
    onSubmit: platillo => {
      try {
        // asi agregamos un campo mas a la coleccion de la base
        platillo.existencia = true;
        // agregamos como otro campo la url de la imagen
        platillo.imagen = urlImagen;
        firebase.db.collection('productos').add(platillo)
        // redireccionamos y mandamos la ruta
        navigate('/menu');
      } catch (error) {
        console.log(error);
      }
    }
  })

  // todo sobre las imagenes
  const handleUploadStart = () => {
    setProgreso(0)
    setSubiendo(true)
  }
  const handleUploadError = (error) => {
    setSubiendo(false)
    console.log(error);
  }
  const handleUploadSuccess = async (nombre) => {
    setProgreso(100)
    setSubiendo(false)
    // almacenar la url de destino
    const url = await firebase
      .storage
      // donde se va a guardar
      .ref('productos')
      .child(nombre)
      // para qe retorne la url y la asigne a la variable
      .getDownloadURL()
    console.log(url);
    setUrlImagen(url)
  }

  const handleProgress = (progreso) => {
    setProgreso(progreso)
    console.log(progreso);
  }
  // fin de lo que se ocupa para subir archivos

  return (
    <>
      <h1 className='text-3xl font-light mb-4'>Agregar Platillo</h1>
      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-3xl'>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>Nombre</label>
              <input
                id='nombre'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Nombre Platillo'
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {/* muestra el error esto toca hacerlo uno x uno */}
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role='alert'>
                <p className='font-bold'>Hubo un error:</p>
                <p>{formik.errors.nombre}</p>
              </div>
            )
              : null
            }


            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>Precio</label>
              <input
                id='precio'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='number'
                placeholder='$20'
                min='0'
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* muestra el error esto toca hacerlo uno x uno */}
            {formik.touched.precio && formik.errors.precio ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role='alert'>
                <p className='font-bold'>Hubo un error:</p>
                <p>{formik.errors.precio}</p>
              </div>
            )
              : null
            }


            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='categoria'>Categoria</label>
              <select
                id='precio'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                name='categoria'
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value=''>-- Seleccione --</option>
                <option value='desayuno'>Desayuno</option>
                <option value='comida'>Comida</option>
                <option value='cena'>Cena</option>
                <option value='bebida'>Bebidas</option>
                <option value='postre'>Postre</option>
                <option value='ensalada'>Ensalada</option>
              </select>
            </div>
            {/* muestra el error esto toca hacerlo uno x uno */}
            {formik.touched.categoria && formik.errors.categoria ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role='alert'>
                <p className='font-bold'>Hubo un error:</p>
                <p>{formik.errors.categoria}</p>
              </div>
            )
              : null
            }



            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='imagen'>Imagen</label>
              {/* para subir los archivos usamos esto */}
              <FileUploader
                // esto quiere decir que solo aceptamos imagenes nada mas
                accept="image/*"
                id="imagen"
                name="imagen"
                // pone un nombre aleatorio para que no se repita
                randomizeFilename
                // creamos una carpeta en la cual se van aguardar las imagenes
                storageRef={firebase.storage.ref('productos')}
                // para cuando empieza a subir la imagen
                onUploadStart={handleUploadStart}
                // la imagen no se subio correctamente
                onUploadError={handleUploadError}
                // cuando se sube la imagen da la url donde se guardo
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>
            {/* para mostrar una barra de progreso de subiendo la imagen */}
            {subiendo && (
              <div className='h-12 relative w-full border'>
                <div className='bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center' style={{ width: `${progreso}%` }}>
                  {progreso} %
                </div>
              </div>
            )}

{/* mostramos parrafo diciendo que la imagen se subio correctamente */}
 {/* cuando urlImagen tiene algo se va a ejeuctra */}
{urlImagen && (
  <p className='bg-green-500 text-white p-3 text-center my-5 mb-3'>La Imagen se subio correctamente</p>
)}

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='descripcion'>Descripcion</label>
              <textarea
                id='descripcion'
                className='h-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Descripcion del platillo'
                value={formik.values.descripcion}
                onChange={formik.handleChange}
              >
              </textarea>
            </div>

            {/* muestra el error esto toca hacerlo uno x uno */}
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role='alert'>
                <p className='font-bold'>Hubo un error:</p>
                <p>{formik.errors.descripcion}</p>
              </div>
            )
              : null
            }


            <input
              type='submit'
              className='bg-gray-800 hover:bg-gray-900 cursor-pointer w-full mt-5 p-2 text-white uppercase font-bold'
              value='Agregar Platillo'
            />
          </form>
        </div>

      </div>

    </>

  )
}
