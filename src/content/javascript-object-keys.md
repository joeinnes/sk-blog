---
title: Every Key Is A String
date: 2022-10-06T18:10:00.000Z
excerpt: As it turns out, there are quite a few tricks that JavaScript plays on us all. One of those is pretending things are something they are not.
---

I read a very interesting article today by Andres Reales about JavaScript object keys. I was previously under the impression that you could use numbers as object keys in JavaScript. Andres's article highlights why this is a misconception, and exposes the truth about JavaScript objects: every key is a string.

```js
const object = {
	42: 'the answer to life, the universe, and everything'
};

console.log(object);
//  {42: 'the answer to life, the universe, and everything'}

console.log(object[42]);
// 'the answer to life, the universe, and everything'
```

All looks good until now... but here things get a bit odd

```js
console.log(object.42);
// Uncaught SyntaxError: Unexpected number

console.log(object.'42');
// Uncaught SyntaxError: Unexpected number

console.log(object['42']);
// 'the answer to life, the universe, and everything'

console.log(Object.keys(object));
// ['42']

const fortyTwoStr = '42';
const fortyTwoNum = 42;

object[fortyTwoNum]
// 'the answer to life, the universe, and everything'

object[fortyTwoStr]
// 'the answer to life, the universe, and everything'
```

You learn something every day.

https://www.becomebetterprogrammer.com/can-javasscript-object-keys-be-numbers-or-non-string-values/
