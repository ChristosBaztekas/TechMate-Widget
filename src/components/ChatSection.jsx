export const ChatSection = ({ radius = "10px" }) => {
    return (
        <main className="ml-6 my-8 max-h-[500px] overflow-scroll overflow-x-hidden">
            {/* Chat Section */}
            <section className="flex justify-start items-center gap-4 my-6">
                {/* Logo Container */}
                <div className="flex justify-center items-center flex-shrink-0 w-14 h-14 bg-lightColor rounded-full font-light">
                    Logo
                </div>
                {/* Chat Message */}
                <p className="w-full bg-lightColor text-darkColor font-light p-4 rounded-[20px] mr-6">
                    <span className="block mb-4">Γεια σας!</span>
                    Είμαι εδώ για να κάνω τη ζωή σας πιο εύκολη και να απαντήσω σε όλες τις απορίες σας σχετικά με ασφάλειες και καλύψεις.
                </p>
            </section>

            {/* Choose Section */}
            <section className="flex flex-col justify-center items-end gap-4 text-xs">
                {[
                    "Τι χρειάζεται για να κάνω μία ασφάλεια;",
                    "Μόλις τράκαρα. Τι πρέπει να κάνω;",
                    "Τι χρειάζεται για να κάνω μία ασφάλεια;"
                ].map((item, index) => (
                    // Option Container
                    <p
                        style={{ borderRadius: radius }}
                        className="w-fit text-lightColor font-semibold border border-primaryColor hover:bg-primaryColor text-center px-4 py-3 cursor-pointer transition-all"
                        key={index}
                    >
                        {item}
                    </p>
                ))}
            </section>
        </main>
    );
};