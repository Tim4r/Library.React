
import { Layout } from 'antd';
import { Avatar, Card, Modal } from 'antd';
import ящерка from './ящерка.png'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { Header, Sider } = Layout;
const { Meta } = Card;

export function BookData(book, refreshBooks) {
  const token = useSelector((state)=>state.userToken.token);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Are you sure you want to delete this book?');

  const handleDelete = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Deleting the book...');
    setConfirmLoading(true);

    axios.delete(`https://localhost:7190/api/DeleteBook/?id=${book.id}`, {headers: {
      'Authorization': 'Bearer ' + token
    }})
      .then(() => {
        setOpen(false);
        setConfirmLoading(false);
        refreshBooks();
      })
      .catch((error) => {
        console.error("There was an error deleting the book:", error);
        setConfirmLoading(false);
        setModalText('An error occurred. Please try again.');
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (

    <Layout
      style={{
        width: 300,
        height: 300,
        margin: 20,
        marginBottom: 30,
        top: 0,
        display: 'inline-flex',
        background: 'white'
      }}
    >
      <Card
        key={book.id}
        style={{
          width: 300,
          overflow: 'visible',
          height: 300,
          marginBottom: 20,
          top: 0,
          flexGrow: 1,
        }}
        cover={
          <img
            alt="example"
            src={ящерка}
          />
        }
        actions={[
          <DeleteOutlined key="delete" onClick={() => handleDelete(book.id)} />,
          <Link to={`/edit/${book.id}`}><EditOutlined /></Link>,
        ]}
      >
        <Meta
          title={book.title}
          description={book.author}
        />
      </Card>
      <Modal
        title="Delete Book"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </Layout>

  )
};