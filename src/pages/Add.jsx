import React from "react";
import { PlusCircle } from "react-feather";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { addVideo } from "../service/allapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add({handleResponse}) {
  const [uploadData, setUploadData] = useState({
    id: "",
    caption: "",
    thumbnail: "",
    url: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //function

  const setInput = (e) => {
    const { name, value } = e.target;

    setUploadData({ ...uploadData, [name]: value });

    // setUploadData(e.target.value)
  };

  // console.log(uploadData);

  const extractUrl = (e) => {
    let youtubeUrl = e.target.value;
    if (youtubeUrl.includes("v=")) {
      let index = youtubeUrl.indexOf("v=");

      console.log(index);

      // https://www.youtube.com/watch?v=pVkDZueTBpY

      let videourl = youtubeUrl.substring(index + 2, index + 13);
      console.log(videourl);

      let videoData = uploadData;

      videoData.url =` https://www.youtube.com/embed/${videourl}`;

      setUploadData(videoData);
    }

    // console.log(uploadData);
  };

  // define handleAdd function

  const handleAdd = async () => {
    const { id, caption, thumbnail, url } = uploadData;

    if (!id || !caption || !thumbnail || !url) {
      toast("please fill the form completely");
    } else {
      let response = await addVideo(uploadData);

      if (response.status >= 200 && response.status < 300) {
        // console.log(response.data);
        handleResponse(response.data)
        toast.success("video uploaded successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setShow(false);
      } else {
        toast("Please provide unique id");
      }
    }
  };
  return (
    <>
      <div onClick={handleShow} className="btn">
        <PlusCircle color="green" size={90} />
      </div>
      {/* models */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* id */}
            <FloatingLabel className="mb-3" controlId="floatingId" label="Id">
              <Form.Control
                name="id"
                onChange={setInput}
                type="text"
                placeholder="Uploading Video Id"
              />
            </FloatingLabel>
            {/* caption */}
            <FloatingLabel
              className="mb-3"
              controlId="floatingCaption"
              label="Uploading video caption"
            >
              <Form.Control
                name="caption"
                onChange={setInput}
                type="text"
                placeholder="Uploading video caption"
              />
            </FloatingLabel>
            {/* img url */}
            <FloatingLabel
              className="mb-3"
              controlId="floatingImage"
              label=" Video Cover URL"
            >
              <Form.Control
                name="thumbnail"
                onChange={setInput}
                type="text"
                placeholder="Video Cover Image URL"
              />
            </FloatingLabel>

            {/* video link */}
            <FloatingLabel
              className="mb-3"
              controlId="floatingLink"
              label=" Uploading video link"
            >
              <Form.Control
                name="url"
                onChange={extractUrl}
                type="text"
                placeholder=" video link"
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default Add;