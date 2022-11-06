import React from 'react'
import { useUserData } from '../../context/user-context';

const Home = () => {
  const { name } = useUserData();
  return (
    <div>Hello { name }</div>
  )
}

export { Home };