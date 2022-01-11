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


// const array = ["gwangho@gmail.com", "taehee@gmail.com"];

// // /* string으로 변환 */

// for (var i in array) {

//     array[i] = JSON.stringify(array[i]);

// }

// const sql = "SELECT * FROM Users WHERE user_email IN ("+array.join()+")";

// connnection.query(sql, (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

let test_space_id = "";

let user_data;

//클라이언트에서 connection이벤트를 보내면 최초로 실행된다.
socketIO.on("connection", (socket) =>{

    

	// console.log('클라이언트와 연결되었다! \n 데이터 :'+ socket.data+"\n 아이디 : "+ socket.id);
    
    // let address = socket.handshake;
    // console.log('New connection from ' + address.address + ':' + address.port);
    // emit은 클라이언트에 이벤트를 보낼 때 사용
    socket.emit('PlayerConnected');    

    user_data = socket.data;

    //나의 캐릭터 쿼리해서 유니티에 던져주는 부분
    socket.on('FindMyInfo', (arg) =>{
        // console.log("유저가 요청하는 이메일 : " + arg);

        // socket.id = arg;        
        // socket.email = arg; 
        const arg2 = JSON.parse(arg);        
                
       
        //받은 정보를 깐다.
        const user_email = arg2.user_email;
        const room_id = arg2.room_id;
        test_space_id = room_id;

        // console.log("받은 유저 이메일"+user_email);
        // console.log("받은 방 아이디"+test_space_id);
        

        
        const sql = "SELECT user_nickname, user_email, user_character_kind, user_character_cloth FROM Users WHERE user_email = ?";


        async function f(){

            const query =  new Promise((resolve, reject) =>{

                connnection.query(sql, user_email, (err, rows, fields)=>{        
                    if (err) console.log(err);            
                    // 소켓의 데이터에 유저의 정보를 넣어준다.
                    socket.data = rows[0];
                    // console.log(socket.data);
    
                    socket.emit('CreateMyCharacter', rows[0]); 

                    // console.log(socket);    
                    
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

        //this is an ES6 Set of all client ids in the room
        const clients = socketIO.sockets.adapter.rooms.get(test_space_id);

        // console.log(clients);
        //to get the number of clients in this room
        const numClients = clients ? clients.size : 0;

        // console.log("나보다 먼저 참여중인 클라이언트 숫자 : "+ numClients);

        if (numClients>0) {
            const clientsNameList = new Array();

            for (const clientId of clients ) {
        
                //this is the socket of each client in the room.
                const clientSocket = socketIO.sockets.sockets.get(clientId);
                
                console.log("먼저 참여중인 소켓");
                // console.log(clientSocket);
                
                // clientsNameList.push(clientSocket.data);
    
                // console.log("리스트 확인"+ clientsNameList);
    
                // console.log("참여중인 클라이언트 "+ clientSocket.data.user_email);
                
                 console.log("참여중인 클라이언트"+ JSON.stringify(clientSocket.data));
                // //you can do whatever you need with this
                // clientSocket.leave('Other Room')
    
                // resolve(clientsNameList);

            }
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