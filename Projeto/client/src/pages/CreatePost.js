import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import Editor from "../Editor";


export default function CreatePost(){
    const [title,setTitle] = useState('');
    const [resumo,setResumo] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title',title);
        data.set('resumo',resumo);
        data.set('content',content);
        data.set('file',files[0]);

        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
          method: 'POST',
          body: data, 
          credentials: 'include', 
        })
        if (response.ok) {
          setRedirect(true);
        }
    }

    if (redirect){
      return <Navigate to={'/'}/>
    }

    return(
        <form onSubmit={createNewPost}>
            <input type="title" 
                   placeholder={'Título'} 
                   value={title}
                   onChange={ev => setTitle(ev.target.value)}/>
            <input type="resumo"
                   placeholder={'Resumo'}
                   value={resumo}
                   onChange={ev => setResumo(ev.target.value)}/>
            <input type="file"
                   onChange={ev => setFiles(ev.target.files)}/>
            # Usando o React Quill para customizar a edição do post
            <Editor value={content} onChange={setContent}/>
            <button style={{marginTop:'5px'}}>Enviar</button>
        </form>
    )
}