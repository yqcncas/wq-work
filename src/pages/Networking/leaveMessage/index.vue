<template>
    <div class="message-page">
        <p class="title">{{params.title}}</p>
        <textarea class="inputMsg" placeholder="请输入您的留言......" auto-focus v-model="msgContent"/>
        <button class="btn-msg" @click="addLeaveMsg">留言</button>
    </div>
</template>
<script src="./script.js">
</script>

<style lang="scss" scoped>
@import "./index";
</style>
