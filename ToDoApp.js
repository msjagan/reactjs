import React, { Component } from "react";

class ToDoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        return (
            <div>
                <TodoList items={this.state.items} remove={this.handleDelete}/>
                <form onSubmit={this.handleSubmit}>
                    <input id="new-todo" value={this.state.text} onChange={this.handleChange} /> 
                    <button>Add {this.state.items.length != 0 ? this.state.items.length: ''}</button>
                    {this.state.text}
                </form>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length > 0) {
            const newItem = {
                text: this.state.text,
                id: this.state.items.length
            };

            this.setState(state => ({
                items: state.items.concat(newItem),
                text: ''
            }));
        } else {
            return;
        }
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleDelete(e, item) {
        e.preventDefault();
        console.log(item)
        var itemsa = this.state.items.filter(function (itm) {
            return item.id !== itm.id;
        });

        this.setState({
            items: itemsa
        });
    }
    
}

class TodoList extends Component {
    
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text} <button onClick={(e) => {this.props.remove(e, item)}}>X</button></li>
                ))}
            </ul>
        );
    }
}

export default ToDoApp;