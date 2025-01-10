import { Header, Footer, SendMessage, ChatSection } from "@/components"; // Components

// HomePage component
export const MainPage = () => {
    return (
        <div className="rounded-2xl overflow-hidden bg-darkColor">
            <Header />
            <ChatSection /> {/* use radius prop to change selection inputs border radius ( radius="20px" ) */}
            <SendMessage />
            <Footer />
        </div>
    )
}