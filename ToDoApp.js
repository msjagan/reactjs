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

    addText() {
        const newItem = {
            text: this.state.text,
            id: this.state.items.length
        };

        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length > 0) {
            let text = this.state.text;
            if (this.state.items.length > 0) {
                var itemsa = this.state.items.filter(function (itm) {
                    return itm.text === text;
                });
                
                if (itemsa.length > 0)  {
                  alert("Already Exist")  
                } else {
                    this.addText();
                }
            } else {
                this.addText();
            }
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
            <table>
            <tr><td>Name</td><td>Action</td></tr>
                {this.props.items.map(item => (
                    <tr><td key={item.id}>{item.text}</td><td><button onClick={(e) => {this.props.remove(e, item)}}>X</button></td></tr>
                ))}
            </table>
        );
    }
}

export default ToDoApp;
