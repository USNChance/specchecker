import { Routes } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../components/Home";
import Search from "../components/Search";


function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />              
            </Routes>
        </BrowserRouter>
    )
}

export default Router;