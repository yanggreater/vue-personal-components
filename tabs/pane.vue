<template>
    <transition name="slider" mode="out-in">
        <div class = "pane" v-show = "show">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    name:'pane',
    props:{
        name:{
            type:String
        },
        label:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            show:true
        }
    },
    methods:{
        updateNav(){
            this.$parent.updateNav();
        }
    },
    watch:{
        label (){
            this.updateNav();
        },
    },
    mounted (){
        console.log(this.$parent);
        this.updateNav();
        
    }
}
</script>

<style scoped>
    .slider-enter{
        transform: translateX(100px);
        opacity: 0;
    }
    /* .slider-leave-to{
        transform:translateX(-100px);
        opacity: 0;
    } */
    .slider-enter-active{
        transition: all .3s linear;
    }
    /* */
</style>
