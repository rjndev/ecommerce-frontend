import React from 'react'

import { FormControl, Button, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import useProductDetails from '../hooks/useProductDetails'
import { useNavigate } from 'react-router-dom/dist'

function SearchBar() {
  const [clickedItem, setClickedItem] = useState(false)
  const [focusSearch, setFocusSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [showSearchResult, setShowSearchResult] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const {getSearchProduct} = useProductDetails('https://amazonia-backend.onrender.com')
  const nav = useNavigate()

  const handleSearchText = async () => {
    
    if(searchText === "") {
      setShowSearchResult(false)
      return
    }     

    const result = await getSearchProduct(searchText)

    console.log(result)
    setSearchResults(result)

    if(result.length !== 0)
      setShowSearchResult(true)
    else
      setShowSearchResult(false)
  }


  const handleKeyDown = (event) => {
    if(event.key === "Enter") {
      nav(`/search/${searchText}`)
    }
  }

  const handleSearchClick = (id) => {
    console.log(`CLICKED SEARCH ${id}` )
    nav(`/product/${id}`)
    setSearchText('')
    setShowSearchResult(false)
  }

  const handleSearchButtonClick = () => {
    nav(`/search/${searchText}`)
  }
  
  const handleContainerOnBlur = () => {
    if(focusSearch)
      setSearchResults(true)
    else
      setSearchResults(false)
  }



  useEffect(() => {
    handleSearchText()
  }, [searchText])

  useEffect(() => {
    if(focusSearch)
      setShowSearchResult(true)
    else
      setShowSearchResult(false)
  }, [focusSearch])

  return (
    <Container className='d-flex w-100'>
        <FormControl onKeyDown={handleKeyDown} onFocus={() => setFocusSearch(true)} onChange={(e) => setSearchText(e.target.value)} type='search' placeholder='Search items...' className='me-2 input-height-sm' aria-label='search' />							
        <Button variant='outline-info' onClick={handleSearchButtonClick}>Search</Button>


        {
          showSearchResult && 


          <Container onBlur={handleContainerOnBlur} onClick={() => setShowSearchResult(true)} className='d-flex flex-column position-absolute top-100 start-35 bg-white rounded overflow-auto' style={{width : "550px", maxHeight: "400px"}}>
            {
              searchResults.map((result, id) => 
                <Container onClick={() => handleSearchClick(result._id)} key={id} className='d-flex mt-3 mb-3 align-items-center hover-bg' style={{cursor: "pointer"}}>
                  <img src={result.imagePath} alt="" width={50} height={50}/>
                  <h5 className='ms-4'>{result.name}</h5>
                </Container>
              )
            }
          </Container>
        }

        
    </Container>
  )
}

export default SearchBar