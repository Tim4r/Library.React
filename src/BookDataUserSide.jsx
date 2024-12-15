
import { Avatar, Card,Modal, Calendar,Layout,theme} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { store } from './Store';
import dayjs from 'dayjs';
import ящерка from './ящерка.png'
import {
  PlusOutlined,
} from '@ant-design/icons';
import { useEffect,useState } from 'react';
const { Header, Sider } = Layout;
const { Meta } = Card;

export function BookDataUserSide(book) {
var a=true;
const { token } = theme.useToken();
const wrapperStyle = {
  width: 300,
  border: `1px solid ${token.colorBorderSecondary}`,
  borderRadius: token.borderRadiusLG,
};
const [open, setOpen] = useState(false);
const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
  const onSelectDate = (newValue) => {
    setSelectedValue(newValue);
  };
const handleOk = (e) => {
  const data =
    {
      "returnTime": selectedValue,
      "userId": parseInt(book.userId),
      "bookId": book.id
    }
  setConfirmLoading(true);

  axios.post(`https://localhost:7190/api/HandOutBook`,data ,{headers: {
    'Authorization': 'Bearer ' + store.getState().userToken.accessToken
  }})
    .then(() => {
      setOpen(false);
      setConfirmLoading(false);
    })
    .catch((error) => {
      console.error("There was an error picking the book:", error);
      setConfirmLoading(false);
    });
};

const handleCancel = () => {
  setOpen(false);
};

  async function handleAdd()
  {

    /* const data =
    {
      "returnTime": new Date(Date.now()),
      "userId": parseInt(book.userId),
      "bookId": book.id
    }
    await axios.post("https://localhost:7190/api/HandOutBook", data,{headers: {
      'Authorization': 'Bearer ' + store.getState().userToken.accessToken
    }}).catch((err) => { message.info("book already loan");  a=false;}).then(message.info(`you loan ${book.title}`)); */
    setOpen(true);
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
      <Modal
        title="Loan book"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Укажите дату сдачи книги</p>
        <div style={wrapperStyle}>
      <Calendar fullscreen={false} onSelect={onSelectDate} />
    </div>
        <p>Книга может быть взята на время от 1 дня до 30 дней. Можете забрать книгу сегодня. Срок возврата: {selectedValue?.format('YYYY-MM-DD')} </p>
      </Modal>
    </Layout>
    
  )
};