import Balancer from "react-wrap-balancer";
import Image from "next/image";
import D1 from "../../../public/img/landing/d1.svg";
import D2 from "../../../public/img/landing/d2.svg"
import D3 from "../../../public/img/landing/d3.svg";
import D4 from "../../../public/img/landing/d4.svg";
import Dino_Coding from "../../../public/img/landing/dinos_coding.png"
export default function About() {
  const d1_stylesheet = {
    width:'25rem',
    height: "auto",
    sm:"width: 30rem" 
  };
  return (
    <section
      className="relative z-10 min-h-screen w-full bg-[#603a17] bg-[url('/img/landing/About_background.svg')] bg-no-repeat bg-cover px-5 py-20"
      id="About">
      <div className="mx-auto max-w-6xl pt-20">
        <div className="w-full h-full">
          <Image
            src={D1}
            className="rotate-6 w-[9rem] sm:w-[10rem] md:w-[9rem] lg:w-[11rem] 2xl:w-[12rem] top-0 right-0 md:left-10 lg:left-1/4 2xl:left-12 absolute -z-[1]"
            alt="d1.svg"
          />
          <Image
            src={D2}
            className="rotate-[-12deg] w-[8rem] sm:w-[10rem] md:w-[9rem] lg:w-[10rem] 2xl:w-[12rem] left-4 top-1/3  md:top-1/3 md:left-3/4 lg:top-[42%] lg:left-4 2xl:left-3/4 absolute -z-[1]"
            alt="d2.svg"
          />
          <Image
            src={D3}
            className="w-[9rem] sm:w-[10rem] 2xl:w-[13rem] right-0 top-[50rem] sm:top-[62%] md:top-[90%] md:right-60 lg:hidden 2xl:block  2xl:top-4/5 absolute -z-[1]"
            alt="d3.svg"
          />
          <Image
            src={D4}
            className="rotate-12 w-[7rem] sm:w-[8rem] lg:w-[9rem] 2xl:w-[11rem] bottom-10 left-12 sm:right-12 md:bottom-0 md:hidden lg:block lg:bottom-7 lg:left-1/3 2xl:top-[52rem] 2xl:left-12 absolute -z-[1]"
            alt="d4.svg"
          />
        </div>

        {/* Info columns */}
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-y-6 bg-[#F7F0E8] border-[#A5836B] border-4 rounded-xl p-5">
            <h1 className="font-oswald text-center text-5xl font-bold italic text-[#A5836B] md:text-left lg:text-6xl">
              ABOUT US
            </h1>
            <p className="text-center font-mono text-lg font-bold text-[#A5836B] md:text-left">
              <Balancer>
                RowdyHacks is a free, weekend-long, overnight hackathon hosted
                at UTSA! Students can join us to network, code, collaborate, and
                compete. We welcome hackers from all disciplines, backgrounds, &
                technical levels!
              </Balancer>
            </p>
          </div>
          {/* Placeholder for let's get rowdy alternative */}
          <img
            src="/img/landing/lil_man.png"
            className="mx-auto hidden md:block md:w-[200px] md:h[200px] lg:w-[250px] lg:h[250px] 2xl:w-[300px] 2xl:h[3000px]"
          />
          <Image
            src={Dino_Coding}
            alt="Dinosaurs Coding Around A Table"
            className="w-80 sm:w-96 md:w-[25rem] lg:w-[26rem] 2xl:w-[34rem] mx-auto"
          />
          <div className="pb-20 md:pb-0 flex flex-col justify-center">
            <div className="flex flex-col justify-center gap-y-10 bg-[#F7F0E8] border-[#A5836B] border-4 rounded-xl p-5">
              <h1 className="font-oswald text-center text-5xl font-bold italic text-[#A5836B] md:text-left lg:text-6xl">
                WHO CAN ATTEND?
              </h1>
              <p className="text-center font-mono text-lg font-bold text-[#A5836B] md:text-left">
                <Balancer>
                  We're excited to welcome hackers from all disciplines,
                  backgrounds, & technical levels! Whether you can't count the
                  number of apps you've built, or you have never written a line
                  of code before, RowdyHacks has something for everyone!
                </Balancer>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
