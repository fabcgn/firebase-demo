import { FormEvent, FunctionComponent, useState } from "react"
import styles from "./Admin.module.scss"
interface ToDo {
  id: string
  done: boolean
  name: string
}

const Admin: FunctionComponent = () => {
  // TODO: Add Auth and use real User-Id instead
  const userId = "dummyUser"

  // TODO: Load all Todos from Firestore
  const toDos: Array<ToDo> = [
    { id: "123", done: true, name: "Setup Next App" },
    { id: "123a", done: true, name: "Create Component Styles" },
    { id: "123b", done: false, name: "Init Firebase in Project" },
    { id: "abc", done: false, name: "Connect Auth" },
    { id: "def", done: false, name: "Connect Firestore" },
    { id: "dfg1", done: false, name: "Create Firestore Rules" },
    { id: "dfg2", done: false, name: "Show open Tasks to Public" },
  ]

  const toggleToDo = (id: string) => {
    alert(id)
  }
  const createNewToDo = (name: string) => {
    alert(name)
  }
  const [newToDo, setNewToDo] = useState("")
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createNewToDo(newToDo)
  }

  if (!userId) return <div>Log In</div>

  return (
    <div>
      <h3>
        To-Dos for <i>{userId}</i>
      </h3>
      <ul className={styles.toDoList}>
        {toDos.map((todo) => (
          <li
            data-done={todo.done ? "true" : "false"}
            className={styles.toDo}
            key={todo.id}
          >
            <button onClick={() => toggleToDo(todo.id)}>{todo.name}</button>
          </li>
        ))}
      </ul>
      <form onSubmit={onFormSubmit} className={styles.newToDo}>
        <label htmlFor="new-todo">
          <span hidden>New To-Do:</span>
        </label>
        <input
          value={newToDo}
          onChange={(e) => setNewToDo(e.target.value)}
          id="new-todo"
          type="text"
        />
        <button type="submit" disabled={!newToDo}>
          Save ▷
        </button>
      </form>
    </div>
  )
}
export default Admin
