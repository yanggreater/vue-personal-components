<template>
    <div class="tabs">
        <div class="tabs-title">
            <div v-for="(item,index) in navList"
                :key="index"
                :class="tabClass(item)"
                @click="handleChange(index)">
            {{item.label}}
            </div>
        </div>
        <div class="tabs-content">
            <slot></slot> 
        </div>
    </div>
</template>

<script>
export default {
    props:{
        value:{
            type:[String,Number]
        }
    },
    data(){
        return{
            currentValue:this.value,
            navList:[],
        }
    },
    methods:{
        getTabs(){//获取所有自己的名字为pane子组件
            return this.$children.filter((item) => {
                return item.$options.name === "pane";
            });
        },
        updateNav:function(){
            this.navList = [];
            var _this = this;
            this.getTabs().forEach(function(pane,index){
                _this.navList.push({
                    label:pane.label,
                    name:pane.name||index
                });
                //如果pane组件没有给出name那么默认设置是索引
                if(!pane.name)
                    pane.name = index;
                if(index === 0){
                    if(!_this.currentValue){
                        _this.currentValue = pane.name||index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus(){//标题显示函数
            var tabs = this.getTabs();
            var _this = this;
            tabs.forEach((tab) =>{
                return tab.show = tab.name ===_this.currentValue;
            });
        },
        tabClass(item){//对选中的标题设置特殊的样式
            return [
                'tabs-tab', 
                {
                    'tabs-tab-active':item.name ===this.currentValue
                }
            ]
        },
        handleChange(index){
            var nav = this.navList[index];
            var name = nav.name
            this.currentValue = name;
            this.$emit('input',name);
        }
    },
    watch:{
        value(val){
            this.currentValue = val;
        },
        currentValue(){
            this.updateStatus();
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>
.tabs{
    font-size:14px;
    color: #657180;
}
.tabs-title:after{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #d7dde4;
    margin-top: -1px;
}
.tabs-tab{
    display: inline-block;
    padding: 4px 16px;
    margin-right: 6px;
    background: #fff;
    border: 1px solid #d7dde4;
    cursor: pointer;
    position: relative;
}
.tabs-tab-active{
    color: #3399ff;
    border-top: 1px solid #3399ff;
    border-bottom: 1px solid #fff;
}
.tabs-tab-active:before{
    content: '';
    display: block;
    height: 1px;
    background: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
.tabs-content{
    padding: 8px 0;
}
</style>
