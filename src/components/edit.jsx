import React, {useState, useRef} from 'react'
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function Edit() {
    const location = useLocation()
    const navigate = useNavigate()
    const {id, title, content} = location.state;
    const [editEditor, setEditEditor] = useState({
        title,
        content
    });
    const editorRef = useRef();

    const handleTitleChange = (event) => {
        setEditEditor({...editEditor, title: event.target.value})
    }

    const handleContentChange = () => {
        const content = editorRef.current.getInstance().getHTML();
        setEditEditor({...editEditor, content})
    }

    const sendAsk = () => {
        axios.put(`http://localhost:4000/posts/${id}`, editEditor)
        .then((res) => {console.log(res)
            navigate(`/detail/${id}`)
        })
    }


    return (
        <Body>
            <Header>사이드바</Header>
            <div className='edit_container'>
                <div className='top'>
                Ask a public question
                </div>
                <div>title</div>
                <input type="text" placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                    value={editEditor.title}
                    onChange={handleTitleChange}>
                </input>
                <div>
                    <Editor
                    ref={editorRef}
                    initialValue={editEditor.content || ""}
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
    )}
        



export default Edit

const Body = styled.div`
.edit_container {
    padding-top: 50px;
}
`

const Header = styled.div`
`

const Footer = styled.div`
`
