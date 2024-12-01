
import { Button, Layout, Menu, Table, theme, Input, message } from 'antd';
import { Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ящерка from './ящерка.png'
import {
  PlusOutlined,
} from '@ant-design/icons';
import { useEffect } from 'react';
const { Header, Sider } = Layout;
const { Meta } = Card;

export function BookDataUserSide(book) {
var a=true;

  async function handleAdd()
  {
    const data =
    {
      "returnTime": "2024-11-10T11:52:35.558Z",
      "userId": parseInt(book.userId),
      "bookId": book.id
    }
    await axios.post("https://localhost:7190/api/HandOutBook", data).catch((err) => { message.info("book already loan");  a=false;});
  }

  async function FindLoanBooks(params) {
    
  }

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
          margin: 20,
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
          a ? <PlusOutlined onClick={handleAdd} key="add" /> : <p>Нет в наличии</p>

        ]}
      >
        <Link to={`/book/${book.id}`}>
        <Meta
          title={book.title}
          description={book.author}
        />
        </Link>
      </Card>
    </Layout>

  )
};