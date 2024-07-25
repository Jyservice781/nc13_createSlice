import './App.css';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToDo} from "./redux/todoSlice";

// 참고 : https://velog.io/@hodoo/Redux-toolkit%EC%9C%BC%EB%A1%9C-To-do-list-%EB%A7%8C%EB%93%A4%EA%B8%B0

function App() {
    let [name, setName] = useState('');
    let [detail, setDetail] = useState('')
    let [deadline, setDeadline] = useState('')

    let todos = useSelector(state => state.todos.todos)
    let dispatch = useDispatch()

    // 새로고침 막기
    let onSubmit = (e) => {
        e.preventDefault()
        // dispatch 에서 보내주는 모든 것을 payload 라고 한다.
        dispatch(addToDo({
            name, detail, deadline
        }))
        setName('')
        setDeadline('')
        setDetail('')
    }

    let getBackgroundColor = (deadline) => {
        let currentDate = new Date()
        let dueDate = new Date(deadline)
        let timeDiff = dueDate - currentDate

        return timeDiff <= 0 ? 'red' : timeDiff <= 1 ? 'green' : 'blue'
    }

    return (
        <div className="App">
            <form onSubmit={onSubmit}>
                <input type="text"
                       placeholder="할 일"
                       value={name}
                       onChange={e => setName(e.target.value)} required/>
                <input type="text" placeholder="세부내용"
                       value={detail}
                       onChange={e => setDetail(e.target.value)} required/>
                <input type="date" value={deadline}
                       onChange={e => setDeadline(e.target.value)} required/>
                <button type="submit">할 일 추가하기</button>
            </form>
        </div>
    );
}

export default App;
