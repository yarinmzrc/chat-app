import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import { ContactsProvider } from "./providers/ContactProvider";
import { ConversationsProvider } from "./providers/ConversationsProvider";
import { SocketProvider } from "./providers/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return (
    <div className="App">{id ? dashboard : <Login onIdSubmit={setId} />}</div>
  );
}

export default App;
