import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

const Ask = () => {
    const navigate = useNavigate();
    const [askEditor, setAskEditor] = useState({
        title: "",
        content: ""
    });
    let {title} = askEditor;
    const editorRef = useRef();

    const handleTitleChange = (event) => {
        setAskEditor({ ...askEditor, title: event.target.value });
    }

    const handleContentChange = () => {
        const content = editorRef.current.getInstance().getHTML();
        setAskEditor({...askEditor, content});
    }

    const sendAsk = () => {
        axios
        .post('http://localhost:4000/posts', askEditor)
        .then((res) => {
            navigate(`/detail/${res.data.id}`);       
        });
      }

return (
<Body>
    <Header>사이드바</Header>
    <div className='container'>
        <div className='top'>
        Ask a public question
        </div>
        <div>title</div>
        <input type="text" placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            value={title}
            onChange={handleTitleChange}>
        </input>
        <div>
            <Editor
            ref={editorRef}
            onChange={handleContentChange}
            previewStyle="vertical" // 미리보기 스타일 지정
            height="300px" // 에디터 창 높이
            initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
            toolbarItems={[
            // 툴바 옵션 설정
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock']
            ]}
            useCommandShortcut={false}
            ></Editor>
            <button onClick={sendAsk}>등록</button>
        </div>
    </div>
    <Footer>footer</Footer>
</Body>
)
}

const Body = styled.div`
    .container{
    padding-top: 50px;
    }
`

const Header = styled.div`
`

const Footer = styled.div`
`

export default Ask;