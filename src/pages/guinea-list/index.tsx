import { useDataByContext } from "@/ContextProvider";
import Head from "next/head";

export default function GuineaList() {
  const { guineaList } = useDataByContext();
  console.log("PIGS", guineaList);

  return (
    <>
      <Head>
        <title>Guinea Pigs Adoption List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">
            Lista dei nostri porcellini che aspettano di essere adottati{" "}
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {guineaList?.map((pig) => (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img src={pig.url_img} />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5>{pig.name}</h5>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}