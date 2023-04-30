import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import styles from "./styles.module.scss";

import { deleteRequest, getRequest, postRequest } from "../utils/requests";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const Home = () => {
  const [formdata, setFormdata] = useState({});
  const [serverData, setServerData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
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
        fetchServerData();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsModalOpen(false);
        setLoading(false);
        setFormdata({});
      });
  }

  function fetchServerData() {
    setLoading(true);
    getRequest("http://localhost:8080/info")
      .then((response) => {
        console.log(response);
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
            <button onClick={() => setIsModalOpen(true)}>Create Record</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>language</th>
                <th>framework</th>
                <th>Delete Record</th>
              </tr>
            </thead>
            <tbody>
              {serverData.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.language}</td>
                  <td>{item.framework}</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteRecord(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {isModalOpen ? (
        <Modal heading="Create Server" onClose={() => setIsModalOpen(false)}>
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
    </div>
  );
};

export default Home;
