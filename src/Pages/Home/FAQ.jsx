import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FAQ = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const faqs = [
    {
      question: "What are the most popular travel packages?",
      answer:
        "Our most popular packages include tropical getaways, adventure tours, and cultural experiences in locations such as Bali, Switzerland, and Japan.",
    },
    {
      question: "Do you offer customized travel plans?",
      answer:
        "Yes! We provide fully customizable travel plans based on your preferences, including destinations, activities, and accommodations.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "We offer flexible cancellation policies depending on the package. You can check individual package details for refund conditions.",
    },
    {
      question: "Are flights included in the travel packages?",
      answer:
        "Flights are not included by default, but we can arrange flight bookings as part of your travel plan upon request.",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="text-center mb-10">
        <h3 className="text-green-500 font-semibold">FAQs</h3>
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-6 max-w-7xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-white shadow-lg p-4 rounded-lg" data-aos="fade-up">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-semibold">{faq.question}</div>
              <div className="collapse-content">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
