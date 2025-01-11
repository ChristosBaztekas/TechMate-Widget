export const SendMessage = () => {
    return (
        <main className="flex p-6 justify-center items-start bg-gradient-to-r from-primaryColor to-gradientColor h-18">
            {/* Textarea for typing the message */}
            <textarea
                placeholder="Πληκτρολογήστε την ερώτησή σας..."
                className="w-full min-h-10 max-h-24 rounded-[20px] pl-5 p-2 outline-none resize-none overflow-hidden"
                aria-label="Message input field"
                rows={1} // Initial height of the textarea
                onInput={(e) => {
                    // Adjust the height of the textarea based on its content
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
            />
            {/* Submit button for sending the message */}
            <button type="submit" className="ml-6 mt-2 text-white font-bold">
                Send
            </button>
        </main>
    );
};