# Paper Scissor Stone Game

Think carefully. Beat your opponent.

## How to use

It's powered by Firebase, so you need to create a new Firebase account.\
Add config.js to src folder.

``` javascript
// config.js

import firebase from 'firebase/app';
import 'firebase/database';

let config = {
  //yours
};

firebase.initializeApp(config);

let database = firebase.database();

export { database };
```

## Basic install

```
npm install --global yarn
yarn add react
yarn add redux
yarn add react-redux
yarn add firebase

yarn build
firebase deploy
```

## Bugs

score sometimes not right
