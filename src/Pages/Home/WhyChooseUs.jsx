import { useEffect } from "react";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const stats = [
    {
      icon: "👷‍♂️",
      number: 2000,
      text: "Our worldwide guide",
    },
    {
      icon: "🤝",
      number: 100,
      text: "Trusted travel agency",
      suffix: "%",
    },
    {
      icon: "🌍",
      number: 10,
      text: "Years of travel experience",
      suffix: "+",
    },
    {
      icon: "😊",
      number: 90,
      text: "Our travelers are happy",
      suffix: "%",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="text-center mb-10">
        <h3 className="text-orange-500 font-semibold">Why Choose Us</h3>
        <h2 className="text-3xl font-bold">Why You Should Travel With Us</h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white text-black p-6 rounded-lg flex flex-col items-center"
            data-aos="fade-up"
          >
            <span className="text-5xl mb-3">{item.icon}</span>
            <h3 className="text-2xl font-bold">
              <CountUp start={0} end={item.number} duration={3} />{item.suffix}
            </h3>
            <p className="text-center">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
