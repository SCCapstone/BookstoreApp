import { React } from "react";
import forums from "./ForumsExample"

function getUsername(userID) {
    // from the UUID of the user, get their name
    // if they can't find the user, like reddit, just say [deleted]
    // going to have to talk to the backend and connect this to Mongo
    if (false) {
        // this is where the mongo talk is going to happen
        // then, find firstName + Lastname and return it as String
    }
    return "[deleted]";
};

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
              <a href={`${forums.link}`}>
                <div class=" ">{forums.post}</div>
                <div class="felx items-end">by: {getUsername(forums.uuid)}</div>
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