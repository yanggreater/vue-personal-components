Vue.component('list',{
    props:{
        list:{
            type:'Array',
            default:function(){
                return []
            }
        }
    },
    render:function(h){
        var list = [];
        var _this = this;
        this.list.forEach((msg,index) => {
            var node = h('div',{
                attrs:{
                    class:'list-item'
                }
            },[
                h('span',msg.name+':'),
                h('div',{
                    attrs:{
                        class:'list-msg'
                    }
                },[
                    h('p',msg.message),
                    h('a',{
                        attrs:{
                            class:'list-remove'
                        },
                        on:{
                            click:function(){
                                _this.handleRemove(index);
                            }
                        }
                    },'删除'),
                    h('a',{
                        attrs:{
                            class:'list-replay'
                        },
                        on:{
                            click:function(){
                                _this.handleReplay(index);
                            }
                        }
                    },'回复 |')
                    
                ]),
            ]);
            list.push(node);
        });
        if(this.list.length){
            return h('div',{
                attrs:{
                    class:'list'
                },
            },list);
        }else{
            return h('div',{
                attrs:{
                    class:'nothing'
                }
            },'留言板为空');
        }
    },
    methods:{
        handleReplay (index) {
            this.$emit('replay',index);
        },
        handleRemove (index) {
            this.$emit('remove',index);
        }
    }
})