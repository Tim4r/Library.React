
import {Layout} from 'antd';
import { Avatar, Card } from 'antd';
import { deleteBook } from './BooksReducer';
import ящерка from './ящерка.png'
import React, { useState,useEffect } from 'react';
import {
    EditOutlined, 
    DeleteOutlined,
  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
  const { Header, Sider} = Layout;
  const { Meta } = Card;

export function BookData (book){

  const handleDelete = (id) => {
  };

  return(

    <Layout>
              <Card
              key={book.id}
    style={{
      width: 300,
      overflow: 'visible',
      height:300,
      margin:20,
      marginBottom:60,
      top:0
    }}
    cover={
      <img
        alt="example"
        src={ящерка}
      />
    }
    actions={[
      <DeleteOutlined key="delete" onClick={()=>handleDelete(book.id)}/>,
      <Link to={`/edit/${book.id}`}><EditOutlined/></Link>,
    ]}
  >
    <Meta
      title={book.title}
      description={book.author}
    />
  </Card>
    </Layout>
    
  )
};