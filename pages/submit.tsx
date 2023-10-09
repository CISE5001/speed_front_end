import axios from "axios"
import React, { useState } from 'react';
import NavigationBar from '../pages/components/navigationbar/NavigationBar';
import Head from 'next/head';

export default function Home() {

  const [title, setTitle] = useState("");
  const [practice, setPractice] = useState("");
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");
  const [citation, setCitation] = useState("");
  const status = "Awaiting Approval";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    const postData = {
      dateSubmitted: formattedDate,
      articleTitle: title,
      articlePractice: practice,
      articleClaim: claim,
      articleCitation: citation,
      articleEvidence: evidence,
      status: status
    }

    try {
      const response = await axios.post('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedArticles', postData);
      console.log(response.data);
    
    if (response.data) {
        console.log("Updated Status");
        window.history.back();
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
        <h1 className="text-4xl font-bold mb-10 w-full">Submit an Article for Moderation</h1>
        
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
      </main>      
    </div>
  );
}
