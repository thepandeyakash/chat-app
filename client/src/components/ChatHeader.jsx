import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [isOnline, setIsOnline] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (selectedUser && Array.isArray(onlineUsers)) {
            setIsOnline(onlineUsers.includes(String(selectedUser.id)));
        }
    }, [onlineUsers, selectedUser]);

    useEffect(() => {
        if (!socket || !selectedUser) {
            
            setIsTyping(false);
            return;
        }

        const handleTyping = ({ senderId, isTyping }) => {
            
            if (String(senderId) === String(selectedUser.id)) {
                setIsTyping(isTyping);
            }
        };

        socket.on("user_typing", handleTyping);

        
        return () => {
            socket.off("user_typing", handleTyping);
        };
    }, [selectedUser]); 

    if (!selectedUser) return null;

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 h-10 rounded-full relative overflow-hidden">
                            <img
                                src={selectedUser.profilePic || "/avatar.png"}
                                alt={selectedUser.fullName}
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium">{selectedUser.fullName}</h3>
                        <p className="text-sm text-base-content/70">
                            {isTyping ? "typing..." : isOnline ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;