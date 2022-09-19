import { useState } from "react";
import "./newProduct.css";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(inputs);
    addProduct(inputs, dispatch);
    history.push("/products");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="text"
            onChange={(e) => setInputs({ ...inputs, img: e.target.value })}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={(e) => setInputs({ ...inputs, desc: e.target.value })}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
          />
        </div>
        <div className="addProductItem">
        <label>Size</label>
            <span>XS  &ensp;
            <input
              type="checkbox"
              placeholder="XS"
              onChange={(e) => e.target.checked ? setInputs({...inputs,size: inputs.size ? [...inputs.size,e.target.placeholder]: [e.target.placeholder]}) : setInputs({...inputs,size: inputs.size.filter((obj)=>obj !== e.target.placeholder)})}
            />&emsp;S&ensp;
            <input
              type="checkbox"
              placeholder="S"
              onChange={(e) => e.target.checked ? setInputs({...inputs,size: inputs.size ? [...inputs.size,e.target.placeholder]: [e.target.placeholder]}) : setInputs({...inputs,size: inputs.size.filter((obj)=>obj !== e.target.placeholder)})}
            />
            &emsp;M&ensp;
            <input
              type="checkbox"
              placeholder="M"
              onChange={(e) => e.target.checked ? setInputs({...inputs,size: inputs.size ? [...inputs.size,e.target.placeholder]: [e.target.placeholder]}) : setInputs({...inputs,size: inputs.size.filter((obj)=>obj !== e.target.placeholder)})}
            />
            &emsp;L&ensp;
            <input
              type="checkbox"
              placeholder="L"
              onChange={(e) => e.target.checked ? setInputs({...inputs,size: inputs.size ? [...inputs.size,e.target.placeholder]: [e.target.placeholder]}) : setInputs({...inputs,size: inputs.size.filter((obj)=>obj !== e.target.placeholder)})}
            />
            &emsp;XL&ensp;
            <input
              type="checkbox"
              placeholder="XL"
              onChange={(e) => e.target.checked ? setInputs({...inputs,size: inputs.size ? [...inputs.size,e.target.placeholder]: [e.target.placeholder]}) : setInputs({...inputs,size: inputs.size.filter((obj)=>obj !== e.target.placeholder)})}
            />
            </span>
        </div>
        <div className="addProductItem">
        <label>Categories</label>
            <span>Men  &ensp;
            <input
              type="checkbox"
              placeholder="men"
              onChange={(e) => e.target.checked ? setInputs({...inputs,categories: inputs.categories ? [...inputs.categories,e.target.placeholder]: [e.target.placeholder]}) : setInputs({...inputs,categories: inputs.categories.filter((obj)=>obj !== e.target.placeholder)})}
            />&emsp;Jeans&ensp;
            <input
              type="checkbox"
              placeholder="jeans"
              onChange={(e) => e.target.checked ? setInputs({...inputs,categories: inputs.categories ? [...inputs.categories,e.target.placeholder]: [e.target.placeholder]}) : setInputs({...inputs,categories: inputs.categories.filter((obj)=>obj !== e.target.placeholder)})}
            />
            &emsp;Women&ensp;
            <input
              type="checkbox"
              placeholder="women"
              onChange={(e) => e.target.checked ? setInputs({...inputs,categories: inputs.categories ? [...inputs.categories,e.target.placeholder]: [e.target.placeholder]}) : setInputs({...inputs,categories: inputs.categories.filter((obj)=>obj !== e.target.placeholder)})}
            />
            
            </span>
        </div>
        <div className="addProductItem">
        <label>Color</label>
            <span>White  &ensp;
            <input
              type="checkbox"
              placeholder="white"
              onChange={(e) => e.target.checked ? setInputs({...inputs,color: inputs.color ? [...inputs.color,e.target.placeholder] : [e.target.placeholder]}) : setInputs({...inputs,color: inputs.color.filter((obj)=>obj !== e.target.placeholder)})}
            />&emsp;Black&ensp;
            <input
              type="checkbox"
              placeholder="black"
              onChange={(e) => e.target.checked ? setInputs({...inputs,color: inputs.color ? [...inputs.color,e.target.placeholder] : [e.target.placeholder]}) : setInputs({...inputs,color: inputs.color.filter((obj)=>obj !== e.target.placeholder)})}
            />
            &emsp;Red&ensp;
            <input
              type="checkbox"
              placeholder="red"
              onChange={(e) => e.target.checked ? setInputs({...inputs,color: inputs.color ? [...inputs.color,e.target.placeholder] : [e.target.placeholder]}) : setInputs({...inputs,color: inputs.color.filter((obj)=>obj !== e.target.placeholder)})}
            />
            &emsp;Blue&ensp;
            <input
              type="checkbox"
              placeholder="blue"
              onChange={(e) => e.target.checked ? setInputs({...inputs,color: inputs.color ? [...inputs.color,e.target.placeholder] : [e.target.placeholder]}) : setInputs({...inputs,color: inputs.color.filter((obj)=>obj !== e.target.placeholder)})}
            />
            &emsp;Yellow&ensp;
            <input
              type="checkbox"
              placeholder="yellow"
              onChange={(e) => e.target.checked ? setInputs({...inputs,color: inputs.color ? [...inputs.color,e.target.placeholder] : [e.target.placeholder]}) : setInputs({...inputs,color: inputs.color.filter((obj)=>obj !== e.target.placeholder)})}
            />
            &emsp;Green&ensp;
            <input
              type="checkbox"
              placeholder="green"
              onChange={(e) => e.target.checked ? setInputs({...inputs,color: inputs.color ? [...inputs.color,e.target.placeholder] : [e.target.placeholder]}) : setInputs({...inputs,color: inputs.color.filter((obj)=>obj !== e.target.placeholder)})}
            />
            </span>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock">
            <option
              value="true"
              onClick={(e) => setInputs({ ...inputs, price: e.target.value })}
            >
              Yes
            </option>
            <option
              value="false"
              onClick={(e) => setInputs({ ...inputs, price: e.target.value })}
            >
              No
            </option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}