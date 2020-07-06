<template>
    <div class="border p-2 shadow m-2">
        <h1 class="display-4 text-center mb-4" style="font-size: 20px">
            Treenode
        </h1>
        <ul v-for="(node, index) in listNodes" :key="index">
            <tree-node-item :item="node"></tree-node-item>
        </ul>
    </div>
</template>

<script>
import TreeNodeItem from "./TreeNodeItem";
export default {
    components: {
        TreeNodeItem
    },
    data() {
        const listNodes = [
            { id: 1, name: "node1", parentId: 0 },
            { id: 2, name: "node2", parentId: 0 },
            { id: 3, name: "node3", parentId: 1 },
            { id: 4, name: "node4", parentId: 1 },
            { id: 5, name: "node5", parentId: 2 },
            { id: 6, name: "node6", parentId: 5 },
            { id: 7, name: "node7", parentId: 3 },
            { id: 8, name: "node8", parentId: 4 },
            { id: 9, name: "node9", parentId: 7 },
            { id: 10, name: "node10", parentId: 4 },
            { id: 11, name: "node11", parentId: 2 },
            { id: 12, name: "node12", parentId: 5 },
            { id: 13, name: "node13", parentId: 3 },
            { id: 14, name: "node14", parentId: 2 },
            { id: 15, name: "node15", parentId: 7 }
        ];
        return {
            listNodes: listNodes.reduce(
                (act, cur) =>
                    Object.assign(act, { [cur.id]: { ...cur, children: [] } }),
                {}
            )
        };
    },
    created() {
        this.setTreeNode(Object.values(this.listNodes));
        console.log(this.listNodes)
    },
    methods: {
        setTreeNode(trees, parentId = 0) {
            const childs = [];
            trees.forEach(tree => {
                if (tree.parentId === parentId) {
                    childs.push(tree);
                }
            });
            if (childs.length) {
                if (parentId !== 0) {
                    this.listNodes[parentId].children = [...childs];
                }
                childs.forEach(child => {
                    this.setTreeNode(trees, child.id);
                });
            }
        }
    }
};
</script>

<style></style>
