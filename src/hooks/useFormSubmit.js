// ============================================================
// src/hooks/useFormSubmit.js
// Drop this hook into your React components for any form
// ============================================================

import { useState } from "react";

export function useFormSubmit() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const submit = async (type, formData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...formData }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage(data.message);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const reset = () => {
    setStatus("idle");
    setMessage("");
  };

  return { status, message, submit, reset };
}
