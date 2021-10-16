chatRoomName = document.getElementById('room-name');
if (chatRoomName) {
    const roomName = JSON.parse(chatRoomName.textContent);
    let user_username = JSON.parse(document.getElementById('user_username').textContent);
    if (!user_username) {
        user_username = "Anonymous User";

    }



    document.querySelector("#submit").onclick = function (e) {
        const messageInputDOM = document.querySelector("#input");
        const message = messageInputDOM.value;
        if (message) {
            const setUsername = document.querySelector("#setUsername");
            console.log(setUsername.value)
            if (!setUsername.value) {
                alert("enter username");
                setUsername.focus();
            } else {
                setUsername.setAttribute('disabled', 'true');
            }
            if (setUsername.value) {
                user_username = setUsername.value;
                chatSocket.send(JSON.stringify({
                    'message': message,
                    'username': user_username,
                }));
                messageInputDOM.value = '';
                messageInputDOM.focus();
            }

        }

    }

    document.querySelector("#chat_form").onsubmit = function (e) {
        e.preventDefault();
        // document.querySelector("#submit").click();
    }
    socketProtocol = "ws://";
    if (location.protocol === 'https:') {
        socketProtocol = "wss://";
    }
    const chatSocket = new WebSocket(
        socketProtocol +
        window.location.host +
        '/ws/chat/' +
        roomName +
        '/'
    );
    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log(data);
        // document.querySelector("#user-hello").innerHTML = (data.tester);

        document.querySelector("#chat-text").innerHTML += "<span class='message'> <span class='username'>" + (data
            .username + ":</span> " + data.message +
            "</span>");
    }


    chatRoomURLInput = document.querySelector("#chat_room_url");
    chatRoomURLInput.value = location.protocol + '//' + location.host + "/chat/" + roomName + "/";

}

let CHAT_ROOMS = Array();
for (let index = 0; index < 10; index++) {
    // let r = (Math.random() + 1).toString(36).substring(2);
    r = "room_" + index;
    CHAT_ROOMS.push(r);
}
joinARoomBtn = document.querySelectorAll(".join-a-room");
joinARoomBtn.forEach(element => {
    element.addEventListener('click', joinARandomRoom);
});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function joinARandomRoom(e) {
    e.preventDefault();
    randInt = getRandomInt(0, CHAT_ROOMS.length);
    randomRoom = CHAT_ROOMS[randInt];
    window.location.href = location.protocol + '//' + location.host + "/chat/" + randomRoom + "/";
}