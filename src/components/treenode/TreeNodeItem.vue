<template>
    <li>
        <div>
            {{ item.name }}
        </div>
        <ul>
            <tree-node-item
                v-for="(child, index) in item.children"
                :key="index"
                :item="child"
            ></tree-node-item>
        </ul>
    </li>
</template>

<script>
export default {
    name: "tree-node-item",
    props: {
        item: [Object, Array]
    }
};
</script>

<style></style>
