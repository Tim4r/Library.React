import { Button,Layout, Input,Select} from 'antd';
import { Image, Card } from 'antd';
import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { updateBook } from './BooksReducer';
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
    const books=useSelector((state)=>state.books);
    const {id} = useParams();
    const existingBook = books.filter(f=>f.id == id)
    const {title,description,authorid,categoryid,isbn,img}=existingBook[0]
    const [uname,setName] = useState(title)
    const [ujenre,setJanre]=useState(categoryid)
    const [uauthor,setAuthor] = useState(authorid)
    const [uisbn,setISBN] = useState(isbn)
    const [udescription,setDescription]=useState(description)
    const dispatch=useDispatch();
    
    const navigate=useNavigate();
    
    const handleSubmit=(event)=>
    {
      event.preventDefault();
      dispatch(updateBook({id:id, title:uname, description:udescription, authorid:1, categoryid:2, isbn:uisbn,img:ящерка}))
      navigate('/')
    }
    return(
        <Layout>
        <Header
          style={{
            padding: 0,
            background: 'yellow',
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
    <Input value={uname} onChange={e=>setName(e.target.value)} style={{marginLeft:340, width:400, marginTop:30}} placeholder='name'></Input>
    <br></br>
      <Input value={ujenre} onChange={e=>setJanre(e.target.value)} style={{marginLeft:340, width:400,marginTop:30}} placeholder='janre'></Input>
      <br></br>
      <Input value={uauthor} onChange={e=>setAuthor(e.target.value)} style={{marginLeft:340, width:400,marginTop:30}} placeholder='author'></Input>
      <br></br>
      <Input value={uisbn} onChange={e=>setISBN(e.target.value)} style={{marginLeft:340, width:400,marginTop:30}} placeholder='ISBN'></Input>
    </div>

<Button color="primary" variant="solid"
        style={{
          padding: 0,
          position:'fixed',
          marginTop:40,
          marginLeft:50,
          width:130
        }}
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
        Подтвердить изменения
      </Button>

      <Input
      style={{marginLeft:50, position:'fixed',marginTop:150}}
      placeholder='desc'
      value={udescription}
      onChange={e=>setDescription(e.target.value)}
      ></Input>
    </div>

    </Layout>
    )
    
  }

export default BookInfoForEdit;