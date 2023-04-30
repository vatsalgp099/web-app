import { useState } from "react";
import Modal from "../components/Modal";
import styles from "./styles.module.scss";

import { postRequest } from "../utils/requests";

const Home = () => {
  const [formdata, setFormdata] = useState({});

  function onChange(e) {
    let update = { ...formdata };
    update[e.target.name] = e.target.value;
    setFormdata(update);
  }

  function onSubmit(e) {
    e.preventDefault();

    postRequest("http://localhost:8080/info", formdata)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.container}>
      <Modal heading="Create Server">
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
    </div>
  );
};

export default Home;
