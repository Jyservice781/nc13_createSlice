import {createSlice} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid'

// create Store 를 사용하지 않고 redux tool kit 을 사용할 예정
// 기능별 정리
// createSlice
// 1. slice 를 생성: 슬라이스는 리듀서 로직과 액션을 함께 정의한다.
// 2. 스토어 구성
// 3. 리액트 앱에 스토어 제공
// 4. 컴포넌트 상태 사용 및 액션 디스패치
// 이 방식을 사용하게 되면
// createSlice 를 사용하여 액션 생성자와 리듀서를 한 번에 정의할 수 있다ㅏ.
// configureStore 가 자동으로 ReduxDevTools 확장을 설치한다.
// 불변성을 위해 immer 라이브러리를 내부적으로 사용하므로, 상태를 직접 수정하는 것처럼 코드를 작성 할 수 있다.
// 비동기 액션 처리가 용이하다.


let initialState = {
    todos: []
}


let todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addToDo: (state, action) => {
            state.todos.push({
                id: uuidv4(),
                ...action.payload,
                created: new Date().toISOString(),
                completed: false
            })

            state.todos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        },
        // dispatch 에서 보내주는 모든 것을 payload 라고 한다.
        toggleToDo: (state, action) => {
            let todo = state.todos.find(t => t.id === action.payload)
            todo.completed = !todo.completed
        },

        deleteToDo: (state, action) => {
            state.todos = state.todos.filter(t => t.id !== action.payload)
        }
    }
})

export let {addToDo, toggleToDo, deleteToDo} = todoSlice.actions
export default todoSlice.reducer