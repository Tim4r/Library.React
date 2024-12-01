
import { Button, Layout, Menu, Table, Col, Input, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { UserBook } from './UserBook';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TableOutlined,
  AppstoreOutlined,
  ContactsOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
const { Header, Sider } = Layout;
const { Search } = Input;

export function BookListUser() {

  const {id} = useParams();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [data,SetData]=useState([]);
    const [currentPage,SetCurrentPage]=useState(1);
    const [postPerPage,setPostPerPage]=useState(8);
    const lastPostIndex=currentPage * postPerPage;
    const firstPostIndex=lastPostIndex-postPerPage;
    const currentPosts = Object.values(data).slice(firstPostIndex, lastPostIndex);
    const [janres,SetJanres]=useState([]);
    const [authors,SetAuthors]=useState([]);

    const [authorId, setAuthorId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    var menuJanres =[];
    var menuAuthors=[];


    async function getPageOfResults(page, authorId = null, categoryId = null, searchQuery = "") {
  
      const a = await axios.get(`https://localhost:7190/api/GetBookLoansByUserId?userId=${id}`);
        axios.get("https://localhost:7190/api/GetAllGenresOfBooks").then((result)=>
          {
            SetJanres(result.data);
          });

          axios.get(`https://localhost:7190/api/GetAllAuthors?pageNumber=1&pageSize=10`).then((result)=>
            {
              SetAuthors(result.data);
            });
        return a.data;
    }

  async function getAllResults(authorId, categoryId, searchQuery) {
    let data = [];
    let lastResultsLength = 10;
    let page = 1;
    while (lastResultsLength === 10) {
        const newResults = await getPageOfResults(page,authorId,categoryId,searchQuery);
        page++;
        lastResultsLength = newResults.length;
        data = Object.values(data.concat(newResults));
    }
    await SetData(data);
    return data;
}

    useEffect(()=>
    {
      getAllResults(authorId,categoryId,searchQuery);
    },[authorId, categoryId, searchQuery])
    async function onClick(e) {
      await setCategoryId(e.key)
      await setAuthorId(e.key)
          getAllResults(e.key+1, e.key+1, "");
    } 
async function deselectItem() {
  await setCategoryId("");
  await setAuthorId("");
              getAllResults(authorId, categoryId, "");
}
        for(let i=0;i<janres.length;i++)
          {
            let children =
            [
              { key: `${i}`, label: `${janres[i].name}` },
            ];
            menuJanres=[...menuJanres,...children];
          }

          for(let i=0;i<authors.length;i++)
            {
              console.log(authors[i].firstName);
              let children =
              [
                { key: `${i}`, label: `${authors[i].firstName}  ${authors[i].lastName}` },
              ];
              menuAuthors=[...menuAuthors,...children];
            }
          
        const items= [
            {
              key: 'sub1',
              label: 'Authors',
              icon: <ContactsOutlined />,
              children: [
                {
                  key: 'g1',
                  type: 'group',
                  children: menuAuthors
                },
              ],
            },
            {
              key: 'sub2',
              label: 'Janres',
              icon: <AppstoreOutlined />,
              children: menuJanres
            },
          ];
        const onSearch = (value) => 
        {
          setSearchQuery(value);
          getAllResults(authorId, categoryId, value);
        }
  return (
    <Layout
      style={{
        maxWidth: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        background: 'white',
        overflow: 'hidden',
        height: '100vh'
      }}
    >

      <Header
        style={{
          padding: 0,
          background: 'lightskyblue',
          maxWidth: '100%',
          width: '100%',
        }}
      >
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            display: 'flex',
            width: 500,
            padding: 0,
            marginLeft: 450,
            marginTop: 15
          }}
        />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            position: 'fixed',
            top: 0,
            width: 64,
            height: 64,
            padding: 0,
            marginLeft: 10,

          }}
        />
        <TableOutlined style={{
          position: 'fixed',
          top: 0,
          width: 64,
          height: 64,
          padding: 0,
          marginLeft: 1300,
        }}></TableOutlined>

        <p style={{
          fontSize: '12px',
          position: 'fixed',
          top: 0,
          marginLeft: 1400,
          marginTop: 0
        }}></p>


        <PoweroffOutlined
          style={{
            position: 'fixed',
            top: 0,
            width: 64,
            height: 64,
            padding: 0,
            marginLeft: 1500
          }}
          onClick={()=>{navigate("/")}}
        />
      </Header>

      <Sider trigger={null} collapsible collapsed={collapsed} display='flex' theme='light'
        alignItems='center' >
        <Menu
          id='Menu'
          onSelect={onClick}
           onDeselect={deselectItem}
          mode="inline"
          multiple={true}
          items={items}
          style={{
            padding: 0,
            margin: 0,
            height: 600,
            overflow: 'auto'
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
          </Button>}

      </Sider>
      <div
        style={
          {
            marginLeft: 200,
            marginTop: 64,
            top: 0,
            position: 'fixed',
          }
        }
      >

        <Row justify='start' style={{top:0, display:'inline-block'}}>
          {
            currentPosts.map((book, index) =>
            (
              <UserBook key={index} title={book.title} author={book.firstName + " " + book.lastName} userid={id} ></UserBook>
            )
            )
          }
        </Row>
        <Pagination totalPosts={data.length} postsPerPage={postPerPage} setCurrentPage={SetCurrentPage}></Pagination>
      </div>


    </Layout>);
}