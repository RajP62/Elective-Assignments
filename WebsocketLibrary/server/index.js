const ws = require("ws");


const wsserver = new ws.WebSocketServer({port: 2000},()=>{
    console.log("ws server is running on port 2000");
});

wsserver.on("connection", function connection(ws){
    ws.on('message', function incoming(message){
        let payload = JSON.parse(message);
        ws.send('request recieved');

        wsserver.clients.forEach((client)=>{
            if(client.readyState===ws.OPEN){
                client.send(JSON.stringify(payload));
            }
        })
    });
    ws.send(JSON.stringify({username:'admin',message:"Made Connection"}))
});