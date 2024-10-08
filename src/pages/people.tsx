import { useQuery } from "@tanstack/react-query";
import SearchInput from "../components/search-input";
import "../styles/css/people-section.css";
import { getUsers } from "../utils/queries";
import UserCard from "../components/user-card";
import { UserSchema } from "../utils/schema";

export default function People() {
  const { data } = useQuery(getUsers());

  return (
    <div className="people-section">
      <h1>Find or start a conversation</h1>
      <SearchInput></SearchInput>
      <div className="user-card-container">
        {data?.map((user: UserSchema) => {
          return (
            <UserCard
              userId={user.id}
              imgSrc={user.imgUrl}
              username={user.name}
              key={user.id}
              isRelated={user.relatedToCurrent}
              conversation={user.privateConversation}
            ></UserCard>
          );
        })}
      </div>
    </div>
  );
}
