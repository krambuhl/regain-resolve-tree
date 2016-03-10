# rogain-resolve-tree

Resolve rogain tree with given data into simple dom tree.  The output dom tree is useful for render to string or diffing sets of trees.

## Example

```js
import tree from './template.json';
import data from './data.json';

var currentTreeState = resolveTree(tree, data, config);
```

## resolveTree(tree, props, config)

Resolves a rogain tree into a simple dom tree with a given set of properies.  

___tree___

Object in Rogain tree format.

___props___

Object. 

___config___

[rogain-config](https://github.com/krambuhl/rogain-config) instance.


### Output

The output of the resolveTree function will be a more basic tree.

__Input Rogain Template__

```html
<Each data={friends} as="friend">
  <Friend data={friend} />
</Each>
```

__Friend Component__

```html
<Frame friend={@attrs.data}>
  <h2>{friend.lastName}, {friend.firstName}</h2>
</Frame>
```

__Input Data Object__

```js
{ 
  friends: [
    { firstName: 'Ben', lastName: 'Forester' },
    { firstName: 'Larry', lastName: 'Forman' },
  ]
}
```

__Output Tree__

```js
[
  { type: 'tag', name: 'h2', children: ['Forester, Ben'] },
  { type: 'tag', name: 'h2', children: ['Forman, Larry'] }
]
```

## Install 

With [npm](https://www.npmjs.com) do:

```
npm install rogain-resolve-tree
```

## License

MIT