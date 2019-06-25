<template>
    <div class="lagu-com-page">
        <textarea class="inputMsg" placeholder="请输入您的常用语......" auto-focus v-model="msgContent"/>
        <button class="btn-msg" :loading="loading" @click="saveMsg">保存</button>
    </div>
</template>
<script src="./script.js">
</script>

<style lang="scss">
@import "./index";
</style>
