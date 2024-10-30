
import { Button,Layout, Input,Select} from 'antd';
import { Image, Card } from 'antd';
import React, { useState } from 'react';
import { authorDatas } from './Data';
import ящерка from './ящерка.png'
import {
    TableOutlined,
    PoweroffOutlined,
    ArrowLeftOutlinedr
  } from '@ant-design/icons';
  const { Header, Sider} = Layout;
  const { Meta } = Card;
  const { Search } = Input;

  export function BookInfo()
  {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
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
      onSearch={onSearch}
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
    <p style={{marginLeft:340, width:400, marginTop:30}}></p>
    <br></br>
      <p style={{marginLeft:340, width:400,marginTop:30}}></p>
      <br></br>
      <p style={{marginLeft:340, width:400,marginTop:30}}></p>
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
        Добавить
      </Button>

      <Input
      style={{marginLeft:50, position:'fixed',marginTop:150}}
      placeholder='desc'
      ></Input>
    </div>

    </Layout>
    )
    
  }