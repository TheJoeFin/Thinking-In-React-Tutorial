import React from "react";
import "./styles.css";

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function AddNewProduct({
  newName,
  nameChanged,
  newPrice,
  priceChanged,
  newCategory,
  categoryChanged,
  newIsStocked,
  isStockedChanged,
  addClicked
}) {
  // category: "Sporting Goods",
  //   price: "$49.99",
  //   stocked: true,
  //   name: "Football"

  return (
    <div>
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">Name</label>
              </td>
              <td>
                <input
                  id="name"
                  placeholder="enter a name..."
                  value={newName}
                  onChange={e => nameChanged(e.target.value)}
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="price">Price</label>
              </td>
              <td>
                <input
                  id="price"
                  placeholder="1"
                  value={newPrice}
                  type="number"
                  onChange={e => priceChanged(e.target.value)}
                  min="1"
                  max="10000"
                  step="1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="category">Category</label>
              </td>
              <td>
                <select id="category" name="Category">
                  <option value="none">none</option>
                  <option value="Sporting Goods">Sporting Goods</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="isStocked">In Stock</label>
              </td>
              <td>
                <input
                  id="isStocked"
                  checked={newIsStocked}
                  onChange={e => isStockedChanged(e.target.checked)}
                  type="checkbox"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button onClick={e => addClicked(e.target.click)}>Add</button>
      </form>
    </div>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr className="ProductRow">
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach(product => {
      if (product.name.toUpperCase().indexOf(filterText.toUpperCase()) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

function SearchBar({
  filterText,
  onFilterTextChange,
  inStockOnly,
  onInStockChange
}) {
  return (
    <form className="SearchBar">
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
      />
      <p>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={e => onInStockChange(e.target.checked)}
        />{" "}
        Only Show Products In stock
      </p>
    </form>
  );
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
      newName: "",
      newPrice: "",
      newIsStocked: false,
      newCategory: "none"
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);

    this.newNameChanged = this.newNameChanged.bind(this);
    this.newPriceChanged = this.newPriceChanged.bind(this);
    this.newIsStockedChanged = this.newIsStockedChanged(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    });
  }

  newNameChanged(newName) {
    this.setState({
      newName: newName
    });
  }

  newPriceChanged(newPrice) {
    this.setState({
      newPrice: newPrice
    });
  }

  newIsStockedChanged(newIsStocked) {
    this.setState({
      newIsStocked: newIsStocked
    });
  }

  addedNewItemClick() {
    let newProduct = {
      category: this.newCategory,
      price: this.newPrice,
      stocked: this.newIsStocked,
      name: this.newName
    };

    return newProduct;

    // {
    //   category: "Sporting Goods",
    //   price: "$29.99",
    //   stocked: false,
    //   name: "Basketball"
    // },
  }

  render() {
    return (
      <div>
        <AddNewProduct
          addClicked={this.addedNewItemClick}
          newName={this.state.newName}
          nameChanged={this.newNameChanged}
          newPrice={this.state.newPrice}
          priceChanged={this.newPriceChanged}
          newIsStocked={this.state.newIsStocked}
          isStockedChanged={this.newIsStockedChanged}
          newCategory={this.state.newCategory}
        />
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: true,
    name: "Soccerball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: true,
    name: "Softball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$199.99",
    stocked: false,
    name: "iPhone 5"
  },
  {
    category: "Electronics",
    price: "$249.99",
    stocked: false,
    name: "iPhone 5s"
  },
  {
    category: "Electronics",
    price: "$299.99",
    stocked: false,
    name: "iPhone 6"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 6s"
  },
  {
    category: "Electronics",
    price: "$499.99",
    stocked: true,
    name: "iPhone 7"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: true,
    name: "iPhone 8"
  },
  {
    category: "Electronics",
    price: "$599.99",
    stocked: false,
    name: "iPhone X"
  },
  {
    category: "Electronics",
    price: "$599.99",
    stocked: true,
    name: "iPhone XS"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: true,
    name: "iPhone 11"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: true,
    name: "iPhone 11 Pro"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: true,
    name: "iPhone 11 Pro Max"
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

export default function App() {
  //this.AddNewProduct = this.AddNewProduct.bind(this);

  // function newProductAdded(newProduct) {
  //   PRODUCTS.add(newProduct);
  // }

  return (
    <div className="App">
      <p>Here I have copied the code from the thinking in react page.</p>
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}
