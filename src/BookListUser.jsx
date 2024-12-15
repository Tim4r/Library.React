
import { Button, Layout, Menu, Table, Col, Input, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setExpDate, setRefreshToken } from './tokenSlice';
import { store } from './Store';
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
  const accessToken = useSelector((state) => state.userToken.accessToken);
  const refreshToken = useSelector((state) => state.userToken.refreshToken);
  // const expDate = useSelector((state) => state.userToken.expDate);
  const dispatch = useDispatch();

    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [data,SetData]=useState([]);
    const [currentPage,SetCurrentPage]=useState(1);
    const [postPerPage,setPostPerPage]=useState(8);
    const lastPostIndex=currentPage * postPerPage;
    const firstPostIndex=lastPostIndex-postPerPage;
    const currentPosts = Object.values(data).slice(firstPostIndex, lastPostIndex);
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + 1);
    dispatch(setExpDate(date.toString()));


    async function getPageOfResults(page) {
      var c ="";
      if (Date.now() >= date) {
        await axios.post("https://localhost:7190/api/Account/RefreshToken",{"token": `${refreshToken}`}).then((result) => {
          dispatch(setAccessToken(result.data.accessToken));
          dispatch(setRefreshToken(result.data.refreshToken));
          date.setMinutes(date.getMinutes() + 1);
          dispatch(setExpDate(date));
        });
         c = await axios.get(`https://localhost:7190/api/GetBookLoansByUserId?userId=${id}`,{headers: {
          'Authorization': 'Bearer ' + store.getState().userToken.accessToken
        }});
      }
      else{
          c = await axios.get(`https://localhost:7190/api/GetBookLoansByUserId?userId=${id}`,{headers: {
            'Authorization': 'Bearer ' + store.getState().userToken.accessToken
          }});
      }
    
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
    return data;
}

    useEffect(()=>
    {
      getAllResults();
    },[])
          
        const items= [
            {
              key: 'sub1',
              label: 'Authors',
              icon: <ContactsOutlined />,
              children: [
                {
                  key: 'g1',
                  type: 'group',
                },
              ],
            },
            {
              key: 'sub2',
              label: 'Janres',
              icon: <AppstoreOutlined />,
            },
          ];
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

      <Sider trigger={null} collapsible collapsed={true} display='flex' theme='light'
        alignItems='center' >
        <Menu
          id='Menu'
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