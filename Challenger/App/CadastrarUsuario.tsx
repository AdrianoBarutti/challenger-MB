import { createUserWithEmailAndPassword } from 'firebase/auth';
// Update the import to match the correct exported member from firebaseConfig
import { auth } from '../services/firebaseConfig';
import { useRouter } from 'expo-router';
import { useState } from 'react';

function CadastrarUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [nomeFocused, setNomeFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);

  const router = useRouter(); // Hook para navegação

  const cadastrar = () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        router.push('/home'); // Redireciona para a tela "home.tsx"
      })
  }
}