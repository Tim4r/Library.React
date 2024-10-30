
import { Button, Descriptions, Input, Layout } from 'antd';
export function Login (){
  return(
    <Layout
    style={
        {
            background:'white',
            alignItems:'center'
        }
    }
    >
        <p
        style={
            {
                display:'flex',
                position:'fixed',
                marginTop:150,

            }
        }
        >Book Shelf</p>

        <Input placeholder='введите логин'
        style={
            {
                marginTop:250,
                width:480
            }
        }
        >
        
        </Input>

        <Input placeholder='введите пароль'
         style={
            {
                marginTop:40,
                width:480
            }
        }
        >
        </Input>

<p
style={{textDecoration:'underline', color:'blue'}}
>создать аккаунт</p>

        <Button
        style={
            {
                width:210,
                height:50,
                alignItems:'center',
                marginTop:20
            }
        }
        >
            Войти
        </Button>
    </Layout>
  )
};

