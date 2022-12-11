import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Header from "../../components/Header";

export default function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-28 px-14 text-center">
        <img
          className="w-80 cursor-pointer"
          src="https://links.papareact.com/ocw"
        />
        <p className="font-md italic w-64">
          This is not the real Instagram app, This is a clone built for learning
          purpose only.
        </p>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 bg-blue-500 text-white font-normal py-2 px-4 border-b-4 border-blue-700 hover:border-blue-600 rounded-md"
                onClick={() =>
                  signIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
