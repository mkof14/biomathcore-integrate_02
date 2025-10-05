import React from "react";
import auth from "@/lib/firebase";

export default function Auth() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      // TODO: implement your real auth logic (firebase/auth etc)
      console.log("auth with", { auth, email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <form onSubmit={handleAuth} className="space-y-3">
      <input
        className="border rounded px-3 py-2 w-full"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="border rounded px-3 py-2 w-full"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button className="bg-black text-white px-4 py-2 rounded" type="submit">
        Sign in
      </button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}
