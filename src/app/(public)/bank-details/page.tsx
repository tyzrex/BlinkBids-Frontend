import Link from "next/link";
import nmb from "/public/assets/bankLogo/1.png";
import mb from "/public/assets/bankLogo/mb.png";
import sc from "/public/assets/bankLogo/sc.png";
import nb from "/public/assets/bankLogo/image 2.png";
import hbl from "/public/assets/bankLogo/image 3.png";
import lb from "/public/assets/bankLogo/image 5.png";
import na from "/public/assets/bankLogo/image 4.png";
import gb from "/public/assets/bankLogo/image 6.png";
import kb from "/public/assets/bankLogo/image 8.png";
import sb from "/public/assets/bankLogo/image 9.png";
import cb from "/public/assets/bankLogo/image 11.png";
import applyEmi from "/public/assets/bankLogo/applyEmi.png";
import emi from "/public/assets/bankLogo/emi.png";
import nimb from "/public/assets/bankLogo/nimb.png";
import Image from "next/image";
import bgElements from "public/assets/bgElements.png";
import { MdArrowForwardIos, MdKeyboardArrowRight } from "react-icons/md";

export default function BankDetails() {
  const image = [nmb, mb, sc, hbl, lb, gb, nb, kb, sb,cb, na,nimb];
  const bankData = [
    {
      title: "What is EMI?",
      description:
        "EMI, or 'Easy Monthly Installments,' is like a budget-friendly magic trick for buying stuff. It's your secret weapon when you want that new gadget or dreamy sofa but don't want to drop all your cash at once. With EMI, you break down the cost into bite-sized chunks, usually every month, covering both the cool thing you're getting and a bit of interest. It's like getting what you want without playing hide-and-seek with your wallet. So, go ahead, splurge a little, and let EMI be your money-savvy sidekick!",
      image: emi,
    },
    {
      title: "How To Apply For EMI?",
      description:
        "To apply for EMI, it's a breeze! If you have a credit card, just select the Apply EMI option during your purchase. If not, no worries – gather your salary certificate, bank statements, citizenship proof, and a passport-sized photo. Head to the EMI application section on the website, fill in your details, upload the required documents, and voila! Your ticket to easy payments is just a few clicks away. Now, you can enjoy your favorite buys without breaking the bank!",
      image: applyEmi,
      link: {
        title: "Full process for applying for EMI",
        slug: "",
      },
    },
  ];
  return (
    <>
      <div>
        <div className="bg-blue-500 text-white relative font-bold overflow-hidden mb-6">
          <div className="absolute  right-0 lg:top-[-69px] md:top-[-69px] sm:top-[60px]">
            <Image src={bgElements} alt="" className="lg:w-[600px] md:w-[578px] sm:w-[364px] object-contain" />
          </div>
          <div className="max-w-layout">
            <h3 className="w-[370px]  text-5xl  pt-[3rem] ">
              Shop Like Never Before
            </h3>

            <h3 className="text-5xl   pb-[3rem]">
              <span className="text-xl mr-2 ">With</span>0% EMI
            </h3>
          </div>
        </div>
        <div className="max-w-layout ">
          <div className="py-6">
            <h4 className="font-bold text-3xl text-center mb-4 ">
              Online EMI Service In Nepal
            </h4>
            <p className="text-center">
              Welcome to FatafatSewa, your premier destination for the best
              online EMI service in Nepal. Our commitment is to make quality
              products accessible to all, and with partnerships with over 12
              commercial banks, we bring you unparalleled flexibility in EMI
              options. Say goodbye to financial barriers and hello to a world of
              seamless, affordable shopping. Experience the ease of
              FatafatSewa&apos;s online EMI service and unlock a world of
              possibilities today
            </p>
          </div>

          <div className="flex-center py-6">
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-10">
              {image.map((img, index) => (
                <div key={index} className="w-[200px] h-[90px] bg-white">
                  <Image
                    src={img}
                     
                    alt=""
                    className="w-full  object-contain h-full border-2 border-solid border-gray-800 p-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
          {bankData.map((item, index) => (
            <div key={index} className="max-w-layout text-white py-6">
              <div
                key={index}
                className={`sm:flex-flex-col md:flex lg:flex
              ${index % 2 !== 0 && `flex-row-reverse`}  
            `}
              >
                <div
                  className={`bg-blue-500 p-10  lg:w-8/12
                  md:w-6/12
                  flex flex-col justify-center h-full `}
                >
                    <h4 className="font-bold text-3xl mb-5">{item.title}</h4>
                    <p className="leading-relaxed mb-5">{item.description}</p>
                    {item.link && (
                      <Link
                        href={item.link.slug}
                        prefetch={false}
                        className="flex items-center underline"
                      >
                        {item.link.title}

                        <MdArrowForwardIos className="ml-1" />
                      </Link>
                    )}
                </div>
                <div
                  className={` lg:w-4/12 md:w-6/12
                  bg-white flex-center`}
                >
                  <Image src={item.image} alt="" width={'400'}  className=" h-[300px] object-contain"/>
                </div>
                </div>
              </div>
          ))}
        </div>
    </>
  );
}
