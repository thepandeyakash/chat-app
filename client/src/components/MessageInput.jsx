import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const { sendMessage, selectedUser } = useChatStore();
    const { authUser, socket } = useAuthStore();

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
            socket.emit("typing", {
                ...typingPayload,
                isTyping: false,
            });

            typingTimeoutRef.current = null;
        }, 1500);
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB.");
            e.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!text.trim() && !imagePreview) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = null;

            socket.emit("typing", {
                receiverId: selectedUser.id,
                senderId: authUser.id,
                isTyping: false,
            });
        }

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            removeImage();
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="p-4 w-full">

            {imagePreview && (
                <div className="mb-3 flex items-start">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Image preview"
                            className="w-20 h-20 object-cover rounded-lg border"
                        />

                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-300 flex items-center justify-center"
                            aria-label="Remove image"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2"
            >
                <div className="flex-1 flex gap-2 items-center">

                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => handleTyping(e.target.value)}
                    />

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className="btn btn-ghost btn-circle"
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Attach image"
                    >
                        <Image size={22} />
                    </button>
                </div>

                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={!text.trim() && !imagePreview}
                    aria-label="Send message"
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;