import React,{useEffect,useRef,useState } from 'react';
import { Button, Tooltip } from 'antd';
import { UserOutlined }from '@ant-design/icons';




export const AvatarUser = (props) => {
    const [isLoadFile, setIsLoadFile] = useState(false)
    const avatar =  useRef<HTMLInputElement| null >(null);
    const [urlImagen, setUrlImage] = useState('')
    const {setUrl} = props;
    
     useEffect(()=>{
        const onLoad =  () => {
           let ev = avatar.current!.style.opacity="0";
      
        };

          window.addEventListener('load', onLoad);
          return () => {window.removeEventListener('load', onLoad)};
       
    },[])

    const handleChange =(e)=> {
        let files =e.target.files
        
        setIsLoadFile(true)
        
        let render = new FileReader();
        render.readAsDataURL(files[0]);
        render.onload =(e:any)=>{
            setUrlImage(e.target.result);
            setUrl(e.target.result);
        }
          
    }
    const handleClick = async ()=>{

        avatar.current?.click();
        avatar.current?.addEventListener('change',handleChange);

    }
    const loadImagen = (url)=>{
        
        return <img src={url} alt="photo-profile" className="avatar-user-photoProfile"/>
    }
    
   
    return(
        <>
        {!isLoadFile ?
        <div className="avatar-user-wrap" >
            <Button className='avatar-user-button' shape="circle" icon={<UserOutlined />} onClick={handleClick} size="large" />
            <input ref={avatar} type="file" name="Subir" id="upload-avatar" />
        </div>:loadImagen(urlImagen)}
        </>
    )
}