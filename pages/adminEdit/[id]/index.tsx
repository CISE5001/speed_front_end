import axios from "axios"
import React, { useState } from 'react';
import NavigationBar from '../../components/navigationbar/NavigationBar';
import Head from 'next/head';

export default function Home({submittedArticles}: HomeProps) {
  const [date, setDate] = useState(submittedArticles && submittedArticles ? submittedArticles.dateSubmitted : "");
  const [title, setTitle] = useState(submittedArticles && submittedArticles ? submittedArticles.articleTitle : "");
  const [practice, setPractice] = useState(submittedArticles && submittedArticles ? submittedArticles.articlePractice : "");
  const [claim, setClaim] = useState(submittedArticles && submittedArticles ? submittedArticles.articleClaim : "");
  const [evidence, setEvidence] = useState(submittedArticles && submittedArticles ? submittedArticles.articleEvidence : "");
  const [citation, setCitation] = useState(submittedArticles && submittedArticles ? submittedArticles.articleCitation : "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      dateSubmitted: date,
      articleTitle: title,
      articlePractice: practice,
      articleClaim: claim,
      articleCitation: citation,
      articleEvidence: evidence,
    }

    try {
      const response = await axios.post('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/', postData);
      console.log(response.data);
      
      handleDelete();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  
const handleDelete = async () => {
  // Prompt the user for confirmation
  const userConfirmed = window.confirm("Are you sure you want to change this article?");

  // If the user cancels, abort the deletion
  if (!userConfirmed) return;

  try {
    const url = `https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/${submittedArticles && submittedArticles ? submittedArticles._id : ""}`;
    console.log(url)
    await axios.delete(url);
    console.log("Successfully deleted article");
    window.history.back();
    // Optionally, you can redirect the user to another page after deletion, or provide some feedback.
  } catch (error) {
    console.error("Error deleting article:", error);
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>MODERATION PAGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar/>

      <main className="flex-1 p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10">Admin Edit Article</h1>
        
        <form id="userSubmit" onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div>
            <p className="mb-2 font-semibold">Article Date</p>
            <input
              type="text"
              name="articleDate"
              placeholder="Enter article date here"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded block"
            />
          </div>
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
            <p className="mb-2 font-semibold">Practice</p>
            <input 
                type="text"
                name="articlePractice"
                placeholder="Enter article practice here"
                value={practice}
                onChange={e => setPractice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded block" // Add the "block" class
              />
          </div>

          <div>
            <p className="mb-2 font-semibold">Claim</p>
            <input 
                type="text"
                name="articleClaim"
                placeholder="Enter article claim here"
                value={claim}
                onChange={e => setClaim(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded block" // Add the "block" class
              />
          </div>

          <div>
            <p className="mb-2 font-semibold">Evidence</p>
            <input 
              type="text"
              name="articleSummary"
              placeholder="Enter article summary here"
              value={evidence}
              onChange={e => setEvidence(e.target.value)}
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
          <div className="mt-6">
            <button 
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete
            </button>
          </div>
      </main>      
    </div>
);

}

export async function getServerSideProps(context: any) {
  const id = context.query.id;

  console.log(id);
  console.log("In getServerSideProps");

  try {
    const response = await axios.get(`https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/${id}`);

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
  articlePractice: string,
  articleClaim: string,
  articleEvidence: string,
  articleCitation: string,
  status: string;
};

type HomeProps = {
  submittedArticles: Article;
};