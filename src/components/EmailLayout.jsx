import Header from "./Header";
import Footer from "./Footer";
import propTypes from "prop-types";

export const EmailLayout = ({ icon }) => {
  return (
    <section className="flex flex-col h-screen w-full bg-darkColor fixed bottom-0 right-0 z-50 overflow-scroll overflow-x-hidden rounded-rad">
      <div className="flex flex-col justify-between h-full bg-[#501AC8]">
        <Header />

        <main className="flex flex-col justify-around items-center h-full text-lightColor mx-5">
          <img src={icon} alt="email" className="vsm:w-40" />
          <div className="w-full mt-8">
            <input
              placeholder="E-mail"
              type="email"
              className="bg-lightColor text-xl p-5 text-black/70 rounded-xl h-20 vsm:h-[70px] w-full mb-4 outline-none"
              aria-label="Email"
            />
            <div className="w-full flex mt-1">
              <button
                className="bg-lightColor hover:bg-lightColor/85 text-2xl font-black text-footerColor rounded-xl h-20 vsm:h-[70px] w-full"
                aria-label="I want an OFFER!"
              >
                Θέλω ΠΡΟΣΦΟΡΑ!
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

EmailLayout.propTypes = {
  icon: propTypes.string.isRequired,
};
