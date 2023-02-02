import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export const Sidebar = () => {
    const location = useLocation();

   const urlActual = location.pathname

    return (
        // md:w-2/5  dice que en una pantalla mediana va a tomar dos quintas partes
        // xl:w1/5 dice q en pantallas grandes va a tomar un quinto
        <div className='md:w-2/5 xl:w-1/5 bg-gray-800'>
            <div className='p-6'>
                <p className='uppercase text-white text-2xl tracking-wide text-center font-bold'>RestaurantApp</p>
                <p className='mt-3 text-gray-600'>Administra tu restaurante en las siguientes opciones:</p>

                <nav className='mt-10'>
                    <NavLink
                        className={`${urlActual === '/' ? 'text-yellow-400' : 'text-gray-400'} 
                        p-1 block hover:bg-yellow-400 hover:text-gray-400`}
                        to="/"
                    >Ordenes</NavLink>
                     <NavLink
                        className={`${urlActual === '/menu' ? 'text-yellow-400' : 'text-gray-400'} 
                        p-1 block hover:bg-yellow-400 hover:text-gray-400`}
                        to="/menu"
                    >Menu</NavLink>
   
                </nav>
            </div>


        </div>
    )
}
