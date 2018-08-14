<template>
    <div :class="itemClasses">
        <div :class="headerClasses" @click="toggle">
            <slot></slot>
        </div>
        <div :class="contentClasses" v-show="isActive">
            <div :class="boxClasses">
                <slot name="content"></slot>
            </div>
            
        </div>
    </div>
</template>

<script>
const prefixCls = 'ivu-collapse';
export default {
    name:'panel',
    props:{
        name:{//面板的标示
            type:String
        }
    },
    data (){
        return{
            index:0,
            isActive:false,
            // headerClasses:'headerClasses'
        }
    },
    methods:{
        toggle(){
            this.$parent.toggle({
                name:this.name||this.index,
                isActive:this.isActive
            })
        },
        
    },
     computed:{//动态的绑定样式
        itemClasses () {
            return [
                `${prefixCls}-item`,
                {
                    [`${prefixCls}-item-active`]: this.isActive
                }
            ]
        },
        headerClasses () {
            return `${prefixCls}-header`
        },
        contentClasses () {
            return `${prefixCls}-content`
        },
        boxClasses (){
            return `${prefixCls}-content-box`
        }
    },


}
</script>

<style>
    .ivu-collapse{
        width: 500px;
        border: 1px solid #dcdee2;
        border-radius: 3px;
    }
    .ivu-collapse-item{
        color: #6f6f6f;
        border-bottom: 1px solid #dcdee2;
        font-size: 12px;
    }
    .ivu-collapse-header{
        padding: 5px 10px;
        background-color: #f7f7f7;
    }
    .ivu-collapse-content{
        color: rgba(0, 0, 0, 0.774);
        font-size: 13px;
        padding: 0 15px;
    }
</style>
