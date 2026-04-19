import React, { useEffect, useRef, useState } from 'react'
import Client from './Client'
import Editor from './Editor';
import { initSocket } from '../socket';
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function EditorPage() {
  const [clients,setClients]=useState([])
  const socketRef=useRef(null)
  const codeRef=useRef('')
  const location=useLocation()
  const {roomId}=useParams()
  const navigate=useNavigate()
  useEffect(()=>{
    const init=async ()=>{
      socketRef.current=await initSocket()

      socketRef.current.on('connect_error',(err)=>handleError(err))
      socketRef.current.on('connect_failed',(err)=>handleError(err))

      const handleError=(e)=>{
        console.log('socket error ',e)
        toast.error("Socket connection failed")
        navigate('/')
      }
      socketRef.current.emit('join', {
        roomId,
        username: location.state?.username
      })

      socketRef.current.on('joined', ({ clients, username, socketId }) => {
        
        setClients(clients)
        if (username!==location.state?.username) {
          toast.success(`${username} joined`)
          
        }
        // socketRef.current.emit('sync-code',{
        //   code:codeRef.current,
        //   socketId,
        // })
      })

      //disconnected
      socketRef.current.on('disconnected',({socketId,username})=>{
        toast.success(`${username} left`)
        setClients((prev)=>{
          return prev.filter((client)=>client.socketId!=socketId)
        })
      })
    }
    init()

    return ()=>{
      socketRef.current.disconnect()
      socketRef.current.off('joined')
      socketRef.current.off('disconnected')

    }
  },[])
  

  if(!location.state){
    return <Navigate to="/" />
  }

  const copyRoomId=async()=>{
    try{
      await navigator.clipboard.writeText(roomId)
      toast.success("Room Id is copied")
    }catch(error){
      toast.error("unable to copy Room Id")
    }
  }

  const leaveRoom=async()=>{
    navigate('/')
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
  
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-light d-flex flex-column p-1 shadow">
  
          {/* Logo + Title */}
          <div className="text-center">
            
            <h3 className="fw-bold m-2">
              <span style={{ color: "#38bdf8" }}>Code</span>
              <span style={{ color: "#ffffff" }}>Room</span>
            </h3>
          </div>
  
          <hr className="border-secondary" />
  
          {/* Users List */}
          <div className="flex-grow-1 overflow-auto">
            <h6 className="text-secondary mb-2">Participants</h6>
  
          {clients.map((client) => (
          <Client
            key={client.socketId}
            username={client.username}
          />
          ))}
          </div>
  
          {/* Buttons */}
          <div className="mt-3">
            <hr className="border-secondary" />
  
            <button className="btn btn-outline-info w-100 mb-2"
            onClick={copyRoomId}
            >
              Copy Room ID
            </button>
  
            <button className="btn btn-danger w-100"
            onClick={leaveRoom}
            >
              Leave Room
            </button>
          </div>
        </div>
  
        {/* Editor Section */}
        <div className="col-md-9 bg-black text-light d-flex flex-column">
  
          {/* Top Bar */}
          <div className="p-2 border-bottom border-secondary d-flex justify-content-between align-items-center">
            <span>Editor</span>
            <span>Join a Room. Start Coding.</span>
            <button className="btn btn-sm btn-success">Code</button>
          </div>
          
          {/* Editor Area */}
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          {socketRef.current && (
  <Editor 
    socketRef={socketRef} 
    roomId={roomId} 
    onCodeChange={(code)=>(codeRef.current=code)} 
  />
)}
          </div>
  
        </div>
      </div>
    </div>
  );
}
