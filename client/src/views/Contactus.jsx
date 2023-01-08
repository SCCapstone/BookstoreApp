import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";

const Contactus = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ddw3f6r",
        "template_peypdcl",
        form.current,
        "MEck6kXn4BPEa6daF"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <section class="">
        <div class="pb-4 h-full text-gray-800 max-w-[1500px]">
          <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-3 h-full g-6">
            <div />
            <div class="w-full py-16 gap-2 ">
              <form>
                <div class="pb-4">
                  <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
                    Contact us
                  </div>
                </div>
                <div className={`${styles.paragraph} max-w-[1500px]`}>
                  <h2>
                    Want to get in touch? Call us at the number below or send an
                    email to the Bookstore by filling out the form below. We
                    would love to hear from you!
                  </h2>
                </div>
                <div className="gap-2">

                  <p className={`${styles.paragraph} max-w-[1500px]`}>
                    Too lazy to dial the number, feel free to chat with us
                    through email.
                  </p>
                  <form ref={form} onSubmit={sendEmail}>
                    <div>
                      <label>Name: </label>
                      <input
                        type="text"
                        name="from_name"
                        className="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded"
                      />
                    </div>
                    <div>
                      <label>Email: </label>
                      <input
                        type="email"
                        name="from_email"
                        className="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded"
                      />
                    </div>
                    <p> </p>
                    <div>
                      <label>Message: </label>
                      <textarea
                        name="message"
                        className="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded"
                      />
                    </div>
                    <div className="py-2">
                      <input
                        type="submit"
                        value="Send"
                        class="inline-block px-10 py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
                      />
                    </div>
                  </form>
                </div>
                <div className="phone-container">
                  <h2 className={`${styles.heading3} max-w-[1500px]`}>Phone:</h2>
                  <div className={`${styles.paragraph} max-w-[1500px]`}></div>
                  <p className="text-lg">
                    If you don't want to use email you can alternatively just
                    pick up the phone and feel free to chat with us at this
                    number:
                  (803) 111-1111
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contactus;
