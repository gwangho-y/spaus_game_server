const httpServer = require("http").createServer();
const options = { /* ... */ };
const socketIO = require("socket.io")(httpServer, options);

console.log('서버 시작 : port 3000');


//방을 담는 배열
// var room_list = [room1, room2, room3];
// on은 클라이언트에서 보낸 이벤트를 실행할 때 사용
socketIO.on('connection', (socket) => {

    //유저가 채팅방에 조인했을때 채팅방 이름을 담고 있는 변수
    var thisRoom = null;

	console.log('클라이언트와 연결되었다!');
    
    // emit은 클라이언트에 이벤트를 보낼 때 사용
    socket.emit('PlayerConnected');
    
    //서버 전체 방 리스트
    let rooms;

    //캐릭터의 위치값을 클라이언트에서 받은 다음 로그를 출력한다
    socket.on('MovePlayer', function(arg) {
        console.log(arg);
        socket.broadcast.to(thisRoom).emit("MoveOtherPlayer",arg);
    });
    
    socket.on('disconnect', function() {
        console.log('A Player disconnected');
    });


    // 유저를 방에 조인 시키고 방에 접속중인 유저들의 정보를 보내준다.
    // 근데 해당 방의 유저들의 이름을 어떻게 알지??
    socket.on('JoinRoom', function(roomName) {
        
        thisRoom = roomName;
        console.log("유저가 선택한 방 이름 " + roomName);

        //this is an ES6 Set of all client ids in the room
        const clients = socketIO.sockets.adapter.rooms.get(roomName);

        //to get the number of clients in this room
        const numClients = clients ? clients.size : 0;
        console.log(numClients);


        

        //방에 나를 제외한 한명이라도 있으면 실행해라
        if (numClients > 0) {
            const clientsNameList = new Array();
            
            //내가 입장했다는걸 다른 유저들한테 알려준다.
            //그럼 다른 유저 클라이언트에서 내 닉네임을 가진 게임캐릭터를 생성한다.
            socket.broadcast.to(thisRoom).emit("JoinAnotherUser",socket.data.username);
            

            function getData(){
                return new Promise(function(resolve){

                    for (const clientId of clients ) {
        
                        //this is the socket of each client in the room.
                        const clientSocket = socketIO.sockets.sockets.get(clientId);
                        
                        clientsNameList.push(clientSocket.data.username);
            
                        console.log("리스트 확인"+ clientsNameList);
            
                        console.log("참여중인 클라이언트 "+ clientSocket.data.username);
                        // //you can do whatever you need with this
                        // clientSocket.leave('Other Room')
            
                        resolve(clientsNameList);

                    }

                });                
            }

            //현재 방에 있는 유저닉네임리스트를 받아온다
            getData().then(function(clientsNameList){
                console.log(clientsNameList);
                
                //현재 방에 있는 유저닉네임리스트를 나의 클라이언트에 보낸다.
                socket.emit('EnterRoom', clientsNameList);

            });
        }
        else{
            //new Array()로 선언하면 쓸데없이 메모리 계속 먹지 않을까?
            socket.emit('EnterRoom', new Array());
        }
        
        socket.join(roomName);
        
    });

    // 클라이언트에서 로그인을 하면 소켓의 이름을 캐릭터명으로 만들기 위한 메서드
    socket.on('SetMySocketName', function(socketName) {
        socket.data.username = socketName;
        console.log(socket.data.username);
        //서버 전체 방 리스트
        rooms = socketIO.sockets.adapter.rooms;
        console.log(rooms);
    });
    
});



httpServer.listen(3000);





  // const count = socketIO.engine.clientsCount;
    // console.log("연결된 모든 소켓의 카운트 "+ count);