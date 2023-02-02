import React, { useRef, useState } from "react";
// import ChatBox from "../../components/ChatBox/ChatBox";
// import Conversation from "../../components/Coversation/Conversation";
// import LogoSearch from "../../components/LogoSearch/LogoSearch";
// import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
// import { userChats } from "../../api/ChatRequests";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { selectCurrentToken, selectCurrentUser } from "../../features/auth/authSlice";
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer'
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";

const Chat = () => {
  
  const socket = useRef();
  const name = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  const [user, setUser] = useState('')
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section

  useEffect(() => {
    const getUserId = async() => {
      try {
        await fetch(`${process.env.REACT_APP_BASEURL}/user/details`, {
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data.details);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error)
      }
    }
    getUserId()
  },[])

  
  useEffect(() => {
   
    const getChats = async () => {
      try {
        await fetch(`${process.env.REACT_APP_BASEURL}/chat/${user._id}`,{
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${token}`,
          },
        })
        .then(res => res.json())
        .then(data => {
          
          setChats(data);
        })
        
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);
  
  // Connect to Socket.io
  useEffect(() => {
    
    socket.current = io("ws://localhost:7000");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage)
    }
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {    
    socket.current.on("receive-message", (data) => {      
      setReceivedMessage(data);
    }
    );
  }, []);

  console.log(receivedMessage)

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  let status;

  return (
    <>
    <Navbar chats={true} />
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat"  >
        {/* <LogoSearch /> */}
        <div className="Chat-container scrollbar-hide border-r">
          <h2 className="text-xl font-bold">CHATS</h2>
          <div className="Chat-list">
            {chats.map((chat, i) => (
              <div key={i}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentChat(chat);
                  
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
                
              </div>
              
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat ">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          
        />
      </div>
    </div>
    {/* <Footer /> */}
    </>
  );
};

export default Chat;