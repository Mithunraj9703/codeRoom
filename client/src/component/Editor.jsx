import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

export default function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(
      document.getElementById("realTimeEditor"),
      {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
      }
    );

    editorRef.current = editor;
    editor.setSize(null, "100%");

    // RECEIVE
    const handleCodeChange = ({ code }) => {
      if (!editorRef.current || code == null) return;

      const current = editorRef.current.getValue();
      if (current !== code) {
        editorRef.current.setValue(code);
      }
    };

    socketRef.current.on("code-change", handleCodeChange);

    // SEND
    editor.on("change", (instance, changes) => {
      const code = instance.getValue();
      onCodeChange(code);

      if (changes.origin !== "setValue") {
        socketRef.current.emit("code-change", {
          roomId,
          code,
        });
      }
    });

    return () => {
      socketRef.current.off("code-change", handleCodeChange);
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <textarea id="realTimeEditor"></textarea>
    </div>
  );
}