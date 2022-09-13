import moment from "moment";
import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";
import getPartnerInfo from "../../utils/getPartnerInfo";
import gravatarUrl from "gravatar-url";
import { Link } from "react-router-dom";

export default function ChatItems() {
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    const {
        data: conversations,
        isLoading,
        isError,
        error,
    } = useGetConversationsQuery(email);

    // decide what to render
    let content = null;
    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    } else if (isError) {
        content = (
            <li className="m-2 text-center">
                <Error message={error?.data} />
            </li>
        );
    } else if (conversations?.length === 0) {
        content = <li className="m-2 text-center">No conversations yet</li>;
    } else {
        content = conversations.map((conversation) => {
            const { id, message, timestamp } = conversation;
            const partner = getPartnerInfo(conversation.users, email);
            const { name: partnerName, email: partnerEmail } = partner || {};
            return (
                <li key={id}>
                    <Link to={`/inbox/${id}`}>
                        <ChatItem
                            avatar={gravatarUrl(partnerEmail, { size: 80 })}
                            name={partnerName}
                            lastMessage={message}
                            // moment package
                            lastTime={moment(timestamp).fromNow()}
                        />
                    </Link>
                </li>
            );
        });
    }

    return <ul>{content}</ul>;
}
