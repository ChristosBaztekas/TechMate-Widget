export const SendMessage = () => {
    return (
        <main className="flex h-[75px] px-6 justify-center items-center bg-gradient-to-r from-primaryColor to-gradientColor h-18">
            {/* Input field for typing the message */}
            <input
                type="text"
                placeholder="Πληκτρολογήστε την ερώτησή σας..."
                className="w-full h-10 rounded-[20px] px-7 outline-none"
                aria-label="Message input field"
            />
            {/* Submit button for sending the message */}
            <button type="submit" className="ml-6 text-white font-bold">
                Send
            </button>
        </main>
    );
};