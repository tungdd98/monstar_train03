<template>
    <div id="app" class="container-fluid">
        <div class="mt-1 text-center">
            <img width="30px" height="30px" src="./assets/logo.png" />
        </div>
        <div class="row">
            <div class="col-4"><date-picker></date-picker></div>
            <div class="col-4"><tree-node></tree-node></div>
            <div class="col-4">Timepicker</div>
        </div>
    </div>
</template>

<script>
import DatePicker from "./components/datepicker/DatePicker";
import TreeNode from "./components/treenode/TreeNode";
export default {
    name: "App",
    components: {
        DatePicker,
        TreeNode
    }
};
</script>

<style>
#app {
    font-family: "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 14px;
}
</style>
