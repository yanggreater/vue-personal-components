<template>
    <transition name="model">
        <div class="model-mask">
            <div class="model-wrapper">
                <div class="model-container">
                    <div class="model-header">
                        <slot name="header"></slot>
                    </div>
                    <div class="model-body">
                        <slot name="body"></slot>
                    </div>
                    <div class="model-footer">
                        <button @click="handleClose">取消</button>
                        <button @click="handleConfirm">确认</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    methods:{
        handleClose(){
            this.$emit('close')
        },
        handleConfirm(){
            this.$emit('confirm')
        }
    }
}
</script>

<style scoped>
    .model-mask{
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
    }
    .model-wrapper {
        margin-top: 50px;
    }
    .model-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }
    .model-body {
        margin: 20px 0;
    }
    .model-footer{
        padding-left: 65%;
    }
    .model-footer button{
        width: 50px;
        height: 30px;
        text-align: center;
        background: #2d8cf0;
        color: #ffffff;
        border: 0px;
        border-radius: 4px;
        cursor: pointer;
        outline:none;
    }
    
    .model-enter {
        opacity: 0;
    }

    .model-leave-active {
        opacity: 0;
    }

    .model-enter .model-container,
    .model-leave-active .model-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
