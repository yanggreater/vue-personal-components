new Vue({
    el:"#app",
    data:{
        name:"",
        message:'',
        list:[]
    },
    methods:{
        handleSend(){
            if(this.name === ''){
                window.alert('请输入昵称');
                return;
            }
            if(this.message === ''){
                window.alert('请输入信息');
                return;
            }
            this.list.push({
                name:this.name,
                message:this.message
            });
            this.message = '';
        },
        handleReplay(index){
            var name = this.list[index].name;
            this.message = "回复@"+name+':';
            this.$refs.message.focus();
        },
        handleRemove(index){
            this.list.splice(index,1);
        }
    }
})