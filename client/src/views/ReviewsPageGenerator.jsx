import React, { useState } from "react";
import { styles } from "../styles";
import axios from "axios";

const Reviews = ({ book }) => {
    return (
      <section className="">
        <div className="py-4">
          <div className="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
            Viewing Reviews of {book.title}
          </div>
        </div>
        <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-1 h-full g-6">
          <div class="w-full gap-2 ">
            <div className="grid grid-rows-4 grid-flow-row gap-2">
              {book.reviews.map((review) => (
                <div
                  key={review}
                  className="border-2 border-gainsboro hover:border-black bg-camel"
                >
                  <div class=" ">{review.post}</div>
                  <div class="felx items-end">
                    by: {review.user} on date: {review.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

export default Reviews;
