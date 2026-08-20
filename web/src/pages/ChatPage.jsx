import { useAuth } from "@clerk/react";

export default function ChatPage() {
  const { signOut } = useAuth();
  return (
    <div>
      ChatPage
      <button className="btn btn-primary" onClick={signOut}>
        {" "}
        tbn
      </button>
    </div>
  );
}
