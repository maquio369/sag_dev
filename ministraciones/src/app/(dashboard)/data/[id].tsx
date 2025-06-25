// Importa la biblioteca 'React' para utilizar sus funcionalidades en este componente
import React from 'react'

// Importa el hook 'useRouter' de la biblioteca 'next/router' para acceder al objeto del enrutador
import { useRouter } from 'next/router'

// Exporta una función anónima como componente predeterminado
export default () => {
  // Utiliza el hook 'useRouter' para obtener una instancia del enrutador de Next.js
  const router = useRouter()

  // Extrae la propiedad 'id' del objeto 'query' del enrutador para acceder al valor de 'id' en la ruta actual
  const { id } = router.query

  // Devuelve el JSX del componente que se mostrará en la página
  return (
    // Elemento 'h1' que muestra el valor de 'id' obtenido de la ruta
    <h1>Param: {id} </h1>
  )
}