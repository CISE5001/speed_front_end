import axios from "axios"
import React, { useState } from 'react';
import NavigationBar from '../../components/navigationbar/NavigationBar';
import Head from 'next/head'

export default function Home({submittedArticles}: HomeProps) {

  const [title, setTitle] = useState(submittedArticles && submittedArticles ? submittedArticles.articleTitle : "");
  const [summary, setSummary] = useState("");
  const [citation, setCitation] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    const postData = {
      dateSubmitted: formattedDate,
      articleTitle: title,
      articleCitation: citation,
      summary: summary
    }

    try {
      const response = await axios.post('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/', postData);
      console.log(response.data);

      try {
        const url = `https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/approvedArticles/completed/${submittedArticles && submittedArticles ? submittedArticles._id : ""}`
        console.log(url)
        const response = await axios.put(url);
    
        if (response.data && response.data.submittedArticles) {
          console.log("Updated Status")
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>MODERATION PAGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar/>

      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-10 w-full">Edit Article</h1>
        
        <form id="userSubmit" onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <div>
            <p className="mb-2 font-semibold">Title</p>
            <input 
                type="text"
                name="articleTitle"
                placeholder="Enter article title here"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded block" // Add the "block" class
              />
          </div>

          <div>
            <p className="mb-2 font-semibold">Summary</p>
            <input 
              type="text"
              name="articleSummary"
              placeholder="Enter article summary here"
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <p className="mb-2 font-semibold">Citation</p>
            <input 
              type="text"
              name="articleCitation"
              placeholder="Enter article citation here"
              value={citation}
              onChange={e => setCitation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mt-6">
            <input 
              type="submit"
              value="Submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            />
          </div>
        </form>
      </main>      
    </div>
);

}

export async function getServerSideProps(context: any) {
  const id = context.query.id;

  console.log("In getServerSideProps");

  try {
    const response = await axios.get(`https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/approvedArticles/${id}`);

    console.log(response.data);

    if (response.data) {
      return {
        props: {
          submittedArticles: response.data
        }
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      submittedArticles: []
    }
  };
}

type Article = {
  _id: string;
  dateSubmitted: string;
  articleTitle: string;
  status: string;
};

type HomeProps = {
  submittedArticles: Article;
};