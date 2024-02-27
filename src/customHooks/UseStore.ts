import React from 'react'
import { storesContext } from '../stores/storeContext'


export const useStores = () => React.useContext(storesContext)