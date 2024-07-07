import "jodit/es2021/jodit.min.css";

import React, { useRef } from "react";

import JoditEditor from "jodit-react";

const editorConfig = {
  // existing configuration options...
  minHeight: 400,
  controls: {
    // Add or customize controls here
    fontsize: {
      list: [
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "24",
        "30",
        "36",
        "48",
        "60",
        "72",
        "96",
      ],
    },
  },
  uploader: { insertImageAsBase64URI: true },
  buttons: [
    "source",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "superscript",
    "subscript",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "print",
  ],
};

export default function JoEditor({
  value,
  setValue,
  registerName,
  placeholder,
}: {
  value: string;
  setValue: any;
  registerName: string;
  placeholder: string;
}) {
  const editorRef = useRef(null);
  return (
    <div className="no-tailwind">
      <JoditEditor
        ref={editorRef}
        value={value}
        onChange={(newContent: string) => {
          setValue(registerName, newContent);
        }}
        config={editorConfig}
      />
    </div>
  );
}
