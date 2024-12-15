import { Button,Layout, Input,Select} from 'antd';
import { Image, Card, Modal } from 'antd';
import React, { useState, useEffect,useLayoutEffect} from 'react';
import axios from 'axios';

import { store } from './Store';
import { useDispatch,useSelector } from 'react-redux';
import { setAccessToken, setRefreshToken } from './tokenSlice';
import ящерка from './ящерка.png'
import {
    TableOutlined,
    PoweroffOutlined,
  } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
  const { Header, Sider} = Layout;
  const { Meta } = Card;
  const { Search } = Input;

  export function BookInfoForEdit()
  {
    const accessToken = useSelector((state)=>state.userToken.accessToken);
    const refreshToken = useSelector((state)=>state.userToken.refreshToken);
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate=useNavigate();
    const [data,SetData]=useState([]);
      const {id} = useParams();
      const url = `https://localhost:7190/api/UpdateBook?id=${id}`;

      async function getPageOfResults(page, authorId = null, categoryId = null, searchQuery = "") {
        var c ="";
        c = await axios.get(`https://localhost:7190/api/GetAllBooks?pageNumber=${page}&pageSize=10`, {
          params: { authorId, categoryId, searchQuery },
          headers: {
            'Authorization': 'Bearer ' + store.getState().userToken.accessToken
          }
        });
        return c.data;
      }

      async function getAllResults() {
        let data = [];
        let lastResultsLength = 10;
        let page = 1;
        while (lastResultsLength === 10) {
          const newResults = await getPageOfResults(page);
          page++;
          lastResultsLength = newResults.length;
          data = Object.values(data.concat(newResults));
        }
        await SetData(data);
        const books = data.find(book=>book.id === parseInt(id));
        setJanre(books.genreId);
        setName(books.title);
        setAuthor(books.authorId);
        setISBN(books.isbn);
        setDescription(books.description);
        return data;
      }
      useEffect(()=>
      {
        getAllResults();
      },[])
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the selected file
          setSelectedImage(imageUrl);
        }
      };

      const [title,setName] = useState("loading...");
      const [categoryId,setJanre]=useState("loading...");
      const [authorId,setAuthor] = useState("loading...");
      const [isbn,setISBN] = useState("loading...");
      const [description,setDescription]=useState("loading...");

      const [open, setOpen] = useState(false);
      const [confirmLoading, setConfirmLoading] = useState(false);
      const [modalText, setModalText] = useState('Are you sure you want to delete this book?');
    
      const handleDelete = () => {
        setOpen(true);
      }
    
      const handleOk = () => {

        setModalText('Deleting the book...');
        setConfirmLoading(true);
    
        axios.delete(`https://localhost:7190/api/DeleteBook/?id=${id}`,{headers: {
          'Authorization': 'Bearer ' + store.getState().userToken.accessToken
        }})
          .then(() => {
            setOpen(false);
            setConfirmLoading(false);
            getAllResults();
          })
          .catch((error) => {
            console.error("There was an error deleting the book:", error);
            setConfirmLoading(false);
            setModalText('An error occurred. Please try again.');
          });
      }
      const handleCancel = () => {
        setOpen(false);
      };
    
    const handleSubmit=()=>
    {
      const data=
      {
        "title": title,
        "isbn": isbn,
        "description": description,
        "image": null,
        "authorId": authorId,
        "genreId": categoryId
      }
      axios.post(url, data, {headers: {
        'Authorization': 'Bearer ' + accessToken
      }});
      navigate('/books')
    }
    return(
        <Layout>
      <Modal
        title="Delete Book"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
        <Header
          style={{
            padding: 0,
            background: 'lightskyblue',
            maxWidth:'100%',
            width:'100%',
          }}
        >
          <Search
      placeholder="input search text"
      style={{
        display:'flex',
        width: 500,
        padding:0,
        marginLeft:450,
        marginTop:15
      }}
           />
          <TableOutlined style={{
              position:'fixed',
              top:0,
              width: 64,
              height: 64,
              padding:0,
              marginLeft:1300,
                    }}></TableOutlined>

            <p style={{
              fontSize: '12px',
              position:'fixed',
              top:0,
              marginLeft:1400,
              marginTop:0
                    }}>USERNAME</p>


          <PoweroffOutlined 
          style={{
            position:'fixed',
              top:0,
              width: 64,
              height: 64,
              padding:0,
            marginLeft:1500
                  }}
          />
    </Header>
    <div
    style={{background:'white'}}
    >
      <Image
    src={ящерка}
    preview={false}
    style={{
        width:180,
        position:'fixed',
        top:0,
        height:200,
        marginLeft:30,
        marginTop:90
              }}
    />
    <div>
    <Input value={title} onChange={e=>setName(e.target.value)} style={{marginLeft:340, width:400, marginTop:30}} placeholder='name'></Input>
    <br></br>
      <Input value={categoryId} onChange={e=>setJanre(e.target.value)} style={{marginLeft:340, width:400,marginTop:30}} placeholder='janre'></Input>
      <br></br>
      <Input value={authorId} onChange={e=>setAuthor(e.target.value)} style={{marginLeft:340, width:400,marginTop:30}} placeholder='author'></Input>
      <br></br>
      <Input value={isbn} onChange={e=>setISBN(e.target.value)} style={{marginLeft:340, width:400,marginTop:30}} placeholder='ISBN'></Input>
    </div>

<Button color="primary" variant="solid"
        style={{
          padding: 0,
          position:'fixed',
          marginTop:40,
          marginLeft:50,
          width:130
        }}
        onClick={() => handleDelete(id)}
        >
        Удалить
      </Button>

      <Button color="primary" variant="solid" 
        style={{
          padding: 0,
          position:'fixed',
          marginTop:80,
          marginLeft:50,
          width:200
        }}
        onClick={handleSubmit}
        >
        Изменить
      </Button>

      <Input
      style={{marginLeft:50, position:'fixed',marginTop:150}}
      placeholder='desc'
      value={description}
      onChange={e=>setDescription(e.target.value)}
      ></Input>

             <Input
      style={{marginLeft:50, position:'fixed',marginTop:200}}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="imageUploader"
        ></Input> 
    </div>
    

    </Layout>
    )
    
  }

export default BookInfoForEdit;