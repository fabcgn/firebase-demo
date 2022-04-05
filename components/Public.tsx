import { collection, onSnapshot } from "firebase/firestore"
import { FunctionComponent, useEffect, useState } from "react"
import { db } from "../services/firebase"
import styles from "./Public.module.scss"

interface User {
  userName: string
  countDone: number
  countTotal: number
}

const Public: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        userName: doc.data().userName,
        countDone: doc.data().countDone ?? 999,
        countTotal: doc.data().countTotal ?? 999,
      }))
      setUsers(docs)
    })
    return unsubscribe
  }, [])

  return (
    <div>
      <h3>Open To-Dos by User</h3>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.userName}>
            <span>{user.userName}</span>
            <span>
              <b>{user.countDone}</b> / {user.countTotal}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Public
