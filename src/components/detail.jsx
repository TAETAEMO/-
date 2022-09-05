import styled from 'styled-components';
import {useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css'
import { Link } from 'react-router-dom';

const Detail = () => {
    const navigate = useNavigate()
    const [detail, setDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let {qid} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/posts/${qid}`).then((res) => {
            setDetail(res.data);
            setIsLoading(false);          
        });
      }, [qid]);
    //   console.log(detail);

    const handleDetailDelete = (did) => {
        if(window.confirm("Delete this post?")) {
            axios.delete(`http://localhost:4000/posts/${did}`)
            .then(() => navigate('/'))
        }
    }

return (
<>
    <Head>
    <button className='button' onClick={() => {navigate("/ask")}}>Ask Question</button>
    </Head>
    {!isLoading&&(
    <div>
        <div>
            <div>{detail.username}</div>
            <div>{detail.title}</div>
            <Viewer initialValue={detail.content} />  
            <div>
                <Link to={`/posts/${detail.id}/edit`} state={detail}>
                    <button>edit</button>
                </Link>
                <button onClick={() => handleDetailDelete(detail.id)}>delete</button>
                </div>      
        </div>
    </div>
     )}
    <div>
    <Editor 
        placeholder="내용을 입력해주세요."
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
      ></Editor>

    </div>
    
</>
)

}

const Head = styled.div`
    .button {
    background-color: #0a95ff;
    color: white;
    margin-top: 20px;
    height: 45px;
    width: 110px;
    margin-right: 10px;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: inset 0px 1px 0px 0px hsl(0deg 0% 100% / 40%);
    
    }
`

export default Detail;