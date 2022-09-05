import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';


const QuestionsList = () => {
    const [questionsList, setQuestionsList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    

    useEffect(() => {
        axios
        .get('http://localhost:4000/posts')
        .then((res) => {
            setQuestionsList(res.data);
        }).then(() => setIsLoading(false))
    },[]);

    // const getData = async () => {
    //     const res = await axios.get('http://localhost:3000/posts')
    //     setQuestionsList(res.data)
    // }
    // getData();

return (
<>
    <Head>
    <button className='button' onClick={() => {navigate("/ask")}}>Ask Question</button>
    </Head>
    <h1 className='title'>stackoverflow</h1>
    <div>
    {!isLoading && questionsList.map((e) => {
        const {id, username, title, content} = e;
        return <div key={id} >
            <div>{username}</div>
            <div onClick={() => {navigate(`/detail/${id}`)}} >{title}</div>
            <div>{content.replace(/[<][^>]*[>]/g, "")}</div>
        </div>
})}
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

export default QuestionsList