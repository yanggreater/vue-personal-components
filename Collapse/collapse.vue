<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
//CSS命名空间
const prefixCls = 'ivu-collapse';
export default {

    name:'collapse',
    props:{
        accordion:{//参数未boolean是否为手风琴模式
            type:Boolean,
            default:false
        },
        value:{//是展开面板的value,但是手风琴下是数组
            type:[Array,String]
        }
    },
    data (){
        return{//在本组件下维护当前选中的面板
            currentValue:this.value
        }
    },
    computed:{
        classes(){
            return `${prefixCls}`;
        }
    },
    methods:{
        getActiveKey () {
            let activeKey = this.currentValue || [];
            const accordion = this.accordion;
            //因为默认折叠是可以展开多个,所以activeKey应该一个数组,里面存放多个展开的panel的name，当时手风琴模式时，也是取数组的第一个
            if(!Array.isArray(activeKey)){
                activeKey = [activeKey];
            }
            //手风琴模式下,传入了多个显示的name，也是取第一项，这才符合了手风琴的只能显示一个的意图
            if(accordion && activeKey.length > 1){
                activeKey = [activeKey[0]];
            }

             for (let i = 0; i < activeKey.length; i++) {//防止设计者在传入的值为数字，全部转化为字符串
                    activeKey[i] = activeKey[i].toString();
                }

            return activeKey;
        },
        setActive () {
            const activeKey = this.getActiveKey();
            this.$children.forEach((child,index) => {//遍历panel组件
                const name = child.name || index.toString();
                
                child.isActive = activeKey.indexOf(name) > -1;
                child.index = index;
            })
        },
        toggle (data) {
                const name = data.name.toString();
                let newActiveKey = [];
                if (this.accordion) {
                    if (!data.isActive) {
                        newActiveKey.push(name);
                    }
                } else {
                    let activeKey = this.getActiveKey();
                    const nameIndex = activeKey.indexOf(name);
                    if (data.isActive) {//如果是点击的面板已经展开，再次点击的时候，就会关闭，在展开的数组中出去
                        //if (nameIndex > -1) {//这句话可以删除，因为如果是激活状态，那么必然nameIndex>-1所以两个判断是重复的
                            activeKey.splice(nameIndex, 1);
                        //}
                    } else {//如果点击没有展开的panel，就会将此面板添加到数组中
                        //if (nameIndex < 0) {
                            activeKey.push(name);
                        //}
                    }
                    newActiveKey = activeKey;//将操作之后的数组赋值
                }
                this.currentValue = newActiveKey;
                this.$emit('input', newActiveKey);
                this.$emit('on-change', newActiveKey);
                //console.log(this.value);
        }
    },
    mounted () {//初始化，设置每一个panel的值和确定开始的状态
        this.setActive();
    },
    watch:{
        value (val) {//接听父元素将value改变时，同步到本组件当中
            this.currentValue = val;
        },
        currentValue (){
            this.setActive()
        }
    }
}
</script>

