import { GetServerSideProps } from 'next';
import SearchBar from "../pages/components/search/SearchBar";
import SortableTable from "../pages/components/table/SortableTable";
import NavigationBar from './components/navigationbar/NavigationBar';
import NotificationWindow from './components/notification/NotificationWindow';
import Head from 'next/head';
import styles from '@/pages/index.module.css';
import { NextPage } from 'next';
import React, { useState } from "react";


interface ArticlesInterface {
  id: string;
  dateSubmitted: String,
  articleTitle: String,
  articleCitation: String,
  summary: String;
  status: String;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "articleTitle", label: "Title" },
    { key: "summary", label: "Summary" },
    { key: "articleCitation", label: "Citation" },
    { key: "dateSubmitted", label: "Date" },
  ];

  const [articleTitle, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState<ArticlesInterface[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const dateSubmitted = new Date().toISOString();
  const status = "Awaiting Approval";

  const handleSearch = (results: ArticlesInterface[]) => {
    setSearchResults(results);
  };

  const handleShowNotification = () => {
    setShowNotification(true);
  
    // Automatically hide the notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dateSubmitted, articleTitle, status }),
      });

      if (response.ok) {
        console.log('Article submitted');
        // Reset the title state if needed
        setTitle('');

        // Show the success notification
        handleShowNotification();
      } else {
        console.log('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  const isSubmitDisabled = articleTitle.trim() === ""; // Disable if title is empty or only contains spaces

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>Speed application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar/>

      <main className="flex-1 p-6">
        {showNotification && (
          <NotificationWindow
            message="Article submitted"
            type="success"
          />
        )}

        <h1 className="text-3xl font-bold text-center mb-6">Home Page</h1>

        <h2 className="text-2xl font-semibold mb-4">Submit an Article for Moderation</h2>
        
        <form id="userSubmit" onSubmit={handleSubmit} className="mb-6">
          <div className="flex justify-center">
            <input
              type="text"
              name="articleTitle"
              placeholder="Enter article title here"
              value={articleTitle}
              onChange={event => setTitle(event.target.value)}
              className="border border-gray-300 p-2 rounded w-2/3 mb-4"
            />
            <button
              type="submit"
              className={`bg-blue-500 text-white px-10 py-2 ml-4 rounded hover:bg-blue-800 font-bold ${isSubmitDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={isSubmitDisabled}
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Search for articles by title keywords</h2>
          <div className="flex justify-center mb-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          <SortableTable headers={headers} data={searchResults} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">All articles</h2>
          <SortableTable headers={headers} data={articles} />
        </div>
      </main>

      <footer className="p-4 bg-gray-800 text-white">
        {/* Content for the footer goes here */}
      </footer>
    </div>
  );
};

const getTopics = async () => {
  try {
    const res = await fetch('http://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics")
    }

    return res.json();
  }
  catch (error) {
    console.log("Error loading topics: ", error);
  }
}

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async (_) => {

  console.log("In GetServerSideProps");
  const { topics } = await getTopics();

  console.log("topic count: %d", topics.length);

  // Map the data to ensure all articles have consistent property names
  const articles = topics.map((article: {
    id: any; _id: any; dateSubmitted: any; articleTitle: any; articleCitation: any; summary: any; status: any;
  }) => ({
    id: article.id ?? article._id,
    dateSubmitted: article.dateSubmitted ?? "no date",
    articleTitle: article.articleTitle ?? "no title",
    articleCitation: article.articleCitation ?? "no citation",
    summary: article.summary ?? "no summary",
    status: article.status ?? "no status"
  }));

  return {
    props: {
      articles,
    },
  };
};

export default Articles;
