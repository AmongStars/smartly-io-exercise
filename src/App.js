import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getRandomElements, getRowData } from "utils.js";

const API = process.env.REACT_APP_API;
const DEFAULT_QUERY = process.env.REACT_APP_DEFAULT_QUERY;

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
          visibleItems: getRandomElements(data["all"], 5),
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

  generateFacts() {
    this.setState((prevState) => ({
      ...prevState,
      visibleItems: getRandomElements(prevState.items, 5),
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
                const rowData = getRowData(item);
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
