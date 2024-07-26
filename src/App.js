import './App.css';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToDo, deleteToDo, toggleToDo} from "./redux/todoSlice";

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
        timeDiff = timeDiff / 1000 / 60 / 60 / 24
        console.log(timeDiff)

        return timeDiff <= 1 ? 'red' : timeDiff <= 2 ? 'green' : 'blue'
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
            <ul>
                {todos.map(t => (
                    <li
                        key={t.id}
                        style={{
                            backgroundColor: getBackgroundColor(t.deadline),
                            textDecoration: t.completed ? 'line-through' : 'none',
                            listStyle: 'none',
                        }}
                    >
                        <h1>{t.name}</h1>
                        <h2>{t.detail}</h2>
                        <h2>마감기한: {new Date(t.deadline).toLocaleDateString()}</h2>
                        <h2>추가일: {new Date(t.created).toLocaleDateString()}</h2>
                        <div>
                            <button onClick={() => dispatch(toggleToDo(t.id))}>
                                {t.completed ? '미완료' : '다했다'}
                            </button>
                            <button onClick={() => dispatch(deleteToDo(t.id))}>
                                삭제하기
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
