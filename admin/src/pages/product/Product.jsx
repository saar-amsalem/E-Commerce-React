import { Link, useLocation, useHistory } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  getSalesPerformance,
  updateProduct,
  getAllTimeSales,
} from "../../redux/apiCalls";
export default function Product() {
  const location = useLocation();
  const history = useHistory();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [alltime, setAlltime] = useState([]);
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const [updated, setUpdated] = useState({ _id: product._id });
  const dispatch = useDispatch();
  const [sizetoupdated, setSizetoupdated] = useState([]);
  const [colors, setColors] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      const list = await getSalesPerformance(productId);
      list.map((item) =>
        setPStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], Sales: item.total },
        ])
      );
    };
    getStats();
  }, [productId, MONTHS]);

  useEffect(() => {
    const getAlltime = async () => {
      const res = await getAllTimeSales(productId);
      setAlltime(res[0]?.total);
    };
    console.log(product);
    getAlltime();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    updateProduct(product._id, updated, dispatch);
    history.push("/products");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create New</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={pStats}
            dataKey="Sales"
            title="Monthly Sales Performance"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">total sales:</span>
              <span className="productInfoValue">
                {alltime ? alltime : "Not Sold Yet..."}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product.inStock ? "true" : "false"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product.title}
              onChange={(e) =>
                setUpdated({ ...updated, title: e.target.value })
              }
            />
            <label>Product Description</label>
            <input
              type="text"
              placeholder={product.desc}
              onChange={(e) => setUpdated({ ...updated, desc: e.target.value })}
            />
            <label>Price</label>
            <input
              type="text"
              placeholder={product.price}
              onChange={(e) =>
                setUpdated({ ...updated, price: e.target.value })
              }
            />
            <label>Size</label>
            <span>
              XS &ensp;
              <input
                type="checkbox"
                placeholder="XS"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        size: updated.size
                          ? [...updated.size, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        size: updated.size.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;S&ensp;
              <input
                type="checkbox"
                placeholder="S"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        size: updated.size
                          ? [...updated.size, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        size: updated.size.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;M&ensp;
              <input
                type="checkbox"
                placeholder="M"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        size: updated.size
                          ? [...updated.size, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        size: updated.size.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;L&ensp;
              <input
                type="checkbox"
                placeholder="L"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        size: updated.size
                          ? [...updated.size, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        size: updated.size.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;XL&ensp;
              <input
                type="checkbox"
                placeholder="XL"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        size: updated.size
                          ? [...updated.size, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        size: updated.size.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              <div>
                &emsp; <label class="current">current sizes:</label> &ensp;{" "}
                {product.size.map((obj) => (
                  <label class="currentItem">{obj}</label>
                ))}
              </div>
            </span>
            <label>Color</label>
            <span>
              White &ensp;
              <input
                type="checkbox"
                placeholder="white"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        color: updated.color
                          ? [...updated.color, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        color: updated.color.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;Black&ensp;
              <input
                type="checkbox"
                placeholder="black"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        color: updated.color
                          ? [...updated.color, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        color: updated.color.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;Red&ensp;
              <input
                type="checkbox"
                placeholder="red"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        color: updated.color
                          ? [...updated.color, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        color: updated.color.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;Blue&ensp;
              <input
                type="checkbox"
                placeholder="blue"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        color: updated.color
                          ? [...updated.color, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        color: updated.color.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;Yellow&ensp;
              <input
                type="checkbox"
                placeholder="yellow"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        color: updated.color
                          ? [...updated.color, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        color: updated.color.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;Green&ensp;
              <input
                type="checkbox"
                placeholder="green"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        color: updated.color
                          ? [...updated.color, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        color: updated.color.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              <div>
                &emsp; <label class="current">current colors:</label> &ensp;{" "}
                {product.color.map((obj) => (
                  <label class="currentItem">{obj}</label>
                ))}
              </div>
            </span>
            <label>Categories</label>
            <span>
              Men &ensp;
              <input
                type="checkbox"
                placeholder="men"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        categories: updated.categories
                          ? [...updated.categories, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        categories: updated.categories.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;Jeans&ensp;
              <input
                type="checkbox"
                placeholder="jeans"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        categories: updated.categories
                          ? [...updated.categories, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        categories: updated.categories.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              &emsp;Women&ensp;
              <input
                type="checkbox"
                placeholder="women"
                onChange={(e) =>
                  e.target.checked
                    ? setUpdated({
                        ...updated,
                        categories: updated.categories
                          ? [...updated.categories, e.target.placeholder]
                          : [e.target.placeholder],
                      })
                    : setUpdated({
                        ...updated,
                        categories: updated.categories.filter(
                          (obj) => obj !== e.target.placeholder
                        ),
                      })
                }
              />
              <div>
                &emsp; <label class="current">current categories:</label> &ensp;{" "}
                {product.categories.map((obj) => (
                  <label class="currentItem">{obj}</label>
                ))}
              </div>
            </span>
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option
                value="true"
                onClick={(e) =>
                  setUpdated({ ...updated, inStock: e.target.value })
                }
              >
                Yes
              </option>
              <option
                value="false"
                onClick={(e) =>
                  setUpdated({ ...updated, inStock: e.target.value })
                }
              >
                No
              </option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
