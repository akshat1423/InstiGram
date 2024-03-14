import React, { Component, useEffect } from "react";
import {w3cwebsocket as W3CWebSocket } from "websocket";

//fetch name from backend

// export default function Chat() {

//     const chatSocket= new WebSocket(
//         'ws://'+window.location.host +'/ws/user/'+roomName+'/'
//     );

//     chatSocket.onmessage= function(e){
//         const data = JSON.parse(e.data);
//         // console.log(data)
//         // document.querySelector('#abh').innerHTML =(data.tester)
//         document.querySelector('#chat-text').value+=(data.username+ ': ' +data.message+'\n')

//     }

//     useEffect(() => {
//         fetch('http://localhost:8000/<str:room_name>/', {
//             method: "POST",
//             headers: {
//                 "Content-type": 'application/json',
//             },
           
//         })
//             .then(async function (res) {
//                 const json = await res.json();
//                 const roomName = json.roomName;
//                 const username = json.username
//             })
//     },[])

//     document.querySelector ('#submit').onclick = function (e) {
//         const messageInputDom = document.querySelector('#input');
//         const message = messageInputDom.value;
//         chatSocket.send(JSON.stringify({
//             'message': message,
//             'username': username,
//         }));
//         messageInputDom. value = ''
//     };

//     return (
//         <>
//             <textarea id="chat-text" cols="80" rows="30"></textarea><br>
//             <input id="input" type="text" size="80"></input></br>
//             <input id="submit" type="button" value="Send"></input>
//         </>
//     )
// }

class Chat extends Component {

    state = {
      isLoggedIn: false,
      messages: [],
      value: '',
      name: '',
      room: 'vacad',
    }
  
    client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + this.state.room + '/');
  
    onButtonClicked = (e) => {
      this.client.send(JSON.stringify({
        type: "message",
        message: this.state.value,
        name: this.state.name
      }));
      this.state.value = ''
      e.preventDefault();
    }
  
    componentDidMount() {
      this.client.onopen = () => {
        console.log('WebSocket Client Connected');
      };
      this.client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log('got reply! ', dataFromServer.type);
        if (dataFromServer) {
          this.setState((state) =>
            ({
              messages: [...state.messages,
              {
                msg: dataFromServer.message,
                name: dataFromServer.name,
              },],
            })
          );
        }
      };
    }
  
    render() {
      const { classes } = this.props;
      return (
        <Container component="main" maxWidth="xs">
          {this.state.isLoggedIn ?
            <div style={{ marginTop: 50, }}>
              Room Name: {this.state.room}
              <div style={{ height: 500, maxHeight: 500, overflow: 'auto', boxShadow: 'none', }}>
                {this.state.messages.map(message => <>
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar className={classes.avatar}>
                          R
                    </Avatar>
                      }
                      title={message.name}
                      subheader={message.msg}
                    />
                  </Card>
                </>)}
              </Paper>
  
              <form className={classes.form} noValidate onSubmit={this.onButtonClicked}>
                <TextField
                  id="outlined-helperText"
                  label="Make a comment"
                  defaultValue="Default Value"
                  variant="outlined"
                  value={this.state.value}
                  fullWidth
                  onChange={e => {
                    this.setState({ value: e.target.value });
                    this.value = this.state.value;
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Start Chatting
                  </Button>
              </form>
            </div>
            :
            <div>
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  ChattyRooms
                  </Typography>
                <form className={classes.form} noValidate onSubmit={value => this.setState({ isLoggedIn: true })}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Chatroom Name"
                    name="Chatroom Name"
                    autoFocus
                    value={this.state.room}
                    onChange={e => {
                      this.setState({ room: e.target.value });
                      this.value = this.state.room;
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="Username"
                    label="Username"
                    type="Username"
                    id="Username"
                    value={this.state.name}
                    onChange={e => {
                      this.setState({ name: e.target.value });
                      this.value = this.state.name;
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Start Chatting
                    </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </div>}
        </Container>
      )
  
    }
  }
  export default Chat