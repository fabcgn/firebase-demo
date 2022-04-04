import { FunctionComponent } from "react"
import styles from "./Public.module.scss"

interface User {
  userName: string
  countDone: number
  countTotal: number
}

const Public: FunctionComponent = () => {
  const users: Array<User> = [
    { userName: "fabian@loggify.app", countDone: 5, countTotal: 10 },
    { userName: "john@doe.com", countDone: 1, countTotal: 8 },
    { userName: "Jane@miller.com", countDone: 0, countTotal: 15 },
  ]

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
