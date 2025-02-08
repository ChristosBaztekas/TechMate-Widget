import Header from "./Header";
import Footer from "./Footer";
import propTypes from "prop-types";

export const PhoneLayout = ({ icon }) => {
  return (
    <section className="flex flex-col h-screen w-full bg-[#501AC8] fixed bottom-0 right-0 z-50 overflow-x-hidden rounded-rad">
      <div className="flex flex-col justify-between h-full">
        <Header />

        <main className="flex flex-col justify-around  overflow-scroll items-center h-full text-lightColor mx-5">
          <img src={icon} alt="phone" className="vsm:w-40" />
          <div className="w-full">
            <input
              placeholder="Ονοματεπώνυμο"
              className="bg-lightColor text-xl p-5 text-black/70 rounded-xl w-full mb-4 outline-none"
            />
            <input
              placeholder="Τηλέφωνο*"
              className="bg-lightColor text-xl p-5 text-black/70 rounded-xl w-full outline-none"
            />
            <div className="w-full flex flex-col vsm:flex-row gap-2 sm:gap-5 mt-5">
              <button className="bg-lightColor hover:bg-lightColor/85 text-xl sm:text-2xl font-bold text-hoverColor rounded-xl h-16 w-full">
                Newsletter!
              </button>
              <button
                className="text-xl sm:text-2xl font-bold text-lightColor bg-hoverColor hover:bg-hoverColor/70 rounded-xl h-16 w-full"
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              >
                Λάβε ΠΡΟΣΦΟΡΑ!
              </button>
            </div>
          </div>
          <p className="text-left font-medium text-xs my-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </main>

        <Footer />
      </div>
    </section>
  );
};

PhoneLayout.propTypes = {
  icon: propTypes.string.isRequired,
};
