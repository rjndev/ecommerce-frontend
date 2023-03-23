import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useState } from 'react'
import useProductDetails from '../hooks/useProductDetails'
import { useParams } from 'react-router'
import ProductCard from '../components/ProductCard'
import backendConnection from '../backendConstant'

function SearchResult() {

  const [searchProducts, setSearchProducts] = useState([])
  const {searchQuery} = useParams()
  const {getSearchProduct} = useProductDetails(backendConnection)

  useEffect(() => {
    getProductsSearched()
  }, [])

  const getProductsSearched = async () => {
    const products = await getSearchProduct(searchQuery)

    setSearchProducts(products)
    console.log(products)
  }

  
  return (
    <Container>
      <h6 className='mt-5 pt-5'>Search Results for "{searchQuery}"</h6>

      <Container className='d-flex justify-content-around flex-wrap gap-3 row-gap-3'>
        {searchProducts.map((prod) => <ProductCard key={prod._id}  productDetails={prod} />)}
      </Container>

    </Container>
  )
}

export default SearchResult