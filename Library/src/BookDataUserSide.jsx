
import { Button,Layout, Menu, Table, theme, Input} from 'antd';
import { Avatar, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addToLoans } from './UserLibraryReducer';
import ящерка from './ящерка.png'
import {
    EditOutlined, 
    DeleteOutlined,
    PlusOutlined,
  } from '@ant-design/icons';
  const { Header, Sider} = Layout;
  const { Meta } = Card;

export function BookDataUserSide (book){

    const dispatch=useDispatch();

  const handleAdd = (book) => {
    dispatch(addToLoans({book}));
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
      <PlusOutlined key="add" onClick={()=>handleAdd(book)}/>,
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