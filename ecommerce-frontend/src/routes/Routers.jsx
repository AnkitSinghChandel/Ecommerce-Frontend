import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import PrivateComponent from "./PrivateComponent";
import PageNotFound from "../errors/PageNotFound";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import DashBoard from "../components/dashboard/DashBoard";
import LayoutWithSidebar from "../layouts/LayoutWithSidebar";
import Profile from "../auth/Profile";
import AddTeam from "../components/teams/AddTeam";
import AddUpdateTeam from "../components/teams/AddUpdateTeam";
import TeamList from "../components/teams/TeamList";
import AddProduct from "../components/products/AddProduct";
import ProductsList from "../components/products/ProductsList";
import ProductItem from "../components/products/ProductItem";
import AddToCart from "../components/products/AddToCart";

import DragAndDrop from "../components/tasks/DragAndDrop";
// ASC FOLDER👇
import ASCFolder from "../ASC-FOLDER/ASCFolder";
import SelectBox from "../ASC-FOLDER/SelectBox";
import DragAndDropDemo from "../ASC-FOLDER/DragAndDropDemo";
import MyTodoTask from "../ASC-FOLDER/MyTodoTask";
import MyTodoTask2 from "../ASC-FOLDER/MyTodoTask2";
import MyTodoTask3 from "../ASC-FOLDER/MyTodoTask3";
import CheckUncheck from "../ASC-FOLDER/CheckUncheck";

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route element={<LayoutWithSidebar />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/add-team" element={<AddTeam />} /> */}
              {/* <Route path="/add-team/:id" element={<AddTeam />} /> */}
              <Route path="/add-team/" element={<AddUpdateTeam />} />
              <Route path="/update-team/:id" element={<AddUpdateTeam />} />
              <Route path="/team-list" element={<TeamList />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/update-product/:id" element={<AddProduct />} />
              <Route path="/products-list" element={<ProductsList />} />
              <Route path="/product/:id" element={<ProductItem />} />
              <Route path="/add-to-cart" element={<AddToCart />} />

              <Route path="/task" element={<DragAndDrop />} />
              {/* // ASC FOLDER👇 */}
              <Route path="/asc-folder" element={<ASCFolder />} />
              <Route path="/selectBox" element={<SelectBox />} />
              <Route path="/drag-drop-demo" element={<DragAndDropDemo />} />
              <Route path="/todo-task" element={<MyTodoTask />} />
              <Route path="/todo-task2" element={<MyTodoTask2 />} />
              <Route path="/todo-task3" element={<MyTodoTask3 />} />
              <Route path="/check-uncheck" element={<CheckUncheck />} />
            </Route>
          </Route>

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routers;
