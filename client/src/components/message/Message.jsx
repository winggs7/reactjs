import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
    return (
        <div className={own ? "message own" : "message"} >
            <div className="messageTop">
                <img className="messageImg" src="https://scontent-xsp1-3.xx.fbcdn.net/v/t39.30808-6/216612626_499193807857402_7278971499168974091_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=825194&_nc_ohc=MKvJEHm9UyQAX_f3Zbm&_nc_ht=scontent-xsp1-3.xx&oh=4015dd8294c1ef9fdcea785ff36719b3&oe=60F99FB5" alt="" />
                <p className="messageText" >{message.text}</p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    )
}
