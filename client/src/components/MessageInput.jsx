import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { socket } from "../lib/socket";
import { useAuthStore } from "../store/useAuthStore";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const { sendMessage, selectedUser } = useChatStore();
    const { authUser } = useAuthStore();

    const handleTyping = (value) => {
        setText(value);
        if (!selectedUser || !authUser) return;

        const typingPayload = {
            receiverId: selectedUser.id,
            senderId: authUser.id,
            isTyping: true,
        };

        
        if (!typingTimeoutRef.current) {
            socket.emit("typing", typingPayload);
        }

        clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            const stopTypingPayload = { ...typingPayload, isTyping: false };
            socket.emit("typing", stopTypingPayload);
            typingTimeoutRef.current = null;
        }, 1500);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = null;
            const stopTypingPayload = {
                receiverId: selectedUser.id,
                senderId: authUser.id,
                isTyping: false,
            };
            socket.emit("typing", stopTypingPayload);
        }

        try {
            const messageData = { text: text.trim(), image: imagePreview };
            await sendMessage(messageData);
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    
    return (
        <div className='p-4 w-full'>
            {/* ... your form and inputs ... */}
            <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
                <div className='flex-1 flex gap-2'>
                    <input
                        type='text'
                        className='w-full input input-bordered rounded-lg input-sm sm:input-md'
                        placeholder='Type a message...'
                        value={text}
                        onChange={(e) => handleTyping(e.target.value)}
                    />
                    {/* ... other inputs and buttons ... */}
                </div>
                <button
                    type='submit'
                    className='btn btn-sm btn-circle'
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;