import React, { Component } from "react";

const API = "https://cat-fact.herokuapp.com/";
const DEFAULT_QUERY = "facts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      items: [],
      error: null,
    };
  }

  fetchFacts() {
    fetch(API + DEFAULT_QUERY)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          items: data["all"],
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error, isLoading: false });
      });
  }

  componentDidMount() {
    this.fetchFacts();
  }

  getRowData(item) {
    const id = item._id;
    if (!id) {
      return null;
    }

    const name = item?.user?.name;
    if (!name) {
      return null;
    }

    const { first, last } = name;
    if (!first && !last) {
      return null;
    }

    const { text } = item;
    if (!text) {
      return null;
    }

    const user = `${first} ${last}`.trim();

    return {
      id,
      user,
      text,
    };
  }

  getRandomElements(items, size) {
    const randomElements = [];
    for (let i = 0; i < size; i++) {
      randomElements.push(items[Math.floor(Math.random() * items.length)]);
    }
    return randomElements;
  }

  render() {
    const { isLoading, items, error } = this.state;
    return (
      <React.Fragment>
        <h1>Random facts about cats</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          this.getRandomElements(items, 5).map((item) => {
            const rowData = this.getRowData(item);
            return rowData ? (
              <div key={rowData.id}>
                <p>User: {rowData.user}</p>
                <p>Fact: {rowData.text}</p>
                <hr />
              </div>
            ) : null;
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}

export default App;
