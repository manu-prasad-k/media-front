import React from 'react'
import { v4 as uuidv4 } from "uuid";
import Card from "react-bootstrap/Card";
import { Trash2 } from 'react-feather';
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addWatchHistory, deleteVideo } from '../service/allapi';


function VideoCard({card,handleDeleteStatus,insideCategory}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);

    const uid = uuidv4()
    console.log(uid);

    const cardTime = new Date()
    console.log(cardTime);

    const { caption, url } = card
    
    if (uid !== " "|caption !== " "|url!==" "| cardTime !==" ") {
      
      const body = {
        id: uid,
        cardname: caption,
        url,
        Date:cardTime
      }

      const res = await addWatchHistory(body);
      console.log(res);
      
      
    }
  } 

  //to remove or delete card using an api call


 const removeItem =async (id) => {

    //make an api call fo delete

   const response = await deleteVideo(id)
   console.log(response);

   if (response.status >= 200 && response.status < 300) {
     handleDeleteStatus(true)
   }
    
  }

  //function for drag

  const dragStarted = (e,id) => {
    console.log("drag started at resource card id:", +id);
    e.dataTransfer.setData("cardId",id)
  }
  return (
    <div>
      <Card className="shadow m-2" draggable onDragStart={e=>dragStarted(e,card?.id)}>
        <Card.Img
          onClick={handleShow}
          variant="top"
          src={card?.thumbnail}
          height={'250px'}
        />
        <Card.Body>
          <Card.Title>
            <span>{ card?.caption}</span>
            <span>{
              insideCategory?"":
              <Trash2 onClick={()=>removeItem(card?.id)} color="red" style={{ float: "right" }} />
              }
            </span>
          </Card.Title>
        </Card.Body>
      </Card>

      {/* model */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width={'100%'}
            height={'400px'}
            src={`${card?.url}?autoplay=1`}
            title="Neela Nilave - Video Song | RDX | Kapil Kapilan | Sam CS | Shane Nigam,Antony Varghese,Neeraj Madhav"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VideoCard