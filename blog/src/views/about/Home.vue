<template>
<div class="backgroud">
  <div class="container">
    <ul class="moon">
      <li class="crater"></li>
      <li class="crater"></li>
      <li class="crater"></li>
    </ul>
    <ul class="mountain-range">
      <li class="mountain"></li>
      <li class="mountain"></li>
      <li class="mountain"></li>
      <li class="mountain"></li>
      <li class="mountain"></li>
      <li class="mountain"></li>
      <li class="mountain"></li>
      <li class="mountain"></li>
      <li class="mountain"></li>
      <li class="mountain"></li>
      <li class="mountain"></li>
    </ul>
    <div class="mountain-range-mask"></div>
    
    <ul class="forest">
      <li class="hill"></li>
      <li class="hill"></li>
      <li class="hill"></li>
    </ul>
    <ul class="sparkles">
        <li class="sparkle one"></li>
        <li class="sparkle one"></li>
        <li class="sparkle one"></li>
        <li class="sparkle one"></li>
        <li class="sparkle two"></li>
        <li class="sparkle two"></li>
        <li class="sparkle two"></li>
        <li class="sparkle two"></li>
        <li class="sparkle three"></li>
        <li class="sparkle three"></li>
        <li class="sparkle three"></li>
        <li class="sparkle three"></li>
        <li class="sparkle four"></li>
        <li class="sparkle four"></li>
        <li class="sparkle four"></li>
        <li class="sparkle four"></li>
        <li class="sparkle five"></li>
        <li class="sparkle five"></li>
        <li class="sparkle five"></li>
        <li class="sparkle five"></li>
        <li class="sparkle six"></li>
        <li class="sparkle six"></li>
        <li class="sparkle six"></li>
        <li class="sparkle six"></li>
        <li class="sparkle seven"></li>
        <li class="sparkle seven"></li>
        <li class="sparkle seven"></li>
        <li class="sparkle seven"></li>
        <li class="sparkle eight"></li>
        <li class="sparkle eight"></li>
        <li class="sparkle eight"></li>
        <li class="sparkle eight"></li>
      </ul>
    <div class="grass">
      <div class="pokemon">
        <div class="poke" id="bulbasaur">
          <div class="ear"></div>
          <div class="ear"></div>
          <div class="head"></div>
          <div class="leg"></div>
          <div class="bulba-body"></div>
          <div class="bulbs">
            <div class="bulb"></div>
          </div>
        </div>
        <div class="poke" id="pikachu">
          <div class="ear"></div>
          <div class="ear"></div>
          <div class="hand"></div>
          <div class="pika-body"></div>
          <div class="head"></div>
          <div class="pika-tail"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="main">
    <el-dialog
      title="起个名字吧"
      :visible.sync="dialogVisible"
      width="300px">
      <el-input placeholder="起个名字吧" maxlength="4" v-model="name"></el-input>
      <div slot="footer">
        <el-button type="primary" @click="setName">确 定</el-button>
      </div>
    </el-dialog>
    <div class="chat">
      <el-container>
        <el-main class="message-box">
          <div class="message-list" ref="messageList">
            <div class="msg" v-for="(item,key) in msgList" :key="key">
              <div class="name" :class="{myself:item.name==name}">{{item.name}}</div>
              <div class="text">{{item.msg}}</div>
            </div>
          </div>
          <div class="message-send">
            <el-input placeholder="请输入内容" v-model="message" @keyup.enter.native="send" class="input-with-select">
              <el-button slot="append" icon="el-icon-chat-line-round" type="primary" @click="send">发送</el-button>
            </el-input>
          </div>
        </el-main>
        <!-- <el-aside class="aside hidden-xs-only">
          <div class="user-box">
            <div class="user" v-for="(u,key) in user" :key="key">{{u}}</div>
          </div>
        </el-aside> -->
      </el-container>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data(){
    return {
      spanLength:"1234567890",
      message:"",
      msgList:[],
      user:[],
      name:"默认",
      dialogVisible:false
    }
  },
  created() {
    
    if(localStorage.getItem("name")){
      this.name=localStorage.getItem("name");
      this.user.push(this.name)
    }else{
      this.dialogVisible=true;
    }
    // 打开一个WebSocket:
    this.ws = new WebSocket('ws://134.175.187.181:3001/test');
    // this.ws = new WebSocket('ws://localhost:3001/test');
    // 响应onmessage事件:
    this.ws.onmessage = msg=>{ 
      let msgObject=JSON.parse(msg.data)
      this.msgList.push(msgObject)
      if(!this.user.includes(msgObject.name)){
        this.user.push(msgObject.name)
        // this.$message({
        //   message: `欢迎${msgObject.name}`,
        //   type: 'success'
        // });
      }
      this.$nextTick(()=>{
        this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight
      })
    };
    // 给服务器发送一个字符串:
    this.ws.addEventListener('open', ()=> {
        // this.ws.send('vue!');
    });
    
  },
  watch:{
    user:function(n,o){
      this.$notify({
          title: '来了一位新伙伴~',
          message: `欢迎 ${n[n.length-1]} 加入聊天室~`,
          type: 'success'
        });
    }
  },
  methods: {
    setName(){
      this.dialogVisible=false;
      if (this.name !="默认") {
        localStorage.setItem("name",this.name);
        this.user.push(this.name)
      }
    },
    send(){
      if(this.message!=""){
        let data ={
          name:this.name,
          msg:this.message
        }
        this.ws.send(JSON.stringify(data));
        this.message="";
      }else{
        this.$message.error('说点啥呗~');
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>

.backgroud{
  background: #82d9a2;
  overflow: hidden;
  // max-width: 1000px;
}
.main{
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content:center;
  align-items: center;
  // background: rgb(243, 241, 241);
  overflow: hidden;
  // opacity: 0.6;
  .chat{
    width: 90vw;
    height: 80vh;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    // background: #Fff;
    z-index: 100;
    // opacity: .6;
    .message-box{
      height: 80vh;
      overflow: hidden;
      padding: 2px;
      .message-list{
        max-width: 1000px;
        height: calc(80vh - 60px);
        overflow: scroll;
        // background: rgb(243, 241, 241);
        border-radius: 5px;
        margin: 10px auto 0;
        .msg{
          display: flex;
          padding: 10px;
          .name{
            flex: none;
            border-radius: 10px;
            padding: 0px 10px;
            background: #737573;
            color: #fff;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            position: relative;
          }
          // .name:after{
          //   position: absolute;
          //   content:"";
          //   top: 7px;
          //   right: -10px;
          //   width:0;  
          //   height:0;  
          //   border-top: 8px solid transparent;  
          //   border-left: 10px solid rgb(252, 252, 252);  
          //   border-bottom: 8px solid transparent;
          // }
          .myself{
            background: #408bb6;
          }
          .text{
            flex: none;
            max-width: 75%;
            font-size: 12px;
            color: #000;
            line-height: 30px;
            margin-left: 15px;
            padding: 0 10px;
            background: rgb(255, 255, 255);
            border-radius: 5px;
            word-wrap:break-word;
            position: relative;
          }
          .text:before{
            position: absolute;
            content:"";
            top: 7px;
            left: -10px;
            width:0;  
            height:0;  
            border-top: 8px solid transparent;  
            border-right: 10px solid rgb(255, 255, 255);  
            border-bottom: 8px solid transparent;
          }
        }
        .msg:after{
          flex: auto;
          content:"";
        }
      }
      .message-send{
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 5px;
      }
    }
    .aside{
      height: 80vh;
      padding: 2px 0 2px 2px;
      .user-box{
        height: 79vh;
        overflow: scroll;
        // background: rgb(243, 241, 241);
        display: flex;
        padding: 10px 0 10px 10px;
        flex-wrap:wrap;
        // justify-content: space-around;
        // justify-content: center;
        .user{
          flex: none;
          height: 30px;
          border-radius: 10px;
          padding: 5px 10px;
          background: #737573;
          color: #fff;
          font-size: 14px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
      .user-box:after{
        flex: auto;
        content:"";
        height: 30px;
      }
    }
  }
}
.container {
  background-image: linear-gradient(to top, #fcf3d8 30%, #eaafc8, #654ea3);
  background-image: -webkit-linear-gradient(to bottom, #fcf3d8 30%, #eaafc8, #654ea3);
  background-color: #654ea3;
  height: 450px;
  width: 450px;
  max-width: 90vw;
  max-width: 90vw;
  border-radius: 100vw;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  overflow: hidden;
}

.mountain-range {
  position: absolute;
  width: 100%;
  height: 100px;
  top: 50%;
  display: flex;
  justify-content: center;
  padding: 0;
}
.mountain-range .mountain:nth-child(1) {
  width: 0;
  height: 0;
  margin-top: 32px;
  margin-left: -60%;
  border-left: 183px solid transparent;
  border-right: 183px solid transparent;
  border-bottom: 91.5px solid #75bbff;
}
.mountain-range .mountain:nth-child(2) {
  width: 0;
  height: 0;
  margin-top: 27px;
  margin-left: -60%;
  border-left: 195px solid transparent;
  border-right: 195px solid transparent;
  border-bottom: 97.5px solid #75bbff;
}
.mountain-range .mountain:nth-child(3) {
  width: 0;
  height: 0;
  margin-top: 24px;
  margin-left: -60%;
  border-left: 198px solid transparent;
  border-right: 198px solid transparent;
  border-bottom: 99px solid #75bbff;
}
.mountain-range .mountain:nth-child(4) {
  width: 0;
  height: 0;
  margin-top: 35px;
  margin-left: -60%;
  border-left: 154px solid transparent;
  border-right: 154px solid transparent;
  border-bottom: 77px solid #75bbff;
}
.mountain-range .mountain:nth-child(5) {
  width: 0;
  height: 0;
  margin-top: 20px;
  margin-left: -60%;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 75px solid #75bbff;
}
.mountain-range .mountain:nth-child(6) {
  width: 0;
  height: 0;
  margin-top: 33px;
  margin-left: -60%;
  border-left: 198px solid transparent;
  border-right: 198px solid transparent;
  border-bottom: 99px solid #75bbff;
}
.mountain-range .mountain:nth-child(7) {
  width: 0;
  height: 0;
  margin-top: 37px;
  margin-left: -60%;
  border-left: 152px solid transparent;
  border-right: 152px solid transparent;
  border-bottom: 76px solid #75bbff;
}
.mountain-range .mountain:nth-child(8) {
  width: 0;
  height: 0;
  margin-top: 27px;
  margin-left: -60%;
  border-left: 166px solid transparent;
  border-right: 166px solid transparent;
  border-bottom: 83px solid #75bbff;
}

.forest {
  position: absolute;
  width: 100%;
  height: 100px;
  top: 65%;
}
.forest .hill {
  position: absolute;
  background-color: #82d9a2;
}
.forest .hill:nth-child(1) {
  width: 600px;
  height: 300px;
  top: -10px;
  left: -150px;
  border-top-left-radius: 300px 150px;
  border-top-right-radius: 300px 150px;
  border-bottom-left-radius: 300px 150px;
  border-bottom-right-radius: 300px 150px;
  box-shadow: inset 20px 30px 50px #2d79a0;
}
.forest .hill:nth-child(2) {
  width: 500px;
  height: 250px;
  top: -5px;
  left: 100px;
  border-top-left-radius: 250px 125px;
  border-top-right-radius: 250px 125px;
  border-bottom-left-radius: 250px 125px;
  border-bottom-right-radius: 250px 125px;
  box-shadow: inset 20px 30px 50px #2d79a0;
}
.forest .hill:nth-child(3) {
  width: 500px;
  height: 250px;
  top: 17px;
  left: -180px;
  border-top-left-radius: 250px 125px;
  border-top-right-radius: 250px 125px;
  border-bottom-left-radius: 250px 125px;
  border-bottom-right-radius: 250px 125px;
  box-shadow: inset 20px 30px 50px #2d79a0;
}

.grass {
  position: absolute;
  width: 600px;
  height: 300px;
  border-radius: 300px / 150px;
  top: 75%;
  left: -100px;
  background: #82d9a2;
  box-shadow: inset 20px 30px 60px #2d79a0;
}

.pokemon {
  position: absolute;
  width: 300px;
  height: 110px;
  left: calc(53% - 150px);
}

.poke {
  position: absolute;
  width: 100px;
  height: 100px;
}

#bulbasaur:before {
  content: '';
  position: absolute;
  width: 100px;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  top: 50px;
  left: 15px;
  transform: rotate(-15deg);
}
#bulbasaur .head {
  position: absolute;
  width: 60px;
  height: 45px;
  background-color: #00efd0;
  border-top-left-radius: 50% 25px;
  border-top-right-radius: 50% 25px;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  left: 55px;
}
#bulbasaur .ear {
  position: absolute;
  height: 20px;
  width: 23px;
  background-color: #00efd0;
  border-top-left-radius: 50px 90px;
  border-top-right-radius: 50px 90px;
  transform-origin: center bottom;
}
#bulbasaur .ear:nth-child(1) {
  transform: rotate(-45deg);
  left: 52px;
  top: -5px;
  animation: rotateLeftBulbEar 2s alternate infinite;
}
#bulbasaur .ear:nth-child(2) {
  transform: rotate(45deg);
  left: 87px;
  top: -5px;
  animation: rotateRightBulbEar 2s alternate infinite;
}
#bulbasaur .bulba-body {
  position: relative;
  width: 65px;
  height: 55px;
  background-color: #00efd0;
  left: 42px;
  top: 20px;
  border-radius: 100%;
  box-shadow: inset 10px -10px #00dbbe;
  animation: bodyBreathe 2s alternate infinite;
}
#bulbasaur .bulba-body:before, #bulbasaur .bulba-body:after {
  content: '';
  position: absolute;
}
#bulbasaur .bulba-body:before {
  width: 10px;
  height: 13px;
  top: 33px;
  left: 8px;
  background-color: #00c6ac;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 30%;
  border-top-right-radius: 30%;
  border-top-left-radius: 50%;
  transform: rotate(-45deg);
}
#bulbasaur .bulba-body:after {
  width: 8px;
  height: 8px;
  top: 30px;
  left: 53px;
  background-color: #00dbbe;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 30%;
  border-top-right-radius: 30%;
  border-top-left-radius: 50%;
  transform: rotate(65deg);
}
#bulbasaur .leg {
  position: absolute;
  width: 20px;
  height: 40px;
  background-color: #00efd0;
  border-bottom-left-radius: 35px 110%;
  border-bottom-right-radius: 35px 110%;
  box-shadow: inset 10px -20px #00d6ba;
  left: 90px;
  top: 30px;
}
#bulbasaur .bulbs {
  position: absolute;
  top: -1px;
  width: 55px;
  height: 55px;
  left: 50px;
  transform-origin: center;
  transform: rotate(45deg);
  z-index: 3;
  animation: bulbaBreathe 2s alternate infinite;
}
#bulbasaur .bulbs:before, #bulbasaur .bulbs:after {
  content: '';
  position: absolute;
  height: 45px;
  width: 45px;
  border-radius: 0 50% 50% 50%;
}
#bulbasaur .bulbs:before {
  transform: translate(-5px, 10px) rotate(7deg);
  background-color: #007061;
}
#bulbasaur .bulbs:after {
  transform: translate(10px, -5px) rotate(-7deg);
  background-color: #008a78;
}
#bulbasaur .bulb {
  position: absolute;
  top: 10px;
  right: 2px;
  left: 3px;
  width: 90%;
  height: 90%;
  border-radius: 0 50% 100% 50%;
  background-color: #00a38e;
  z-index: 4;
  box-shadow: inset 1px -5px #009480;
}

#pikachu {
  left: -.1em;
}
#pikachu:before {
  content: '';
  position: absolute;
  width: 60px;
  height: 80px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  top: 50px;
  left: 115px;
  transform: rotate(40deg);
}
#pikachu .ear {
  position: absolute;
  height: 40px;
  width: 18px;
  background-color: #fff069;
  border-top-left-radius: 60px 150px;
  border-top-right-radius: 60px 150px;
  transform-origin: center bottom;
  overflow: hidden;
}
#pikachu .ear:nth-child(1) {
  transform: rotate(-35deg);
  left: 125px;
  top: -35px;
  animation: rotateLeftEar 1s alternate infinite;
}
#pikachu .ear:nth-child(1):after {
  content: '';
  position: absolute;
  background-color: #444;
  width: 150%;
  height: 15px;
  left: -8px;
  transform: rotate(-30deg);
}
#pikachu .ear:nth-child(2) {
  transform: rotate(50deg);
  left: 157px;
  top: -30px;
  animation: rotateRightEar 1s alternate infinite;
}
#pikachu .ear:nth-child(2):after {
  content: '';
  position: absolute;
  background-color: #444;
  width: 150%;
  height: 15px;
  left: 2px;
  transform: rotate(30deg);
}
#pikachu .hand {
  position: absolute;
  height: 38px;
  width: 15px;
  background-color: #fff069;
  border-top-left-radius: 60px 150px;
  border-top-right-radius: 60px 150px;
  transform-origin: center bottom;
  left: 123px;
  top: 5px;
  z-index: 5;
  transform: rotate(-40deg);
  animation: pikaPat .7s alternate infinite;
}
#pikachu .head {
  position: absolute;
  width: 60px;
  height: 45px;
  background-color: #fff069;
  border-top-left-radius: 50% 25px;
  border-top-right-radius: 50% 25px;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  left: 120px;
  width: 60px;
  height: 55px;
  top: -12px;
}
#pikachu .pika-body {
  position: absolute;
  width: 55px;
  height: 55px;
  background-color: #fff069;
  left: 122px;
  top: 20px;
  border-radius: 22px;
}
#pikachu .pika-body:before, #pikachu .pika-body:after {
  content: '';
  position: absolute;
  background-color: #9c5200;
  width: 70%;
  height: 7px;
  left: 13px;
  border-radius: 100%;
}
#pikachu .pika-body:before {
  top: 15px;
  z-index: 2;
}
#pikachu .pika-body:after {
  top: 30px;
}
#pikachu .pika-tail {
  position: absolute;
  height: 25px;
  width: 16px;
  background: #9c5200;
  border-radius: 5px;
  left: 150px;
  top: 40px;
  transform-origin: bottom center;
  transform: rotate(55deg);
  box-shadow: -2px 2px 1px rgba(68, 68, 68, 0.2);
  z-index: 2;
  animation: rotateTail 2s alternate infinite;
}
#pikachu .pika-tail:before, #pikachu .pika-tail:after {
  content: '';
  transform-origin: bottom center;
  position: absolute;
  background-color: #fff069;
}
#pikachu .pika-tail:before {
  height: 1.45rem;
  width: 1.4rem;
  top: -2rem;
  left: 0.25rem;
  transform: rotate(-90deg);
  border: 1px solid #9c5200;
  border-bottom-right-radius: 5px;
  z-index: 4;
  border-top: 1px solid #fff069;
}
#pikachu .pika-tail:after {
  background: #fff069;
  height: 3rem;
  width: 2rem;
  top: -2.8rem;
  left: -2.5rem;
  border-radius: 5px 5px 0 5px;
  border: 1px solid #9c5200;
}

.moon {
  position: absolute;
  width: 75px;
  height: 75px;
  background: #FFEFBA;
  background: -webkit-linear-gradient(135deg, #FFFFFF, #FFEFBA);
  background: linear-gradient(135deg, #FFFFFF, #FFEFBA);
  border: 5px solid #fffaf0;
  top: 10%;
  left: calc(50% - 45px);
  padding: 0;
  border-radius: 100%;
}
.moon li {
  position: absolute;
  border-radius: 100%;
}
.moon li:nth-child(1) {
  background: #ffe691;
  background: -webkit-linear-gradient(45deg, rgba(255, 250, 240, 0.1), #ffe691);
  background: linear-gradient(45deg, rgba(255, 250, 240, 0.1), #ffe691);
  width: 20px;
  height: 20px;
  left: 5px;
  top: 30px;
}
.moon li:nth-child(2) {
  background: #ffe691;
  background: -webkit-linear-gradient(to left, rgba(255, 250, 240, 0.1), #ffe691);
  background: linear-gradient(to left, rgba(255, 250, 240, 0.1), #ffe691);
  width: 35px;
  height: 35px;
  left: 35px;
  top: 35px;
}
.moon li:nth-child(3) {
  background: #ffe691;
  background: -webkit-linear-gradient(-120deg, rgba(255, 250, 240, 0.1), #ffe691);
  background: linear-gradient(-120deg, rgba(255, 250, 240, 0.1), #ffe691);
  width: 25px;
  height: 25px;
  left: 25px;
  top: 5px;
}

.sparkles {
  position: absolute;
  width: 120%;
  height: 190px;
  top: 30%;
  left: -45px;
}
.sparkles .sparkle {
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 100%;
}
.sparkles .sparkle:nth-child(1) {
  background-color: #e9fbff;
  box-shadow: 0px 0px 10px #e9fbff;
}
.sparkles .sparkle:nth-child(2) {
  background-color: #e9fbff;
  box-shadow: 0px 0px 10px #e9fbff;
}
.sparkles .sparkle:nth-child(3) {
  background-color: #fffce6;
  box-shadow: 0px 0px 10px #fffce6;
}
.sparkles .sparkle:nth-child(4) {
  background-color: #e9fbff;
  box-shadow: 0px 0px 10px #e9fbff;
}
.sparkles .sparkle:nth-child(5) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}
.sparkles .sparkle:nth-child(6) {
  background-color: #fffce6;
  box-shadow: 0px 0px 10px #fffce6;
}
.sparkles .sparkle:nth-child(7) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}
.sparkles .sparkle:nth-child(8) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}
.sparkles .sparkle:nth-child(9) {
  background-color: #ffeefc;
  box-shadow: 0px 0px 10px #ffeefc;
}
.sparkles .sparkle:nth-child(10) {
  background-color: #fffce6;
  box-shadow: 0px 0px 10px #fffce6;
}
.sparkles .sparkle:nth-child(11) {
  background-color: #ffeefc;
  box-shadow: 0px 0px 10px #ffeefc;
}
.sparkles .sparkle:nth-child(12) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}
.sparkles .sparkle:nth-child(13) {
  background-color: #e9fbff;
  box-shadow: 0px 0px 10px #e9fbff;
}
.sparkles .sparkle:nth-child(14) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}
.sparkles .sparkle:nth-child(15) {
  background-color: #ffeefc;
  box-shadow: 0px 0px 10px #ffeefc;
}
.sparkles .sparkle:nth-child(16) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}
.sparkles .sparkle:nth-child(17) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}
.sparkles .sparkle:nth-child(18) {
  background-color: #ffeefc;
  box-shadow: 0px 0px 10px #ffeefc;
}
.sparkles .sparkle:nth-child(19) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}
.sparkles .sparkle:nth-child(20) {
  background-color: #ffeefc;
  box-shadow: 0px 0px 10px #ffeefc;
}
.sparkles .sparkle:nth-child(21) {
  background-color: #fffce6;
  box-shadow: 0px 0px 10px #fffce6;
}
.sparkles .sparkle:nth-child(22) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}
.sparkles .sparkle:nth-child(23) {
  background-color: #e9fbff;
  box-shadow: 0px 0px 10px #e9fbff;
}
.sparkles .sparkle:nth-child(24) {
  background-color: #fffce6;
  box-shadow: 0px 0px 10px #fffce6;
}
.sparkles .sparkle:nth-child(25) {
  background-color: #e9fbff;
  box-shadow: 0px 0px 10px #e9fbff;
}
.sparkles .sparkle:nth-child(26) {
  background-color: #ffeefc;
  box-shadow: 0px 0px 10px #ffeefc;
}
.sparkles .sparkle:nth-child(27) {
  background-color: #fffce6;
  box-shadow: 0px 0px 10px #fffce6;
}
.sparkles .sparkle:nth-child(28) {
  background-color: #e9fbff;
  box-shadow: 0px 0px 10px #e9fbff;
}
.sparkles .sparkle:nth-child(29) {
  background-color: #e9fbff;
  box-shadow: 0px 0px 10px #e9fbff;
}
.sparkles .sparkle:nth-child(30) {
  background-color: #ffeefc;
  box-shadow: 0px 0px 10px #ffeefc;
}
.sparkles .sparkle:nth-child(31) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}
.sparkles .sparkle:nth-child(32) {
  background-color: #f3ffe4;
  box-shadow: 0px 0px 10px #f3ffe4;
}

.one {
  left: 0;
  top: 0;
}
@keyframes flyOne {
  95% {
    opacity: 1;
  }
  100% {
    transform: translate(270px, 75px) scale(0);
    opacity: 0;
  }
}
.one:nth-child(1) {
  animation: flyOne 15s 0s infinite;
}
.one:nth-child(2) {
  animation: flyOne 15s 6.44s infinite;
}
.one:nth-child(3) {
  animation: flyOne 15s 12.88s infinite;
}
.one:nth-child(4) {
  animation: flyOne 15s 19.32s infinite;
}

.two {
  right: 0;
}
@keyframes flyTwo {
  95% {
    opacity: 1;
  }
  100% {
    transform: translate(-270px, 75px) scale(0);
    opacity: 0;
  }
}
.two:nth-child(5) {
  animation: flyTwo 21s 2.7s infinite;
}
.two:nth-child(6) {
  animation: flyTwo 21s 8s infinite;
}
.two:nth-child(7) {
  animation: flyTwo 21s 13.3s infinite;
}
.two:nth-child(8) {
  animation: flyTwo 21s 18.6s infinite;
}

.three {
  left: 0;
  top: 100%;
}
@keyframes flyThree {
  95% {
    opacity: 1;
  }
  100% {
    transform: translate(270px, -75px) scale(0);
    opacity: 0;
  }
}
.three:nth-child(9) {
  animation: flyThree 17s 1.4s infinite;
}
.three:nth-child(10) {
  animation: flyThree 17s 9.9s infinite;
}
.three:nth-child(11) {
  animation: flyThree 17s 18.4s infinite;
}
.three:nth-child(12) {
  animation: flyThree 17s 26.9s infinite;
}

.four {
  right: 0;
  top: 100%;
}
@keyframes flyFour {
  95% {
    opacity: 1;
  }
  100% {
    transform: translate(-270px, -75px) scale(0);
    opacity: 0;
  }
}
.four:nth-child(13) {
  animation: flyFour 25s 5.8s infinite;
}
.four:nth-child(14) {
  animation: flyFour 25s 10.4s infinite;
}
.four:nth-child(15) {
  animation: flyFour 25s 15s infinite;
}
.four:nth-child(16) {
  animation: flyFour 25s 19.6s infinite;
}

.five {
  left: 0;
  top: 50%;
}
@keyframes flyFive {
  95% {
    opacity: 1;
  }
  100% {
    transform: translate(270px, 0px) scale(0);
    opacity: 0;
  }
}
.five:nth-child(17) {
  animation: flyFive 35s 8.7s infinite;
}
.five:nth-child(18) {
  animation: flyFive 35s 14.4s infinite;
}
.five:nth-child(19) {
  animation: flyFive 35s 20.1s infinite;
}
.five:nth-child(20) {
  animation: flyFive 35s 25.8s infinite;
}

.six {
  right: 0;
  top: 50%;
}
@keyframes flySix {
  95% {
    opacity: 1;
  }
  100% {
    transform: translate(-270px, 0px) scale(0);
    opacity: 0;
  }
}
.six:nth-child(21) {
  animation: flySix 23.5s 10.6s infinite;
}
.six:nth-child(22) {
  animation: flySix 23.5s 15s infinite;
}
.six:nth-child(23) {
  animation: flySix 23.5s 19.4s infinite;
}
.six:nth-child(24) {
  animation: flySix 23.5s 23.8s infinite;
}

.seven {
  left: 0;
  top: 25%;
}
@keyframes flySeven {
  95% {
    opacity: 1;
  }
  100% {
    transform: translate(270px, 37px) scale(0);
    opacity: 0;
  }
}
.seven:nth-child(25) {
  animation: flySeven 29s 5s infinite;
}
.seven:nth-child(26) {
  animation: flySeven 29s 12.67s infinite;
}
.seven:nth-child(27) {
  animation: flySeven 29s 20.34s infinite;
}
.seven:nth-child(28) {
  animation: flySeven 29s 28.01s infinite;
}

.eight {
  right: 0;
  top: 25%;
}
@keyframes flyEight {
  95% {
    opacity: 1;
  }
  100% {
    transform: translate(-270px, 37px) scale(0);
    opacity: 0;
  }
}
.eight:nth-child(29) {
  animation: flyEight 28.5s 1.6s infinite;
}
.eight:nth-child(30) {
  animation: flyEight 28.5s 5.34s infinite;
}
.eight:nth-child(31) {
  animation: flyEight 28.5s 9.08s infinite;
}
.eight:nth-child(32) {
  animation: flyEight 28.5s 12.82s infinite;
}

@keyframes pikaPat {
  from {
    transform: rotate(-40deg);
  }
  to {
    transform: rotate(-50deg);
  }
}
@keyframes rotateTail {
  from {
    transform: rotate(55deg);
  }
  to {
    transform: rotate(65deg);
  }
}
@keyframes rotateLeftEar {
  from {
    transform: rotate(-35deg);
  }
  to {
    transform: rotate(-40deg);
  }
}
@keyframes rotateRightEar {
  from {
    transform: rotate(50deg);
  }
  to {
    transform: rotate(60deg);
  }
}
@keyframes bulbaBreathe {
  from {
    transform: rotate(45deg) scale(1);
  }
  to {
    transform: rotate(45deg) scale(1.01);
  }
}
@keyframes bodyBreathe {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}
@keyframes rotateLeftBulbEar {
  from {
    transform: rotate(-45deg);
  }
  to {
    transform: rotate(-55deg);
  }
}
@keyframes rotateRightBulbEar {
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(55deg);
  }
}
</style>
