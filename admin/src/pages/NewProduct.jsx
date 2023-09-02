import React, { useState } from "react";
import styled from "styled-components";
import { addProduct } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const NewProductContainer = styled.div`
  flex: 4;
  margin-left: 100px;
`;

const AddProductForm = styled.form`
  margin-top: 10px;
`;

const AddProductItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const AddProductLabel = styled.label`
  color: gray;
  font-weight: 600;
  margin-bottom: 10px;
`;

const AddProductInput = styled.input`
  padding: 10px;
`;

const AddProductSelect = styled.select`
  padding: 10px;
`;

const AddProductButton = styled.button`
  margin-top: 10px;
  padding: 7px 10px;
  border: none;
  border-radius: 10px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const colors = ["White", "Black", "Red", "Blue", "Yellow", "Green"]
  const sizes = ["XS", "S", "M", "L", "XL"]
  const [categoryToAdd, setCategoryToAdd] = useState("")

  const handleClick = async(e) => {
    e.preventDefault();
    console.log(inputs);
    const res = await addProduct(inputs, dispatch);
    if (res.status === 499) {
      alert("Invalid token, please try to reconnect !")
      return
    }
    if (res.status !== 200) {
      alert("An unexpected error occured, please try again !")
      return
    }
    history.push("/products");
  };

  return (
    <NewProductContainer>
      <h1 className="addProductTitle">New Product</h1>
      <AddProductForm>
        <AddProductItem>
          <AddProductLabel>Image</AddProductLabel>
          <AddProductInput
            type="text"
            onChange={(e) => setInputs({ ...inputs, img: e.target.value })}
          />
        </AddProductItem>
        <AddProductItem>
          <AddProductLabel>Title</AddProductLabel>
          <AddProductInput
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          />
        </AddProductItem>
        <AddProductItem>
          <AddProductLabel>Description</AddProductLabel>
          <AddProductInput
            name="desc"
            type="text"
            placeholder="description..."
            onChange={(e) => setInputs({ ...inputs, desc: e.target.value })}
          />
        </AddProductItem>
        <AddProductItem>
          <AddProductLabel>Price</AddProductLabel>
          <AddProductInput
            name="price"
            type="number"
            placeholder="100"
            onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
          />
        </AddProductItem>
        <AddProductItem>
          <AddProductLabel>Size</AddProductLabel>
          <span>
            {sizes.map((size) => (
              <React.Fragment key={size}>
                {size}&ensp;
                <input
                  type="checkbox"
                  placeholder={size}
                  onChange={(e) =>
                    e.target.checked
                      ? setInputs({
                          ...inputs,
                          size: inputs.size
                            ? [...inputs.size, e.target.placeholder]
                            : [e.target.placeholder],
                        })
                      : setInputs({
                          ...inputs,
                          size: inputs.size.filter(
                            (obj) => obj !== e.target.placeholder
                          ),
                        })
                  }
                />
              </React.Fragment>
            ))}
          </span>
        </AddProductItem>
        <AddProductItem>
          <AddProductLabel>Categories</AddProductLabel>
          <input type="text"
                  placeholder={"type category to be added"}
                  onChange={(e) => {
                    setCategoryToAdd(e.target.value)
                  }}/>
          <input
                  type="checkbox"
                  placeholder={"type category to be added"}
                  onClick= {(e) => {
                    e.target.checked
                     && setInputs({
                          ...inputs,
                          categories: inputs.categories
                            ? [...inputs.categories, categoryToAdd]
                            : [categoryToAdd],
                        })
                      e.target.checked = false;
                    }
                  }
                />
          <span>
            Current Categories : 
            {inputs.categories?.map((category) => (
              <React.Fragment key={category}>
                {category}, 
              </React.Fragment>
            ))}
          </span>
        </AddProductItem>
        <AddProductItem>
          <AddProductLabel>Color</AddProductLabel>
          <span>
            {colors.map(
              (color) => (
                <React.Fragment key={color}>
                  {color}&ensp;
                  <input
                    type="checkbox"
                    placeholder={color.toLowerCase()}
                    onChange={(e) =>
                      e.target.checked
                        ? setInputs({
                            ...inputs,
                            color: inputs.color
                              ? [...inputs.color, e.target.placeholder]
                              : [e.target.placeholder],
                          })
                        : setInputs({
                            ...inputs,
                            color: inputs.color.filter(
                              (obj) => obj !== e.target.placeholder
                            ),
                          })
                    }
                  />
                  &emsp;
                </React.Fragment>
              )
            )}
          </span>
        </AddProductItem>
        <AddProductItem>
          <AddProductLabel>Stock</AddProductLabel>
          <AddProductSelect name="inStock">
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
          </AddProductSelect>
        </AddProductItem>
        <AddProductButton onClick={handleClick}>Create</AddProductButton>
      </AddProductForm>
    </NewProductContainer>
  );
}
