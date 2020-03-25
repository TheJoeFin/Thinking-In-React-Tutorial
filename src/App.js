import React from "react";
import "./styles.css";

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;

    return(
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
    product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

    return(
      <tr className="ProductRow">
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component{
  render() {
    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if(product.category !== lastCategory ){
        rows.push(
          <ProductCategoryRow
          category={product.category}
          key={product.category} />
        );
      }
      rows.push(
        <ProductRow
        product={product}
        key={product.name} />
        );
      lastCategory = product.category
    });

    return (
      <table>
        <thread>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thread>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component{
  render() {
    return (
      <form className="SearchBar">
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only Show Products In stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];


export default function App() {
  return (
    <div className="App">
      <h1>Thinking in React</h1>
      <h2>Here I have copied the code from the thinking in react page.</h2>
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}



