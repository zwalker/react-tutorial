var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };

  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState(
      {
        filterText: filterText,
        inStockOnly: inStockOnly
      }
    );
  },

  render: function() {
    return (
      <div className="FilterableProductTable">
        <SearchBar 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly} 
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    )
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },

  render: function() {
    return (
      <form className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            ref="inStockOnlyInput"
            onChange={this.handleChange}
          />
          {'  '}
          Only show prodocts in stock
        </p>
      </form>
    )
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if((!product.stocked && this.props.inStockOnly) || product.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} />);
      }
      rows.push(<ProductRow product={product} />);
      lastCategory = product.category;
    }.bind(this));
    return (
      <table className="ProductTable">
        <thead>
          <tr>
            <td><b>Name</b></td>
            <td><b>Price</b></td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});


var ProductCategoryRow = React.createClass({
  render: function() {
    return (
      <tr><b>{this.props.category}</b></tr>
    )
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ? this.props.product.name : <span style={{color: 'red'}}>{this.props.product.name}</span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
});

var data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

ReactDOM.render(
  <FilterableProductTable products={ data } />,
  document.getElementById('container')
);
