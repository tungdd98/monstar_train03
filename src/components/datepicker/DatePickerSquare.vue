<template>
    <div
        class="d-inline-block w-square border shadow-sm m-1"
        @click="handleClick"
    >
        {{ data ? data.value : "" }}
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    methods: {
        handleClick() {
            this.$emit("on-change-current-date", this.data);
        }
    }
};
</script>

<style>
.w-square {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
}
</style>
