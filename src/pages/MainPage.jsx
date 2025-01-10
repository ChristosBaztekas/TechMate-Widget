import { Header, Footer, SendMessage } from "@/components"; // Components

// HomePage component
export const MainPage = () => {
    return (
        <div className="rounded-2xl overflow-hidden bg-darkColor">
            <Header />
            <SendMessage />
            <Footer />
        </div>
    )
}