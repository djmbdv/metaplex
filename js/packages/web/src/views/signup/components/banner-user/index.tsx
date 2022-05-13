import React,{useState,useRef,useEffect} from 'react';
import { Button, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



export const BannerUser =  (props)=>{
    const first  = useRef<HTMLDivElement | null>(null);
    const [url,setUrl] = useState("");
    const fileElement = useRef<HTMLInputElement | null>(null);
    const {setUrlBanner} = props;

    useEffect(()=>{
        const onLoad = ()=>{
            try{
                if(first.current) first.current.style['background-image']= url;
                setUrlBanner(url);
            }catch(e){}
        }
        onLoad()
    },[url])

    useEffect(()=>{
        const onLoad =  () => {
            if(fileElement.current)fileElement.current.style.opacity = "0";
      
        };

          window.addEventListener('load', onLoad);
          return () => {window.removeEventListener('load', onLoad)};
       
    },[])

    const handleChange =(e)=> {
        let files =e.target.files
        let render = new FileReader();
        render.readAsDataURL(files[0]);
        render.onload =(e)=>{
            setUrl("url('"+e?.target?.result+"')")
        }
        
    }

    const EditBanner = () =>{
        fileElement.current?.click();
        fileElement.current?.addEventListener('change',handleChange);
    }

    return(
        <div ref={first} className='banner-user' >
             <Button type="primary" onClick={EditBanner} shape="circle" icon={<UploadOutlined />} size="small" />
            <input type="file" className='file' name="banner" id="banner" ref={fileElement} />     
        </div>
    )
}