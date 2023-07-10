import React from "react";
import "@/components/post/EditorToolBar/EditorToolBar.css";
import { titleBars } from "@/constants/titleBar";

// Quill Toolbar component
export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-size">
        <option value="13px">13px</option>
        <option value="15px">15px</option>
        <option value="20px">20px</option>
        <option value="25px">25px</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-clean" />
    </span>
    <span className="ql-formats">
      <select className="ql-insertTitleBars">
        <option value="default">TitleBar</option>
        {titleBars.map((item) => (
          <option value={item.value} key={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </span>
  </div>
);

export default QuillToolbar;
