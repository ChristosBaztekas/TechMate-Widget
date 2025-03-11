import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header"; // Components

export const CongratulationsPage = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(10);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (counter <= 0) {
      navigate("/email-form2");
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearTimeout(timeoutRef.current);
  }, [counter, navigate]);

  // Cancel Timer and navigate to page
  const handleCancelAndNavigate = () => {
    clearTimeout(timeoutRef.current);
    navigate("/");
  };

  return (
    <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50">
      <div className="flex flex-col justify-between h-full bg-primaryColor">
        <Header onCancel={handleCancelAndNavigate} />
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
              className="bg-lightColor hover:bg-lightColor/85 text-xl font-semibold text-footerColor rounded-rad h-20 w-full"
              onClick={() => navigate("/email-form2")}
            >
              Θέλω ΠΡΟΣΦΟΡΑ!
            </button>
          </div>
        </main>

        <footer
          className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor p-1"
          onClick={handleCancelAndNavigate}
        >
          Supported by TechMate
        </footer>
      </div>
    </section>
  );
};