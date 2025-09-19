import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from  '../services/firebaseConfig'
import { useRouter } from 'expo-router'

function Cadastrar() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [nomeFocus, setNomeFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [senhaFocus, setSenhaFocus] = useState(false);

    const router = useRouter();

    const cadastar = () => {
        createUserWithEmailAndPassword(auth , email, senha)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            router.push('/home');
         });
    }};