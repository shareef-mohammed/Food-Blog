import React, { useEffect, useState } from "react";
import { useRef } from "react";
// import { addMessage, getMessages } from "../../api/MessageRequests";
// import { getUser } from "../../api/UserRequests";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'

const ChatBox = ({ chat, currentUser, setSendMessage,  receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }

  // Receive Message from parent component
useEffect(()=> {
 
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage, currentUser])

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        
        await fetch(`${process.env.REACT_APP_BASEURL}/chat/getUser/${userId}`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(res => res.json())
          .then(data => {
            setUserData(data)
          })
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        
        await fetch(`${process.env.REACT_APP_BASEURL}/message/${chat._id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            setMessages(data);
        })
        
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);


  // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])



  // Send Message
  const handleSend = async(e)=> {
    e.preventDefault()
    if(newMessage.trim() === ''){
      return;
    }
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
    }
    const receiverId = chat.members.find((id)=>id!==currentUser);
    // send message to socket server
    setSendMessage({...message, receiverId})
    // send message to database
    try {
        await fetch(`${process.env.REACT_APP_BASEURL}/message`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                senderId: currentUser,
                text: newMessage,
                chatId: chat._id
            }),
        })
        .then(res => res.json())
        .then(data => {
            setMessages([...messages, data]);
            setNewMessage("");
        })
    }
    catch
    {
        console.log("error")
    }
}

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className="ChatBox-container ">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div className="flex">
                  <img
                    src={userData?.profilePic ? userData.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }
                    alt="Profile"
                    className="followerImage rounded-full"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name p-2 " style={{ fontSize: "0.9rem" }}>
                    <span className="text-xl font-bold">
                      {userData?.userName}
                    </span>
                    
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body scrollbar-hide" >
              {messages.map((message) => (
                <>
                  <div ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              {/* <div onClick={() => imageRef.current.click()}>+</div> */}
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="bg-[#f0abfc] px-4 py-2 mr-4 text-white cursor-pointer rounded-lg" onClick = {handleSend}>Send</div>
              <input 
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;