import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addMessage, delOneMessage, getAllMessage } from '../Redux/Action/MessageAction';
import './UserMessage.css'; 
function Message() {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.user);
    const location = useLocation();
    const bid = location.state;

    const [newMessage, setNewMessage] = useState('');

    
    const fetchMessages = () => {
        dispatch(getAllMessage(bid._id));
    };


    useEffect(() => {
        fetchMessages(); // Fetch initially when the component mounts
        
        const intervalId = setInterval(fetchMessages, 5000); // Fetch every 5 seconds

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, [dispatch, bid._id]);

    // Handle adding a new message
    const handleAddMessage = () => {
        if (newMessage.trim()) {
            const messageData = {
                message: newMessage,
                taskId: bid.TaskId,
                userId: bid.UserId,
                bidderId:bid.BidderId, 
                role: selector?.user?'user':'bidder',
                bidLogId: bid._id,
            };

            dispatch(addMessage(messageData)).then(() => {
                setNewMessage(''); 
                fetchMessages(); // fetch the message
            });
        }
    };

    
    const handleDeleteMessage = (messageId) => {
        dispatch(delOneMessage(messageId)).then(() => {
                    fetchMessages(); // fetch the message
        });
    };

    return (
        <div className="user-message-container">
            <h1 className="title">Messages</h1>

            <div className="message-list">
                {selector.message && selector.message.length > 0 ? (
                    <ul>
                        {selector.message.map((msg) => (
                            <li
                                key={msg._id}
                                className={`message-item ${msg.role === 'user' ? 'user-message' : 'bidder-message'}`}
                            >
                                <p><strong>{msg.role === 'user' ? 'user' : 'Bidder'}:</strong> {msg.message}</p>
                                <p><small>{new Date(msg.time).toLocaleString()}</small></p>
                                
                                    <button
                                        onClick={() => handleDeleteMessage(msg._id)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-message">No messages available.</p>
                )}
            </div>

            <div className="new-message-container">
                <h2 className="new-message-title">Add a new message</h2>
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows={3}
                    className="message-input"
                />
                <button onClick={handleAddMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
}

export default Message;
