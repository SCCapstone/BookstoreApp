import { React } from "react";
import { styles } from "../styles";
import forums from "./ForumsExample"

const Forums = () => {
    return(
    <section className="">
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          Forums
        </div>
      </div>
      <div class="">
        This is where the box for posting goes
      </div>
      <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-1 h-full g-6">
        <div class="w-full gap-2 ">
        <div className="grid grid-rows-4 grid-flow-col gap-2">
          {forums.map((forums) => (
            <div key={forums} className="border-2 border-gainsboro hover:border-black bg-camel">
              <a href={`${forums.uuid}`}>
                <div class=" ">{forums.post}</div>
                <div class="felx items-end">by: {forums.post}</div>
              </a>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
    )
};

export default Forums;