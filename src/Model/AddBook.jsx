import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function AddBook({
  isEdit = false,
  setForm,
  form,
  setIsEdit,
  initialValue,
  fetchAllBooks,
}) {
  const handleForm = (e) => {
    let { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToogle = (val) => {
    if (val === "Add") {
      setIsEdit(false);
      setForm(initialValue);
    }
  };
  const [dismis,setDismis]=useState(false)
  const handleSave = async (val) => {
    if (isEdit === true) {
      await axios
        .patch("http://localhost:5000/book/updatebook", form)
        .then((res) => {
          console.log(res?.data);
          fetchAllBooks();
          toast.success(res?.data);
        })
        .catch((err) => {
          setDismis(false)
          console.log(err);
        });
    } else {
      console.log("IN adding Data")
      await axios
        .post("http://localhost:5000/book/addbook", form)
        .then((res) => {
          toast.success(res?.data);
          fetchAllBooks();
          setDismis(true)
        })
        .catch((err) => {
          toast.error(err?.response?.data);
          setDismis(false)

        });
    }
  };
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={() => handleToogle("Add")}
      >
        Create Book
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <div>
                  <label>Title</label>{" "}
                  <input
                    value={form.tittle}
                    name="tittle"
                    type="text"
                    onChange={(e) => handleForm(e)}
                    className="form-control"
                  />
                </div>
                <div>
                  <label>Author Name</label>{" "}
                  <input
                    value={form.author}
                    name="author"
                    type="text"
                    onChange={(e) => handleForm(e)}
                    className="form-control"
                  />
                </div>

                <div>
                  <label> No of Pages</label>{" "}
                  <input
                    value={form.no_of_pages}
                    name="no_of_pages"
                    type="number"
                    onChange={(e) => handleForm(e)}
                    className="form-control"
                  />
                </div>
                <div>
                  <label> published_at</label>{" "}
                  <input
                    value={form.published_at}
                    name="published_at"
                    type="date"
                    onChange={(e) => handleForm(e)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleSave()}
             
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBook;
