//make connection
// const socket =  io.connect('http://localhost:4000');
 

//query DOM
var message = document.getElementById('message');
var handle = USER_NAME;
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


message.addEventListener('keypress', (event)=>{
    if( event.key =='Enter' && message.value.length != 0)
    {
    socket.emit('chat', {
                message: message.value,
                handle: USER_NAME
            });
            message.value = "";
            // feedback.innerHTML = "";
        }
        else{
            socket.emit('typing', USER_NAME);
        }
        });

//listen for events
socket.on('chat', (data)=>{

    if(data.handle == USER_NAME){
    output.innerHTML += '<div class="d-flex flex-row justify-content-end"><p class= " small p-2 me-0 ms-6 mb-1 text-black rounded-3 " style="word-break: break-all; white-space: normal;min-width:125px ; max-width : 200px; background: #54B4D3"><strong>' + data.handle + ': </strong><br>'  + data.message + '</p></div>' ;
    // output.innerHTML += '<li class="chat_message d-block small p-2 ms-3  mb-1 text-white rounded-3 bg-info position-absolute end-5" style="min-width:150px;"><b>' + data.handle + '</b><br/>' + data.message +'</li>' ;
    }

    else{
    output.innerHTML += '<div class="d-flex flex-row justify-content-start"><p class= "small p-2 ms-0 me-6 mb-1 text-black rounded-3 " style=" word-break: break-all; white-space: normal; max-width : 200px; min-width : 125px; background: #FAED26"><strong class="text-white">' + data.handle + ': </strong><br>' + data.message + '</p></div>' ;
        // output.innerHTML += '<li class="chat_message small p-2 me-3 mb-1 text-black rounded-3 bg-white position-absolute start-5" style="min-width:150px;"><b>' + data.handle + '</b><br/>' + data.message + '</li>' ;


    }

    scrollToBottom();
});

socket.on('typing', (data)=>{
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    const myTimeout = setTimeout(()=>{
        feedback.innerHTML= '';
    }, 2400);
});

const scrollToBottom = () => {
    var d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
  }

 