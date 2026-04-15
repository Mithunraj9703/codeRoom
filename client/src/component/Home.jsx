import React from 'react'


export default function Home() {
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
                  placeholder="Enter Room ID" 
                  className="form-control form-control-lg"
                />
  
                <input 
                  type="text" 
                  placeholder="Enter Username" 
                  className="form-control form-control-lg"
                />
  
                <button className="btn btn-primary btn-lg fw-semibold">
                  Join Room
                </button>
  
                <button className="btn btn-outline-light">
                  Create Room
                </button>
  
              </div>
  
            </div>
          </div>
  
        </div>
      </div>
    </div>
  );
}

