import { useThemeStore } from "../store/useThemeStore";
import { Sun, Moon, Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Theme</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`btn ${theme === "light" ? "btn-primary" : "btn-outline"}`}
          >
            <Sun className="mr-2" /> Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`btn ${theme === "dark" ? "btn-primary" : "btn-outline"}`}
          >
            <Moon className="mr-2" /> Dark
          </button>
        </div>

        {/* Preview */}
        <h3 className="text-lg font-semibold mt-6">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="px-4 py-3 border-b border-base-300 bg-base-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content">
              J
            </div>
            <div>
              <h3 className="font-medium text-sm">John Doe</h3>
              <p className="text-xs text-base-content/70">Online</p>
            </div>
          </div>
          <div className="p-4 space-y-4 min-h-[200px] bg-base-100">
            {PREVIEW_MESSAGES.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                    msg.isSent ? "bg-primary text-primary-content" : "bg-base-200"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-[10px] mt-1.5 opacity-70">12:00 PM</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-base-300 bg-base-100 flex gap-2">
            <input
              type="text"
              className="input input-bordered flex-1 text-sm"
              value="This is a preview"
              readOnly
            />
            <button className="btn btn-primary">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
