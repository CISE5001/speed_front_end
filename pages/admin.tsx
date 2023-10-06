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
        <h1 className="text-3xl font-bold text-center mb-6 italic">ADMIN PAGE</h1>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Search for articles by title keywords</h2>
          <div className="flex justify-end mb-4"> {/* Align items to the right */}
            <SearchBar onSearch={handleSearch} />
          </div>
          <SortableTable headers={headers} data={searchResults} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">All User Visible Articles</h2>
          <SortableTable headers={headers} data={articles} />
        </div>
      </main>

      <footer className="p-4 bg-gray-800 text-white">
        { }
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

  const { topics } = await getTopics();

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
