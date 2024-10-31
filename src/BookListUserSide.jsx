
import { Button,Layout, Menu, Table,Col , Input, Row} from 'antd';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { BookDataUserSide } from './BookDataUserSide';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TableOutlined,
    AppstoreOutlined,
    ContactsOutlined,
    PoweroffOutlined
  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
  const { Header, Sider} = Layout;
  const { Search } = Input;

  export function BookListUserSide()
  {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const loanBooks=useSelector((state) => state.userBooks)

    const [data,SetData]=useState([]);
    const [currentPage,SetCurrentPage]=useState(1);
    const [postPerPage,setPostPerPage]=useState(8);


    const lastPostIndex=currentPage * postPerPage;
    const firstPostIndex=lastPostIndex-postPerPage;
    const currentPosts = data.slice(firstPostIndex, lastPostIndex);

    const getData=()=>
    {
      axios.get(`https://localhost:7190/api/GetAllBooks?pageNumber=${1}&pageSize=10`).then((result)=> {
        SetData(result.data);
      })
    }
    useEffect(()=>
    {
      getData();
    },[])

    const onClick = (e) => {
        };
        const items= [
            {
              key: 'sub1',
              label: 'Authors',
              icon: <ContactsOutlined />,
              children: [
                {
                  key: 'g1',
                  type: 'group',
                  children: [
                    { key: '1', label: 'Option 1' },
                    { key: '2', label: 'Option 2' },
                  ],
                },
              ],
            },
            {
              key: 'sub2',
              label: 'Janres',
              icon: <AppstoreOutlined />,
              children: [
                { key: '5', label: 'Option 5' },
                { key: '6', label: 'Option 6' },
              ],
            },
          ];
        const onSearch = (value, _e, info) => console.log(info?.source, value);
const bookLibraryOpen=()=>
{
navigate("/userbooks");
}

    return(<Layout
      style={{
        maxWidth:'100%',
        display:'flex',
        flexWrap: 'wrap',
        background: 'white',
        overflow: 'hidden',
      height: '100vh'
      }}
    >

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
      onSearch={onSearch}
      style={{
        display:'flex',
        width: 500,
        padding:0,
        marginLeft:450,
        marginTop:15
      }}
           />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              position:'fixed',
              top:0,
              width: 64,
              height: 64,
              padding:0,
              marginLeft:10,
              
                    }}
          />
          <TableOutlined onClick={bookLibraryOpen} style={{
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
                    }}>{loanBooks.length}</p>


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

        <Sider trigger={null} collapsible collapsed={collapsed} display='flex' theme='light'
        alignItems='center' >
        <Menu
           id='Menu'
           onClick={onClick}
          mode="inline"
          multiple={true}
          items={items}
          style={{
            padding: 0,
            margin: 0,
            height: 600,
          }}
        />   
        {!collapsed && 
        <Button color="primary" variant="solid"
        style={{
          padding: 0,
          margin: 50,
        }}
        >
        Применить
      </Button> }

      </Sider>
      <div
      style={
        {
          marginLeft:200,
          marginTop:64,
          top:0,
          position:'fixed',
        }
      }
      >
<Row justify='space-evenly' style={{top:0}} >
{
  currentPosts.map((book,index)=>
  (
    <BookDataUserSide key={index} title={book.title} author={book.authorid} category={book.categoryid} id={book.id}></BookDataUserSide>
  )
  )
}
</Row>
<Pagination totalPosts={data.length} postsPerPage={postPerPage} setCurrentPage={SetCurrentPage}></Pagination>
      </div>
    </Layout>);
  }

  
/* 
  {
    "title": "string",
    "isbn": "string",
    "description": "string",
    "image": "string",
    "authorId": 0,
    "categoryId": 0
  } */