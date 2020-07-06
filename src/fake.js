"use strict";
const fakeNode = i => {
    return {
        id: i + 1,
        name: "Node " + i,
        parentId: Math.floor(
            Math.random() * (i++ / ((parseInt(Math.random() * 10) % 5) + 1))
        )
    };
};
const nodes = Array(10)
    .fill(0)
    .map((item, index) => fakeNode(index));
const listNodes = nodes => {
    return nodes.reduce(
        (act, cur) =>
            Object.assign(act, { [cur.id]: { ...cur, children: [] } }),
        {}
    );
};
const objNodes = listNodes(nodes);
const arrNodes = Object.values(objNodes);

const setTreeNode = (trees, parentId = 0, start = 0) => {
    const childs = [];
    const lengthChilds = trees.length;
    for (let i = start; i < lengthChilds; i++) {
        const tree = trees[i];
        if (tree.parentId === parentId) {
            childs.push(tree);
            start++;
        }
    }

    const length = childs.length;
    if (parentId !== 0) {
        objNodes[parentId].children = [...childs];
    }
    for (let i = 0; i < length; i++) {
        const child = childs[i];
        setTreeNode(trees, child.id, start);
    }
};

console.time("start");
setTreeNode(arrNodes);
console.log(objNodes)
console.timeEnd("start");
