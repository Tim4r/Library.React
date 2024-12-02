import React, { useState, useEffect } from 'react';
import { Button, Layout, Input, Image } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TableOutlined, PoweroffOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

export function BookInfo() {
  const navigate = useNavigate();
  const [title, SetTitle] = useState('');
  const [isbn, SetIsbn] = useState('');
  const [description, SetDescription] = useState('');
  const [authorid, SetAuthor] = useState('');
  const [categoryId, SetCategoryId] = useState('');
  const [data, SetData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image

  const handleSubmit = (event) => {
    const url = 'https://localhost:7190/api/CreateBook';
    const data = {
      title,
      isbn,
      description,
      image: null,
      authorId: authorid,
      categoryId,
    };
    axios.post(url, data).then(() => {
      getData();
    });
    navigate('/');
  };

  const getData = () => {
    axios
      .get('https://localhost:7190/api/GetAllBooks?pageNumber=1&pageSize=10')
      .then((result) => {
        SetData(result.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the selected file
      setSelectedImage(imageUrl);
    }
  };

  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          background: 'yellow',
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
            marginTop: 15,
          }}
        />
        <TableOutlined
          style={{
            position: 'fixed',
            top: 0,
            width: 64,
            height: 64,
            padding: 0,
            marginLeft: 1300,
          }}
        />
        <p
          style={{
            fontSize: '12px',
            position: 'fixed',
            top: 0,
            marginLeft: 1400,
            marginTop: 0,
          }}
        >
          USERNAME
        </p>
        <PoweroffOutlined
          style={{
            position: 'fixed',
            top: 0,
            width: 64,
            height: 64,
            padding: 0,
            marginLeft: 1500,
          }}
        />
      </Header>
      <div style={{ background: 'white' }}>
        {selectedImage ? (
          <Image
            src={selectedImage}
            preview={false}
            style={{
              width: 180,
              position: 'fixed',
              top: 0,
              height: 200,
              marginLeft: 30,
              marginTop: 90,
            }}
          />
        ) : (
          <div
            style={{
              width: 180,
              height: 200,
              backgroundColor: '#f0f0f0',
              position: 'fixed',
              top: 0,
              marginLeft: 30,
              marginTop: 90,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed #ccc',
            }}
          >
            No Image
          </div>
        )}
        <div>
          <Input
            value={title}
            onChange={(e) => SetTitle(e.target.value)}
            style={{ marginLeft: 340, width: 400, marginTop: 30 }}
            placeholder="name"
          />
          <br />
          <Input
            value={categoryId}
            onChange={(e) => SetCategoryId(e.target.value)}
            style={{ marginLeft: 340, width: 400, marginTop: 30 }}
            placeholder="janre"
          />
          <br />
          <Input
            value={authorid}
            onChange={(e) => SetAuthor(e.target.value)}
            style={{ marginLeft: 340, width: 400, marginTop: 30 }}
            placeholder="author"
          />
          <br />
          <Input
            value={isbn}
            onChange={(e) => SetIsbn(e.target.value)}
            style={{ marginLeft: 340, width: 400, marginTop: 30 }}
            placeholder="ISBN"
          />
        </div>
        <Button
          color="primary"
          variant="solid"
          style={{
            padding: 0,
            position: 'fixed',
            marginTop: 40,
            marginLeft: 50,
            width: 130,
          }}
        >
          Удалить
        </Button>
        <Button
          color="primary"
          variant="solid"
          style={{
            padding: 0,
            position: 'fixed',
            marginTop: 80,
            marginLeft: 50,
            width: 200,
          }}
          onClick={handleSubmit}
        >
          Создать книгу
        </Button>
        <Input
          style={{ marginLeft: 50, position: 'fixed', marginTop: 150 }}
          placeholder="desc"
          onChange={(e) => SetDescription(e.target.value)}
        />
        {/* Hidden input file */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }} // Hidden input
          id="imageUploader"
        />
        <Button
          onClick={() => document.getElementById('imageUploader').click()}
          style={{ marginTop: 220, marginLeft: 50 }}
        >
          Add Image
        </Button>
      </div>
    </Layout>
  );
}