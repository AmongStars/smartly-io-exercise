import React, { Component } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';

const API = "https://cat-fact.herokuapp.com/";
const DEFAULT_QUERY = "facts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      items: [],
      visibleItems: [],
      error: null,
    };
  }

  fetchFacts() {
    fetch(API + DEFAULT_QUERY)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          items: data["all"],
          visibleItems: this.getRandomElements(data["all"], 5),
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
      while (true) {
        const index = Math.floor(Math.random() * items.length);
        const randomItem = items[index];
        const alreadyExists = randomElements.some(
          (item) => item._id === randomItem._id
        );
        if (!alreadyExists) {
          randomElements.push(randomItem);
          break;
        }
      }
    }
    return randomElements;
  }

  generateFacts() {
    this.setState((prevState) => ({
      ...prevState,
      visibleItems: this.getRandomElements(prevState.items, 5),
    }));
  }

  render() {
    const { isLoading, visibleItems, error } = this.state;
    return (
      <React.Fragment>
        <div className="Content">
          <h1>Random facts about cats</h1>
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
            <>
              {visibleItems.map((item) => {
                const rowData = this.getRowData(item);
                return rowData ? (
                  <div key={rowData.id}>
                    <Card border="info">
                      <Card.Body>
                        <Card.Text>{rowData.text}</Card.Text>
                        <Card.Text className="User">- {rowData.user}</Card.Text>
                      </Card.Body>
                    </Card>
                    <br />
                  </div>
                ) : null;
              })}
              <div className="Button-container">
                <Button
                  style={{
                    backgroundColor: "#9e6712",
					borderColor: "#9e6712",
					display: "flex",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  variant="primary"
                  onClick={() => this.generateFacts()}
                >
                  More Facts!
                </Button>
              </div>
            </>
          ) : (
            <div className="GifLoading">
              <h3>Loading...</h3>
              <img src="cat.gif" alt="Loading" className="rotation" />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
