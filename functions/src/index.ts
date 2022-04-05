import * as functions from "firebase-functions"
import { FieldValue, getFirestore } from "firebase-admin/firestore"
import admin = require("firebase-admin")

admin.initializeApp()
const db = getFirestore()

export const onUserCreation = functions
  .region("europe-west3")
  .auth.user()
  .onCreate(async (user) => {
    const result = await db.doc(`users/${user.uid}`).set(
      {
        userName: user.displayName ?? user.email ?? user.uid,
        countDone: 0,
        countTotal: 0,
      },
      { merge: true }
    )
    console.log(result)
    return result
  })

export const onToDoWrite = functions
  .region("europe-west3")
  .firestore.document("users/{userId}/toDos/{toDoId}")
  .onWrite(async (change, context) => {
    const { userId } = context.params
    const before = change.before.data()
    const after = change.after.data()

    if (!after) {
      // ToDo was deleted -> Not needed to treat
      return undefined
    }

    if (!before) {
      // ToDo was added
      const done = !!after?.done

      await db.doc(`users/${userId}`).update({
        countDone: FieldValue.increment(done ? 1 : 0),
        countTotal: FieldValue.increment(1),
      })

      return undefined
    }
    if (after && before) {
      // ToDo was changed
      const done = !!after?.done
      await db.doc(`users/${userId}`).update({
        countDone: FieldValue.increment(done ? 1 : -1),
      })
      return undefined
    }
    return undefined
  })
