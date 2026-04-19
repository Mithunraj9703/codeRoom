import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from "uuid";
import {useNavigate} from 'react-router-dom'

export default function Home() {
  const [roomId,setRoomId]=useState("");
  const [username,setUsername]=useState("");
  const navigate=useNavigate()

  const generateRoomId=(e)=>{
    e.preventDefault()
    const id=uuidv4();
    setRoomId(id)
    toast.success("Room Id is generated")
  }

  const joinRoom=(e)=>{
    if(!roomId || !username){
      toast.error("Both the field is required!")
      return;
    }
    navigate(`/editor/${roomId}`,{
      state:{username},
    })
    toast.success("Room is created")
  }

  return (
    <div className="container-fluid bg-dark">
      <div className="row justify-content-center align-items-center min-vh-100">
        
        <div className="col-12 col-md-6 col-lg-4">
          
          <div className="card shadow-lg border-0 rounded-4">
            
            <div className="card-body text-center bg-dark text-white rounded-4">
              
              {/* Logo */}
              <img 
                src="/logo.png" 
                alt="CodeRoom Logo" 
                className="img-fluid mb-3"
                style={{ maxWidth: "120px" }}
              />
  
              <h2 className="fw-bold">
              <span style={{ color: "#38bdf8" }}>Code</span>
              <span style={{ color: "#ffffff" }}>Room</span>
            </h2>
              <p className="text-info mb-4">
                Join a Room. Start Coding.
              </p>
  
              {/* Form */}
              <div className="d-flex flex-column gap-3">

              <input 
                type="text" 
                value={roomId}
                onChange={(e)=>setRoomId(e.target.value)}
                placeholder="Enter Room ID" 
                className="form-control form-control-lg"
                style={{ fontSize: "18px" }}
              />

                <input 
                  type="text" 
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  placeholder="Enter Username" 
                  className="form-control form-control-lg"
                />

                <button className="btn btn-primary btn-lg fw-semibold"
                onClick={joinRoom}
                >
                  Join Room
                </button>
  
                {/* New Section */}
                <div className="text-center mt-2">
                  <p className="mb-1 text-secondary">
                    Don't have a Room ID?
                  </p>

                  <button className="btn btn-outline-light btn-sm"
                    onClick={generateRoomId}
                  >
                    Create Room
                  </button>
                </div>
  
              </div>
  
            </div>
          </div>
  
        </div>
      </div>
    </div>
  );
}

