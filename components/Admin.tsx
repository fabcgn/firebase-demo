import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import {
  FormEvent,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react"
import { db } from "../services/firebase"
import styles from "./Admin.module.scss"
import LoginWithGoogleButton from "./LoginWithGoogleButton"
interface ToDo {
  _ref: DocumentReference<DocumentData>
  done: boolean
  name: string
}

const Admin: FunctionComponent = () => {
  // AUTH
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    console.log("effecting")
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  const userId = user?.uid

  // FIRESTORE ToDos

  const [toDos, setToDos] = useState<ToDo[]>([])

  const toDosRef = useMemo(
    () => (userId ? collection(db, `users/${userId}/toDos`) : undefined),
    [userId]
  )

  useEffect(() => {
    if (!toDosRef) return
    const unsubscribe = onSnapshot(toDosRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        _ref: doc.ref,
        done: doc.data().done,
        name: doc.data().name,
      }))
      setToDos(docs)
    })
    return unsubscribe
  }, [toDosRef])

  // TODO Methods

  const toggleToDo = (id: string) => {
    const affectedToDo = toDos.find((toDo) => toDo._ref.id === id)
    affectedToDo && updateDoc(affectedToDo._ref, { done: !affectedToDo.done })
  }
  const createNewToDo = (name: string) => {
    toDosRef && addDoc(toDosRef, { name, done: false })
  }

  const [newToDo, setNewToDo] = useState("")

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createNewToDo(newToDo)
    setNewToDo("")
  }

  if (!userId) return <LoginWithGoogleButton />

  return (
    <div>
      <h3>
        To-Dos for <i>{user.displayName}</i>
      </h3>
      <ul className={styles.toDoList}>
        {toDos.map((todo) => (
          <li
            data-done={todo.done ? "true" : "false"}
            className={styles.toDo}
            key={todo._ref.id}
          >
            <button onClick={() => toggleToDo(todo._ref.id)}>
              {todo.name}
            </button>
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
