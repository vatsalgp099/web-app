import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import styles from "./styles.module.scss";

import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../utils/requests";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const Home = () => {
  const [formdata, setFormdata] = useState({});
  const [serverData, setServerData] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const [loading, setLoading] = useState(false);

  function onChange(e) {
    let update = { ...formdata };
    update[e.target.name] = e.target.value;
    setFormdata(update);
  }

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    postRequest("http://localhost:8080/info", formdata)
      .then((response) => {
        toast.success("Record Added!");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsCreateModalOpen(false);
        fetchServerData();
        setFormdata({});
      });
  }

  function onChangeEditForm(e) {
    let update = { ...dataToEdit };
    update[e.target.name] = e.target.value;
    setDataToEdit(update);
  }

  function onSubmitEditForm(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
        "id": dataToEdit.id,
        "name": dataToEdit.name,
        "language": dataToEdit.language,
        "framework": dataToEdit.framework,
    }

    putRequest(`http://localhost:8080/info/${dataToEdit.id}`, payload)
      .then((response) => {
        toast.success("Record Updated!");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsEditModalOpen(false);
        fetchServerData()
      });
  }

  function fetchServerData() {
    setLoading(true);
    getRequest("http://localhost:8080/info")
      .then((response) => {
        setServerData(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }

  function deleteRecord(id) {
    setLoading(true);
    deleteRequest(`http://localhost:8080/info/${id}`)
      .then((response) => {
        toast.success("Record Deleted!");
        fetchServerData();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchServerData();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? <Loader /> : null}

      {serverData && serverData.length ? (
        <div className={styles.tableContainer}>
          <div className={styles.header}>
            <h2>All records</h2>
            <button onClick={() => setIsCreateModalOpen(true)}>
              Create Record
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>language</th>
                <th>framework</th>
                <th>Delete Record</th>
                <th>Edit Record</th>
              </tr>
            </thead>
            <tbody>
              {serverData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.language}</td>
                  <td>{item.framework}</td>
                  <td>
                    <button
                      className={styles.delete}
                      onClick={() => {
                        deleteRecord(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.edit}
                      onClick={() => {
                        setDataToEdit(item);
                        setIsEditModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {isCreateModalOpen ? (
        <Modal
          heading="Create Server"
          onClose={() => setIsCreateModalOpen(false)}
        >
          <div className={styles.formWrapper}>
            <form onChange={onChange} onSubmit={onSubmit}>
              <label>id</label>
              <input name="id" type="text" required />

              <label>name</label>
              <input name="name" type="text" required />

              <label>language</label>
              <input name="language" type="text" required />

              <label>framework</label>
              <input name="framework" type="text" required />

              <button>Submit</button>
            </form>
          </div>
        </Modal>
      ) : null}

      {isEditModalOpen ? (
        <Modal
          heading="Create Server"
          onClose={() => setIsEditModalOpen(false)}
        >
          <div className={styles.formWrapper}>
            <form onChange={onChangeEditForm} onSubmit={onSubmitEditForm}>
              <label>id</label>
              <input name="id" type="text" value={dataToEdit.id} required />

              <label>name</label>
              <input name="name" type="text" value={dataToEdit.name} required />

              <label>language</label>
              <input
                name="language"
                type="text"
                value={dataToEdit.language}
                required
              />

              <label>framework</label>
              <input
                name="framework"
                type="text"
                value={dataToEdit.framework}
                required
              />

              <button>Submit</button>
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Home;
