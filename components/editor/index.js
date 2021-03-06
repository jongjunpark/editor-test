import { Editor, Viewer } from "@toast-ui/react-editor";
import Prism from "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Script from "next/script";
import { useEffect, useRef } from "react";

const EditorComponent = () => {
  const editorRef = useRef();
  const viewerRef = useRef();

  useEffect(() => {
    if (editorRef.current) {
      console.log(editorRef.current, "editor");
      editorRef.current?.getInstance()?.addCommand("wysiwyg", "math", () => {
        editorRef.current
          ?.getInstance()
          ?.setHTML("<math-field>Hi</math-field>");
      });
      editorRef.current?.getInstance()?.addCommand("markdown", "math", () => {
        editorRef.current
          ?.getInstance()
          ?.setHTML("<math-field>Hi</math-field>");
      });
    }
  }, [editorRef.current]);

  return (
    <div style={{ padding: "60px" }}>
      <>
        <Script src="//unpkg.com/mathlive/dist/mathlive.js"></Script>
      </>
      <h3>Editor</h3>
      <Editor
        onChange={() => {
          const content = editorRef.current?.getInstance().getMarkdown();
          viewerRef.current?.getInstance().setMarkdown(content);
        }}
        toolbarItems={[
          [
            {
              name: "math",
              tooltip: "math",
              command: "math",
              text: "math",
              className: "custom-icon",
            },
          ],
        ]}
        customHTMLRenderer={{
          htmlBlock: {
            math(node) {
              return [
                {
                  type: "openTag",
                  tagName: "math-field",
                  outerNewLine: true,
                },
                { type: "html", content: node.childrenHTML },
                { type: "closeTag", tagName: "math-field", outerNewLine: true },
              ];
            },
          },
        }}
        previewStyle="vertical"
        height="300px"
        initialEditType="wysiwyg"
        // hideModeSwitch={true}
        initialValue=""
        ref={editorRef}
        language="ko"
        useCommandShortcut={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
      <br />
      <h3>Viewer</h3>
      <Viewer
        previewStyle="vertical"
        ref={viewerRef}
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
      <br />
      <h3>Math Example</h3>
      <p>
        &lt;math-field&gt;??? ????????? ?????? ????????? ???????????? ????????? ????????? ?????????
        ???????????? ???????????????.
      </p>
      <p>
        ????????? mathlive?????? ???????????? HTML tag?????????. &lt;math-field&gt;??? HTML???
        ???????????? third party script??? ?????? ???????????? ????????? ?????????.
      </p>
      <div style={{ border: "1px solid black" }}>
        <math-field virtual-keyboard-mode="manual"></math-field>
      </div>
      <br />
    </div>
  );
};
export default EditorComponent;
