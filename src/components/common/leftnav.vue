<template>
  <div class="left-nav">
    <ul>
      <li>
        <i class="icon iconfont icon-fanqie"></i>
        <div>开始番茄</div>
      </li>

      <li>
        <i class="icon iconfont  icon-shalou"></i>
        <div>休息冥想<br>(待开发)</div>
      </li>

      <li>
        <i class="icon iconfont icon-pen"></i>
        <div>历史记录<br>(待开发)</div>
      </li>

  
    </ul>
  </div>
</template>

<script>
export default {
  name: "leftNav",
  data() {
    return {};
  },
};
</script>
<style>
    .left-nav{
       color:#fff;
       font-size:10px;
       height:100%;
       background-color: #ee4d98;
       float:left;
       width:5%;
    }
    .iconfont{
       font-size:28px;
    }
    .left-nav ul{
        padding:0px;
        margin: 0px;
       
    }
    .left-nav li{
        list-style: none;
        text-align: center;
        border-bottom:1px solid #f57595;
        padding:10px;
    }
</style>