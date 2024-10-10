import {format} from "date-fns";
import { Link } from "react-router-dom";

export default function Post({_id,title,resumo,content,cover,createdAt,autor}) {
    return (
        <div className="post">
        <div className="image">
          <Link to={'/post/${_id}'}>
            <img src={'http://localhost:4000/'+ cover} alt=""/>
          </Link>
        </div>
        <div className='texts'>
          <Link to={'/post/${_id}'}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a className="autor">{autor.username}</a>
            <time>{format(new Date(createdAt), 'd/MMM/yyyy - HH:mm')}</time>
          </p>
          <p className="resumo">{resumo}</p>
        </div>
      </div>
    );
}