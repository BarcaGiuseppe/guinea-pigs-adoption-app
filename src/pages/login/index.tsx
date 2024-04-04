import { useDataByContext } from "@/ContextProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const { loginAdmin } = useDataByContext();

  const router = useRouter();

  const handleChangeInput = (e: any) => {
    //console.log(e.target.name);
    if (e.target.name === "email") {
      setUser(e.target.value);
    } else if (e.target.name === "password") {
      setPass(e.target.value);
    }
  };

  const handleClickButton = () => {
    console.log("user: " + user + " env: " + process.env.NEXT_PUBLIC_USER);
    if (
      user === process.env.NEXT_PUBLIC_USER &&
      pass === process.env.NEXT_PUBLIC_PASS
    ) {
      loginAdmin();
      setUser("");
      setPass("");
      router.push("/list-requests");
    } else {
      alert("CREDENZIALI NON VALIDE");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/admin-2807748-2336544.png?f=webp&w=512"
            alt="ADMIN"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your admin account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username admin
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={user}
                  onChange={handleChangeInput}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password Admin
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={pass}
                  onChange={handleChangeInput}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleClickButton}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
