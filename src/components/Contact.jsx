import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import soundEffects from "../utils/soundEffects";
import { EarthCanvas } from "./canvas";
import Toast from "./ui/toast";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      soundEffects.playNotification();
      setToast({
        open: true,
        message: "Por favor, preencha todos os campos antes de enviar.",
        type: "error",
      });
      return;
    }
    setLoading(true);

    // Check if EmailJS environment variables are configured
    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      soundEffects.playNotification();
      setToast({
        open: true,
        message:
          "A configuração do EmailJS está ausente. Verifique suas variáveis ​​de ambiente.",
        type: "error",
      });
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          user_name: form.name,
          my_name: "iago bruno",
          user_email: form.email,
          my_email: "iago.silva6969@gmail.com",
          user_message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          soundEffects.playNotification();
          setToast({
            open: true,
            message: "Obrigado. Entrarei em contato assim que possível.",
            type: "success",
          });
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          soundEffects.playNotification();
          setToast({
            open: true,
            message: "Ah, algo deu errado. Por favor, tente novamente.",
            type: "error",
          });
        }
      );
  };

  return (
    <>
      {toast.open && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      )}
      <div className="w-full min-h-screen">
        <h2 className="text-[#3b72da] text-center font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] px-4">
          Vamos trabalhar juntos.
        </h2>
        <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-6 lg:gap-10 overflow-hidden text-gray-600 px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-[0.75] w-full xl:w-[40rem] shadow-sm bg-[#fefeff] p-4 sm:p-6 lg:p-8 rounded-2xl"
          >
            <p className={`text-[#8ec5ff] ${styles.sectionSubText}`}>
              Entre em contato
            </p>
            <h3
              className={`${styles.sectionHeadText} text-[28px] sm:text-[32px] lg:text-[36px]`}
            >
              Contato.
            </h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-6 sm:gap-8"
              id="contact"
            >
              <label className="flex flex-col">
                <span className="font-medium text-[#8ec5ff] mb-2 sm:mb-4 text-sm sm:text-base">
                  Nome
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="seu nome"
                  className="bg-[#e7e7e7] py-3 sm:py-4 px-4 sm:px-6 placeholder:text-[#c0b9b98a] rounded-lg outline-none border-none font-medium text-sm sm:text-base w-full"
                />
              </label>
              <label className="flex flex-col">
                <span className="font-medium text-[#8ec5ff] mb-2 sm:mb-4 text-sm sm:text-base">
                  Adicionar email
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu.email@example.com"
                  className="bg-[#e7e7e7] py-3 sm:py-4 px-4 sm:px-6 placeholder:text-[#c0b9b98a] rounded-lg outline-none border-none font-medium text-sm sm:text-base w-full"
                />
              </label>
              <label className="flex flex-col">
                <span className="font-medium text-[#8ec5ff] mb-2 sm:mb-4 text-sm sm:text-base">
                  Sua mensagem
                </span>
                <textarea
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Fale-me sobre o seu projeto."
                  className="bg-[#e7e7e7] py-3 sm:py-4 px-4 sm:px-6 placeholder:text-[#c0b9b98a] rounded-lg outline-none border-none font-medium text-sm sm:text-base w-full resize-none"
                />
              </label>

              <button
                type="submit"
                className="bg-[#2c81f0] py-3 px-6 sm:px-8 rounded-xl outline-none w-fit text-white font-bold shadow-sm shadow-sky-300 text-sm sm:text-base hover:bg-[#5a97f1] transition-colors duration-200"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </motion.div>

          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="xl:flex-1 my-auto h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full"
          >
            <EarthCanvas />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
