//import express from 'express';
const express = require('express');
//import cors from 'cors';
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');


const salt = bcrypt.genSaltSync(10);
const secret = 'ahsg5sar3guri43rnr3fg';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://danicalmeida11:<71PuZLkI9mxzLZo8>@cluster0.y7giu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


//endpoints

//Registro de usuário
app.post('/registro', async (req,res) => {
    const {username,password} = req.body;
    try {
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }   
})

//Login do usuário
app.post('/login', async (req,res) => {
   const {username,password} = req.body;
   const userDoc = await User.findOne({username}); 
   const passOk = bcrypt.compareSync(password, userDoc.password);
   if (passOk){
    //Usuário está logado
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token',token).json({
           id:userDoc._id,
            username,
        });
    })
   } else{
    res.status(400).json('Usuário e/ou senha incorreto(s).')
   }
})

//Informações do usuário lpgado
app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
        if(err) throw err;
        res.json(info);
    })
})

//Remove o token de autenticação, fazendo logout
app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
})

// Fazer o upload do post
app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    //Após verificar o token, pegamos as informações
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        //Conteúdo do post
        const {title,resumo,content} = req.body;
        const postDoc = await Post.create({
            title,
            resumo,
            content,
            cover: newPath,
            autor: info.id,
        })
        res.json(postDoc);
    })
    
})

// Atualiza post existente
app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
     const {originalname,path} = req.file;
     const parts = originalname.split('.');
     const ext = parts[parts.length - 1];
     newPath = path+'.'+ext;
     fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const {id,title,resumo,content} = req.body;
        const postDoc = await Post.findById(id)
        const isAutor = JSON.stringify(postDoc.autor) === JSON.stringify(info.id);
        if (!isAutor) {
            return res.status(400).json('Você não é o autor do post.')
        }
        await postDoc.update({
            title,
            resumo,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });

        res.json(postDoc);
        })
    })

// Listar posts
app.get('/post', async (req,res) => {
    res.json(
        await Post.find()
           .populate('autor', ['username'])
           .sort({createdAt: -1}) // Listar os posts a partir do último post criado
           .limit(20) // Limita a visualização para os últimos 20 posts.
    );
})

// Buscar post por ID
app.get('/post/:id', async (req,res) => {
    
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('autor',['username']);
    res.json(postDoc);
})

app.listen(4000);
