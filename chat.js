const tokenProvider = new Chatkit.TokenProvider({
    url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a57c4f2c-88b3-4083-80d9-507fee2a58eb/token"
});
const chatManager = new Chatkit.ChatManager({
    instanceLocator: "v1:us1:a57c4f2c-88b3-4083-80d9-507fee2a58eb",
    userId: "peppa",
    tokenProvider: tokenProvider
});

chatManager
    .connect()
    .then(currentUser => {
        currentUser.subscribeToRoomMultipart({
            roomId: currentUser.rooms[0].id,
            hooks: {
              onMessage: message => {
                const nome = document.getElementById("nome");
                const ul = document.getElementById("message-list");
                const div = document.createElement("div");
                div.setAttribute('class', 'd-flex justify-content-start mb-4');
                const divv = document.createElement("div");
                divv.setAttribute('class', 'msg_cotainer');
                div.appendChild(divv);
                divv.appendChild(
                  document.createTextNode(`${nome.value}: ${
                    //Aggiungere il controllo del tipo 
                    //di input inserito
                    message.parts[0].payload.content
                  }`)
                );
                ul.appendChild(div);
              }
            }
          });

          const form = document.getElementById("message-form");
          form.addEventListener("click", e => {
            e.preventDefault();
            const input = document.getElementById("message-text");
            if(input.value != ""){
                currentUser.sendSimpleMessage({
                    text: input.value,
                    roomId: currentUser.rooms[0].id
                });
                input.value = "";
            }
          });
    })
    .catch(error => {
        console.error("error:", error);
    });