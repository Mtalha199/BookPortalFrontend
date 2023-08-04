import { useEffect, useState } from "react";
import "./App.css";
import AddBook from "./Model/AddBook";
import TableData from "./Model/Table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);
  let initialValue = {
    tittle: "",
    author: "",
    no_of_pages: 0,
    published_at: "",
  };
  const [form, setForm] = useState(initialValue);
  const formatDateToCustomFormat = (isoDateString) => {
    const dateObject = new Date(isoDateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const fetchAllBooks = async () => [
    await axios
      .get("http://localhost:5000/book/allbooks")
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => [console.log(error)]),
  ];
  useEffect(() => {
    fetchAllBooks();
  }, []);
  const handleEdit = (val) => {
    setIsEdit(true);
    let a = {
      ...val.val,
      published_at: formatDateToCustomFormat(val.val.published_at),
    };
    setForm(a);
  };
  const handleDelete = async (val) => {
    const bookId = {
      _id: val.val._id,
    };
    await axios
      .post("http://localhost:5000/book/deletebook", bookId)
      .then((res) => {
        toast.success(res.data);
        fetchAllBooks();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(data)
  return (
    <>
      <h1 className="text-center mt-3 text-primary">
        Muhammad Talha Book Portal
      </h1>
      <div className="p-4">
        <div className="mb-4">
          <AddBook
            fetchAllBooks={fetchAllBooks}
            isEdit={isEdit}
            setForm={setForm}
            form={form}
            setIsEdit={setIsEdit}
            initialValue={initialValue}
          />
        </div>
        <TableData
          data={data}
          isEdit={isEdit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setIsEdit={setIsEdit}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
