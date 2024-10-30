
import { Button,Layout, Menu, Table,Col , Input, Row} from 'antd';
import React, { useState } from 'react';
import { BookData } from './BookData';
import { Link, useNavigate } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TableOutlined,
    AppstoreOutlined,
    ContactsOutlined,
    PoweroffOutlined,
    PlusOutlined
  } from '@ant-design/icons';
import { useSelector } from 'react-redux';


  const { Header, Sider} = Layout;
  const { Search } = Input;

  export function BookList()
  {
    const [collapsed, setCollapsed] = useState(false);
    const books=useSelector((state) => state.books)
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
                  children: 
                  [
                    {
                      key:1,
                      label:"jjdj"
                    }
                  ]
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

<Row justify='start'>
{
  books.map((book,index)=>
  (
    <Col className='HERE YOU ARE'   span={6}>
    <BookData key={index} title={book.title} author={book.authorid} category={book.categoryid} id={book.id}></BookData>
      </Col>
  )
  )
}
<Link to="/create">
<Button
style={{margin:20}}
>+</Button> </Link>
</Row>

      </div>

    </Layout>);
  }