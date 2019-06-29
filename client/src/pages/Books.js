import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API"

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    title: '',
    author: '',
    synopsis: ''
  };

  componentDidMount = () => {
    this.getBooks()
  }

  getBooks = () =>{
    API.getBooks()
      .then(res => this.setState({ books: res.data}))
      .catch(err => console.log(err));
  }

  deleteBook = id =>{
    API.deleteBook(id)
    .then(res => this.getBooks())
  }

  addBook = event =>{
    event.preventDefault();
    API.saveBook({      
      title: this.state.title,
      author: this.state.author,
      synopsis: this.state.synopsis
    })
    .then(res => this.getBooks())
  }

/*   handleInputChange = event => {
    const {name, value} = event.target;

    this.setState({
        [name] : value
    });
  } */

  updateTitle = (event) =>{
    event.preventDefault();
    this.setState({
      title: event.target.value
    })
  }

  updateAuthor = (event) =>{
    event.preventDefault();
    this.setState({
      author: event.target.value
    })
  }

  updateSynopsis = (event) =>{
    event.preventDefault();
    this.setState({
      synopsis: event.target.value
    })
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Title (required)" onChange={this.updateTitle}/>
              <Input name="author" placeholder="Author (required)" onChange={this.updateAuthor}/>
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" onChange={this.updateSynopsis}/>
              <FormBtn
                onClick={this.addBook}
              >Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn 
                    id={book._id}
                    onClick={() => this.deleteBook(book._id)}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>Loading...</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
