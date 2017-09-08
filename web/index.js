import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {observable, computed,autorun} from 'mobx';


class Todo {
    id = Math.random();
    @observable title = '';
    @observable finished = false;
    constructor(title){
        this.title=title;
    }
}

class TodoList {
    @observable todos = [];

    @computed
    get unfinishedTodoCount() {
        return this.todos.filter((todo) => !todo.finished).length;
    }
}

const TodoView = observer(({todo}) => {
    return <li>
        <input type="checkbox" checked={todo.finished} onClick={() => todo.finished = !todo.finished}/>
        {todo.title}
    </li>
});
@observer
class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map((todo) =>
                    <TodoView todo={todo} key={todo.id}/>)}
            </ul>
            Tasks left:{this.props.todoList.unfinishedTodoCount}
        </div>;
    }
}

const store = new TodoList();

ReactDOM.render(<TodoListView todoList={store}/>, document.getElementById('root'));

autorun(()=>{
    console.log("Tasks left: " + store.unfinishedTodoCount);
});
store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code")
);
store.todos[0].finished = true;
