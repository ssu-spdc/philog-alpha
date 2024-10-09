"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../lib/firebase";
import Modal from "@/app/_component/login/Modal";
import SignupForm from "@/app/_component/login/SignupForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/"); // 메인 페이지로 이동
    } catch (err) {
      setError(err.message);
    }
  };

  const openSignupModal = () => {
    setIsSignupOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupOpen(false);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}

      <button onClick={openSignupModal}>Sign Up</button>

      {/* 회원가입 모달 */}
      <Modal isOpen={isSignupOpen} onClose={closeSignupModal}>
        <SignupForm auth={auth} db={db} onSuccess={closeSignupModal} />
      </Modal>

      <style jsx>{`
        button {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
