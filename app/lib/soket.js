// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3001
});
// const messageData=[];
// let wsc = new WebSocket('ws://localhost:3001/test');
// // 打开WebSocket连接后立刻发送一条消息:
// wsc.on('open', function () {
//     // console.log(`[CLIENT] open()`);
//     wsc.send('Hello!');
// })
wss.on('connection', function (ws) {
    // console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        // messageData.push(message);
        console.log(`${message}`);
        wss.clients.forEach(function (client) {
            client.send(message, (err) => {
                if (err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            });
        }); 
    })
});
// function broadcast (){

// }
const fn_open = async (ctx,next)=>{
    wss.on('connection', function (ws) {
        console.log(`[SERVER] connection()`);
        ws.on('message', function (message) {
            console.log(`[SERVER] Received: ${message}`);
            ws.send(`ECHO: ${message}`, (err) => {
                if (err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            });
        })
    });
}
module.exports = {
    "post/soket/open":fn_open
}