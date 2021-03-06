import React, { useState, useEffect } from "react";

// import EditManga from "./EditManga/EditManga";
import NewManga from "./NewManga/NewManga";
import Upload from "./Upload/Upload";

const Admin = () => {
  const [screen, setScreen] = useState("new");
  const [idManga, setIDManga] = useState(null);
  useEffect(() => {
    setScreen("new");
  }, []);
  return (
    <>
      <div style={screen === "new" ? {} : { display: "none" }}>
        <NewManga setScreen={setScreen} />
      </div>
      {/* <div style={screen === "edit" ? {} : { display: "none" }}>
        <EditManga setScreen={setScreen} setIDManga={setIDManga} />
      </div> */}
      <div style={screen === "upload" ? {} : { display: "none" }}>
        <Upload
          setScreen={setScreen}
          idManga={idManga}
          setIDManga={setIDManga}
        />
      </div>
    </>
  );
};

export default Admin;
