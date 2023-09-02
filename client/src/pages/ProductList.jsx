import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { getAllCategories, getProducts, getWishlist } from "../redux/apiCalls";
import Product from "../components/Product";

const Container = styled.div``;

const ProductsWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await getProducts()
      if (res.status === 499) {
        const message = `Your token expired, please try to reconnect !`
        alert(message)
        return
      }
      if (res.status !== 200) {
        const message = `An unexpected error occured, please try again !`
        alert(message)
        return
      }
      setProducts(res.body);      
    };
    getAllProducts();
  }, []);

  useEffect(()=> {
    const getWish = async () => {
      const res = await getWishlist();
      if (res.status === 499) {
        const message = `Your token expired, please try to reconnect !`
        alert(message)
        return
      }
      if (res.status !== 200) {
        const message = `An unexpected error occured, please try again !`
        alert(message)
        return
      }
      const wishlistedProductsIds = res.body.products.map(item => item.productId)
      setWishlist(wishlistedProductsIds)
    }
    getWish();
    return () => {}
  },[])

  useEffect(()=> {
    const getCategories = async () => {
      const res = await getAllCategories()
      if (res.status === 499) {
        const message = `Your token expired, please try to reconnect !`
        alert(message)
        return
      }
      if (res.status !== 200) {
        const message = `An unexpected error occured, please try again !`
        alert(message)
        return
      }
      console.log(res.body);
      setCategories(res.body)
    }
    getCategories()
    return () => {}
  },[])

  const handleFilters = (e) => {
    if(e.target.value == "All") {
      const filtersCopy = structuredClone(filters)
      delete filtersCopy[e.target.name]
      setFilters(filtersCopy)
      return
    }
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Our Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>All</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>All</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
          {categories.length > 0 && 
            <Select name="categories" onChange={handleFilters}>
              <Option disabled>Category</Option>
              <Option>All</Option>
              {categories.map(category => {
                return (
                  <Option key={category}>{category}</Option>
                )
              })}
            </Select>
          }
        </Filter>
      </FilterContainer>
      <ProductsWrapper>
        {
          products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            return item[key].includes(value)
          })).map((item) => <Product item={item} key={item._id} wishlisted={wishlist.includes(item._id) ? true: false}/>)
        }
      </ProductsWrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
