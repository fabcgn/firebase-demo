# Demo

Deployed at [`firebase-demo-fabcgn.vercel.app`](https://firebase-demo-fabcgn.vercel.app/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Install Firebase

0. Create Next App `yarn create-next-app --typescript`
1. yarn add firebase
2. Create services/firebase.ts
3. Firebase CLI: `firebase init` firestore & functions
4. cd functions -> yarn
5. add functions to `tsconfig.json` ignore -> "exclude": ["node_modules", "functions/*"]
