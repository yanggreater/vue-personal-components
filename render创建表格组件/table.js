Vue.component('vTable',{
    props:{//传参的接口
        columns:{
            type:Array,
            default:function(){
                return []
            }
        },
        data:{
            type:Array,
            default:function(){
                return []
            }
        },
        stripe:{
            type:Boolean,
            default:false
        }  
    },
    data () {//返回的数据
        return{
            currentColumns:[],
            currentData:[]
        }
    },
    render:function(h){//在这里构造DOM
        var _this = this;

        //构造表格的头部标题
        var ths = [];
        this.currentColumns.forEach((col,index) => {
            if(col.sortTable){
                ths.push(h('th',[
                    h('span',col.title),
                    h('a',{
                        class:{//这是设置点击后的css属性 ,逻辑就是当我点击了会在函数中修改_sortType的值，在这里根据值去设定属性
                            on:col._sortType === 'asc'
                        },
                        on:{
                            click:function(){
                                _this.handleSortByAsc(index);//点击处理排序函数
                            }
                        }
                    },'↑'),
                    h('a',{
                        class:{
                            on:col._sortType === 'desc'
                        },
                        on:{
                            click:function(){
                                _this.handleSortByDesc(index);
                            }
                        }
                    },'↓')
                ]))
            }else{
                ths.push(h('th',col.title));
            }
        });

        //构造表格的内容
        var trs = [];
        this.currentData.forEach((row,index) => {
            var tds = [];
            _this.currentColumns.forEach((cell) => {
                tds.push(h('td',row[cell.key]));
            });
            if(index%2 != 0){
                trs.push(h('tr',{
                    class:{
                        trStyle:_this.stripe
                    }
                },tds));
            }else{
                trs.push(h('tr',tds));
            }
            
        });

        //返回整体的表格系统
        return h('table',[
            h('thead',[
                h('tr',ths)
            ]),
            h('tbody',trs)
        ])
    },
    methods:{
        makeColumns () {//初始化数据columns，并且增加一个属性 _sortTpye是为了之后能通过它去设置a标签的css属性
            this.currentColumns = this.columns.map((col,index) => {
                col._sortType = 'normal';
                //col._index = index;
                return col;
            })
        },
        makeData () {//初始化数据data
            this.currentData = this.data.map((row,index) => {
                //row._index = index;
                return row;
            })
        },
        //排序处理函数
        handleSortByDesc(index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach((col) => {
                col._sortType = 'normal'
            });
            this.currentColumns[index]._sortType = 'desc';

            this.currentData.sort((a,b) => {
                return a[key] > b[key] ? 1:-1
            })
        },
        handleSortByAsc(index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach((col) => {
                col._sortType = 'normal'
            });
            this.currentColumns[index]._sortType = 'asc';
            this.currentData.sort((a,b) => {
                return a[key] < b[key] ? 1:-1
            })

        }
    },
    mounted() {//初始化数据
        this.makeColumns();
        this.makeData();
    },
})