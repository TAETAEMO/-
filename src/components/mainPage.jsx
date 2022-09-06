import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import './QuestionsList.css';
import Pagination from "react-js-pagination";
import { displayedAt } from './function';

const QuestionsList = () => {
    const [questionsList, setQuestionsList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const[postPerPage] = useState(7);
    const totalPosts = 50;
    const handlePageChange = (page) => {
        setPage(page);

    };

    useEffect(() => {
        axios
        .get(`http://localhost:4000/posts?_page=${page}&_limit=5&_sort=id&_order=desc`)
        .then((res) => {
            setQuestionsList(res.data);
        }).then(() => setIsLoading(false))
    },[page]);

  
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
        const {id, username, title, content, createdAt} = e;
        const createdGap = displayedAt(new Date(createdAt))

        return <div key={id} >
            <div>{username}</div>
            <div onClick={() => {navigate(`/detail/${id}`)}} >{title}</div>
            <div>{content.replace(/[<][^>]*[>]/g, "")}</div>     
            <div>{`Asked ${createdGap}`}</div>     
        </div>
})}
    <Pagination
      activePage={page}
      postPerPage={postPerPage}
      totalItemsCount={totalPosts}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
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