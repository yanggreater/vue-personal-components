<template>
  <transition name="message-fade">
    <div v-if="visible" :class="wrapClasses">
        <img class="message_img" :src="typeImg"/>
        <span class="">
          {{message}}
        </span>
    </div>        
  </transition>
</template>

<script>
  const prefixCls = 'message'
  export default {
    name: 'message',
    data () {
      return {
        visible: false,
        type:'info',
        message: '',
        duration: 3000
      }
    },
    computed:{
      typeImg(){
        return require(`./assets/${this.type}.svg`);
      },
      wrapClasses(){
        return[
          `${prefixCls}`,
          `${prefixCls}-${this.type}`
        ]
      }
    },
    methods: {
      setTimer() {
        setTimeout(() => {
          this.close() // 3000ms之后调用关闭方法
        }, this.duration)
      },
      close() {
        this.visible = false
        setTimeout(() => {
          this.$destroy(true)
          this.$el.parentNode.removeChild(this.$el) // 从DOM里将这个组件移除
        }, 500)
      }
    },
    mounted() {
      this.setTimer() // 挂载的时候就开始计时，3000ms后消失
    }
  }
</script>

<style scoped>
    .message-fade-enter-active, .message-fade-leave-active {
        transition: all .3s ease;
    }
    .message-fade-enter, .message-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateY(-20px);
        opacity: 0;
    }
    .message{
        position: fixed;
        top: 15px;
        right: 36%;
        width: 22%;
        border-radius:4px; 
        padding: 13px 18px;
        color: #616060;
        font-size: 17px;
    }
    .message-close{
        position: absolute;
        top: 25%;
        right: 10px;
        color: rgba(153, 152, 152, 0.774);
        cursor: pointer;
        font-size: 17px;
    }
    .message-close:hover{
        color: #0c0c0c;
    }
    .message_img{
      display: inline-block;
      border-radius: 50%;
      width:17px;
      margin-right: 3px;
    }
    .message-success{
        background: #dcffefd3;
        color: rgb(48, 194, 104);
    }
    .message-info{
        background: #2db7f5;
    }
    .message-warning{
        color: #ecae51;
        background: #ffdec9;
    }
    .message-error{
        background: #ffe2e2;
        color: rgb(255, 108, 108);
    }
</style>
