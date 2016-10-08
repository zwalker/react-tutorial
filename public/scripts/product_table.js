var FilterableProductTable = React.createClass({
  render: function() {
    return (
      <div className="FilterableProductTable">
        <SearchBar />
        <ProductTable />
      </div>
    )
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      <form className="searchBar">
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {'  '}
          Only show prodocts in stock
        </p>
      </form>
    )
  }
});

var ProductTable = React.createClass({
  render: function() {
    return (
      <table className="ProductTable">
        <thead>
          <tr>
            <td><b>Name</b></td>
            <td><b>Price</b></td>
          </tr>
        </thead>
        <tbody>
          <ProductCategory />
          <ProductRow />
        </tbody>
      </table>
    )
  }
});


var ProductCategory = React.createClass({
  render: function() {
    return (
      <tr>Sporting Goods</tr>
    )
  }
});

var ProductRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>Football</td>
        <td>$49.99</td>
      </tr>
    )
  }
});

ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('container')
);
