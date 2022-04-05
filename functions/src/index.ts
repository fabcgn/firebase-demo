import * as functions from "firebase-functions"

export const onUserCreation = functions
  .region("europe-west3")
  .auth.user()
  .onCreate((user) => {})
