import { Button, Layout, Input, Image, Card } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setRefreshToken, setExpDate } from "./tokenSlice";
import { store } from "./Store";
import { TableOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Meta } = Card;
const { Search } = Input;
const { TextArea } = Input;

export function BookInfo() {
  const navigate = useNavigate();
  const [selectedImage, SetSelectedImage] = useState(null);
  const [imageBase64, SetImageBase64] = useState(null);
  const accessToken = useSelector((state) => state.userToken.accessToken);
  const refreshToken = useSelector((state) => state.userToken.refreshToken);
  const expDate = useSelector((state) => state.userToken.expDate);
  const dispatch = useDispatch();

  const [title, SetTitle] = useState("");
  const [isbn, SetIsbn] = useState("");
  const [authorId, SetAuthor] = useState("");
  const [genreId, SetGenreId] = useState("");
  const [description, SetDescription] = useState("");

  const date = new Date(expDate);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      SetSelectedImage(imageUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        SetImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    SetSelectedImage(null);
    SetImageBase64(null);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (Date.now() > date.getTime()) {
      try {
        const refreshResponse = await axios.post(
          "https://localhost:7190/api/Account/RefreshToken",
          {
            token: refreshToken,
          }
        );

        dispatch(setAccessToken(refreshResponse.data.accessToken));
        dispatch(setRefreshToken(refreshResponse.data.refreshToken));

        const newExpDate = new Date();
        newExpDate.setMinutes(newExpDate.getMinutes() + 20);
        dispatch(setExpDate(newExpDate));
      } catch (error) {
        console.error("Token refresh failed:", error);
        return;
      }
    }

    let clearImage = null;
    if (imageBase64 != null) {
      clearImage = imageBase64.replace("data:", "").replace(/^.+,/, "");
    }

    const url = "https://localhost:7190/api/CreateBook";
    const data = {
      title: title,
      isbn: isbn,
      authorId: parseInt(authorId),
      genreId: parseInt(genreId),
      description: description,
      image: clearImage || null,
    };

    try {
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${store.getState().userToken.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      navigate("/books");
    } catch (error) {
      console.error("Book creation failed:", error);
    }
  }
  useEffect(() => {}, []);

  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          background: "lightskyblue",
          maxWidth: "100%",
          width: "100%",
        }}
      >
        <Search
          placeholder="Input title of book..."
          style={{
            display: "flex",
            width: 500,
            padding: 0,
            marginLeft: 450,
            marginTop: 15,
          }}
        />

        <p
          style={{
            fontSize: "12px",
            position: "fixed",
            top: 0,
            marginLeft: 1200,
            marginTop: 0,
          }}
        >
          USERNAME
        </p>

        <PoweroffOutlined
          style={{
            position: "fixed",
            top: 0,
            width: 64,
            height: 64,
            padding: 0,
            marginLeft: 1350,
          }}
          onClick={() => {
            navigate("/");
          }}
        />
      </Header>

      <div class="container h-100">
        <div class="row">
          <div class="col-auto justify-content-center layout p-0">
            <div
              style={{
                width: "100%",
                height: 320,
                border: "1px solid #ccc",
                borderRadius: "8px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Card
                style={{
                  width: "100%",
                  height: "100%",
                  marginBottom: 0,
                  overflow: "visible",
                  border: "none",
                }}
                cover={
                  <div
                    style={{
                      width: "100%",
                      height: 221,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {
                      <Image
                        src={
                          selectedImage ||
                          "https://localhost:7190/Images/BookCovers/No_image.png"
                        }
                        alt="Book Cover"
                        preview={false}
                        style={{
                          width: "70%",
                          height: "70%",
                          objectFit: "contain",
                          maxWidth: 216,
                          maxHeight: 221,
                        }}
                      />
                    }
                  </div>
                }
              >
                <Meta
                  title={title || "Book Title"}
                  description={authorId || "Author Id"}
                />
              </Card>

              <EditOutlined
                onClick={() => {
                  if (!selectedImage) {
                    document.getElementById("imageUploader").click();
                  }
                }}
                style={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  fontSize: 16,
                  color: selectedImage ? "#ccc" : "#1890ff",
                  borderRadius: "50%",
                  padding: 4,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  cursor: selectedImage ? "not-allowed" : "pointer",
                }}
                disabled={!!selectedImage}
              />

              <DeleteOutlined
                onClick={handleDeleteImage}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  fontSize: 16,
                  color: selectedImage ? "#ff4d4f" : "#ccc",
                  borderRadius: "50%",
                  padding: 4,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  cursor: selectedImage ? "pointer" : "not-allowed",
                }}
                disabled={!selectedImage}
              />
            </div>
          </div>

          <div class="col">
            <div class="row">
              <div class="col">
                <Input
                  value={title}
                  onChange={(e) => SetTitle(e.target.value)}
                  style={{
                    marginTop: "5%",
                    width: "100%",
                    overflow: "visible",
                    border: "none",
                  }}
                  placeholder="Title"
                ></Input>
              </div>

              <div class="col">
                <Input
                  value={isbn}
                  onChange={(e) => SetIsbn(e.target.value)}
                  style={{
                    marginTop: "5%",
                    width: "100%",
                    overflow: "visible",
                    border: "none",
                  }}
                  placeholder="ISBN"
                ></Input>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <Input
                  value={authorId}
                  onChange={(e) => SetAuthor(e.target.value)}
                  style={{
                    marginTop: "5%",
                    width: "100%",
                    overflow: "visible",
                    border: "none",
                  }}
                  placeholder="AuthorId"
                ></Input>
              </div>

              <div class="col">
                <Input
                  value={genreId}
                  onChange={(e) => SetGenreId(e.target.value)}
                  style={{
                    marginTop: "5%",
                    width: "100%",
                    overflow: "visible",
                    border: "none",
                  }}
                  placeholder="GenreId"
                ></Input>
              </div>
            </div>

            <div
              class="row"
              style={{
                padding: "1%",
                height: "100%",
              }}
            >
              <TextArea
                value={description}
                onChange={(e) => SetDescription(e.target.value)}
                style={{
                  marginTop: "2%",
                  width: "100%",
                  height: "100px",
                  border: "none",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
                placeholder="Description"
                autoSize={{ minRows: 8, maxRows: 6 }}
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <Button
              type="primary"
              style={{
                margin: "20px 0px 0px 0px",
                width: "260px",
                backgroundColor: "#91caff",
                borderColor: "#91caff",
                color: "#fff",
              }}
              hover={{
                backgroundColor: "#40a9ff",
                borderColor: "#40a9ff",
              }}
              variant="solid"
              onClick={handleSubmit}
            >
              Create book
            </Button>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="imageUploader"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
