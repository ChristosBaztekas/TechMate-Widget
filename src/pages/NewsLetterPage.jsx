import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const NewsLetterPage = () => {
  return (
    <section className="flex flex-col h-screen w-full bg-darkColor fixed bottom-0 right-0 z-50  overflow-scroll overflow-x-hidden rounded-rad">
      <div className="flex flex-col justify-between h-full bg-[#501AC8]">
        <Header />

        <main className="flex flex-col justify-around items-center h-full text-lightColor mx-5">
          <div className="flex flex-col text-center gap-7 items-center">
            <h1 className="text-4xl font-bold">Newsletter!</h1>
            <p className="text-2xl font-black w-[90%]">
              Θα λαμβάνετε εντελώς δωρεάν, newsletter με επιμορφωτικό υλικό!
            </p>
          </div>
          <div className="w-full mt-8">
            <input
              placeholder="E-mail*"
              type="email"
              className="bg-lightColor text-xl p-5 text-black/70 rounded-xl h-20 vsm:h-[70px] w-full mb-4 outline-none"
              aria-label="Email"
            />
            <div className="w-full flex mt-1">
              <button
                className="bg-hoverColor hover:bg-hoverColor/85 text-2xl font-black text-white rounded-xl h-20 vsm:h-[70px] w-full"
                aria-label="I want an OFFER!"
                style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
              >
                Δωρεάν Ανάλυση Αναγκών!
              </button>
            </div>
          </div>
          <p className="text-left font-medium text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </main>

        <Footer />
      </div>
    </section>
  );
};
