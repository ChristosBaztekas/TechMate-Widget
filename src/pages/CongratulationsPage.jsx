import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CongratulationsPage = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(10);

  // Effect to update the counter every second and navigate to the main page when the counter reaches 0
  useEffect(() => {
    if (counter <= 0) {
      navigate("/email-form2");
      return;
    }

    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter, navigate]);

  return (
    <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50 rounded-rad">
      <div className="flex flex-col justify-between h-full bg-[#501AC8]">
        <Header />
        <main className="flex flex-col justify-around items-stretch h-full text-lightColor mx-6 vsm:mx-5">
          <p className="text-center font-bold text-3xl vsm:text-4xl">
            Συγχαρητήρια!
          </p>
          <p className="text-center font-bold text-8xl text-hoverColor">
            {counter}
          </p>
          <div className="flex flex-col items-center w-full">
            <p className="text-center text-2xl mb-9 w-[85%]">
              Συμπλήρωσε το τηλέφωνό σου για να σε καλέσουμε και να σε
              ενημερώσουμε για τη προσφορά σου!
            </p>
            <button
              className="bg-lightColor hover:bg-lightColor/85 text-xl font-black text-footerColor rounded-xl h-20 w-full"
              onClick={() => {
                navigate("/email-form2");
              }}
            >
              Θέλω ΠΡΟΣΦΟΡΑ!
            </button>
          </div>
        </main>

        <footer
          className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor p-1"
          onClick={() => navigate("/first")}
        >
          Supported by TechMate
        </footer>
      </div>
    </section>
  );
};
