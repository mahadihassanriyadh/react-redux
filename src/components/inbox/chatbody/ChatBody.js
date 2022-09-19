// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import Error from "../../ui/Error";

export default function ChatBody() {
    const { id } = useParams();
    const {
        data: messages,
        isLoading,
        isError,
        error,
    } = useGetMessagesQuery(id);

    // decide what to render
    let content = null;
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isError) {
        content = <Error message={error?.data} />;
    } else if (messages.length === 0) {
        content = <div>No conversation</div>;
    } else {
        content = (
            <>
                <ChatHead message={messages[0]} />
                <Messages messages={messages} />
                <Options info={messages[0]} />
            </>
        );
    }

    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">{content}</div>
        </div>
    );
}
