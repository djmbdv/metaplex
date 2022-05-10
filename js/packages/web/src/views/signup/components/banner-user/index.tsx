import React,{useState,useRef,useEffect} from 'react';
import { Button, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



export const BannerUser =  (props)=>{
    const first :React.MutableRefObject<HTMLDivElement | undefined>  = useRef("");
    const [url,setUrl] = useState("");
    const fileElement: React.MutableRefObject<HTMLInputElement | undefined> = useRef();
    const {setUrlBanner} = props;

    useEffect(()=>{
        const onLoad = ()=>{
            first.current.style['background-image']= url;
            setUrlBanner(url);
        }
        onLoad()
    },[url])

    useEffect(()=>{
        const onLoad =  () => {
            fileElement.current.style.opacity = "0";
      
        };

          window.addEventListener('load', onLoad);
          return () => {window.removeEventListener('load', onLoad)};
       
    },[])

    const handleChange =(e)=> {
        let files =e.target.files
        let render = new FileReader();
        render.readAsDataURL(files[0]);
        render.onload =(e)=>{
            setUrl("url('"+e.target.result+"')")
        }
        
    }

    const EditBanner = () =>{
        fileElement.current.click();
        fileElement.current.addEventListener('change',handleChange);
    }

    return(
        <div ref={first} className='banner-user' >
             <Button type="primary" onClick={EditBanner} shape="circle" icon={<UploadOutlined />} size="small" />
            {/* <IconButton onClick={EditBanner} aria-label="Delete">
                <AddIcon />
            </IconButton> */}
            {/* <a type="button" onClick={EditBanner} className={BannerStyle.button} > prueba</a>   */}
            <input type="file" className='file' name="banner" id="banner" ref={fileElement} />     
        </div>
    )
}