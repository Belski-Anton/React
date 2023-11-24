'use client'
import { useState } from 'react'
import './style.css'
import Image from 'next/image'
import Dropdown from '../dropdown'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { changeForename, changePage, changeResultPerPage, changeTotalPage } from '../../../store/dataForApi/dataForApiSlice'


const Search = () => {
  const dispatch = useAppDispatch()
  const { dataForApiSlice } = useAppSelector((state) => state)
  const [inputValue, setInputValue] = useState(dataForApiSlice.forename)

  const handleImgClick = () => {
    dispatch(changeForename(inputValue))
    dispatch(changePage('1'))
    dispatch(changeTotalPage(0))
  }

  return (
    <div className="wrapperSelectSearch">
      <Dropdown />

      <div className="wrapperSearch">
        <input
          className="searchInput"
          type="text"
          placeholder="Search..."
          data-testid="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Image src='/assets/search.svg' alt='' width={20} height={19} className='searchImg' onClick={handleImgClick} />
      </div>
    </div>
  )
}

export default Search