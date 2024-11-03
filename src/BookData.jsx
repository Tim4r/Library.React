import React, { useState } from 'react';
import { Layout, Card, Modal, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ящерка from './ящерка.png'

const { Header, Sider } = Layout;
const { Meta } = Card;

export function BookData({ book, refreshBooks }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Are you sure you want to delete this book?');

  const handleDelete = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Deleting the book...');
    setConfirmLoading(true);

    axios.delete(`https://localhost:7190/api/DeleteBook/?id=${book.id}`)
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
    <Layout>
      <Card
        key={book.id}
        style={{
          width: 300,
          overflow: 'visible',
          height: 300,
          margin: 20,
          marginBottom: 60,
          top: 0,
        }}
        cover={
          <img
            alt="example"
            src={ящерка}
          />
        }
        actions={[
          <DeleteOutlined key="delete" onClick={handleDelete} />,
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
  );  
}