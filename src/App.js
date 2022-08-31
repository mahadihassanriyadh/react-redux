import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
          {/* navbar */}
          <Navbar></Navbar>

          <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
            {/* header */}
            <Header></Header>

            <hr className="mt-4" />

            {/* tddo lists */}
            <TodoList></TodoList>

            <hr className="mt-4" />

            {/* footer */}
            <Footer></Footer>
          </div>
        </div>
      </div>
    </Provider>
  );
}
