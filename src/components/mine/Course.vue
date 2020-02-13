<template>
     <div class="coursecard" id="coursecard">
         <van-swipe-cell>
             <div class="coursecard-main">
         <span class="start van-ellipsis">{{carddata.startAdd}}</span>
                        <div class="img">
                    <img src="../../assets/mine/hengjiantou.png" >
                     <img src="../../assets/mine/arrow1.png"  :class="isBack? '':'back'">
                    </div>
                 <span class="end van-ellipsis">{{carddata.endAdd}}</span>
                    <van-field v-model="course"  placeholder="请选择单程/往返" class="course" :class="isSelect ? 'uncourse' : 'iscourse'" disabled @click="show=true" ref="lineType" value="222"/>
                  </div>
                     <template slot="right">
                            <div class="delete" ref="delete" @click="deleteCourse()">
                           <img style="display:block;width:18px;" src="../../assets/mine/delete.png" />
                              <span style="display:block;">删除</span>
        </div>
  </template>
                    </van-swipe-cell>
                     <van-action-sheet
                       v-model="show"
                      :actions="actions"
                       @select="onSelect"
                       round
                       class="exit-pupor"
                    />
             </div>
</template>
<script>
import link from '../../uitls/js/link'
import { Field,ActionSheet,Toast,SwipeCell,Cell   } from 'vant'
export default {
    name:'Course',
    props:['carddata'],
    data() {
    return {
        show:false,
        isSelect:false,
        isBack:false,
        actions: [
        { name: '单程'},
        { name: '往返'},
      ],
       course:"",
    };
     },
    components:{
        [Field.name]:Field,
          [ActionSheet.name]:ActionSheet,
          [Toast.name]:Toast,
          [SwipeCell.name]:SwipeCell,
          [Cell.name]:Cell
    },
    created() {
            if(this.carddata.lineType=='1'){
                // this.isSelect=false
                this.isSelect=true
                this.course="单程",
                this.isBack=false
            }else if(this.carddata.lineType=='2'){
            //   this.isSelect=true
              this.isSelect=true
               this.course="往返",
               this.isBack=true
        }
    },
     watch: {
        needRef: function() {
            if (this.needRef) {
                this.$emit("ref-ok", true);
            }else{
                this.$emit("ref-ok", false);
            }
        }
    },
    methods: {
        onSelect(item,index){
            this.course = item.name
            this.show=false
            this.isSelect=true
            let upDataObj={
                id:this.carddata.id,
                lineType:1
            }
            if(index=='1'){
                upDataObj.lineType='2'
            this.isBack=true
            this.$api.post(link.updateTransLine,upDataObj).then(res=>{Toast.success('修改成功')}).catch(err=>{
                Toast.console.error('网络错误');
            })
            }else{
            upDataObj.lineType='1'
            this.isBack=false
                this.$api.post(link.updateTransLine,upDataObj).then(res=>{Toast.success('修改成功')}).catch(err=>{
                Toast.console.error('网络错误');
            })
            }
        },
    deleteCourse(){
             this.$emit("deleteCourse",this.carddata.id)

    }
    },
}
</script>
<style lang="less" scoped>
.coursecard-main{
     height: 43.5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
     background:#fff;
    box-shadow: 0px 1px 10px 0px rgba(192, 218, 255, 0.8);
     border-radius: 5px;
}
        .coursecard{
             width: 355px;
             display: flex;
             align-items: center;
             height: 43.5px;
             font-size:14px;
             font-weight:500;
             
             justify-content: space-between;
             margin-bottom: 10px;
             .van-swipe-cell{
                 width: 355px;
             }
             .img{
                 display: flex;
                 align-items: center;
                 justify-content: center;
                 flex-direction: column;
                 width: 20px;
                  img{
                 width: 100%;
                 height: 6px;
                 padding-bottom: 2px;
             }
             .back{
                 display: none
             }
             }
}
.start{
   
    width:92.5px ;
}
.end{
    width:100px ;
    padding-left: 21.5px
}
.course{
    padding: 0;
    width: 103px;
}
.course :not(:last-child)::after{
    content: none
}
  .delete {
      height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    text-align: center;
    .font(14px, 400, @font-color-gray);
  }
</style>
<style >
/* #coursecard .van-swipe-cell__wrapper{
     display: flex;
                 align-items: center;
                 justify-content: space-between;
} */
</style>