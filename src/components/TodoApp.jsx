import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/todoApi";
import "../Style/TodoStyle.css";
import { FaPlus, FaEdit } from "react-icons/fa";


const TodoApp = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState("");
  
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.data);
  const [newTodo, setNewTodo] = useState("");

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const openModal = (todoId, title) => {
    setSelectedTodoId(todoId);
    setUpdatedTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo({ title: newTodo }));
      setNewTodo("");
    }
  };

  const handleUpdateTodo = (todoId) => {
    setSelectedTodoId(todoId);
    setUpdatedTitle(todos.find((todo) => todo._id === todoId).title);
    setIsModalOpen(true);
  };

  const handleSaveTodo = () => {
    dispatch(updateTodo({ _id: selectedTodoId, title: updatedTitle }));
    closeModal();
  };

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
  };


  return (
    <div className="Home-container">
      <Sidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
      <div
        className="headerfiles"
        style={{
          width: showSidebar ? "calc(100%-30%)" : "100%",
          height: "100vh",
          background: "linear-gradient(to right, #87CEEB, #4169E1)",
          position: "absolute",
          left: showSidebar ? "30%" : "0",
          transition: "all 0.5s",
        }}
      >
        {/* header-section-todo */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: showSidebar ? "calc(100%-30%)" : "100%",
            height: "10vh",
          }}
        >
          <h1
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              textTransform: "uppercase",
            }}
          >
            Todo App
          </h1>
        </div>

        {/* main-todo-content-section */}

        <div
          className="todo-contain"
          style={{
            width: showSidebar ? "calc(100%-30%)" : "100%",
            height: "90vh",
          }}
        >
          {/* form-section */}
          <div
            className="form-section"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: showSidebar ? "calc(100%-30%)" : "100%",
              height: "15%",
            }}
          >
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTodo();
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: showSidebar ? "calc(100%-30%)" : "100%",
                height: "100%",
              }}
            >
              <h2
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  textTransform: "uppercase",
                }}
              >
                create todo
              </h2>
              <input
                type="text"
                style={{
                  width: "24%",
                  height: "40%",
                  borderRadius: "10px",
                  border: "none",
                  marginLeft: "1rem",
                }}
                name="newTodo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />

              <button
                style={{
                  width:"6rem",
                  marginInline:"0.5rem",
                  height:"50%",
                  background:"#28a745",
                  border:'none',
                  borderRadius:"10px",
                  color:"white",
                  cursor:"pointer"
                  // width: "1.8rem",
                  // height: "10%",
                  // position: "relative",
                  // right: "32px",
                  // bottom: "0.5rem",
                  // borderRadius: "10px",
                  // border: "none",
                  // background: "white",
                  // fontSize: "28px",
                }}  
                type="submit"
              >
                Add
              </button>
            </form>
          </div>

          {/* addTodo section  */}

          <div
            className="add-todo"
            style={{
              width: showSidebar ? "calc(100%-30%)" : "100%",
              height: "85%",
            }}
          >
            <ul
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {todos.map((todo) => (
                <li
                   key={todo._id}
                  style={{
                    width: "80%",
                    display: "flex",
                    borderRadius: "10px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "2rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    background: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginInline: "2px",
                  }}
                 
                >
                  <div
                    className="text"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "80%",
                      marginRight: "8rem",
                    }}
                  >
                    {todo.title}
                  </div>
                  <div
                    className="button"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "7%",
                    }}
                  >
                    <button
                      onClick={() => handleUpdateTodo(todo._id)}
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "none",
                        width: "1.7rem",
                        height: "1.7rem",
                        cursor:"pointer",
                        
                      }}
                    >
                      <FaEdit
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "none",
                        width: "2rem",
                        height: "100%",
                        borderRadius: "5px",
                        fontSize: "30px",
                        borderRadius: "5px",
                      }}
                    >
                      -
                    </button>
                  
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            border: "none",
            background: "linear-gradient(to right, #87CEEB, #4169E1)",
            color: "white",
            width: "300px",
            margin: "auto",
            borderRadius: "10px",
          },
        }}
      >
        <h2>Edit Todo</h2>
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <button onClick={handleSaveTodo}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default TodoApp;
