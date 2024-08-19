import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import {getAccessToken, getUserId} from "@/app/lib/actions";
import {UserType} from "@/app/inbox/page";
import apiService from "@/app/services/apiServices";


export type MessageType = {
  id:string;
  name: string;
  body: string;
  conversationId: string;
  sent_to: UserType;
  sent_by: UserType;
}

const ConversationPage = async ({params}:{params:{id:string}}) =>{
  const userid = await getUserId();
  const token = await getAccessToken();
  if(!userid||!token){
    return(
        <main className="max-w-[1500px] mx-auto px-6 py-12">
          <p>You need to be authenticated</p>
        </main>
    )
  }
  //main content
  const conversation = await apiService.get(`/api/chat/${params.id}/`);

  return(
      <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
        <ConversationDetail conversation={conversation.conversation} messages={conversation.messages}
                            token={token} userId={userid}/>
      </main>
  )
}

export default ConversationPage;
