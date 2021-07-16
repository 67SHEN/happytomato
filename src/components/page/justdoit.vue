<template>
  <div class="jdi">
    <el-row>
      <el-col :span="14" id="tomato">
        <div class="clock">
          <div class="title">
            <p v-if="flag">未选择任务:</p>
            <p v-else>{{ nowmission }}</p>
          </div>

          <div v-if="!flag" class="btns">
            <el-row>
              <p class="time">{{minute}}:{{sec}}</p>
              <el-button type="danger" round>
                <i class="icon iconfont icon-fanqie1" @click="begin()">开始</i>
              </el-button>
              <el-button type="warning" round>
                <i
                  class="icon iconfont icon-xinbaniconshangchuan-"
                  @click="timestop()"
                  >暂停</i
                >
              </el-button>
            </el-row>
          </div>
          <div class="remind" v-else>
            <el-row>
              (请在"<i class="icon iconfont icon-shucai-">待办清单"选择 do it</i
              >）
            </el-row>
          </div>
        </div>

        <div class="fished-mission">
          <el-table :data="missionData" height="630" border style="width: 100%">
            <el-table-column prop="missionName" label="完成任务" class="mName">
            </el-table-column>
            <el-table-column
              prop="tomatoNum"
              label="番茄数"
              width="70"
              fixed="right"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-col>

      <el-col :span="8">
        <i class="icon iconfont icon-shucai-">待办清单</i>

        <div class="todolist">
          <el-table :data="todoData" height="680" border style="width: 100%">
            <el-table-column
              prop="mission"
              label="任务"
              class="mName"
            ></el-table-column>
            <el-table-column
              prop="tomatoNum"
              label="已完成番茄"
              class="mName"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="tomatoNum"
              label="操作"
              width="250"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click.native.prevent="doit(scope.$index, todoData)"
                  >do it</el-button
                >
                <el-button
                  type="success"
                  size="mini"
                  @click.native.prevent="finshed(scope.$index, todoData)"
                  >完成</el-button
                >

                <el-button
                  size="mini"
                  type="danger"
                  @click.native.prevent="deleteRow(scope.$index, todoData)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-button class="addtodo" @click="open">添加待办 +</el-button>
        <!-- <el-button type="text" @click="open">添加待办 +</el-button> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "jdi",
  data() {
    return {
      missionData: [
        {
          missionName: "吃饭",
          tomatoNum: 2,
        },
        {
          missionName: "睡觉",
          tomatoNum: 3,
        },
        {
          missionName: "打豆豆",
          tomatoNum: 3,
        },
      ],
      todoData: [
        {
          tomatoNum: 0,
          mission: "看书",
        },
        {
          tomatoNum: 0,

          mission: "弹钢琴",
        },
      ],
      second: 1500,
      time: "",
      nowmission:"",
    };
  },
  computed: {
    flag() {
      return this.nowmission === "";
    },
    minute(){
      let str = "";
      let num = Math.floor(this.second / 60);
      if(num<10){
        str = '0' + num;
      }else{
        str = num;
      }
      return str;
    },
    sec(){
      let str = "";
      let num = this.second % 60;
      if(num<10){
        str = '0' + num;
      }else{
        str = num;
      }
      return str;
    }
  },
  mounted: function () {
    var orderHeight = document.body.clientHeight;
    document.getElementById("tomato").style.height = orderHeight + "px";
  },
  methods: {
    doit(index, rows) {
      this.nowmission = rows[index].mission;
      this.index = index;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.$message({
        message: "删除成功",
        type: "success",
      });
    },

    finshed(index, rows) {
      this.$message({
        message: "恭喜你完成了: " + rows[index].mission,
        type: "success",
      });
      this.missionData.push({
        missionName: rows[index].mission,
        tomatoNum: rows[index].tomatoNum,
      });
      rows.splice(index, 1);

    },
    addmisssion() {
      let missonname = prompt("请输入待办事件");
      if (missonname != "") {
        this.todoData.push({ mission: missonname, tomatoNum: 0 });
      }
    },
  
    timestop() {
      console.log("暂停");
      clearInterval(this.time);
      this.$confirm("已暂停番茄钟，请选择接下来的操作:", "提示", {
        confirmButtonText: "提前完成",
        cancelButtonText: "继续计时",
        type: "warning",
      })
        .then(() => {
          this.$message(
            {
              type: "success",
              message: "已提前完成:" + this.nowmission,
            },
            this.finshedtomato(),
            this.todoData = this.todoData.filter((o) => o.mission != this.nowmission),
            this.nowmission = ""
          )
      
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "继续计时",

          }),
       this.begin()
          ;
        });
    },
    finshedtomato(){
     for (let i = 0; i < this.todoData.length; i++) {
        if (this.todoData[i].mission == this.nowmission) {
          this.todoData[i].tomatoNum++;
          this.missionData.push({
           missionName: this.todoData[i].mission,
            tomatoNum: this.todoData[i].tomatoNum,
          })
          break;
        }
      }
      this.second = 1500;
    },
    addtomato() {
      for (let i = 0; i < this.todoData.length; i++) {
        if (this.todoData[i].mission == this.nowmission) {
          this.todoData[i].tomatoNum++;
          break;
        }
      }
      this.second = 1500;
    },
    timer() {
      this.second--;
      if (this.second === 0) {
        clearInterval(this.time);
        this.$message({
          message: "恭喜你，任务: "+this.nowmission+" 完成了1个番茄钟",
          type: "success",
        });
        this.addtomato();
        this.nowmission = ""
      }
    },
    begin() {
      this.time = setInterval(this.timer,1000);
    },
    open() {
      this.$prompt("请输入待办事件", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          let flag = true;
          for(let i = 0 ;i < this.todoData.length;i++){
            if(this.todoData[i].mission == value){
              this.$message({
                  type: "warning",
                  message: "任务已存在",
                });
              flag = false;
              break;
            }
          }
          if(flag){
        this.todoData.push({ mission: value, tomatoNum: 0 });
          this.$message({
            type: "success",
            message: "添加成功 ",
          });
          }
      
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>

<style>
#tomato {
  background-color: #fff;
  border-right: 0px solid #c0ccda;
}
.clock {
  color: black;
  font-size: 30px;
  margin-top: 5%;
  margin-bottom: 3%;
}

.fished-mission {
  margin-top: 3%;
  text-decoration: line-through;
}

.iconfont {
  vertical-align: center;
}
.remind {
  color: gray;
}
.time {
  font-weight: bold;
}
.todolist {
  margin-left: 10px;
}
.addtodo {
  margin-top: 10px;
}
</style>