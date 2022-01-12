const httpServer = require("http").createServer();
const options = { /* ... */ };
const socketIO = require("socket.io")(httpServer, options);
console.log('서버 시작 : port 3000');
const mysql = require("mysql2");

const connnection = mysql.createConnection({
    host: '13.125.206.88',
    port: 3306,
    user: "master",
    password: 'ss5498950',
    database: 'test_spaus'
});
try {
    connnection.connect();
} catch (error) {
    console.log("DB 접속 에러 발생 : "+error);
}



let test_space_id = "";



//클라이언트에서 connection이벤트를 보내면 최초로 실행된다.
socketIO.on("connection", (socket) =>{

    let user_data;

    // emit은 클라이언트에 이벤트를 보낼 때 사용
    socket.emit('PlayerConnected');    

    user_data = socket.data;

    //나의 캐릭터 쿼리해서 유니티에 던져주는 부분
    socket.on('FindMyInfo', (arg) =>{
        
        const arg2 = JSON.parse(arg);  
                
       
        //받은 정보를 깐다.
        const user_email = arg2.user_email;
        const room_id = arg2.room_id;
        test_space_id = room_id;        

        
        const sql = "SELECT user_nickname, user_email, user_character_kind, user_character_cloth FROM Users WHERE user_email = ?";


        async function f(){
            const query =  new Promise((resolve, reject) =>{
                connnection.query(sql, user_email, (err, rows, fields)=>{        
                    if (err) console.log(err);            
                    // 소켓의 데이터에 유저의 정보를 넣어준다.
                    socket.data = rows[0];    
                    socket.emit('CreateMyCharacter', rows[0]);                    
                    
                    resolve(socket.data);
                });    
            });
            query.then((result) => {
                // console.log("처리된 데이터"+result.user_email);
            }).catch((err) => {
                
            });                     

        }

        f();            

        const rooms = socketIO.sockets.adapter.rooms;
        // console.log(rooms);

        //지정한 방 안에 있는 유저들을 담는 리스트를 만들어준다.
        const clients = socketIO.sockets.adapter.rooms.get(test_space_id);
        
        //clients의 사이즈를 정한다
        const numClients = clients ? clients.size : 0;
       
        //clients의 사이즈가 0보다 클 경우 == 이미 접속해 있는 유저들이 있을 경우
        if (numClients>0) {
            const clientsList = new Array();

            for (const clientId of clients ) {
        
                //클라이언트 소켓의 정보를 할당.
                const clientSocket = socketIO.sockets.sockets.get(clientId);  
                clientsList.push(clientSocket.data);     
                
                console.log("참여중인 클라이언트"+ JSON.stringify(clientSocket.data));
                
    
                // resolve(clientsNameList);

            }
            console.log("참여중인 유저 리스트 : "+clientsList);
            // 이미 접속해 있는 다른 캐릭터들의 정보를 클라이언트에게 던져주고 클라가 어레이를 받아서 캐릭터를 생성하자
            socket.emit("CreateOtherUsers", clientsList);
        }        

        socket.join(test_space_id);
        
    });

    // 마이스페이스에 접속
    // 스페이스에 접속할 때 필요한것.
    // 다른 유저의 정보, 스페이스의 정보. 지금은 스페이스 꾸미는 기능 구현이 안 되있으니깐 다른 입장한 유저의 정보만 가지고 와보자.
    // 다른 유저의 정보는 여러번 쿼리를 해야하는지, 아니면 유저들이 접속할 때마다 쿼리한 정보를 가지고 있을지 고민...





    //다른 유저의 스페이스에 접속



    //클라이언트와 연결되었을 때 유저
    socket.on('disconnect', () =>{
        console.log("접속 끊김");
    });

});



httpServer.listen(3000);