import Dashboard from "./component/Dashboard";
import { useUser } from "./contexts/UserContext";
import Login from "./component/Login";
import { useState } from "react";
import moment from "moment";

function App() {
  // const [user, setUser] = useUser();
  const [user, setUser] = useState(true);
  console.log(
    moment("2011-10:31 0923", "YYYYMMDD HHmm").format("YYYY/MM/DD --- HH:mm")
  );
  return <>{user ? <Login /> : <Dashboard />}</>;
}

export default App;
